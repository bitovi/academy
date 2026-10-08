@page bitovian/kafka-state-farm-prep Kafka: State Farm Prep
@parent bit-academy 101
@hide
@outline 1

@description Take Confluent's Apache Kafka 101 course, then learn the Confluent products, Kafka changes, and related tools it doesn't cover.

@body

## Overview

This training gets you ready for Kafka work on the State Farm engagement. Work through it on your own, in order:

1. Take Confluent's free [Apache Kafka 101](https://developer.confluent.io/courses/apache-kafka/events/) course.
2. Answer the questions in [Check your understanding](#check-your-understanding) without looking back.
3. Read the [Additional topics](#additional-topics), in order. They cover the Confluent products, recent Kafka changes, and related tools the course doesn't.

## Additional topics

1. [Confluent Private Cloud](kafka-state-farm-prep/confluent-private-cloud.html): what it is, what's in it, and how it compares with Confluent's other options
2. [Confluent Gateway](kafka-state-farm-prep/confluent-gateway.html): the proxy that routes Kafka clients to the right cluster
3. [KRaft and Kafka 4.0](kafka-state-farm-prep/kraft-and-kafka-4.html): how Kafka runs without ZooKeeper, and which 4.0 changes can break older clients
4. [Tiered Storage](kafka-state-farm-prep/tiered-storage.html): moving older data off broker disks into remote storage
5. [Queues for Kafka](kafka-state-farm-prep/queues-for-kafka.html): share groups, which let many consumers work through the same partitions like a queue
6. [Kafka and GraphQL](kafka-state-farm-prep/kafka-and-graphql.html): the common ways a GraphQL API and Kafka work together, and the problems each one runs into
7. [CloudEvents on Kafka](kafka-state-farm-prep/cloudevents-on-kafka.html): the CloudEvents event envelope, and how it's written to a Kafka message in binary and structured content mode
8. [Retries, Dead Letter Queues, and Replay](kafka-state-farm-prep/retries-dlq-and-replay.html): what a consumer can do with a record it can't process, and how to read a topic again from an earlier point
9. [Flink Applications with Kafka](kafka-state-farm-prep/flink-applications.html): Flink's APIs beyond SQL, event time and watermarks, state and checkpoints, and exactly-once delivery to Kafka
10. [Kafka Connect and Change Data Capture](kafka-state-farm-prep/connect-and-cdc.html): copying every database change into Kafka, what a change event looks like, and landing CDC data in a lakehouse's bronze layer
11. [Other Useful Topics](kafka-state-farm-prep/other-useful-topics.html): short introductions to Multi-Region Clusters, back pressure, and circuit breakers

## Take Apache Kafka 101

[Apache Kafka 101](https://developer.confluent.io/courses/apache-kafka/events/) is a free course from Confluent. It has 16 short lessons. The video lessons add up to about 75 minutes, going by the times listed on each lesson, plus five hands-on exercises.

Take the whole course, including the hands-on exercises. Each exercise page has its own setup instructions.

<table>
  <thead>
    <tr><th>Lesson</th><th>What you learn</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/events/">Introduction</a></td><td>What an event is and why Kafka stores them</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/topics/">Topics</a></td><td>How Kafka organizes events into logs called topics</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/partitions/">Partitions</a></td><td>How a topic is split up so it can scale</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/brokers/">Brokers</a></td><td>The servers that store partitions and serve clients</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/replication/">Replication</a></td><td>How copies of each partition survive a broker failure</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/producers/">Producers</a> and <a href="https://developer.confluent.io/courses/apache-kafka/get-started-hands-on/">exercise</a></td><td>Writing events to a topic</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/consumers/">Consumers</a> and <a href="https://developer.confluent.io/courses/apache-kafka/exercise-kafka-consumers/">exercise</a></td><td>Reading events, and how consumer groups share the work</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/schema-registry/">Schema Registry</a> and <a href="https://developer.confluent.io/courses/apache-kafka/schema-registry-hands-on/">exercise</a></td><td>Agreeing on, and checking, the shape of each event</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/kafka-connect/">Kafka Connect</a> and <a href="https://developer.confluent.io/courses/apache-kafka/exercise-kafka-connect/">exercise</a></td><td>Moving data between Kafka and other systems without writing code</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/stream-processing/">Stream Processing</a> and <a href="https://developer.confluent.io/courses/apache-kafka/stream-processing-hands-on/">exercise</a></td><td>Filtering, joining, and aggregating events as they arrive, with Flink SQL</td></tr>
    <tr><td><a href="https://developer.confluent.io/courses/apache-kafka/confluent-offering/">Introduction to Confluent's Offerings</a></td><td>What Confluent sells on top of open-source Kafka</td></tr>
  </tbody>
</table>

The last lesson introduces Confluent Cloud, which Confluent runs for you, and Confluent Platform, which you run yourself. The next two sections cover a third option and a tool that comes with it.

## Check your understanding

Answer these after the course.

### 1. A topic has three partitions with a replication factor of three. How many copies of each partition exist, and what happens when one broker fails?

<details>
<summary>Click to see the answer</summary>

Three copies of each partition, each on a different broker: one leader and two followers. When a broker fails, a follower on another broker takes over as leader for each partition the failed broker led, so producers and consumers keep working and no committed data is lost. Review: [Replication](https://developer.confluent.io/courses/apache-kafka/replication/).

</details>

### 2. Two consumers in the same consumer group read from a topic with four partitions. How many partitions does each consumer read?

<details>
<summary>Click to see the answer</summary>

Two partitions each. Kafka gives each partition to exactly one consumer in the group, so the four partitions are split across the two consumers. Review: [Consumers](https://developer.confluent.io/courses/apache-kafka/consumers/).

</details>

### 3. A producer starts sending events whose schema isn't compatible with the versions already registered. Where does that get caught?

<details>
<summary>Click to see the answer</summary>

In the producer, before the event reaches Kafka. By default, the producer's serializer tries to register the event's schema with Schema Registry before sending. Schema Registry checks it against the subject's [compatibility rule](https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html) (`BACKWARD` by default) and rejects it, so the send fails with an exception. A changed schema that *is* compatible is registered as a new version, and the send succeeds.

Many teams turn this automatic registration off in production with [`auto.register.schemas=false`](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/index.html), so only a build step or the platform team registers schemas. Then the send fails if the event's schema isn't already registered. Review: [Schema Registry](https://developer.confluent.io/courses/apache-kafka/schema-registry/).

</details>
