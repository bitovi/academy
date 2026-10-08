@page learn-federated-graphql-and-kafka Learn Federated GraphQL + Kafka
@parent bit-academy 5

@description Split one GraphQL API into separately owned APIs that apps query through one endpoint, then connect them with Kafka events and live updates.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other GraphQL, Node.js, Angular, React, CanJS and JavaScript problems.

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In [GraphQL 102](learn-graphql-102.html), you got one insurance API ready for real users. Now imagine the company has grown. Policies, claims, and billing each belong to a different team, and each team runs its own API. An app that shows a policy with its claims and payouts would have to call all three, and no team wants to wait on the others to ship.

This course solves both problems with two tools:

- **Federation** combines several GraphQL APIs into one schema. Each API in it is called a **subgraph**. Apps send every query to one endpoint, the **gateway**, which asks each subgraph for its part of the answer.
- **Kafka** carries events between the APIs. When a claim is approved, the Claims API publishes an event, and the Billing API records a payout without Claims ever calling Billing.

You own the Claims API. The Policies API, the Billing API, and a Claims Desk web app are already running, and scripts play the teams that own them. Along the way, those teams change their schemas, send you events, and send the same event twice, and you'll handle each one without editing their code.

<figure style="margin: 1em 0">
    <img src="./static/img/federated-graphql-and-kafka/course-system.svg" alt="The Claims Desk app and the traffic script send every query to Hive Gateway, which asks the Policies, Claims, and Billing APIs for their parts. Your Claims API publishes to the claim-events topic, which Billing reads, and reads the adjuster-events topic, which the Adjusting team's script writes to." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">What runs in the course Codespace. You write only the Claims API's code.</figcaption>
</figure>

After this course, you'll be able to:

- Turn an existing Apollo Server API into a subgraph, and query it through a gateway together with other teams' subgraphs
- Add fields to a type that another team's subgraph owns, without that team changing anything
- Read the errors you get when subgraphs don't fit together, and change a shared schema without breaking other teams or their apps
- Publish an event from a mutation in a way that doesn't lose it if Kafka is down
- Consume events correctly when the same event arrives more than once
- Push live claim updates to an app with a subscription that Kafka events feed, through the gateway

## Prerequisites

This course assumes you've completed [GraphQL 102](learn-graphql-102.html), or are comfortable with cursor pagination, error handling, authorization, and the idea of subscriptions in a GraphQL API.

You also need the basics of Kafka: topics, partitions, producers, and consumers. Confluent's free [Apache Kafka 101](https://developer.confluent.io/courses/apache-kafka/events/) course covers them. You don't need to install or run Kafka yourself: the course Codespace runs it for you.

## Outline

Most pages build one step in the life of a claim, from the moment it's filed to the moment the Claims Desk shows it approved.

<figure style="margin: 1em 0">
    <img src="./static/img/federated-graphql-and-kafka/claim-journey.svg" alt="A claim is filed through the gateway with status OPEN, a ClaimFiled event is published, an AdjusterAssigned event moves it to IN_REVIEW, approving it publishes ClaimApproved so Billing records a payout, and a subscription pushes the new status to the Claims Desk. Each step names the page that builds it." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">One claim's journey, and the page that builds each step.</figcaption>
</figure>

1. [Course Setup](learn-federated-graphql-and-kafka/setup.html): create the course Codespace and start Kafka, the gateway, and the other teams' APIs
2. [The System](learn-federated-graphql-and-kafka/the-system.html): see which team owns which API, what each one returns, and which events travel through Kafka
3. [Federation Basics](learn-federated-graphql-and-kafka/federation-basics.html): turn your Claims API into a subgraph and query claims through the gateway
4. [Entities](learn-federated-graphql-and-kafka/entities.html): add a policy's claims to the Policies team's `Policy` type without changing their API
5. [Changing a Shared Graph](learn-federated-graphql-and-kafka/changing-a-shared-graph.html): fix your API when another team's change stops the subgraphs from fitting together, and deprecate a field other teams use
6. [Publishing Events](learn-federated-graphql-and-kafka/publishing-events.html): publish an event every time a claim is filed or approved, without losing events when Kafka is down
7. [Consuming Events](learn-federated-graphql-and-kafka/consuming-events.html): update a claim when an adjuster is assigned, even when the same event arrives twice
8. [Live Updates](learn-federated-graphql-and-kafka/live-updates.html): push claim status changes to the Claims Desk with a subscription fed by Kafka
9. [Wrapping Up](learn-federated-graphql-and-kafka/wrapping-up.html): what you built, and where to go next
