@page bitovian/kafka-state-farm-prep/queues-for-kafka Queues for Kafka
@parent bitovian/kafka-state-farm-prep 5
@outline 2

@description Learn how share groups let many consumers work through the same partitions like a queue, how they differ from consumer groups, and which Confluent products and clients support them.

@body

## Overview

In this section, we will:

- Learn the problem with consumer groups that share groups solve
- See how share groups hand out and acknowledge records
- Learn what you give up, and when to use which
- Find out which products and clients support share groups

Queues for Kafka adds a new way to read from a topic, called a **share group**. It was proposed in [KIP-932](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka). A KIP (Kafka Improvement Proposal) is the document the Kafka project uses to design and approve a change.

Share groups let a pool of consumers pull work from the same partitions at once, and acknowledge each record one at a time. That makes Kafka behave more like a traditional message queue, where each message is a job that any free worker can pick up.

## How it got here

- Apache Kafka 4.1.0, released September 4, 2025, shipped Queues for Kafka as a preview. The [announcement](https://kafka.apache.org/blog/2025/09/04/apache-kafka-4.1.0-release-announcement/) says it was "still not ready for production but you can start evaluating and testing it."
- Apache Kafka 4.2.0, released February 17, 2026, made it ready for real use. The [announcement](https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/) says "Kafka Queues (Share Groups) is now production-ready."

## The problem with consumer groups

In the [Consumers lesson](https://developer.confluent.io/courses/apache-kafka/consumers/) of Kafka 101, you saw that "Kafka assigns each partition to one consumer in the group—no two consumers in the same group read from the same partition."

That rule keeps records in order within each partition. It also means you can't have more busy consumers than partitions. KIP-932 puts it this way: it "does introduce coupling between the number of consumers in a consumer group and the number of partitions. Users of Kafka often have to "over-partition" simply to ensure they can have sufficient parallel consumption to cope with peak loads."

## How share groups work

[KIP-932](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka) says "The number of consumers in a share group can exceed the number of partitions in a topic." Several consumers can read from the same partition at once.

To stop two consumers from handling the same record, the broker hands records out with a lock. When a consumer fetches records, they are "acquired for delivery to this consumer with a time-limited acquisition lock." The lock lasts 30 seconds by default. If the consumer doesn't finish in time, the record becomes available to another consumer.

The consumer then acknowledges each record. In explicit mode, the [Confluent Platform share consumer docs](https://docs.confluent.io/platform/current/clients/share-consumers.html) list four acknowledgement types:

<table>
  <thead>
    <tr><th>Type</th><th>What it tells the broker</th></tr>
  </thead>
  <tbody>
    <tr><td>ACCEPT</td><td>The record was processed successfully.</td></tr>
    <tr><td>RELEASE</td><td>Make the record available for another delivery attempt.</td></tr>
    <tr><td>REJECT</td><td>The record can't be processed. Don't deliver it again.</td></tr>
    <tr><td>RENEW</td><td>Extend the lock, because processing is taking longer.</td></tr>
  </tbody>
</table>

RENEW arrived in Kafka 4.2 through [KIP-1222](https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/). In the default implicit mode, the docs say all delivered records "are implicitly marked as successfully processed and acknowledged when commitSync(), commitAsync(), or poll() is called."

The broker also keeps a **delivery count** for each record. This protects you from a "poison message", a record that crashes every consumer that tries it. From [KIP-932](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka): "If the delivery count has reached the cluster's share delivery attempt limit (5 by default), the record moves into Archived state and is not eligible for additional delivery attempts."

## What you give up

Ordering. [KIP-932](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka) says "Records in a share-partition can be delivered out of order to a consumer, in particular when redeliveries occur."

## When to use which

KIP-932 says a queue "is perfect for a situation in which messages are independent work items that can be processed concurrently by a pool of applications, and individually retried or acknowledged as processing completes."

<table>
  <thead>
    <tr><th></th><th>Consumer group</th><th>Share group</th></tr>
  </thead>
  <tbody>
    <tr><td>Consumers per partition</td><td>One</td><td>Many</td></tr>
    <tr><td>More consumers than partitions</td><td>Parallel work is capped by the partition count</td><td>Allowed</td></tr>
    <tr><td>Order within a partition</td><td>Kept</td><td>Not guaranteed</td></tr>
    <tr><td>Progress tracked by</td><td>Committed offsets</td><td>Acknowledging each record</td></tr>
    <tr><td>Good fit</td><td>Events whose order matters, like changes to one account</td><td>Independent jobs, like sending one email per record</td></tr>
  </tbody>
</table>

## Where you can use it

**Confluent Platform.** Confluent Platform 8.2 is "built on Apache Kafka 4.2" and its [launch post](https://www.confluent.io/blog/introducing-confluent-platform-8-2/) says "Queues for Kafka now in GA." The [share groups docs](https://docs.confluent.io/platform/current/config-manage/kafka-queues.html) say share groups "are enabled by default on Confluent Platform 8.3 clusters." On 8.2, an administrator turns them on with this command:

```shell
kafka-features.sh --bootstrap-server localhost:9092 upgrade --feature share.version=1
```

**Confluent Cloud.** The [Confluent Cloud docs](https://docs.confluent.io/cloud/current/client-apps/share-consumers.html) say "Share groups are available on only Dedicated and Enterprise clusters."

**Confluent Private Cloud.** The [Confluent Private Cloud release notes](https://docs.confluent.io/platform/current/private-cloud/cpc-release-notes.html) cover version 8.3.2 but don't mention share groups. Neither do the [Confluent Gateway docs](https://docs.confluent.io/private-cloud-gateway/current/overview.html). Check with the platform team before you plan around share groups behind the gateway.

## Client support

Today, plan on Java. The Confluent Platform docs say "Share groups are only available for the Kafka Java clients," through the `KafkaShareConsumer` class.

Other clients are catching up:

- [librdkafka v2.15.0](https://github.com/confluentinc/librdkafka/releases/tag/v2.15.0), the C/C++ Kafka library from Confluent, added a share consumer marked "Preview" that "should not be used in production environments."
- The [Confluent JavaScript client changelog](https://github.com/confluentinc/confluent-kafka-javascript/blob/master/CHANGELOG.md) for `@confluentinc/kafka-javascript` doesn't mention share groups yet. Don't assume a Node.js service can join a share group.

## Next steps

That's the last topic in the State Farm prep. To review, go back to the [overview](../kafka-state-farm-prep.html).
