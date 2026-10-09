@page learn-federated-graphql-and-kafka/publishing-events Publishing Events
@parent learn-federated-graphql-and-kafka 6
@outline 2

@description Publish an event every time a claim is filed or approved, using a transactional outbox, so no event is lost when Kafka is down.

@body

## Overview

In this section, we will:

- See how saving a change and then sending an event can lose the event
- Learn the transactional outbox, the common way to avoid that
- Publish `ClaimFiled` and `ClaimApproved` events from your mutations
- Follow an approved claim to the Billing team's payout
- Watch the outbox keep an event while Kafka is down

## Objective 1: Understand the outbox

### Two systems, no shared transaction

When a claim is approved, two things have to happen. The claim's status changes in your database, and the Billing team has to find out, so it can pay. Billing reads the `claim-events` topic, so your API needs to publish a `ClaimApproved` event there.

The obvious code saves the claim, then sends the event. That's called a **dual write**, and it can lose events. If Kafka is down, or the server stops between the two steps, the claim is approved and saved, but the event is never sent. Billing never pays.

Wrapping both in one transaction doesn't work either. Chris Richardson's pattern catalog explains that "it is not viable to use a traditional distributed transaction (2PC) that spans the database and the message broker" ([microservices.io](https://microservices.io/patterns/data/transactional-outbox.html)).

### The transactional outbox

The same page describes the usual fix, the **transactional outbox**: "The solution is for the service that sends the message to first store the message in the database as part of the transaction that updates the business entities. A separate process then sends the messages to the message broker."

The event is saved in the same write as the claim, so there's never one without the other. The separate process, often called a **relay**, publishes events from the outbox, and keeps trying until Kafka has them.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/dual-write-vs-outbox.svg" alt="With a dual write, approveClaim saves the claim, then sends the event; if Kafka is down or the server crashes in between, the claim is approved but Billing never pays. With an outbox, approveClaim saves the approved claim and a ClaimApproved event in one write to claims.json. The outbox relay checks every second, publishes each event to claim-events, and removes it once Kafka has it. If Kafka is down, the event waits in the outbox. Billing reads claim-events and records the payout." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">A dual write can lose the event. The outbox saves it with the claim.</figcaption>
</figure>

### The outbox in your Claims API

Your Claims API saves its data to **claims/claims.json**. It already has an outbox, and a relay that publishes from it. Nothing adds events yet.

<table>
   <tr>
      <th>File</th>
      <th>What it has</th>
   </tr>
   <tr>
      <td><strong>claims/src/data.ts</strong></td>
      <td>The <code>outbox</code> list. <code>saveClaims()</code> writes the claims and the outbox together, in one write, which is this API's version of one transaction.</td>
   </tr>
   <tr>
      <td><strong>claims/src/events.ts</strong></td>
      <td><code>claimEvent(type, claim)</code>, which builds a <code>ClaimFiled</code> or <code>ClaimApproved</code> event in the CloudEvents format, with a new, unique <code>id</code>.</td>
   </tr>
   <tr>
      <td><strong>claims/src/outbox-relay.ts</strong></td>
      <td>The relay. Every second, it sends the outbox's events to <code>claim-events</code>, keyed by claim id, and removes each one once Kafka has it. <strong>claims/src/index.ts</strong> starts it.</td>
   </tr>
</table>

With a real database, the outbox is a table, and the claim and its event are inserted in one database transaction.

## Objective 2: Publish claim events

### Exercise

✏️ Make your mutations publish events through the outbox:

<table>
   <tr>
      <th>Mutation</th>
      <th>Event</th>
   </tr>
   <tr>
      <td><code>fileClaim</code></td>
      <td><code>ClaimFiled</code>, for the new claim</td>
   </tr>
   <tr>
      <td><code>approveClaim</code></td>
      <td><code>ClaimApproved</code>, for the approved claim. Only when it's approved: not when it returns <code>ClaimNotOpen</code>.</td>
   </tr>
</table>

Add each event to the `outbox` before the `saveClaims()` call that saves the claim, so they're saved together. Change **claims/src/resolvers.ts**.

✏️ In the gateway explorer, approve claim `c4`:

```graphql
mutation {
  approveClaim(id: "c4") {
    ... on Claim {
      claimNumber
      status
    }
    ... on ClaimNotOpen {
      message
    }
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "approveClaim": { "claimNumber": "CLM-5004", "status": "APPROVED" }
  }
}
```

</div>

Within a second, your Claims API's terminal shows the relay publishing the event. Your event id will differ:

<div data-toolbar-order="">

```text
[outbox] Published ClaimApproved for claim c4 (event 25822fa3-...)
```

</div>

✏️ In a terminal, list the events in `claim-events`, one partition at a time. It takes a few seconds:

```shell
npm run claim-events
```

You should see your event, under its key, `c4` (trimmed for readability):

<div data-toolbar-order="">

```text
partition 0:
partition 1:
partition 2:
c4 {"specversion":"1.0","id":"25822fa3-...","source":"/claims","type":"ClaimApproved",...}
```

</div>

The partition it lands in may differ. Every later event for `c4` will land in the same one.

✏️ Check that Billing has read it:

```shell
npm run consumer-groups
```

The output (trimmed for readability) shows Billing's position in the partition that has the event:

<div data-toolbar-order="">

```text
GROUP     TOPIC          PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
billing   claim-events   2          1               1               0
```

</div>

`LAG` is `0`: Billing has read everything there is.

✏️ In the gateway explorer, ask for the claim's payout:

```graphql
{
  claim(id: "c4") {
    claimNumber
    status
    payout {
      amount
    }
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "claim": {
      "claimNumber": "CLM-5004",
      "status": "APPROVED",
      "payout": { "amount": 2200 }
    }
  }
}
```

</div>

Your API never called the Billing API. It published an event, and Billing reacted to it. Through the gateway, the payout still shows up on your claim.

✏️ Open the Claims Desk on port `3000`. `CLM-5004` is now `APPROVED`, and **Paid out** for `AUTO-100003` is `$3,175.25`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/resolvers.ts**, import `outbox` and `claimEvent`:

```ts
import { claims, outbox, saveClaims, type Claim, type ClaimStatus } from "./data.js";
import { claimEvent } from "./events.js";
```

✏️ In `fileClaim`, add the event after `claims.push(claim)`:

```ts
      claims.push(claim);
      // Saved in the same write as the claim, so there's never one without the other.
      outbox.push(claimEvent("ClaimFiled", claim));
      saveClaims();
      return claim;
```

✏️ In `approveClaim`, add the event after the status changes:

```ts
      claim.status = "APPROVED";
      outbox.push(claimEvent("ClaimApproved", claim));
      saveClaims();
```

</details>

## Objective 3: Keep events when Kafka is down

### Stop Kafka

✏️ In a terminal, stop Kafka:

```shell
docker compose stop kafka
```

✏️ In the gateway explorer, file a claim against the life policy:

```graphql
mutation {
  fileClaim(input: { policyId: "p4", amount: 300 }) {
    claimNumber
    status
  }
}
```

It works, even with Kafka down:

<div data-toolbar-order="">

```json
{
  "data": {
    "fileClaim": { "claimNumber": "CLM-5007", "status": "OPEN" }
  }
}
```

</div>

A few seconds later, your Claims API's terminal shows:

<div data-toolbar-order="">

```text
[outbox] Can't reach Kafka. 1 event(s) waiting in the outbox.
```

</div>

✏️ Open **claims/claims.json**, and find `outbox` near the end. It has your `ClaimFiled` event, saved with the claim (trimmed for readability):

<div data-toolbar-order="">

```json
"outbox": [
  {
    "specversion": "1.0",
    "id": "d1e74db1-...",
    "source": "/claims",
    "type": "ClaimFiled",
    "data": { "claimId": "c7", "policyId": "p4", "amount": 300 }
  }
]
```

</div>

With a dual write, this is where the event would have been lost.

### Start Kafka

✏️ Start Kafka again:

```shell
docker compose start kafka
```

Within about half a minute, once Kafka is ready, your Claims API's terminal shows:

<div data-toolbar-order="">

```text
[outbox] Published ClaimFiled for claim c7 (event d1e74db1-...)
```

</div>

✏️ Run `npm run claim-events` again. Both events are now in the topic.

### Delivered at least once

The relay removes an event only after Kafka has it. If the relay stops after Kafka accepts an event, but before it removes it from the outbox, it sends the event again when it restarts. The pattern catalog names this cost: "The Message relay might publish a message more than once... As a result, a message consumer must be idempotent." An **idempotent** consumer gets the same result when it handles an event twice as when it handles it once.

Billing is. It pays each claim once, even if `ClaimApproved` arrives twice. In the next section, you'll write a consumer of your own that has to be.

## Next steps

Next, we'll read events from another team: the Adjusting team's `AdjusterAssigned` events, which move a claim into review. Your consumer will need to handle the same event arriving twice.
