@page bitovian/kafka-state-farm-prep/other-useful-topics Other Useful Topics
@parent bitovian/kafka-state-farm-prep 11
@outline 2

@description Short explanations of topics that are useful to know but don't need their own section: Multi-Region Clusters, back pressure, and circuit breakers.

@body

## Overview

This section collects shorter topics that are useful to know but don't need a section of their own. Each one is a brief introduction with a link to learn more.

In this section, we will:

- Learn what Confluent's Multi-Region Clusters are
- Learn what back pressure means in Kafka, and which settings control it
- Learn what a circuit breaker is, and how a Kafka consumer can use one

## Multi-Region Clusters

**Multi-Region Clusters** (MRC) is a Confluent Platform feature for running one Kafka cluster across several data centers or regions. The [Confluent docs](https://docs.confluent.io/platform/current/multi-dc-deployments/multi-region.html) say that when brokers sit on different networks, the differences can "cause higher latency, lower throughput, and increased cost to produce and consume messages." MRC adds three capabilities to reduce that:

- **Follower fetching**: "clients can consume from followers instead of only the leader, reducing cross-datacenter traffic between clients and brokers."
- **Observers**: extra replicas that copy data without joining the in-sync replicas from the Replication lesson of Kafka 101. With observers, "you can define topics that synchronously replicate data within one region, but replicate the data asynchronously between regions," so producers using `acks=all` don't wait on the slow link between regions.
- **Replica placement**: rules for where each partition's replicas and observers live.

If enough brokers fail that a partition would go offline, observers can step in as in-sync replicas and keep it available. The docs call this automatic observer promotion.

One thing to know if you read the Confluent Private Cloud section: the same docs say Intelligent Replication "does not support observers. If you need to use observers for multi-region deployments, you cannot enable Intelligent Replication on those clusters."

## Back pressure

**Back pressure** is what happens when data arrives faster than the next step can handle it, and how a system pushes back.

Kafka handles this differently from many message brokers, because consumers pull records instead of having them pushed. Kafka's [design docs](https://kafka.apache.org/42/design/design/) explain the choice: in a push system, "the consumer tends to be overwhelmed when its rate of consumption falls below the rate of production," while "a pull-based system has the nicer property that the consumer simply falls behind and catches up when it can." Records wait safely in the topic, and the consumer's **lag** grows until it catches up.

A consumer controls its own pace with:

<table>
  <thead>
    <tr><th>Setting or method</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="https://kafka.apache.org/42/configuration/consumer-configs/"><code>max.poll.records</code></a></td><td>"The maximum number of records returned in a single call to poll()." The default is 500.</td></tr>
    <tr><td><a href="https://kafka.apache.org/42/configuration/consumer-configs/"><code>max.poll.interval.ms</code></a></td><td>How long a consumer can go between polls. If it's slower than this, "the consumer is considered failed and the group will rebalance." The default is 5 minutes.</td></tr>
    <tr><td><a href="https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html"><code>pause()</code> and <code>resume()</code></a></td><td>Stop and restart fetching from specific partitions, while the consumer keeps polling and stays in its group.</td></tr>
  </tbody>
</table>

The interval setting is the one that most often causes trouble. A consumer that takes too long on a batch is removed from the group, its partitions move to another consumer, and the batch can be processed twice. Fetching fewer records per poll, or pausing partitions while slow work finishes, keeps it in the group.

Producers have back pressure too. If records are produced faster than they can be sent, the producer's [`buffer.memory`](https://kafka.apache.org/42/configuration/producer-configs/) fills up and, the docs say, "the producer will block for max.block.ms after which it will fail with an exception."

## Circuit breakers

A **circuit breaker** is a general pattern for calling something that might fail. It isn't part of Kafka. Martin Fowler's [description](https://martinfowler.com/bliki/CircuitBreaker.html) is the usual reference: "You wrap a protected function call in a circuit breaker object, which monitors for failures. Once the failures reach a certain threshold, the circuit breaker trips, and all further calls to the circuit breaker return with an error, without the protected call being made at all."

After a while, the breaker lets a test call through. If it succeeds, the breaker closes and calls flow again.

In a Kafka consumer, the protected call is usually the system the consumer writes to, like a database or another service. When that system is down, retrying every record wastes time and can send every record to a retry topic or dead letter queue for no good reason. Instead, the consumer can:

1. Trip the breaker after a run of failures.
2. Call `pause()` on its partitions, and keep calling `poll()` so it stays in its group.
3. Call `resume()` once a test call succeeds.

Nothing is lost while the consumer is paused. The records stay in the topic, and the consumer picks up where it left off, as in the back pressure section above.

Libraries such as [Resilience4j](https://resilience4j.readme.io/docs/circuitbreaker) provide circuit breakers for Java, and the same idea is available in most languages.

## Next steps

That's the last topic in this prep. To review, go back to the [overview](../kafka-state-farm-prep.html).
