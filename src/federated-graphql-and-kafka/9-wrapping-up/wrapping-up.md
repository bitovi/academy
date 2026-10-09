@page learn-federated-graphql-and-kafka/wrapping-up Wrapping Up
@parent learn-federated-graphql-and-kafka 9
@outline 2

@description Review what you built across the gateway and Kafka, and where federation and event-driven APIs go from here.

@body

## What you built

You started with a Claims API that no app could reach through the gateway, and no other team could hear from. Here's what changed:

- **Apps reach your API through one endpoint.** Your Claims API is a subgraph, and the gateway combines it with the Policies and Billing subgraphs into one supergraph.
- **Your types and theirs are linked.** `Policy.claims` adds paginated claims to the Policies team's type, without changing their code. `Claim.policy` returns a policy your subgraph doesn't store. `Claim` is an entity, so Billing can add each claim's `payout` to it.
- **You change the shared schema safely.** You read a composition error and fixed your side of it. You renamed a field by adding the new one and deprecating the old, instead of breaking the Claims Desk.
- **Your changes reach other teams as events.** Filing and approving a claim publish events through an outbox, so none are lost when Kafka is down. Billing pays approved claims without your API calling it.
- **You react to other teams' events.** Your consumer moves claims into review when the Adjusting team assigns an adjuster, and handles a duplicate event once.
- **Apps see changes as they happen.** `claimStatusChanged` reaches every subscriber through the gateway, fed by Kafka, so it works no matter how many copies of your API run.

## Start over

To reset everything, stop `npm start` and `npm run dev` with Ctrl+C, then run these in the **federation** folder:

```shell
npm run stop
rm -f .env
npm run reset-data --prefix claims
```

`npm run stop` deletes Kafka's topics and the other teams' data. Removing **.env** goes back to version 1 of the Billing subgraph. Your code changes stay.

## Where to go next

- **Apollo Router.** Teams on Apollo GraphOS use Apollo Router instead of Hive Gateway. It reads the same kind of supergraph, and subgraphs work the same way. Subscriptions differ: according to Apollo's [router subscriptions documentation](https://www.apollographql.com/docs/graphos/routing/operations/subscriptions), "Apollo Router does not support direct WebSocket connections from clients." Clients get updates as multipart HTTP responses, and the router talks to subgraphs over WebSocket or HTTP callbacks. The Kafka consumer still belongs in the subgraph that owns the data, as yours does.
- **Schema registries.** In production, teams publish subgraph schemas to a registry like [Hive](https://the-guild.dev/graphql/hive/docs) or [Apollo GraphOS](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/composition), which composes them, checks each change against the others, and serves the supergraph to the gateway. Registries also collect field usage, which tells you when a deprecated field is safe to remove.
- **Change data capture.** Your outbox relay checks for new events every second. Many teams use change data capture instead: a tool like Debezium reads the database's change log, and its [outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html) turns each new outbox row into a Kafka event.
- **Stream processors that query the graph.** The flow can run the other way too. In Netflix's studio search, described on [InfoQ](https://www.infoq.com/news/2022/04/netflix-studio-search/), Flink jobs read change events from Kafka and "enrich the data using user-provided GraphQL queries against the federated gateway" before indexing it.
- **The GraphQL documentation's [Best Practices](https://graphql.org/learn/best-practices/)** goes deeper on schema design, versioning, and subscriptions.
