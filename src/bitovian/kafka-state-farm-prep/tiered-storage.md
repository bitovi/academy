@page bitovian/kafka-state-farm-prep/tiered-storage Tiered Storage
@parent bitovian/kafka-state-farm-prep 4
@outline 2

@description Learn how Kafka Tiered Storage moves older data off broker disks into remote storage, how retention works on each tier, what it needs, and how Confluent's own Tiered Storage differs.

@body

## Overview

In this section, we will:

- Learn how Tiered Storage splits a topic's data between broker disks and remote storage
- See how reads and retention work on each tier
- Learn what it takes to turn on, and its limits
- Compare it with Confluent's Tiered Storage

In the [Brokers](https://developer.confluent.io/courses/apache-kafka/brokers/) lesson of Apache Kafka 101, you saw that each broker stores partitions on its own disks. The lesson calls this "tightly coupled storage right next to the processor, usually SSDs."

Tiered Storage changes that. The [Kafka docs](https://kafka.apache.org/43/operations/tiered-storage/) describe a cluster "configured with two tiers of storage - local and remote":

- The **local tier** is the broker's own disks, the same storage Kafka has always used.
- The **remote tier** is an outside storage system, "such as HDFS or S3," that holds "the completed log segments." HDFS is Hadoop's distributed file system, and S3 is Amazon's object storage.

A **log segment** is one of the files a partition's data is split into on disk. Kafka writes new events to the newest segment. When that segment is full, Kafka closes it ("rolls" it) and starts a new one. [KIP-405](https://cwiki.apache.org/confluence/display/KAFKA/KIP-405%3A+Kafka+Tiered+Storage) says "When a log segment is rolled on the local tier, it is copied to the remote tier along with the corresponding indexes."

The feature was proposed in [KIP-405](https://cwiki.apache.org/confluence/display/KAFKA/KIP-405%3A+Kafka+Tiered+Storage). A KIP (Kafka Improvement Proposal) is the design document the Kafka project writes and votes on before adding a major feature. The [3.9 release announcement](https://kafka.apache.org/blog/2024/11/06/apache-kafka-3.9.0-release-announcement/) says it has been "under development since Kafka 3.6" and is "now production-ready in Kafka 3.9."

## Why it exists

[KIP-405](https://cwiki.apache.org/confluence/display/KAFKA/KIP-405%3A+Kafka+Tiered+Storage) gives these problems with keeping everything on broker disks:

- Keeping data longer means buying more broker disk. Adding brokers for disk also adds "needless memory and CPUs to the cluster."
- When a broker fails, its replacement must copy its data from other replicas. "The time for recovery and rebalancing is proportional to the amount of data stored locally on a Kafka broker."
- In the cloud, servers with large local disks "are either unavailable or they are very expensive."

Its stated goal is to "extend Kafka's storage beyond the local storage available on the Kafka cluster by retaining the older data in an external store."

## How reads work

The [Kafka docs](https://kafka.apache.org/43/operations/tiered-storage/) point out that most consumers read the newest events, which Kafka serves from memory. Older data is read "for backfill or failure recovery purposes and is infrequent."

[KIP-405](https://cwiki.apache.org/confluence/display/KAFKA/KIP-405%3A+Kafka+Tiered+Storage) splits reads the same way. Consumers keeping up with new events are "served from local tier." Consumers that need "data older than what is in the local tier are served from the remote tier."

Consumers still talk only to brokers. The KIP considered letting clients read remote storage directly and rejected it, because it "bypasses Kafka security completely" and would break existing client libraries. Your producer and consumer code doesn't change.

## Retention on each tier

In the [Topics](https://developer.confluent.io/courses/apache-kafka/topics/) lesson you learned that a retention policy decides how long Kafka keeps a topic's data. With Tiered Storage, each topic gets two retention limits.

<table>
  <thead>
    <tr><th>Setting</th><th>What it controls</th></tr>
  </thead>
  <tbody>
    <tr><td><code>local.retention.ms</code> and <code>local.retention.bytes</code></td><td>How long, or how much, data stays on broker disk before the local copy is deleted</td></tr>
    <tr><td><code>retention.ms</code> and <code>retention.bytes</code></td><td>How long, or how much, data is kept in total. Past this limit, segments in remote storage are deleted</td></tr>
  </tbody>
</table>

The [Kafka docs](https://kafka.apache.org/43/operations/tiered-storage/) say that if the local settings are unset, Kafka uses the `retention.ms` and `retention.bytes` values for them. They also note that "a local log segment is eligible for deletion only after it gets uploaded to remote."

[KIP-405](https://cwiki.apache.org/confluence/display/KAFKA/KIP-405%3A+Kafka+Tiered+Storage) gives the intended shape: local retention "can be significantly reduced from days to few hours," while remote retention "can be much longer, days, or even months."

## Turning it on

Tiered Storage is off by default, at two levels. On each broker, `remote.log.storage.system.enable=true` turns the feature on. On each topic, `remote.storage.enable=true` opts that topic in. Both are described in the [Kafka docs](https://kafka.apache.org/43/operations/tiered-storage/).

The broker also needs a plugin that knows how to talk to your storage system. Kafka defines an interface called `RemoteStorageManager` for this, but the docs say "Apache Kafka doesn't provide an out-of-the-box RemoteStorageManager implementation." Kafka has no built-in S3 plugin, so you supply one.

Kafka also needs to track which segments live remotely. That's the job of `RemoteLogMetadataManager`. The docs say Kafka's default stores this in an internal topic, so most setups don't need a second plugin.

## Limitations

The [Kafka docs](https://kafka.apache.org/43/operations/tiered-storage/) list these:

- Compacted topics aren't supported. Those are the topics from the Topics lesson that keep only the latest event per key.
- You must turn tiered storage off on every topic before turning it off on the broker.
- Admin actions for tiered storage need clients on version 3.0 or later.
- Segments without a producer snapshot file aren't supported. That can happen for topics created before 2.8.0.

## Confluent's Tiered Storage is a different feature

Confluent Platform has its own feature with the same name. The [Confluent docs](https://docs.confluent.io/platform/current/clusters/tiered-storage.html) say "This is a different feature than Kafka Tiered Storage. When you run Confluent Platform, you should use Confluent Tiered Storage."

The differences you're most likely to notice, from those docs:

- Settings start with `confluent.tier.` instead of `remote.`. For example, `confluent.tier.feature=true` turns it on for a broker.
- The data kept on broker disk is called the **hotset**, and `confluent.tier.local.hotset.ms` sets how long it stays.
- Storage support is built in. It works with certified object stores such as Amazon S3, Google Cloud Storage, Azure Blob Storage, and MinIO, so you don't write a plugin.
- Compacted topics are supported "starting with Confluent Platform 7.6."
- JBOD (several separate data disks on one broker) is not supported.

When you read docs or settings, check which of the two features they're about.

## Check your understanding

### 1. A topic has `local.retention.ms` set to one day and `retention.ms` set to 30 days. A consumer asks for records from 10 days ago. Where do they come from, and does the consumer's code need to change?

<details>
<summary>Click to see the answer</summary>

From the remote tier, because the local copy was deleted after a day. The broker fetches the records from remote storage and serves them, so the consumer's code doesn't change. Review: [How reads work](#how-reads-work) and [Retention on each tier](#retention-on-each-tier).

</details>

### 2. Can you turn on Apache Kafka's Tiered Storage for a compacted topic?

<details>
<summary>Click to see the answer</summary>

No. Compacted topics aren't supported by Apache Kafka's Tiered Storage. Confluent's own Tiered Storage, a different feature, supports them starting with Confluent Platform 7.6. Review: [Limitations](#limitations).

</details>

## Next steps

Next, we'll look at Queues for Kafka: share groups, which let many consumers work through the same partitions like a queue.
