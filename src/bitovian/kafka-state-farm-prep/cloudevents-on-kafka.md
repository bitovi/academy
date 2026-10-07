@page bitovian/kafka-state-farm-prep/cloudevents-on-kafka CloudEvents on Kafka
@parent bitovian/kafka-state-farm-prep 7
@outline 2

@description Learn what a CloudEvents envelope is, how it's written to a Kafka message in binary and structured content mode, and how an Avro payload fits in.

@body

## Overview

In this section, we will:

- Learn what an event envelope is, and what CloudEvents puts in one
- See the two ways a CloudEvent can be written to a Kafka message
- Walk through a binary mode message, header by header
- See how an Avro payload and Schema Registry fit into binary mode

## What an event envelope is

Every team that publishes events has to decide how to describe them: what the event is, where it came from, when it happened, and how its data is encoded. When each team decides differently, every consumer has to learn each producer's format.

An **event envelope** is a shared set of fields that goes around every event's data, so any consumer can read the basics the same way. [CloudEvents](https://cloudevents.io/) is a widely used specification for that envelope. Its [specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) describes it as "a specification for describing event data in common formats to provide interoperability across services, platforms and systems." It's a graduated project of the Cloud Native Computing Foundation.

## The attributes

CloudEvents calls the envelope's fields **attributes**. Four are [required](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#required-attributes) on every event:

<table>
  <thead>
    <tr><th>Attribute</th><th>What it holds</th></tr>
  </thead>
  <tbody>
    <tr><td><code>id</code></td><td>An identifier for the event. The spec says <code>source</code> plus <code>id</code> must be unique for each distinct event, and consumers "MAY assume that Events with identical <code>source</code> and <code>id</code> are duplicates."</td></tr>
    <tr><td><code>source</code></td><td>Where the event happened, as a URI reference, like <code>/billing/payments</code></td></tr>
    <tr><td><code>specversion</code></td><td>The CloudEvents version, <code>1.0</code></td></tr>
    <tr><td><code>type</code></td><td>What kind of event it is, like <code>com.example.payment.received</code></td></tr>
  </tbody>
</table>

Common optional attributes include `time` (when the event happened), `subject` (what the event is about, within the source), `datacontenttype` (how the data is encoded), and `dataschema` (a URI for the data's schema).

The `id` rule matters on Kafka. Producers can send the same event twice after a retry, so a consumer that remembers which `source` and `id` pairs it has handled can skip duplicates.

## Two ways to put a CloudEvent on Kafka

The [Kafka protocol binding](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md#13-content-modes) defines how a CloudEvent maps to a Kafka message. It has two content modes:

<table>
  <thead>
    <tr><th></th><th>Binary content mode</th><th>Structured content mode</th></tr>
  </thead>
  <tbody>
    <tr><td>Attributes go in</td><td>Kafka headers, one per attribute, each starting with <code>ce_</code></td><td>The message value, together with the data</td></tr>
    <tr><td>The message value is</td><td>The event's data, as-is</td><td>The whole event, encoded in an event format such as JSON</td></tr>
    <tr><td><code>content-type</code> header</td><td>The data's media type, like <code>application/avro</code></td><td>The event format's media type, like <code>application/cloudevents+json</code></td></tr>
  </tbody>
</table>

A consumer can tell the two apart from the `content-type` header. The [binding](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md#3-kafka-message-mapping) says that if it starts with `application/cloudevents`, the message is in structured mode. Otherwise, the consumer treats it as binary mode.

Binary mode keeps the value exactly as the data's own format produced it. The binding says it "allows for efficient transfer and without transcoding effort." A consumer that only cares about the data can read the value with its usual deserializer and ignore the headers.

## A binary mode message

This is the binding's own [example](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md#325-example) of a binary mode message:

<div data-toolbar-order="">

```text
------------------ Message -------------------

Topic Name: mytopic

------------------- key ----------------------

Key: mykey

------------------ headers -------------------

ce_specversion: "1.0"
ce_type: "com.example.someevent"
ce_source: "/mycontext/subcontext"
ce_id: "1234-1234-1234"
ce_time: "2018-04-05T03:56:24Z"
content-type: application/avro
       .... further attributes ...

------------------- value --------------------

            ... application data encoded in Avro ...

-----------------------------------------------
```

</div>

- **Each attribute is its own header.** `id` becomes `ce_id`, `time` becomes `ce_time`, and so on. The [binding](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md#323-metadata-headers) says header keys and values "MUST be encoded as UTF-8 strings."
- **`content-type` is `datacontenttype`.** In binary mode, `datacontenttype` doesn't get a `ce_` header. It's the plain `content-type` header instead.
- **The value is only the data.** Here it's Avro.
- **The key isn't an attribute.** The binding says implementations must map "the user provided record key to the Kafka record key" by default. CloudEvents has a [`partitionkey` extension](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/partitioning.md), and the binding recommends an opt-in way to use it as the Kafka key. Either way, the key still decides the partition, as in the Partitions lesson of Kafka 101.

## Avro data and Schema Registry

In the Schema Registry lesson of Kafka 101, the producer's serializer checks each event against a registered schema. That works the same in binary mode, because the value is just the data.

With Confluent's Avro serializer, the value isn't plain Avro. Confluent's [wire format](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/index.html#wire-format-schema-id-in-the-payload-prefix) puts a version byte and a 4-byte schema ID in front of the Avro bytes, so the consumer's deserializer can fetch the right schema. Use the matching deserializer to read it.

The serializer registers schemas under a **subject**. By [default](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/index.html#subject-name-strategy), the subject comes from the topic name (`TopicNameStrategy`), so each topic has one evolving schema for its values. The other strategies, `RecordNameStrategy` and `TopicRecordNameStrategy`, let one topic carry several record types.

That means a binary mode event can describe its data twice: the `ce_type` and optional `ce_dataschema` headers, and the schema ID in the value. Teams usually decide which one consumers should rely on.

## Things to watch for

- **An event with no data is a tombstone.** In binary mode the value is the data, so an event with no data becomes a message with no value. In a compacted topic, Kafka's [design docs](https://kafka.apache.org/42/design/design/) say "A message with a key and a null payload will be treated as a delete from the log", which is called a tombstone.
- **Headers are text.** Every attribute value is sent as a UTF-8 string, so a consumer gets `ce_time` as text and has to parse it.
- **Headers need Kafka 0.11 or later.** Older clients only support structured mode. Any client covered in this prep is far newer.

## Next steps

Next, we'll look at what to do when a consumer can't process a record: retries, dead letter queues, and replay.
