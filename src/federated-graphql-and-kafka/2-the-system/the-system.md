@page learn-federated-graphql-and-kafka/the-system The System
@parent learn-federated-graphql-and-kafka 2
@outline 2

@description See which team owns which API, the data each one starts with, and the events that travel through Kafka.

@body

## Who owns what

The insurance company has five teams. You're on the Claims team. The other teams' work is already running in the Codespace, and scripts play their parts, so you can do the whole course on your own.

<table>
   <tr>
      <th>Team</th>
      <th>What it runs</th>
      <th>What it owns</th>
   </tr>
   <tr>
      <td><strong>Policies</strong></td>
      <td>Policies API, port <code>4001</code></td>
      <td>Policyholders and policies. Only agents can issue a policy.</td>
   </tr>
   <tr>
      <td><strong>Billing</strong></td>
      <td>Billing API, port <code>4003</code></td>
      <td>Payouts for approved claims. It adds <code>payouts</code> and <code>totalPaidOut</code> to each policy.</td>
   </tr>
   <tr>
      <td><strong>Claims (you)</strong></td>
      <td>Claims API, port <code>4002</code></td>
      <td>Claims: filing them, approving them, and paging through them.</td>
   </tr>
   <tr>
      <td><strong>Adjusting</strong></td>
      <td>No API</td>
      <td>Assigns an adjuster to each claim, and announces it with an event.</td>
   </tr>
   <tr>
      <td><strong>App</strong></td>
      <td>Claims Desk, port <code>3000</code></td>
      <td>The web app staff use. It reads everything through the gateway.</td>
   </tr>
</table>

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/course-system.svg" alt="The Claims Desk app and the traffic script send every query to Hive Gateway, which asks the Policies, Claims, and Billing APIs for their parts. Your Claims API publishes to the claim-events topic, which Billing reads, and reads the adjuster-events topic, which the Adjusting team's script writes to." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Where you're headed. Right now, your Claims API isn't connected to the gateway or to Kafka.</figcaption>
</figure>

Each team decides how its own API changes, and deploys it on its own schedule. That's the reason to split one API into several. It's also why the rest of this course is about working with code you can't edit.

## The data

Each API keeps its own data. No API can read another's directly.

**Policies API.** Three policyholders and five policies:

<table>
   <tr>
      <th><code>id</code></th>
      <th>Policy</th>
      <th>Policyholder</th>
   </tr>
   <tr><td><code>p1</code></td><td>AUTO-100001</td><td>Maria Alvarez (<code>ph1</code>)</td></tr>
   <tr><td><code>p2</code></td><td>HOME-100002</td><td>Maria Alvarez (<code>ph1</code>)</td></tr>
   <tr><td><code>p3</code></td><td>AUTO-100003</td><td>James Okafor (<code>ph2</code>)</td></tr>
   <tr><td><code>p4</code></td><td>LIFE-100004</td><td>Priya Raman (<code>ph3</code>)</td></tr>
   <tr><td><code>p5</code></td><td>RENTERS-100005</td><td>Priya Raman (<code>ph3</code>)</td></tr>
</table>

**Your Claims API.** Six claims. Each one stores the `policyId` of the policy it's against, but not the policy itself:

<table>
   <tr>
      <th><code>id</code></th>
      <th>Claim</th>
      <th>Amount</th>
      <th>Status</th>
      <th><code>policyId</code></th>
   </tr>
   <tr><td><code>c1</code></td><td>CLM-5001</td><td>$1,250.00</td><td><code>APPROVED</code></td><td><code>p1</code></td></tr>
   <tr><td><code>c2</code></td><td>CLM-5002</td><td>$430.50</td><td><code>DENIED</code></td><td><code>p1</code></td></tr>
   <tr><td><code>c3</code></td><td>CLM-5003</td><td>$3,800.00</td><td><code>APPROVED</code></td><td><code>p2</code></td></tr>
   <tr><td><code>c4</code></td><td>CLM-5004</td><td>$2,200.00</td><td><code>OPEN</code></td><td><code>p3</code></td></tr>
   <tr><td><code>c5</code></td><td>CLM-5005</td><td>$975.25</td><td><code>APPROVED</code></td><td><code>p3</code></td></tr>
   <tr><td><code>c6</code></td><td>CLM-5006</td><td>$640.00</td><td><code>OPEN</code></td><td><code>p5</code></td></tr>
</table>

**Billing API.** One payout for each approved claim:

<table>
   <tr>
      <th><code>id</code></th>
      <th>Claim</th>
      <th>Policy</th>
      <th>Amount</th>
   </tr>
   <tr><td><code>pay1</code></td><td><code>c1</code></td><td><code>p1</code></td><td>$1,250.00</td></tr>
   <tr><td><code>pay2</code></td><td><code>c3</code></td><td><code>p2</code></td><td>$3,800.00</td></tr>
   <tr><td><code>pay3</code></td><td><code>c5</code></td><td><code>p3</code></td><td>$975.25</td></tr>
</table>

✏️ In the gateway explorer (the **Gateway** port, `4000`), run this query. It starts in the Policies API and ends in the Billing API:

```graphql
{
  policyholders {
    name
    policies {
      policyNumber
      totalPaidOut
    }
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "policyholders": [
      {
        "name": "Maria Alvarez",
        "policies": [
          {
            "policyNumber": "AUTO-100001",
            "totalPaidOut": 1250
          },
          {
            "policyNumber": "HOME-100002",
            "totalPaidOut": 3800
          }
        ]
      },
      {
        "name": "James Okafor",
        "policies": [
          {
            "policyNumber": "AUTO-100003",
            "totalPaidOut": 975.25
          }
        ]
      },
      {
        "name": "Priya Raman",
        "policies": [
          {
            "policyNumber": "LIFE-100004",
            "totalPaidOut": 0
          },
          {
            "policyNumber": "RENTERS-100005",
            "totalPaidOut": 0
          }
        ]
      }
    ]
  }
}
```

</div>

## The events

Two Kafka topics connect the teams:

<table>
   <tr>
      <th>Topic</th>
      <th>Who writes to it</th>
      <th>Who reads it</th>
      <th>Events</th>
   </tr>
   <tr>
      <td><code>claim-events</code></td>
      <td>Your Claims API, starting in Publishing Events</td>
      <td>Billing, and your Claims API's live updates, starting in Live Updates</td>
      <td><code>ClaimFiled</code>, <code>ClaimApproved</code>, and <code>ClaimStatusChanged</code> from Live Updates</td>
   </tr>
   <tr>
      <td><code>adjuster-events</code></td>
      <td>The Adjusting team</td>
      <td>Your Claims API, starting in Consuming Events</td>
      <td><code>AdjusterAssigned</code></td>
   </tr>
</table>

Every event uses the [CloudEvents](https://cloudevents.io/) format, a common shape for events that the Cloud Native Computing Foundation maintains. Each event has an `id`, a `source` saying which team sent it, a `type`, and a `time`. The event's own details go in `data`. Here's the `ClaimApproved` event Billing waits for:

<div data-toolbar-order="">

```json
{
  "specversion": "1.0",
  "id": "8d2f4a6e-3c1b-4f0a-9e7d-2b5c6a1f9e30",
  "source": "/claims",
  "type": "ClaimApproved",
  "time": "2026-10-08T14:00:00Z",
  "data": {
    "claimId": "c4",
    "policyId": "p3",
    "amount": 2200
  }
}
```

</div>

Each event's key is the claim's id. Kafka sends events with the same key to the same partition, so all the events for one claim stay in order, as you saw in the [Partitions lesson](https://developer.confluent.io/courses/apache-kafka/partitions/) of Apache Kafka 101.

The course runs a single Kafka broker, so each partition has one copy: a replication factor of 1. A real cluster has several brokers and copies each partition to more than one of them, like the replication factor of three in the [Replication lesson](https://developer.confluent.io/courses/apache-kafka/replication/). Nothing in this course depends on that difference.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/kafka-topics-and-partitions.svg" alt="One Kafka broker holds two topics, claim-events and adjuster-events, each with three partitions, P0 to P2. In the example, both events for claim c4 land in partition P1 of claim-events, in order. Your Claims API writes to claim-events, and the billing consumer group reads all three of its partitions. The Adjusting team writes to adjuster-events, and your Claims API will read it as the claims consumer group. Each partition has one copy." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">How events spread across the course's topics, once they start flowing. Both topics are empty right now.</figcaption>
</figure>

✏️ In your third terminal, list the course's topics:

```shell
npm run topics
```

You should see:

<div data-toolbar-order="">

```text
adjuster-events
claim-events
```

</div>

✏️ See who's reading them:

```shell
npm run consumer-groups
```

The output (trimmed for readability) is:

<div data-toolbar-order="">

```text
GROUP     TOPIC          PARTITION  LOG-END-OFFSET
billing   claim-events   0          0
billing   claim-events   1          0
billing   claim-events   2          0
```

</div>

Billing is already reading all three partitions of `claim-events`. `LOG-END-OFFSET` is `0` because nothing has been written yet. Billing will record a payout as soon as your API publishes its first `ClaimApproved` event.

## Next steps

Next, we'll connect your Claims API to the gateway, so apps can query claims alongside policies and payouts.
