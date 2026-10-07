@page learn-graphql-102/subscriptions Subscriptions
@parent learn-graphql-102 9
@outline 2

@description Learn how GraphQL subscriptions push live updates to clients, when to use them instead of polling, and what a server needs to support them.

@body

## Overview

In this section, we will:

- Learn what a subscription is, and how it differs from a query
- Decide when a subscription is the right tool, and when polling is enough
- See how a server delivers subscriptions, and what the resolvers look like
- Learn why subscriptions need a separate system for events in production

This section has no exercise. Subscriptions need a WebSocket server, which the course API doesn't run. The section explains the ideas and shows the code, so you can recognize the pattern when you work on an API that uses it.

## Objective 1: Understand subscriptions

### Queries ask, subscriptions listen

Queries and mutations follow the same pattern: the client sends a request, the server sends one response, and the request is over.

A **subscription** is the third operation type. The client sends one request, and the server keeps it open. Each time something happens on the server, it pushes a new response to the client, until the client stops listening. The [GraphQL documentation](https://graphql.org/learn/subscriptions/) describes subscriptions as real-time updates delivered over long-lived requests.

Subscriptions have their own root type in the schema, next to `Query` and `Mutation`:

<div data-toolbar-order="">

```graphql
type Subscription {
  claimStatusChanged(claimId: ID!): Claim!
}
```

</div>

A client subscribes with the `subscription` keyword. The fields work the same way as in a query:

<div data-toolbar-order="">

```graphql
subscription WatchClaim {
  claimStatusChanged(claimId: "c4") {
    claimNumber
    status
  }
}
```

</div>

Nothing comes back right away. When an adjuster later approves `CLM-5004`, the server pushes a response in the usual shape:

<div data-toolbar-order="">

```json
{
  "data": {
    "claimStatusChanged": { "claimNumber": "CLM-5004", "status": "APPROVED" }
  }
}
```

</div>

If the claim changes again, the client gets another response. It keeps listening until it unsubscribes, or the connection closes.

Unlike a query, a subscription operation must have [exactly one root field](https://graphql.org/learn/subscriptions/). A client that wants to watch two things sends two subscriptions.

### When to use a subscription

The GraphQL documentation recommends subscriptions for data that changes **often and in small pieces**, where the client needs to see changes in **near real time**. For data that changes less often, polling or refetching is usually simpler.

<table>
   <tr>
      <th>Screen</th>
      <th>Good fit</th>
   </tr>
   <tr>
      <td>A policyholder watching their claim move from <code>OPEN</code> to <code>APPROVED</code></td>
      <td>Subscription: the change matters the moment it happens</td>
   </tr>
   <tr>
      <td>An adjuster's queue of open claims, as new ones are filed</td>
      <td>Subscription, or polling every minute if a small delay is fine</td>
   </tr>
   <tr>
      <td>A policy's details page</td>
      <td>A query: policies rarely change while someone is looking at them</td>
   </tr>
</table>

Subscriptions are for updates that keep coming. A different problem is one response that's slow because part of it takes longer to load. For that, the GraphQL community is drafting the `@defer` and `@stream` directives, which let the slow parts of one response arrive later. They aren't part of the GraphQL specification yet. A [working group](https://github.com/graphql/defer-stream-wg) is writing them.

## Objective 2: See how a server delivers subscriptions

### The connection

GraphQL doesn't say how a subscription's responses travel to the client. Two approaches are common, each with a protocol written by the community:

- **WebSockets**, a connection that stays open in both directions. Most JavaScript servers use the [`graphql-ws`](https://github.com/enisdenjo/graphql-ws) library for this, which follows its own [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md).
- **Server-sent events (SSE)**, a standard way for a server to keep sending to the browser over one HTTP response. The [`graphql-sse`](https://github.com/enisdenjo/graphql-sse) library follows its own [protocol](https://github.com/enisdenjo/graphql-sse/blob/master/PROTOCOL.md).

Apollo Server uses WebSockets through `graphql-ws`. It [doesn't support subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions) in `startStandaloneServer`, the function the course API uses to start. An API that needs them starts Apollo Server inside an Express app instead, with a separate WebSocket server next to it. That's why the course API has no subscriptions.

### The resolvers

A subscription field's resolver is an object with a `subscribe` function, not a plain function. `subscribe` returns an **async iterator**: an object that produces values over time, one for each event.

Events usually come from a **pub/sub** (publish and subscribe) system. One part of the code publishes an event under a name, and every subscription listening for that name receives it. The [`graphql-subscriptions`](https://github.com/apollographql/graphql-subscriptions) package has a simple one, `PubSub`.

For `claimStatusChanged`, the resolver could look like this:

<div data-toolbar-order="">

```ts
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Subscription: {
    claimStatusChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(["CLAIM_STATUS_CHANGED"]),
        // Only send the event to clients watching this claim
        (payload, args) => payload.claimStatusChanged.id === args.claimId,
      ),
    },
  },
};
```

</div>

- **`pubsub.asyncIterableIterator(["CLAIM_STATUS_CHANGED"])`** listens for events published as `CLAIM_STATUS_CHANGED`.
- **`withFilter`** checks each event before it's sent. Every client listens to the same events, so without it, a client watching `c4` would also get updates for every other claim.

The mutation that changes the data publishes the event. In `approveClaim`, after the claim is saved:

<div data-toolbar-order="">

```ts
pubsub.publish("CLAIM_STATUS_CHANGED", { claimStatusChanged: claim });
```

</div>

The payload is keyed by the subscription field's name, `claimStatusChanged`. GraphQL then resolves the fields the client asked for, like `claimNumber` and `status`, the same way it does for a query.

### Who can listen

The `withFilter` above checks which claim an event is about, not who is listening. As written, anyone who can reach the server can watch any claim. A subscription is one more way into the data, and the Authorization section's rule applies to it too: [check permissions on every way in](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#access-control).

Subscriptions need their own versions of the two checks from the Authorization section:

- **Who is this?** WebSocket messages don't carry an `Authorization` header. Instead, the client sends its token once, in `connectionParams`, when it connects. The server reads the token in the WebSocket server's own `context` function, which is separate from the one for queries and mutations. It can also refuse the connection in `onConnect`. [Apollo's documentation shows both](https://www.apollographql.com/docs/apollo-server/data/subscriptions#operation-context).
- **Can they see this?** Check when the client subscribes, and again for every event, using the same business logic layer as your queries:

<div data-toolbar-order="">

```ts
claimStatusChanged: {
  subscribe: withFilter(
    (_: unknown, args: { claimId: string }, contextValue: Context) => {
      // Throws if this user can't see the claim, so nothing is ever sent
      claimRepository.get(contextValue.user, args.claimId);
      return pubsub.asyncIterableIterator(["CLAIM_STATUS_CHANGED"]);
    },
    // Runs for every event
    (payload, args, contextValue: Context) =>
      payload.claimStatusChanged.id === args.claimId &&
      claimRepository.canView(contextValue.user, payload.claimStatusChanged),
  ),
},
```

</div>

Like `claimRepository.approve` in the Authorization section, `get` and `canView` stand for business logic the course API doesn't have.

The check on every event matters because the answer can change while the client listens. If agents weren't allowed to see denied claims, an agent watching an open claim shouldn't receive the update that denies it.

### Events in production

`PubSub` keeps its events in the server's memory. [Apollo's documentation](https://www.apollographql.com/docs/apollo-server/data/subscriptions#production-pubsub-libraries) warns that it isn't meant for production, because it only works within one copy of the server. If an adjuster's request reaches one copy, and the policyholder's subscription is connected to another, the policyholder never hears about it.

Production APIs publish events to a separate system that every copy of the server can listen to. Apollo lists libraries for Redis, Kafka, RabbitMQ, PostgreSQL, and others. With a system like Kafka, other services, like billing or notifications, can listen to the same events too.

Subscriptions also make scaling harder. Each subscribed client [stays connected to one server](https://graphql.org/learn/subscriptions/) for as long as it listens, instead of sending short requests that any server can answer. Load balancers, deploys, and connection limits all have to account for that.

## Next steps

Next, we'll look at performance and hosting: how to send smaller requests, watch how long operations take, and run the API in production.
