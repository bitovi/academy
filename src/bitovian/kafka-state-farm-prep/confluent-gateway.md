@page bitovian/kafka-state-farm-prep/confluent-gateway Confluent Gateway
@parent bitovian/kafka-state-farm-prep 2
@outline 2

@description Learn what Confluent Gateway does, how routes and streaming domains work, and its limits.

@body

## Overview

In this section, we will:

- Learn what Confluent Gateway does and why teams put it in front of Kafka
- See how routes and streaming domains send clients to the right cluster
- Learn what has to be in place before clients are switched to another cluster
- Learn how clients authenticate through the gateway
- Go over its limits

[Confluent Private Cloud Gateway](https://docs.confluent.io/private-cloud-gateway/current/overview.html), which the docs shorten to Confluent Gateway, is a proxy for Kafka traffic. Clients connect to the gateway instead of connecting to brokers directly, and the gateway forwards their requests to the right cluster.

Unlike a general-purpose network proxy, it understands the Kafka protocol. That lets it change the broker addresses it hands back to clients and apply security rules to each request.

## Why use it

The [docs](https://docs.confluent.io/private-cloud-gateway/current/overview.html) list five use cases:

- **Cloud migration**: move on-premises clients to Confluent Cloud without changing the clients.
- **On-premises disaster recovery**: switch clients from an unhealthy cluster to a healthy one without changing the clients.
- **Secure partner access**: let an outside company reach a private cluster through its own gateway endpoint, without opening the cluster itself up.
- **Custom domains**: give Kafka endpoints your organization's own hostnames, so clients don't depend on the real cluster addresses.
- **Blue-green Kafka upgrades**: run the new Kafka version alongside the old one, move traffic over a bit at a time, and switch back if something goes wrong.

The same page also names central security as a benefit: require mTLS (TLS where the client also proves who it is with a certificate) and authentication at the gateway, instead of in every client's configuration.

## Routes and streaming domains

Two terms show up throughout the gateway docs:

- A **streaming domain** stands for one real Kafka cluster behind the gateway.
- A **route** is an address that clients connect to. Each route points at a streaming domain.

Clients only ever know about the route. To move clients to another cluster, an operator points the route at a different streaming domain. The docs call this **Client Switchover**.

## What a switchover doesn't do

A switchover changes which cluster clients reach. It doesn't copy anything. The [migration docs](https://docs.confluent.io/private-cloud-gateway/current/gateway-migrate.html) say to "set up data replication between the source and destination Kafka clusters outside of Confluent Gateway, using tools like Cluster Linking" before switching. [Cluster Linking](https://docs.confluent.io/platform/current/multi-dc-deployments/cluster-linking/index.html) copies the topics and can also sync consumer group offsets, so consumers pick up where they left off. Without it, clients land on a cluster that's missing their data and their committed offsets.

The same docs list what application teams should still expect:

- **Ordering isn't kept across the switch.** The docs say switching "breaks message ordering and end-to-end consistency," and not to use it for applications that need strict ordering, such as Kafka Streams applications.
- **The gateway restarts.** In the documented steps, the gateway is restarted to pick up the new route. Consumers can rebalance and reprocess records whose offsets weren't committed yet. Producers can send a record twice, unless `enable.idempotence=true` is set.

So consumers still need to handle duplicates, as covered in [Retries, Dead Letter Queues, and Replay](./retries-dlq-and-replay.html).

## How clients authenticate

The gateway handles client credentials in one of two ways:

- **Passthrough**: the gateway passes the client's own identity on to the cluster.
- **Swapping**: the client signs in to the gateway, and the gateway uses its own credentials to talk to the cluster.

The gateway supports mTLS, SASL/PLAIN and SASL/SCRAM (username and password), OAuth, and OIDC for client sign-in.

## Limits to know

From the [docs](https://docs.confluent.io/private-cloud-gateway/current/overview.html):

- It works with Kafka clients and brokers on Kafka 3.x and 4.x, not 2.x.
- It runs as a central service, deployed with Docker or [Confluent for Kubernetes](https://docs.confluent.io/operator/current/gateway/co-gateway-overview.html), not as a sidecar next to each application.
- It only proxies Kafka traffic. Schema Registry calls go straight to Schema Registry.

## Confluent Cloud Gateway is a different product

You'll also see [Confluent Cloud Gateway](https://docs.confluent.io/cloud/current/cp-component/gateway/overview.html) in Confluent's docs. It connects your own Kafka clients and clusters to Confluent Cloud. The docs say the two "share the same underlying proxy technology, but are separate, independently licensed products." Make sure you're reading the Private Cloud Gateway docs when the question is about Confluent Private Cloud.

## Check your understanding

### 1. An operator points a route at a new cluster's streaming domain, but nobody set up Cluster Linking first. What do the consumers see?

<details>
<summary>Click to see the answer</summary>

A cluster that's missing their data and their committed offsets. The gateway only changes which cluster clients reach. It doesn't copy topics or offsets, so data has to be replicated first, usually with Cluster Linking. Review: [What a switchover doesn't do](#what-a-switchover-doesnt-do).

</details>

### 2. A service uses a Kafka 2.8 client. Can it connect through Confluent Gateway?

<details>
<summary>Click to see the answer</summary>

No. The gateway works with Kafka 3.x and 4.x, and the docs say "Kafka server and client versions 2.x or older are not supported." The client has to be upgraded first. Review: [Limits to know](#limits-to-know).

</details>

## Next steps

Next, we'll look at KRaft and Kafka 4.0: how Kafka runs without ZooKeeper, and which 4.0 changes can break older clients.
