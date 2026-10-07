@page bitovian/kafka-state-farm-prep/kafka-and-graphql Kafka and GraphQL
@parent bitovian/kafka-state-farm-prep 6
@outline 2

@description Learn the common ways a GraphQL API and Kafka work together, the problems each one runs into, and how teams solve them.

@body

## Overview

In this section, we will:

- See why a GraphQL API can't read from Kafka directly
- Serve GraphQL queries from data that Kafka keeps up to date
- Send changes from GraphQL mutations to Kafka without losing events
- Handle mutations that finish their work later
- Push live updates to clients from Kafka
- Use the GraphQL API from inside a stream processor
- Pick libraries that are still maintained

GraphQL and Kafka solve different problems. GraphQL is how an app asks for exactly the data it needs, in one request, and gets an answer right away. Kafka is how services tell each other that something happened, without waiting on each other. In most systems that use both, GraphQL is the front door for apps, and Kafka moves data between the services behind it.

If you haven't used GraphQL before, Bitovi's [GraphQL 101](../../learn-graphql-101.html) course covers queries, mutations, schemas, and resolvers.

## Why GraphQL can't read from Kafka directly

A GraphQL query usually asks for one thing by its ID, like "get claim 123". Kafka can't answer that. A topic is a log you read in order, from an offset. Confluent's introduction to GraphQL over Kafka puts it plainly: you can't get a record by its key through the Kafka API, so queries need something else in front, such as Kafka Streams, ksqlDB, or a database that Kafka Connect fills ([Confluent blog](https://www.confluent.io/blog/intro-to-graphql-an-api-for-kafka-data/)).

That's why every use case below puts a database or other store between Kafka and the GraphQL resolvers.

## Use case: serve queries from a store that Kafka keeps current

This is the most common setup. Services publish events to Kafka. A consumer reads those events and writes them into a store shaped for the queries the app needs. GraphQL resolvers read from that store.

For example, a claims service publishes `ClaimFiled` and `ClaimUpdated` events. A consumer writes each claim into a `claims` table, along with the policy number and customer name the app shows on screen. The `claim(id:)` query reads one row from that table instead of calling three services.

This is the CQRS pattern (Command Query Responsibility Segregation): writes and reads use different models, and the read side is a "view database" kept current by subscribing to events ([microservices.io](https://microservices.io/patterns/data/cqrs.html)). Wayfair runs it at scale: product changes flow through Kafka into a cache that takes 80 to 200 million writes a day, with a GraphQL service in front of it ([Wayfair tech blog](https://www.aboutwayfair.com/careers/tech-blog/streamlining-access-to-product-data-with-the-martech-product-service)).

<table>
  <thead>
    <tr><th>Challenge</th><th>How teams solve it</th></tr>
  </thead>
  <tbody>
    <tr><td>The store lags behind Kafka, so a query can return slightly old data.</td><td>Decide, per field, how fresh the data has to be. Show the app when data was last updated if it matters. See <a href="#stale-reads-after-a-write">Stale reads after a write</a>.</td></tr>
    <tr><td>Kafka delivers some events more than once.</td><td>Make the consumer idempotent: write with an upsert keyed by the record's ID, so applying the same event twice gives the same row.</td></tr>
    <tr><td>Events for one record arrive out of order across partitions.</td><td>Key events by the record's ID, so all events for one claim go to the same partition and stay in order. Store a version or timestamp, and ignore events older than what's already stored.</td></tr>
    <tr><td>A bug in the consumer writes bad data into the store.</td><td>Fix the consumer, then rebuild the store by reading the topic again from the start. This only works if the topic keeps enough history, so check its retention or use a compacted topic.</td></tr>
  </tbody>
</table>

## Use case: send mutation changes to Kafka

A mutation changes data, and other services need to hear about it. For example, `fileClaim` saves a new claim, and the fraud and notification services need a `ClaimFiled` event.

The obvious approach is to save to the database and then produce to Kafka in the same resolver. That's called a **dual write**, and it can lose events. If the database commit succeeds and the Kafka produce fails, or the server crashes between the two, the claim exists but no one is told about it.

The standard fix is the **transactional outbox** ([microservices.io](https://microservices.io/patterns/data/transactional-outbox.html)):

1. In one database transaction, the resolver saves the claim and inserts a row into an `outbox` table describing the event.
2. A separate process reads new outbox rows and produces them to Kafka. Many teams use change data capture (CDC) for this step, with a tool like Debezium reading the database's change log ([Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-out-box-cosmos)).

Because both rows are saved in the same transaction, there's never a claim without its event, or an event without its claim.

<table>
  <thead>
    <tr><th>Challenge</th><th>How teams solve it</th></tr>
  </thead>
  <tbody>
    <tr><td>The outbox process can publish the same row twice, for example after a restart.</td><td>Give every event a unique ID, and have consumers skip IDs they've already handled.</td></tr>
    <tr><td>The outbox table keeps growing.</td><td>Delete or archive rows after they're published. With CDC, the row can be deleted right after insert, because Debezium reads the insert from the change log.</td></tr>
    <tr><td>The GraphQL schema and the event schema drift into one shape.</td><td>Treat them as separate contracts. The GraphQL schema is shaped for the app's screens. The event schema in Schema Registry is shaped for other services. Changing one shouldn't force a change to the other.</td></tr>
  </tbody>
</table>

## Use case: mutations that finish later

Some work can't finish inside one request. For example, `requestQuote` might need an underwriting service to price a policy, and that service reads its work from a Kafka topic. In that case the mutation only accepts the request: it records it (through the outbox), and returns right away.

The hard part is deciding what the mutation returns, since the result doesn't exist yet. Confluent's GraphQL introduction calls this out as an open question ([Confluent blog](https://www.confluent.io/blog/intro-to-graphql-an-api-for-kafka-data/)). A common answer is to return an ID and a status that the app can check later:

<div data-toolbar-order="">

```graphql
type Mutation {
  requestQuote(input: QuoteRequestInput!): QuoteRequest!
}

type QuoteRequest {
  id: ID!
  status: QuoteStatus!
  quote: Quote
}

enum QuoteStatus {
  PENDING
  READY
  FAILED
}
```

</div>

<table>
  <thead>
    <tr><th>Challenge</th><th>How teams solve it</th></tr>
  </thead>
  <tbody>
    <tr><td>The app needs to know when the work is done.</td><td>The app polls a <code>quoteRequest(id:)</code> query until the status changes. If waiting matters to users, add a subscription. See <a href="#use-case-push-live-updates-to-clients">Push live updates to clients</a>.</td></tr>
    <tr><td>The user clicks Submit twice and sends two requests.</td><td>Have the app send an idempotency key with the mutation, and return the existing request if that key was already used.</td></tr>
    <tr><td>The work fails after the mutation already returned.</td><td>Record the failure on the request (<code>FAILED</code> with a reason), so the app can show it instead of waiting forever.</td></tr>
  </tbody>
</table>

## Stale reads after a write

When writes go to Kafka and reads come from a store that Kafka fills, there's a short gap before a change shows up. CQRS calls this out as its main cost: the views are only eventually consistent ([microservices.io](https://microservices.io/patterns/data/cqrs.html)).

Users notice it right after they change something. A user files a claim, the app navigates to "My claims", and the new claim isn't in the list yet.

Common ways to handle it:

- **Return the changed data from the mutation.** The resolver reads the result from the write database, not the store, and returns it. When a mutation returns an object's `id` and its changed fields, Apollo Client updates that object in its cache automatically ([Apollo Client docs](https://www.apollographql.com/docs/react/data/mutations#updating-local-data)).
- **Add new items to the cache yourself.** Apollo Client doesn't know a new claim belongs in the cached "My claims" list, so the app adds it with the mutation's `update` function, without asking the server again (same docs).
- **Set expectations.** For data that isn't urgent, show "updates can take a minute to appear".

## Use case: push live updates to clients

GraphQL subscriptions let the server push data to the app, for example to show a claim's status changing from `IN_REVIEW` to `APPROVED` without a refresh. Kafka is often where those changes come from. Uber moved its support chat to GraphQL subscriptions over WebSockets, with backend services publishing to Kafka ([InfoQ](https://www.infoq.com/news/2024/03/uber-chat-graphql-subscriptions/)).

Before you add a subscription, check whether polling is enough. Apollo recommends polling or refetching for most cases, and subscriptions only when the app needs small, frequent updates with low delay ([Apollo Client docs](https://www.apollographql.com/docs/react/data/subscriptions)).

<table>
  <thead>
    <tr><th>Challenge</th><th>How teams solve it</th></tr>
  </thead>
  <tbody>
    <tr><td>One Kafka consumer per subscribed client doesn't scale. Confluent's introduction says it only works "when there will be only a few clients" (<a href="https://www.confluent.io/blog/intro-to-graphql-an-api-for-kafka-data/">Confluent blog</a>).</td><td>Run one consumer per server, and have it hand each event to the clients on that server that subscribed to it.</td></tr>
    <tr><td>Each client stays connected to one server, so an event read on server A doesn't reach a client on server B (<a href="https://graphql.org/learn/subscriptions/">graphql.org</a>).</td><td>Either give each server its own consumer group, so every server sees every event, or forward events through a shared pub/sub. Never use the in-memory <code>PubSub</code> from Apollo's examples in production; Apollo's docs say it isn't meant for that (<a href="https://www.apollographql.com/docs/apollo-server/data/subscriptions">Apollo Server docs</a>).</td></tr>
    <tr><td>A client could receive events for data it isn't allowed to see.</td><td>Check permissions for each event before sending it to each client, not only when the subscription starts.</td></tr>
    <tr><td>Clients miss events while they're disconnected.</td><td>When the app reconnects, refetch the current state with a query, then resume the subscription.</td></tr>
    <tr><td>With federation, the gateway doesn't read Kafka. Apollo Router has no built-in Kafka support (<a href="https://www.apollographql.com/docs/graphos/routing/operations/subscriptions">Apollo Router docs</a>).</td><td>Put the Kafka consumer in the subgraph that owns the data. The router passes the subscription through to that subgraph.</td></tr>
  </tbody>
</table>

## Use case: call the GraphQL API from a stream processor

Sometimes the direction is reversed. A stream processor reads events from Kafka and needs more data than the event carries. If the company already has a federated GraphQL API, the processor can query it instead of calling each service.

Netflix does this for search in its studio tools: Flink jobs read change events from Kafka, query the federated GraphQL gateway for the full record, and write the result to the search index ([InfoQ](https://www.infoq.com/news/2022/04/netflix-studio-search/)).

<table>
  <thead>
    <tr><th>Challenge</th><th>How teams solve it</th></tr>
  </thead>
  <tbody>
    <tr><td>A busy topic sends a flood of queries at the GraphQL API.</td><td>Batch lookups, cache results for a short time, and rate-limit the processor so it can't overload the API.</td></tr>
    <tr><td>The API is down or slow, and events back up.</td><td>Retry with a delay, and send events that keep failing to a dead letter topic so the rest keep moving.</td></tr>
  </tbody>
</table>

## Picking libraries

Several libraries that older tutorials use are no longer a safe choice:

- **KafkaJS** (Node.js) is no longer actively maintained. Its maintainer asked for replacements in 2023 ([KafkaJS issue #1603](https://github.com/tulios/kafkajs/issues/1603)). Confluent's [`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript) offers a similar API and is supported by Confluent.
- **Reactor Kafka** (Java and Spring) was discontinued in May 2025 ([Spring blog](https://spring.io/blog/2025/05/20/reactor-kafka-discontinued/)). Most older "Kafka to GraphQL subscription" examples in Spring use it.
- The npm packages built to connect Kafka to GraphQL subscriptions are small, and one hasn't been released since 2020. A short hand-written bridge on top of a supported Kafka client is often easier to maintain.

## Next steps

Next, we'll look at CloudEvents on Kafka: a shared envelope for events, and how it's written to a Kafka message.
