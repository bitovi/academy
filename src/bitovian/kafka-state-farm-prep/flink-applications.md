@page bitovian/kafka-state-farm-prep/flink-applications Flink Applications with Kafka
@parent bitovian/kafka-state-farm-prep 8
@outline 2

@description Go beyond the Flink SQL from Kafka 101: Flink's APIs, reading and writing Kafka with the Kafka connector, event time and watermarks, state and checkpoints, and exactly-once delivery.

@body

## Overview

In this section, we will:

- See Flink's APIs, from SQL to the DataStream API
- Read from and write to Kafka with Flink's Kafka connector
- Learn how event time and watermarks handle late and out-of-order events
- Learn how state and checkpoints let a Flink application recover from failures
- See what exactly-once delivery to Kafka requires

In the Stream Processing lesson of Kafka 101, you filtered, joined, and aggregated events with Flink SQL. Many teams also write **Flink applications**: programs, usually in Java, that Flink runs continuously against their streams.

## Flink's APIs

Flink's [concepts overview](https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/overview/) says it "offers different levels of abstraction for developing streaming/batch applications":

<table>
  <thead>
    <tr><th>API</th><th>What you write</th></tr>
  </thead>
  <tbody>
    <tr><td>SQL</td><td>SQL queries, like the ones in Kafka 101</td></tr>
    <tr><td>Table API</td><td>The same relational operations as SQL, called from Java or Python code</td></tr>
    <tr><td>DataStream API</td><td>Code that transforms streams one step at a time: map, filter, join, windows, and state</td></tr>
    <tr><td>Process Function</td><td>The lowest level, part of the DataStream API, with full control over each event, state, and timers</td></tr>
  </tbody>
</table>

The overview says "many applications do not need the low-level abstractions" and can use the DataStream API instead, and the levels can be mixed in one application.

## Reading and writing Kafka

Flink talks to Kafka through its [Kafka connector](https://nightlies.apache.org/flink/flink-docs-stable/docs/connectors/datastream/kafka/), which provides a `KafkaSource` for reading and a `KafkaSink` for writing. The docs' example source reads one topic as a consumer group:

<div data-toolbar-order="">

```java
KafkaSource<String> source = KafkaSource.<String>builder()
    .setBootstrapServers(brokers)
    .setTopics("input-topic")
    .setGroupId("my-group")
    .setStartingOffsets(OffsetsInitializer.earliest())
    .setValueOnlyDeserializer(new SimpleStringSchema())
    .build();
```

</div>

One difference from the consumers in Kafka 101: Flink tracks its own position in each partition, as part of its checkpoints. The docs say the source commits offsets to Kafka when a checkpoint completes, but it "does NOT rely on committed offsets for fault tolerance. Committing offset is only for exposing the progress of consumer and consuming group for monitoring." Resetting the group's offsets with `kafka-consumer-groups`, as in the previous section, doesn't move a Flink job that restarts from a checkpoint.

## Event time and watermarks

Events often arrive late or out of order: a phone that was offline, a retry, a slow producer. Flink's [timely stream processing docs](https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/) separate two kinds of time:

- **Processing time**: the clock on the machine running Flink.
- **Event time**: "the time that each individual event occurred on its producing device." It's usually a timestamp inside the event, like the CloudEvents `time` attribute from earlier.

To work in event time, Flink needs to know how far along time has gotten in each stream. That's what **watermarks** do. The docs say a watermark carrying time *t* "declares that event time has reached time t in that stream, meaning that there should be no more elements from the stream with a timestamp t' <= t."

Windows, like "claims per hour", close when the watermark passes their end. Setting how long to wait for late events is a trade-off. The docs say waiting "incurs some latency," and you can only wait so long.

## State and checkpoints

Many Flink applications keep **state**: running counts, the last event seen for each key, partial joins. Flink stores it for you, per key.

To recover from failures, the [stateful stream processing docs](https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/stateful-stream-processing/) say "Flink implements fault tolerance using a combination of stream replay and checkpointing." A **checkpoint** saves each operator's state together with the position it had reached in each input. After a failure, Flink restores the state from the last checkpoint and replays Kafka from the saved positions.

The checkpoint interval is a trade-off. Checkpointing often costs more while running. Checkpointing rarely means more records to replay after a failure.

## Exactly-once delivery to Kafka

The `KafkaSink` [supports three delivery guarantees](https://nightlies.apache.org/flink/flink-docs-stable/docs/connectors/datastream/kafka/):

<table>
  <thead>
    <tr><th>Guarantee</th><th>What happens after a failure</th></tr>
  </thead>
  <tbody>
    <tr><td><code>NONE</code> (the default)</td><td>Records can be lost or duplicated.</td></tr>
    <tr><td><code>AT_LEAST_ONCE</code></td><td>No records are lost, but some can be written twice when Flink replays from a checkpoint.</td></tr>
    <tr><td><code>EXACTLY_ONCE</code></td><td>The sink writes in a Kafka transaction that's committed when a checkpoint completes.</td></tr>
  </tbody>
</table>

The two stronger guarantees need checkpointing turned on. Exactly-once has three more requirements from the docs:

- **Consumers must read only committed records.** Downstream consumers need `isolation.level=read_committed`, or they'll see records from transactions that never committed.
- **Records show up later.** Exactly-once "delays record visibility effectively until a checkpoint is written."
- **Transaction settings matter.** Each application needs its own `transactionalIdPrefix`, and the producer's `transaction.timeout.ms` should be well above the longest checkpoint plus restart time, "or data loss may happen when Kafka expires an uncommitted transaction." It also can't be higher than the broker's [`transaction.max.timeout.ms`](https://kafka.apache.org/43/configuration/broker-configs/), which defaults to 15 minutes. If it's higher, the broker "will return an error" and the job won't start. Raising the broker limit is a platform team change.

Exactly-once covers what Flink writes to Kafka. Like the consumers in the previous section, a Flink job that calls an outside system can still repeat those calls after a replay.

## Where Flink runs

Flink runs as a cluster of its own, separate from Kafka. Confluent offers it two ways:

- [Confluent Cloud for Apache Flink](https://docs.confluent.io/cloud/current/flink/overview.html) provides "fully managed, serverless stream processing on Confluent Cloud."
- [Confluent Platform for Apache Flink](https://docs.confluent.io/cp-flink/current/overview.html) "runs on-premises alongside other Confluent Platform components." Its applications are deployed in Kubernetes and managed with Confluent Manager for Apache Flink (CMF).

Teams can also run open-source Apache Flink themselves.

## Check your understanding

### 1. You reset a Flink job's consumer group offsets with `kafka-consumer-groups`, then restart the job from a checkpoint. Where does it start reading?

<details>
<summary>Click to see the answer</summary>

From the positions saved in the checkpoint. Flink doesn't rely on committed offsets for recovery; it commits them only so you can monitor progress. Review: [Reading and writing Kafka](#reading-and-writing-kafka).

</details>

### 2. A Flink job writes to Kafka with `EXACTLY_ONCE`, but a downstream consumer sees records from transactions that never committed. What's missing?

<details>
<summary>Click to see the answer</summary>

The downstream consumer needs `isolation.level=read_committed`. The Java client's default reads uncommitted records too. Review: [Exactly-once delivery to Kafka](#exactly-once-delivery-to-kafka).

</details>

## Next steps

Next, we'll look at Kafka Connect and change data capture: copying every change in a database into Kafka.
