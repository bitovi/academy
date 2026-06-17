@page learn-apis Learn APIs
@parent bit-academy 5

@description Learn how REST, WebHooks, and RPC work — and when to reach for each.

@body

## Overview

This guide covers three ways a backend exposes functionality to the outside world, and when to
reach for each:

1. **REST** — resources, HTTP methods, and the JSON:API convention: sparse fieldsets, pagination,
   relationships, and how it compares to GraphQL
2. **WebHooks** — letting a service call *you* when something happens, and verifying who's calling
3. **RPC** — calling a remote function as if it were local, with gRPC and Protobuf

## Outline

The guide begins with [learn-apis/rest REST], covering resources, HTTP verbs, and the JSON:API
conventions that standardize response shapes, pagination, and relationships — then compares REST
to GraphQL.

Next, [learn-apis/webhooks WebHooks] flips the request model: instead of polling, the service
calls you. You'll learn when to use them, how to handle duplicate deliveries, and how to verify
the sender's identity.

Finally, [learn-apis/rpc RPC] covers calling remote functions directly. gRPC, Protobuf, and
streaming are all explained, with guidance on when gRPC earns its complexity versus when REST is
the better fit.

## Next steps

✏️ Head over to the [first lesson](learn-apis/rest.html) to get started with REST.
