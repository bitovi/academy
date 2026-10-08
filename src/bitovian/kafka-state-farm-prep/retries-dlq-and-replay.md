@page bitovian/kafka-state-farm-prep/retries-dlq-and-replay Retries, Dead Letter Queues, and Replay
@parent bitovian/kafka-state-farm-prep 7
@outline 2

@description Learn what a consumer can do when it can't process a record: retry in place, move the record to a retry topic, park it in a dead letter queue, or replay a topic from an earlier point.

@body

## Overview

In this section, we will:

- See why one bad record can stop a whole partition
- Compare retrying in place with retry topics
- Learn what a dead letter queue is, and how Kafka Connect provides one
- Replay a topic by resetting a consumer group's offsets, and learn why consumers need to handle duplicates

## One bad record can stop a partition

In the Consumers lesson of Kafka 101, you saw that a consumer reads each partition in order and commits its offset as it goes. Records with the same key go to the same partition, so a consumer reads them in the order they were written. For example, if each event is keyed by account number, every change to one account is read in the order it happened.

Reading in order also means a consumer can't skip ahead on its own. If it can't process a record, it has two bad options. It can keep retrying, and every record behind it in that partition waits. Or it can commit the offset anyway, and the record is silently lost. A record that fails every time it's tried is often called a **poison pill**.

The patterns below give a consumer better choices.

## Retrying in place

The simplest option is to retry the record a few times inside the consumer, with a short wait between tries. That's often enough for brief problems, like a dependency that's restarting.

It keeps records in order, but it blocks the partition while it waits. Keep the number of tries and the waits short, so a record that will never succeed doesn't hold up everything behind it for long.

## Retry topics

A **retry topic** moves the failing record out of the way. Uber Engineering's widely cited post, [Building Reliable Reprocessing and Dead Letter Queues with Apache Kafka](https://www.uber.com/blog/reliable-reprocessing/), describes it this way: "when a consumer handler returns a failed response for a given message after a certain number of retries, the consumer publishes that message to its corresponding retry topic. The handler then returns true to the original consumer, which commits its offset."

The main consumer keeps going, and a separate consumer reads the retry topic and tries the record again later. Teams often chain several retry topics with growing delays, then give up and send the record to a dead letter queue.

Frameworks build this for you. In Spring for Apache Kafka, the [`@RetryableTopic` annotation](https://docs.spring.io/spring-kafka/reference/retrytopic.html) creates the retry topics and their consumers. Its [docs](https://docs.spring.io/spring-kafka/reference/retrytopic/how-the-pattern-works.html) name the cost: "By using this strategy you lose Kafka's ordering guarantees for that topic." A retried record can be processed after records that arrived later.

<table>
  <thead>
    <tr><th></th><th>Retry in place</th><th>Retry topic</th></tr>
  </thead>
  <tbody>
    <tr><td>Order within a partition</td><td>Kept</td><td>Lost for retried records</td></tr>
    <tr><td>Other records while retrying</td><td>Wait</td><td>Keep flowing</td></tr>
    <tr><td>Good for</td><td>Short outages, and data where order matters</td><td>Failures that take longer to clear, where order doesn't matter</td></tr>
  </tbody>
</table>

## Dead letter queues

A **dead letter queue** (DLQ) is a topic for records that a consumer has given up on. Instead of retrying forever or dropping them, the consumer writes them to the DLQ so someone can look at them, fix the cause, and process them again.

A DLQ is only useful if someone watches it. Teams usually alert when records arrive in it, and record why each one failed.

### Kafka Connect's DLQ

Kafka Connect, from the Kafka Connect lesson of Kafka 101, has a DLQ built in for **sink** connectors. The [Kafka Connect configuration docs](https://kafka.apache.org/43/configuration/kafka-connect-configs/) describe three settings:

<table>
  <thead>
    <tr><th>Setting</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr><td><code>errors.tolerance</code></td><td><code>none</code> (the default) means "any error will result in an immediate connector task failure". <code>all</code> skips records that fail.</td></tr>
    <tr><td><code>errors.deadletterqueue.topic.name</code></td><td>The topic to write failed records to. It's blank by default, so nothing is kept.</td></tr>
    <tr><td><code>errors.deadletterqueue.context.headers.enable</code></td><td>Adds headers saying why the record failed. Their names start with <code>__connect.errors</code>.</td></tr>
  </tbody>
</table>

Setting `errors.tolerance` to `all` without a DLQ topic skips bad records without keeping them. Confluent's [deep dive on Connect error handling](https://www.confluent.io/blog/kafka-connect-deep-dive-error-handling-dead-letter-queues/) walks through each combination.

These settings don't cover every failure. They catch records that fail while Connect converts them (deserializing) or transforms them. A failed write to the target system, such as a database rejecting a row, isn't covered by them. The deep dive marks that step, `put()`, as not handled. A sink connector can send those records to the DLQ only if it uses the [`ErrantRecordReporter`](https://kafka.apache.org/43/javadoc/org/apache/kafka/connect/sink/ErrantRecordReporter.html) interface, added in Kafka 2.6 by [KIP-610](https://cwiki.apache.org/confluence/display/KAFKA/KIP-610%3A+Error+Reporting+in+Sink+Connectors). Check your connector's docs to see whether it does.

## Replay

Because Kafka keeps records after they're read, a consumer group can go back and read them again. That's useful after fixing a bug that processed records wrongly, or to rebuild data in a new system.

You replay by moving the group's committed offsets back. Kafka's [operations docs](https://kafka.apache.org/43/operations/basic-kafka-operations/) describe the `kafka-consumer-groups` tool's `--reset-offsets` option. It can move offsets to a time (`--to-datetime`), to the start (`--to-earliest`), by a number of records (`--shift-by`), and more. The docs add: "first make sure that the consumer instances are inactive."

For example, this moves the `claims-view` group back to midnight on October 1 for the `claims` topic:

```shell
kafka-consumer-groups --bootstrap-server localhost:9092 \
  --group claims-view --topic claims \
  --reset-offsets --to-datetime 2026-10-01T00:00:00.000 \
  --execute
```

Without `--execute`, the command only shows the offsets it would set and changes nothing. Run it once without `--execute` to check the result, then again with it. Apache Kafka's download names the tool `kafka-consumer-groups.sh`; Confluent Platform drops the `.sh`.

Two limits apply:

- **You can only replay what's still there.** The [`retention.ms` setting](https://kafka.apache.org/43/configuration/topic-configs/) controls how long records are kept. The docs say it "represents an SLA on how soon consumers must read their data."
- **Replay delivers records again.** Anything the consumer did the first time, like sending an email or charging a card, happens again unless the consumer checks for duplicates.

## Consumers should handle duplicates

Replays, retries, and producer retries can all deliver the same record more than once. Confluent's [Idempotent Reader pattern](https://developer.confluent.io/patterns/event-processing/idempotent-reader/) asks: "How can an application deal with duplicate Events when reading from an Event Stream?"

Kafka's exactly-once features help when the consumer writes its results back to Kafka. When it writes somewhere else, like a database or another API, the consumer has to handle duplicates itself. A common way is to record the ID of each event it has handled, like the CloudEvents `source` and `id` from the previous section, and skip events it has already seen.

## Check your understanding

### 1. Events for each account must be handled in order, and a dependency is down for a few seconds. Should the consumer retry in place or use a retry topic?

<details>
<summary>Click to see the answer</summary>

Retry in place. It keeps records in order, and a short outage only holds up the partition briefly. A retry topic keeps other records moving, but a retried record can be processed after records that arrived later. Review: [Retry topics](#retry-topics).

</details>

### 2. A JDBC sink connector has `errors.tolerance=all` and a DLQ topic. The database rejects a row. Does the record land in the DLQ?

<details>
<summary>Click to see the answer</summary>

Only if the connector uses the `ErrantRecordReporter` interface. Connect's DLQ settings cover records that fail while being converted or transformed, not failed writes to the target system. Check the connector's docs. Review: [Kafka Connect's DLQ](#kafka-connects-dlq).

</details>

### 3. You run `kafka-consumer-groups --reset-offsets --to-earliest` for a group and topic, and the consumers don't reprocess anything. Why?

<details>
<summary>Click to see the answer</summary>

The command was missing `--execute`. Without it, the tool only shows the offsets it would set and changes nothing. Review: [Replay](#replay).

</details>

## Next steps

Next, we'll look at Flink applications: processing Kafka events with code, beyond the Flink SQL from Kafka 101.
