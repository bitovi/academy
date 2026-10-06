@page bitovian/kafka-state-farm-prep/kraft-and-kafka-4 KRaft and Kafka 4.0
@parent bitovian/kafka-state-farm-prep 3
@outline 2

@description Learn why Kafka 4.0 dropped ZooKeeper, how KRaft controllers keep cluster metadata instead, and which other 4.0 changes can break older clients and servers.

@body

## Overview

In this section, we will:

- Learn what ZooKeeper did for Kafka, and what KRaft does instead
- See how a cluster gets from ZooKeeper to Kafka 4.0
- Go over the other 4.0 changes that can break older clients and servers

Apache Kafka 4.0 came out on [March 18, 2025](https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/). The release announcement calls it "the first major release to operate entirely without Apache ZooKeeper." Every Kafka cluster on 4.0 or later runs in KRaft mode, which this page explains.

The [Brokers](https://developer.confluent.io/courses/apache-kafka/brokers/) lesson in Apache Kafka 101 touches on this. This page fills in what changed, and the other 4.0 changes that can stop an older application or cluster from working.

## What ZooKeeper did

Apache ZooKeeper is a separate open-source system for storing small amounts of shared data across several servers. Before 4.0, every Kafka cluster needed one running beside it.

[KIP-500](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum) is the Kafka Improvement Proposal (KIP) that planned ZooKeeper's removal. It describes the old setup this way: "Kafka uses ZooKeeper to store its metadata about partitions and brokers, and to elect a broker to be the Kafka Controller." Metadata here means facts about the cluster itself, such as which topics exist and which broker leads each partition. The controller is the one broker in charge of changing that metadata.

KIP-500 gives two reasons to drop ZooKeeper:

- **Two systems to run.** "ZooKeeper is a separate system, with its own configuration file syntax, management tools, and deployment patterns," so operators had to learn two distributed systems instead of one.
- **Data that drifts apart.** The proposal says "the state in ZooKeeper often doesn't match the state that is held in memory in the controller."

## What KRaft does instead

KRaft (Kafka Raft) moves the metadata into Kafka itself. Raft is a consensus algorithm: a way for a small group of servers to agree on one ordered list of changes, even if some of them fail. The Kafka 101 Brokers lesson describes KRaft as "a built-in metadata management system based on the Raft consensus protocol."

In KIP-500's design, a small group of controller servers forms "a Raft quorum which manages the metadata log." A quorum is a group where a majority must agree before a change counts. The metadata log works like a Kafka topic: brokers "consume metadata events from the event log," so every broker sees changes in the same order.

Each Kafka server picks its job with the `process.roles` setting, according to the [KRaft operations docs](https://kafka.apache.org/43/operations/kraft/):

<table>
  <thead>
    <tr><th><code>process.roles</code></th><th>What the server does</th></tr>
  </thead>
  <tbody>
    <tr><td><code>broker</code></td><td>Stores partitions and serves producers and consumers</td></tr>
    <tr><td><code>controller</code></td><td>Joins the controller quorum and stores cluster metadata</td></tr>
    <tr><td><code>broker,controller</code></td><td>Does both (called combined mode)</td></tr>
  </tbody>
</table>

The same docs say an admin "will typically select 3 or 5 servers" as controllers, and "a majority of the controllers must be alive in order to maintain availability." Three controllers can lose one; five can lose two. They also warn that "Combined mode is not recommended in critical deployment environments," because controllers and brokers can't then be scaled separately.

For application developers, nothing changes in producer or consumer code. Clients still connect to brokers. The difference is for platform teams: there's no ZooKeeper to run, patch, or monitor.

## Getting from ZooKeeper to 4.0

A cluster can't jump from ZooKeeper mode straight to 4.0. The [upgrade docs](https://kafka.apache.org/43/getting-started/upgrade/) say "Clusters in ZooKeeper mode have to be migrated to KRaft mode before they can be upgraded to 4.0.x."

Kafka 3.9 is the last release that still supports ZooKeeper. Its [release announcement](https://kafka.apache.org/blog/2024/11/06/apache-kafka-3.9.0-release-announcement/) calls it a "bridge release" and gives the path: "Upgrade to Kafka 3.9. Perform ZK migration. Upgrade to Kafka 4.0."

## Other 4.0 changes that can break things

ZooKeeper's removal gets the attention, but these changes from the [4.0 announcement](https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/) and [upgrade docs](https://kafka.apache.org/43/getting-started/upgrade/) are more likely to affect an application team.

### Old clients and brokers stop working together

Every Kafka request type, such as Produce or Fetch, has numbered versions. [KIP-896](https://cwiki.apache.org/confluence/display/KAFKA/KIP-896%3A+Remove+old+client+protocol+API+versions+in+Kafka+4.0) removed the old ones. Before 4.0, Kafka had kept every version "since Apache Kafka 0.8.0." Now the baseline is Apache Kafka 2.1, from November 2018.

In practice, the release announcement says to make sure brokers are "version 2.1 or higher before upgrading Java clients to 4.0," and that the "Java client version must be 2.1 or higher before upgrading brokers to 4.0." A client that sends a removed version gets an `UNSUPPORTED_VERSION` error, per KIP-896.

Non-Java clients matter too. KIP-896 checked libraries such as librdkafka, KafkaJS, Sarama, and kafka-python against the new baseline. If a team uses one of these, check its version before the brokers move to 4.0.

### New Java minimums

From the [4.0 announcement](https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/):

<table>
  <thead>
    <tr><th>Component</th><th>Minimum Java version</th></tr>
  </thead>
  <tbody>
    <tr><td>Kafka clients and Kafka Streams</td><td>Java 11</td></tr>
    <tr><td>Brokers, Kafka Connect, and command-line tools</td><td>Java 17</td></tr>
  </tbody>
</table>

### Old message formats are gone

The announcement says message formats v0 and v1 were removed. The [upgrade docs](https://kafka.apache.org/43/getting-started/upgrade/) add that the `log.message.format.version` and `message.format.version` settings were removed too.

## How this connects to Confluent Gateway

The [Confluent Gateway docs](https://docs.confluent.io/private-cloud-gateway/current/overview.html) say it "is compatible with Kafka protocol versions 3.x and 4.x" and that "Kafka server and client versions 2.x or older are not supported." That's a stricter floor than Kafka 4.0's 2.1 baseline. A client that a 4.0 broker would accept may still be refused by the gateway. See [Confluent Gateway](./confluent-gateway.html) for what the gateway does.

## Where Kafka is now

As of this writing, the [downloads page](https://kafka.apache.org/community/downloads/) lists 4.3.1, 4.2.2, and 4.1.2 as the supported releases, with 4.3.1 the newest feature line. The [upgrade docs](https://kafka.apache.org/43/getting-started/upgrade/) confirm 4.3 still supports only KRaft mode.

Kafka 4.0 also added early access to share groups, which give Kafka queue-like behavior. That's covered in [Queues for Kafka](./queues-for-kafka.html).
