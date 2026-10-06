@page bitovian/kafka-state-farm-prep/confluent-gateway Confluent Gateway
@parent bitovian/kafka-state-farm-prep 2
@outline 2

@description Learn what Confluent Gateway does, how routes and streaming domains work, and its limits.

@body

## Overview

In this section, we will:

- Learn what Confluent Gateway does and why teams put it in front of Kafka
- See how routes and streaming domains send clients to the right cluster
- Learn how clients authenticate through the gateway
- Go over its limits

[Confluent Private Cloud Gateway](https://docs.confluent.io/private-cloud-gateway/current/overview.html), which the docs shorten to Confluent Gateway, is a proxy for Kafka traffic. Clients connect to the gateway instead of connecting to brokers directly, and the gateway forwards their requests to the right cluster.

Unlike a general-purpose network proxy, it understands the Kafka protocol. That lets it change the broker addresses it hands back to clients and apply security rules to each request.

## Why use it

The [docs](https://docs.confluent.io/private-cloud-gateway/current/overview.html) list these uses:

- **Moving to a new cluster**: point the gateway at the new cluster, and clients follow without any change to their code or configuration.
- **Disaster recovery**: switch clients to a backup cluster right away when the main one fails.
- **Safer Kafka upgrades**: run the new Kafka version alongside the old one, move traffic over a bit at a time, and switch back if something goes wrong.
- **One place for security**: require mTLS and authentication at the gateway, instead of configuring every cluster separately.
- **Partner access**: let an outside company reach a private cluster without opening the cluster itself up.

## Routes and streaming domains

Two terms show up throughout the gateway docs:

- A **streaming domain** stands for one real Kafka cluster behind the gateway.
- A **route** is an address that clients connect to. Each route points at a streaming domain.

Clients only ever know about the route. To move clients to another cluster, an operator points the route at a different streaming domain.

## How clients authenticate

The gateway handles client credentials in one of two ways:

- **Passthrough**: the gateway passes the client's own identity on to the cluster.
- **Swapping**: the client signs in to the gateway, and the gateway uses its own credentials to talk to the cluster.

The gateway supports mTLS, SASL/PLAIN, SASL/SCRAM, OAuth, and OIDC for client sign-in.

## Limits to know

From the [docs](https://docs.confluent.io/private-cloud-gateway/current/overview.html):

- It works with Kafka clients and brokers on Kafka 3.x and 4.x, not 2.x.
- It runs as a central service, deployed with Docker or [Confluent for Kubernetes](https://docs.confluent.io/operator/current/gateway/co-gateway-overview.html), not as a sidecar next to each application.
- It only proxies Kafka traffic. Schema Registry calls go straight to Schema Registry.

## Confluent Cloud Gateway is a different product

You'll also see [Confluent Cloud Gateway](https://docs.confluent.io/cloud/current/cp-component/gateway/overview.html) in Confluent's docs. It connects your own Kafka clients and clusters to Confluent Cloud. The docs say the two "share the same underlying proxy technology, but are separate, independently licensed products." Make sure you're reading the Private Cloud Gateway docs when the question is about Confluent Private Cloud.
