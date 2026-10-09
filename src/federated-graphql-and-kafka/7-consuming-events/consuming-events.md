@page learn-federated-graphql-and-kafka/consuming-events Consuming Events
@parent learn-federated-graphql-and-kafka 7
@outline 2

@description Read the Adjusting team's events to move claims into review, handle the same event arriving twice, and see why reads can lag behind writes.

@body

## Overview

In this section, we will:

- Learn how consumer groups, offsets, and keys decide which events your API reads, and in what order
- Read the Adjusting team's `AdjusterAssigned` events, and move claims into review
- See what happens when the same event arrives twice, and make your consumer handle it once
- See a read that lags behind a write, and why

## Objective 1: Understand consuming events

### A request from the Adjusting team

When a claim is filed, the Adjusting team assigns an adjuster to look into it. They announce each assignment with an `AdjusterAssigned` event on the `adjuster-events` topic, keyed by claim id:

<div data-toolbar-order="">

```json
{
  "specversion": "1.0",
  "id": "4a30198f-d8c7-494b-a31a-1cba4e09a447",
  "source": "/adjusting",
  "type": "AdjusterAssigned",
  "time": "2026-10-09T18:45:03.103Z",
  "data": { "claimId": "c6", "adjuster": "Dana Kim" }
}
```

</div>

They'd like your API to show that a claim is being reviewed, and who's reviewing it. Your API will read their events, without calling the Adjusting team or being called by them.

### Consumer groups, offsets, and keys

You met these in Apache Kafka 101's [Consumers lesson](https://developer.confluent.io/courses/apache-kafka/consumers/). Here's how they apply to your API:

- **Each consumer group reads every event.** Billing reads `claim-events` as the `billing` group. Your API will read `adjuster-events` as the `claims` group. Groups don't affect each other: another team could read `adjuster-events` too, with a group of its own.
- **Within a group, each partition goes to one member.** The lesson puts it this way: "Kafka assigns each partition to one consumer in the group—no two consumers in the same group read from the same partition." If you ran three copies of your API, the three partitions would be split between them.
- **A group remembers its place.** After it handles events, a group commits its **offset** in each partition, so it picks up where it left off after a restart. The first time a group starts, it can begin from the oldest event or only read new ones.
- **One claim's events stay in order.** Every event for `c6` has the key `c6`, so they all land in one partition, and your API reads them in the order they were written.

Every time you save your code, your Claims API restarts. Its consumer leaves the group and joins again, and events wait in Kafka until it's back.

### The starter consumer

**claims/src/adjuster-consumer.ts** already connects to Kafka as the `claims` group, and passes each `AdjusterAssigned` event to `handleAdjusterAssigned`. For now, that function only logs the event. Nothing starts the consumer yet.

The Billing team's consumer works the same way. Here's the part that reads `claim-events`:

<div data-toolbar-order="">

```ts
const consumer = kafka.consumer({ kafkaJS: { groupId: "billing", fromBeginning: true } });

await consumer.connect();
await consumer.subscribe({ topics: ["claim-events"] });
await consumer.run({
  eachMessage: async ({ message }) => {
    if (!message.value) return;
    handleClaimEvent(JSON.parse(message.value.toString()));
  },
});
```

</div>

`eachMessage` runs once for each event, in order within each partition. The group commits offsets as events are handled. `handleClaimEvent` records a payout for each `ClaimApproved` event.

## Objective 2: Move claims into review

### Exercise

✏️ Show which adjusters are assigned to each claim, and move a claim into review when its first adjuster is assigned. Add these to your schema:

<table>
   <tr>
      <th>Schema change</th>
      <th>What it holds</th>
   </tr>
   <tr>
      <td><code>IN_REVIEW</code>, a new <code>ClaimStatus</code> value</td>
      <td>A claim that an adjuster is reviewing</td>
   </tr>
   <tr>
      <td><code>AdjusterAssignment</code>, a new type</td>
      <td><code>adjuster: String!</code>, and <code>assignedAt: String!</code>, the event's <code>time</code></td>
   </tr>
   <tr>
      <td><code>Claim.assignments</code></td>
      <td>A <code>[AdjusterAssignment!]!</code> of the claim's assignments, oldest first</td>
   </tr>
</table>

Then make your API use them:

- **claims/src/index.ts**: start the consumer, by calling `startAdjusterConsumer()` from **adjuster-consumer.ts**.
- **claims/src/adjuster-consumer.ts**: in `handleAdjusterAssigned`, find the event's claim. If it's `OPEN`, change it to `IN_REVIEW`. Add the assignment to its `assignments`, and save. **claims/src/data.ts** already has an `assignments` property on `Claim`.
- **claims/src/resolvers.ts**: return an empty list for claims that have no `assignments` yet. And let `approveClaim` approve a claim that's `IN_REVIEW`, not only `OPEN`.

When you save, your Claims API's terminal should show:

<div data-toolbar-order="">

```text
[adjusting] Reading adjuster-events as the claims consumer group
```

</div>

✏️ In your third terminal, assign an adjuster to claim `c6`, as the Adjusting team:

```shell
npm run adjuster:assign -- c6
```

You should see the event it sent. Your event id will differ:

<div data-toolbar-order="">

```text
Assigned Dana Kim to claim c6 (event 4a30198f-...)
```

</div>

Your Claims API's terminal shows it arriving:

<div data-toolbar-order="">

```text
[adjusting] Dana Kim assigned to claim c6 (event 4a30198f-...)
```

</div>

✏️ In the gateway explorer, run:

```graphql
{
  claim(id: "c6") {
    claimNumber
    status
    assignments {
      adjuster
      assignedAt
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
      "claimNumber": "CLM-5006",
      "status": "IN_REVIEW",
      "assignments": [
        { "adjuster": "Dana Kim", "assignedAt": "2026-10-09T18:45:03.103Z" }
      ]
    }
  }
}
```

</div>

✏️ Open the Claims Desk on port `3000`. `CLM-5006` is now `IN_REVIEW`.

✏️ Check your group's place in the topic:

```shell
npm run consumer-groups
```

The output (trimmed for readability) now has your `claims` group, next to Billing's. `LAG` is `0` in the partition with `c6`'s event:

<div data-toolbar-order="">

```text
GROUP    TOPIC            PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
claims   adjuster-events  1          1               1               0
```

</div>

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, add `IN_REVIEW` to `ClaimStatus`:

```graphql
enum ClaimStatus {
  OPEN
  IN_REVIEW
  APPROVED
  DENIED
}
```

✏️ Add the field to `Claim`, and the new type:

```graphql
  "Adjusters assigned to this claim, oldest first"
  assignments: [AdjusterAssignment!]!
}

"An adjuster assigned to a claim by the Adjusting team"
type AdjusterAssignment {
  adjuster: String!
  "When the adjuster was assigned (an ISO 8601 timestamp)"
  assignedAt: String!
}
```

✏️ In **claims/src/index.ts**, import the consumer, and start it at the end of the file:

```ts
import { startAdjusterConsumer } from "./adjuster-consumer.js";
```

```ts
// Reads the Adjusting team's events.
startAdjusterConsumer();
```

✏️ In **claims/src/adjuster-consumer.ts**, import the data:

```ts
import { claims, saveClaims } from "./data.js";
```

✏️ Replace `handleAdjusterAssigned`:

```ts
export function handleAdjusterAssigned(event: AdjusterAssignedEvent) {
  const claim = claims.find((c) => c.id === event.data.claimId);
  if (claim) {
    if (claim.status === "OPEN") claim.status = "IN_REVIEW";
    claim.assignments = [
      ...(claim.assignments ?? []),
      { adjuster: event.data.adjuster, assignedAt: event.time },
    ];
    saveClaims();
  }
  console.log(`[adjusting] ${event.data.adjuster} assigned to claim ${event.data.claimId} (event ${event.id})`);
}
```

✏️ In **claims/src/resolvers.ts**, add a resolver to the `Claim` entry:

```ts
    assignments: (claim: Claim) => claim.assignments ?? [],
```

✏️ In `approveClaim`, let a claim in review be approved:

```ts
      if (claim.status !== "OPEN" && claim.status !== "IN_REVIEW") {
```

</details>

## Objective 3: Handle the same event twice

### Duplicates happen

Kafka delivers events **at least once**. You've seen one cause already: the outbox relay can send an event again after a restart. A consumer can also receive an event again after a rebalance, or when another team replays a topic to fix a bug.

✏️ Replay the Adjusting team's events for `c6`. This sends the same event again, with the same id:

```shell
npm run adjuster:replay -- c6
```

✏️ In the gateway explorer, look at `c6`'s assignments again:

```graphql
{
  claim(id: "c6") {
    assignments {
      adjuster
    }
  }
}
```

Dana Kim is assigned twice, from one event:

<div data-toolbar-order="">

```json
{
  "data": {
    "claim": {
      "assignments": [{ "adjuster": "Dana Kim" }, { "adjuster": "Dana Kim" }]
    }
  }
}
```

</div>

### Idempotent consumers

A consumer that handles a duplicate without changing anything is **idempotent**. Confluent's [Idempotent Reader pattern](https://developer.confluent.io/patterns/event-processing/idempotent-reader/) asks: "How can an application deal with duplicate Events when reading from an Event Stream?" One of its answers fits here: "The consumer can then read the tracking ID, cross-reference it against an internal state store of IDs it has already processed, and discard the event if necessary."

Every CloudEvent has an `id`, so that's your tracking id. **claims/src/data.ts** has a `processedEventIds` list, which `saveClaims()` saves with the claims. Saving the id in the same write as the change means a restart can't leave a claim changed but its event unrecorded.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/idempotent-consumer.svg" alt="The same AdjusterAssigned event, id 4a30..., is delivered twice. Without a check, both copies are handled, and claim c6 has Dana Kim assigned twice. With a check, the consumer records each event id it handles in the same save as the claim; the second copy's id is already recorded, so it's skipped, and c6 has one assignment." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Recording each event's id makes the second copy harmless.</figcaption>
</figure>

### Exercise

✏️ Make `handleAdjusterAssigned` idempotent. If an event's id is already in `processedEventIds`, skip it, and log that you did. Otherwise, handle it, and add its id to `processedEventIds` before saving. Change **claims/src/adjuster-consumer.ts**.

✏️ Assign an adjuster to claim `c7`, the claim you filed in the Entities section:

```shell
npm run adjuster:assign -- c7
```

You should see:

<div data-toolbar-order="">

```text
Assigned Luis Ortega to claim c7 (event 6e4b58c6-...)
```

</div>

✏️ Replay it:

```shell
npm run adjuster:replay -- c7
```

Your Claims API's terminal shows the first copy handled, and the second skipped:

<div data-toolbar-order="">

```text
[adjusting] Luis Ortega assigned to claim c7 (event 6e4b58c6-...)
[adjusting] Skipped event 6e4b58c6-...: already handled
```

</div>

✏️ In the gateway explorer, check `c7`:

```graphql
{
  claim(id: "c7") {
    claimNumber
    status
    assignments {
      adjuster
    }
  }
}
```

You should see one assignment:

<div data-toolbar-order="">

```json
{
  "data": {
    "claim": {
      "claimNumber": "CLM-5007",
      "status": "IN_REVIEW",
      "assignments": [{ "adjuster": "Luis Ortega" }]
    }
  }
}
```

</div>

`c6` still has its duplicate. Your fix stops new ones, but it can't tell which earlier changes were duplicates, because their ids were never recorded. That's why a consumer should be idempotent from the first event it reads.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/adjuster-consumer.ts**, import `processedEventIds` too:

```ts
import { claims, processedEventIds, saveClaims } from "./data.js";
```

✏️ Update `handleAdjusterAssigned`:

```ts
export function handleAdjusterAssigned(event: AdjusterAssignedEvent) {
  // Kafka can deliver an event more than once. Handle each event id only once.
  if (processedEventIds.includes(event.id)) {
    console.log(`[adjusting] Skipped event ${event.id}: already handled`);
    return;
  }
  const claim = claims.find((c) => c.id === event.data.claimId);
  if (claim) {
    if (claim.status === "OPEN") claim.status = "IN_REVIEW";
    claim.assignments = [
      ...(claim.assignments ?? []),
      { adjuster: event.data.adjuster, assignedAt: event.time },
    ];
  }
  // Saved in the same write as the claim, so a restart can't handle the event twice.
  processedEventIds.push(event.id);
  saveClaims();
  console.log(`[adjusting] ${event.data.adjuster} assigned to claim ${event.data.claimId} (event ${event.id})`);
}
```

</details>

## Objective 4: Reads that lag behind writes

### See it happen

✏️ In the gateway explorer, approve claim `c7`, and ask for its payout in the same mutation:

```graphql
mutation {
  approveClaim(id: "c7") {
    ... on Claim {
      claimNumber
      status
      payout {
        amount
      }
    }
  }
}
```

The claim is approved, but it has no payout yet:

<div data-toolbar-order="">

```json
{
  "data": {
    "approveClaim": {
      "claimNumber": "CLM-5007",
      "status": "APPROVED",
      "payout": null
    }
  }
}
```

</div>

✏️ A couple of seconds later, ask again:

```graphql
{
  claim(id: "c7") {
    status
    payout {
      amount
    }
  }
}
```

Now Billing has read the `ClaimApproved` event and recorded the payout:

<div data-toolbar-order="">

```json
{
  "data": {
    "claim": {
      "status": "APPROVED",
      "payout": { "amount": 820 }
    }
  }
}
```

</div>

### Eventual consistency

Between the two queries, the outbox relay published the event, and Billing read it. Until then, the two teams' data disagreed. This is the main cost of keeping data in sync with events. The CQRS pattern on [microservices.io](https://microservices.io/patterns/data/cqrs.html) lists it as a drawback: "Replication lag/eventually consistent views."

Apps handle it in a few ways:

- **Show what the mutation knows.** The Claims Desk can show "Approved, payout pending" until a payout appears.
- **Ask again, or listen.** The app can query again after a moment, or get told when the data changes. That's the next section.
- **Don't hide the delay.** For data that isn't urgent, telling users "this can take a minute" is often enough.

## Next steps

Next, we'll push claim status changes to the Claims Desk as they happen, with a subscription that Kafka events feed through the gateway.
