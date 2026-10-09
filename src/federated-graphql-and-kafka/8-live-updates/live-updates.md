@page learn-federated-graphql-and-kafka/live-updates Live Updates
@parent learn-federated-graphql-and-kafka 8
@outline 2

@description Push claim status changes to the Claims Desk as they happen, with a subscription that Kafka events feed through the gateway.

@body

## Overview

In this section, we will:

- Decide when a subscription is worth it, instead of polling
- Feed a subscription from Kafka, so it works with more than one copy of your API
- Add a `claimStatusChanged` subscription, and watch it through the gateway
- See the Claims Desk update live, while traffic flows through the whole system

## Objective 1: Understand live updates across servers

### Poll first

The Claims Desk already stays up to date: it asks the gateway again every 5 seconds. That's often the right choice. Apollo's [subscriptions guide](https://www.apollographql.com/docs/react/data/subscriptions) says: "In the majority of cases, your client should *not* use subscriptions to stay up to date with your backend. Instead, you should poll intermittently with queries, or re-execute queries on demand when a user performs a relevant action."

It names two cases where subscriptions help: small changes to large objects, and "low-latency, real-time updates". Staff waiting on a claim's status is the second one. They want to see it change the moment it does.

### One copy, or many

A subscription keeps a connection open to one copy of your API. The GraphQL documentation on [subscriptions](https://graphql.org/learn/subscriptions/) points out the cost: "each subscribed client must be bound to a specific instance of the server."

That's a problem when you run more than one copy. If an adjuster's `approveClaim` reaches copy A, but the Claims Desk's subscription is connected to copy B, copy B has to hear about the change somehow. Apollo's [subscriptions documentation](https://www.apollographql.com/docs/apollo-server/data/subscriptions) warns that its `PubSub` class "is **not** recommended for production environments, because it's an in-memory event system that only supports a single server instance."

Your API already publishes events to a system every copy can reach: Kafka. So each copy can read `claim-events` itself, and use `PubSub` only to pass an event to the subscribers connected to that copy.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/live-updates-flow.svg" alt="approveClaim saves a ClaimStatusChanged event in the outbox, and the relay publishes it to claim-events. Every copy of the Claims API reads claim-events with a consumer group of its own, so both copies get the event. Each copy passes it to its own PubSub, which sends it to the subscribers connected to that copy, through the gateway: the Claims Desk over a WebSocket, and npm run watch-claims over Server-Sent Events." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Kafka gets the event to every copy. PubSub only fans it out inside one copy.</figcaption>
</figure>

**claims/src/live-updates.ts** does the Kafka part for you:

- It reads `claim-events` with a consumer group of its own, `claims-live-` plus a random id, so each copy gets every event. The `claims` group from Consuming Events works the other way: if you ran several copies, they'd share it, and each event would go to only one of them.
- It only reads new events, and never commits an offset. When a copy stops, its group disappears.
- For each `ClaimStatusChanged` event, it publishes the claim to `pubsub` with the trigger name `CLAIM_STATUS_CHANGED`.

Nothing publishes `ClaimStatusChanged` events yet, and nothing starts it.

### Writing a subscription resolver

A subscription resolver returns a `subscribe` function, which listens on `pubsub` for a trigger name. A subscription that told clients about every claim filed, for example, would look like this:

<div data-toolbar-order="">

```ts
Subscription: {
  claimFiled: {
    subscribe: () => pubsub.asyncIterableIterator(["CLAIM_FILED"]),
  },
},
```

</div>

To send a client only some events, wrap `subscribe` in `withFilter`, from `graphql-subscriptions`. It takes the `subscribe` function and a filter. The filter receives each event's payload and the subscription's arguments, and returns `true` to send the event. Apollo's documentation describes it this way: "Use `withFilter` to make sure clients get exactly the subscription updates they want (and are allowed to receive)." That's also where you'd check that a user may see the claim, on every event.

## Objective 2: Add the subscription

### Exercise

✏️ Push claim status changes to clients:

<table>
   <tr>
      <th>Change</th>
      <th>Where</th>
   </tr>
   <tr>
      <td>A <code>Subscription</code> type with <code>claimStatusChanged(claimId: ID): Claim!</code>. With a <code>claimId</code>, a client hears only about that claim. Without one, it hears about every claim.</td>
      <td><strong>claims/src/schema.graphql</strong></td>
   </tr>
   <tr>
      <td>A resolver for it, which listens for <code>CLAIM_STATUS_CHANGED</code> on <code>pubsub</code> from <strong>live-updates.ts</strong>, filtered by <code>claimId</code></td>
      <td><strong>claims/src/resolvers.ts</strong></td>
   </tr>
   <tr>
      <td>A <code>ClaimStatusChanged</code> event in the outbox wherever a claim's status changes: when it's approved, and when it moves into review</td>
      <td><strong>claims/src/resolvers.ts</strong> and <strong>claims/src/adjuster-consumer.ts</strong></td>
   </tr>
   <tr>
      <td>Start the live updates, by calling <code>startLiveUpdates()</code></td>
      <td><strong>claims/src/index.ts</strong></td>
   </tr>
</table>

`claimEvent("ClaimStatusChanged", claim)` builds the event, the same way as `ClaimApproved`.

When you save, your Claims API's terminal should show:

<div data-toolbar-order="">

```text
[live] Reading claim-events for live updates
```

</div>

And the `npm start` terminal should show `[compose] ✔ Composition successful`.

✏️ In your third terminal, watch every claim's status through the gateway:

```shell
npm run watch-claims
```

It runs your subscription through the gateway, using Server-Sent Events: one HTTP request that the gateway keeps open. You should see:

<div data-toolbar-order="">

```text
Watching every claim. Press Ctrl+C to stop.
```

</div>

Leave it running.

✏️ In the gateway explorer, approve claim `c8`, the claim you filed in Publishing Events:

```graphql
mutation {
  approveClaim(id: "c8") {
    ... on Claim {
      claimNumber
      status
    }
  }
}
```

Within a second or two, the third terminal shows the change:

<div data-toolbar-order="">

```text
CLM-5008 is now APPROVED (policy LIFE-100004)
```

</div>

The event went from your outbox, through Kafka, to your live consumer, to `pubsub`, and out through the gateway. The gateway filled in `policyNumber` from the Policies subgraph, the same way it does for a query.

✏️ Open the Claims Desk on port `3000`. The labels at the top now include **Live updates: on**. When the Desk sees `claimStatusChanged` in the gateway's schema, it subscribes over a WebSocket. Every status change now reaches it right away, not on its next 5-second refresh.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, add the `Subscription` type:

```graphql
type Subscription {
  "A claim's status changed. Leave out claimId to hear about every claim."
  claimStatusChanged(claimId: ID): Claim!
}
```

✏️ In **claims/src/resolvers.ts**, import `withFilter` and `pubsub`:

```ts
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "./live-updates.js";
```

✏️ Add a `Subscription` entry to `resolvers`:

```ts
  Subscription: {
    claimStatusChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(["CLAIM_STATUS_CHANGED"]),
        // Only send a client the claims it asked about.
        (payload?: { claimStatusChanged: Claim }, args?: { claimId?: string }) =>
          !args?.claimId || payload?.claimStatusChanged.id === args.claimId,
      ),
    },
  },
```

✏️ In `approveClaim`, add a second event:

```ts
      claim.status = "APPROVED";
      outbox.push(claimEvent("ClaimApproved", claim));
      outbox.push(claimEvent("ClaimStatusChanged", claim));
```

✏️ In **claims/src/adjuster-consumer.ts**, import `outbox` and `claimEvent`:

```ts
import { claims, outbox, processedEventIds, saveClaims } from "./data.js";
import { claimEvent } from "./events.js";
```

✏️ In `handleAdjusterAssigned`, add the event when the claim moves into review:

```ts
    if (claim.status === "OPEN") {
      claim.status = "IN_REVIEW";
      outbox.push(claimEvent("ClaimStatusChanged", claim));
    }
```

✏️ In **claims/src/index.ts**, import `startLiveUpdates`, and call it at the end of the file:

```ts
import { startLiveUpdates } from "./live-updates.js";
```

```ts
// Feeds the claimStatusChanged subscription from claim-events.
startLiveUpdates();
```

</details>

## Objective 3: Watch the whole system

✏️ In your third terminal, stop `watch-claims` with Ctrl+C. Then start the rest of the company:

```shell
npm run traffic
```

Every few seconds, it files a claim, has the Adjusting team assign an adjuster to an open claim, or approves a claim that's in review, through the gateway like any other app. You'll see lines like these:

<div data-toolbar-order="">

```text
Sending traffic to http://localhost:4000/graphql. Press Ctrl+C to stop.
Filed CLM-5009 for $309
Adjusting assigned Dana Kim to CLM-5009
Approved CLM-5009
```

</div>

✏️ Watch the Claims Desk on port `3000`, and your Claims API's terminal, for a minute:

- New claims appear under their policies as `OPEN`.
- Each assignment moves a claim to `IN_REVIEW`, and the Desk highlights it as it changes.
- Each approval changes it to `APPROVED`, and a moment later, Billing's payout raises the policy's **Paid out**.

Everything you built is in that loop: the gateway combining three teams' subgraphs, entities linking claims and policies, the outbox publishing your events, your consumer reading the Adjusting team's, and the subscription pushing the result to the app.

✏️ Stop the traffic with Ctrl+C when you're done.

### When the connection drops

A subscription only delivers events that happen while it's connected. If the Claims Desk loses its connection, it misses the changes in between. That's why the Desk keeps its 5-second refresh: it gets the current state from a query, and the subscription only makes changes show up sooner. Apps that rely on subscriptions do the same: when they reconnect, they query the current state first, then subscribe again.

## Next steps

Next, we'll wrap up: what you built, and where federation and Kafka go from here.
