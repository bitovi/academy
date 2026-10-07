@page bitovian/kafka-state-farm-prep/confluent-private-cloud Confluent Private Cloud
@parent bitovian/kafka-state-farm-prep 1
@outline 2

@description Learn what Confluent Private Cloud is, what's in it, and how it differs from Confluent's other ways to run Kafka.

@body

## Overview

In this section, we will:

- Learn what Confluent Private Cloud is and who it's for
- See the three parts it ships with
- Learn how Intelligent Replication changes the way brokers copy data
- Compare it with Confluent's other ways to run Kafka

[Confluent Private Cloud](https://docs.confluent.io/platform/current/private-cloud/overview.html) is Confluent software that you run in your own data center or private cloud. Confluent [announced it in October 2025](https://www.confluent.io/blog/introducing-confluent-private-cloud/). The docs describe it as bringing "a cloud-like architecture and experience for on-premises Kafka workloads", built on the same engine that runs Confluent Cloud.

It's aimed at companies that run large Kafka installations for many teams, but whose regulations or data residency rules keep data on their own hardware. The [docs](https://docs.confluent.io/platform/current/private-cloud/overview.html) name GDPR, HIPAA, and financial services rules as examples.

## What's in it

The [launch post](https://www.confluent.io/blog/introducing-confluent-private-cloud/) lists three parts:

- **Confluent Private Cloud Gateway**: a proxy that sits between Kafka clients and Kafka clusters. See [Confluent Gateway](./confluent-gateway.html).
- **Intelligent Replication**: a faster way for brokers to copy data to each other. It's covered below.
- **Unified Stream Manager**: one place to manage schemas, see where data flows, and monitor health across on-premises and Confluent Cloud clusters.

## Intelligent Replication

In the Replication lesson you saw that follower brokers copy data from the partition leader. In standard Kafka, followers do that by repeatedly asking the leader for new data. The [Intelligent Replication docs](https://docs.confluent.io/platform/current/private-cloud/intelligent-replication/overview.html) call this "pull-based replication".

Intelligent Replication adds a push mode, where the leader sends new data to followers without being asked. The broker switches between push and pull on its own, and Confluent claims "up to 10X or more performance improvements for Kafka workloads at scale."

What matters for application developers: the docs say "No changes are required to Kafka clients, applications, or existing tools." Your producer and consumer code stays the same.

## Confluent's options side by side

<table>
  <thead>
    <tr><th></th><th>Confluent Cloud</th><th>Confluent Platform</th><th>Confluent Private Cloud</th></tr>
  </thead>
  <tbody>
    <tr><td>Who runs the brokers</td><td>Confluent</td><td>You</td><td>You</td></tr>
    <tr><td>Who runs the control plane</td><td>Confluent</td><td>You</td><td>You</td></tr>
    <tr><td>Where the data lives</td><td>Confluent's cloud account</td><td>Your infrastructure</td><td>Your infrastructure</td></tr>
    <tr><td>Covered in Kafka 101</td><td>Yes</td><td>Yes</td><td>No</td></tr>
  </tbody>
</table>

## Next steps

Next, we'll look at Confluent Gateway, the proxy that routes Kafka clients to the right cluster.
