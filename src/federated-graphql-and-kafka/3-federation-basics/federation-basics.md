@page learn-federated-graphql-and-kafka/federation-basics Federation Basics
@parent learn-federated-graphql-and-kafka 3
@outline 2

@description Turn your Claims API into a subgraph, and add it to the gateway so apps can query claims alongside policies and payouts.

@body

## Overview

In this section, we will:

- Learn how a gateway combines several APIs into one
- Read the combined schema the gateway serves
- Turn your Claims API into a subgraph
- Add your subgraph to the gateway, and query claims through it

## Objective 1: Understand how federation works

### Subgraphs, the supergraph, and the gateway

Federation has a few terms of its own. Apollo's [federation overview](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/federation) defines them:

- A **subgraph** is one of the APIs being combined. The Policies, Billing, and Claims APIs are subgraphs.
- The **supergraph** is the single API you get by combining them.
- The **router** is the single entry point clients send requests to. This course uses [Hive Gateway](https://the-guild.dev/graphql/hive/docs/gateway), which plays the same part, so we call it the **gateway**.

A subgraph is a normal GraphQL API, with a little more added so the gateway can read its schema. You'll add that to your Claims API in the next objective.

### Composition

Before the gateway can answer a query, it needs one schema that covers every subgraph. Building it is called **composition**: ["the process of combining a set of subgraph schemas into a supergraph schema"](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/composition).

The supergraph schema has every type and field from every subgraph. It also records which subgraph resolves each field. That's how the gateway knows where to send each part of a query.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/composition.svg" alt="The Policies subgraph defines Policy with policyNumber and annualPremium. The Billing subgraph adds payouts and totalPaidOut to the same Policy type. Your Claims subgraph defines Claim. Composing them produces one supergraph schema, where Policy has every field and each field is marked with the subgraph that resolves it. The gateway serves the supergraph." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Composition merges the subgraphs' schemas, and remembers which subgraph owns each field.</figcaption>
</figure>

Two subgraphs can both define `Policy`. The Billing API adds `payouts` and `totalPaidOut` to the Policies team's `Policy` type. The `@key` you see on both is what makes that possible. You'll use it yourself in the Entities section.

Composition also checks that the subgraphs fit together. If two subgraphs disagree, for example by giving the same field different types, composition fails and the gateway keeps its last working supergraph. Apollo calls this [breaking composition](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/composition). You'll cause and fix this in the Changing a Shared Graph section.

In production, a schema registry such as Hive or Apollo GraphOS composes the supergraph whenever a team publishes a new subgraph schema. In this course, the `npm start` terminal does it with the Hive CLI's [`hive dev` command](https://the-guild.dev/graphql/hive/docs/api-reference/cli), which is meant for composing local subgraphs. Lines starting with `[compose]` come from it. It composes again whenever a subgraph's schema changes, and writes the result to **gateway/supergraph.graphql**. The gateway reloads that file when it changes.

✏️ Open **gateway/supergraph.graphql**, and find `enum join__Graph`. It lists the subgraphs in the supergraph, with the URL of each (trimmed for readability):

<div data-toolbar-order="">

```graphql
enum join__Graph {
  BILLING @join__graph(name: "billing", url: "...")
  POLICIES @join__graph(name: "policies", url: "...")
}
```

</div>

✏️ Find `type Policy`. Each field says which subgraph resolves it (trimmed and wrapped for readability):

<div data-toolbar-order="">

```graphql
type Policy
  @join__type(graph: BILLING, key: "id")
  @join__type(graph: POLICIES, key: "id") {
  id: ID!
  payouts: [Payout!]! @join__field(graph: BILLING)
  totalPaidOut: Float! @join__field(graph: BILLING)
  policyNumber: String! @join__field(graph: POLICIES)
  type: PolicyType! @join__field(graph: POLICIES)
}
```

</div>

When you queried `policies { policyNumber totalPaidOut }` in Course Setup, the gateway read these lines. It asked the Policies subgraph for `policyNumber`, and the Billing subgraph for `totalPaidOut`.

Your Claims API isn't in this file yet. Clients can't reach it through the gateway, because the gateway doesn't know it exists.

## Objective 2: Turn your Claims API into a subgraph

### What makes an API a subgraph

The gateway can't use ordinary introspection to read a subgraph's schema. Apollo's [subgraph specification](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec) explains why: "The built-in introspection query's response does not include the uses of any directives," and composition needs federation directives like `@key`.

So a subgraph adds two things to its schema:

- **`@link` to the federation specification.** It's applied to the schema itself, with `extend schema`, and says which version of federation the subgraph uses. The specification says subgraphs "opt in to Federation v2 features by applying the `@link` directive to the `schema` type."
- **A `_service` field on `Query`.** `_service { sdl }` returns the subgraph's schema as text, with every directive included. This is what `hive dev` reads.

You don't write `_service` yourself. The [`@apollo/subgraph`](https://www.npmjs.com/package/@apollo/subgraph) package's `buildSubgraphSchema` function adds it. Once a schema has entities, it adds an `_entities` field too, which you'll meet in the Entities section. The package is already installed in your Claims API.

### How the Policies team did it

The Policies subgraph starts its schema with `@link`:

<div data-toolbar-order="">

```graphql
extend schema @link(url: "https://specs.apollo.dev/federation/v2.9", import: ["@key"])
```

</div>

`import: ["@key"]` lets their schema use `@key`. Your schema doesn't need any federation directives yet, so you can leave `import` out.

Their server builds its schema with `buildSubgraphSchema`. It takes a list of modules, each with a parsed schema document (`typeDefs`) and its resolvers. `parse`, from the `graphql` package, turns the schema file's text into a document:

<div data-toolbar-order="">

```ts
import { buildSubgraphSchema } from "@apollo/subgraph";
import { parse } from "graphql";

const typeDefs = parse(readFileSync(new URL("./schema.graphql", import.meta.url), "utf8"));

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});
```

</div>

Your Claims API builds its schema once, in **claims/src/index.ts**, and passes the same `schema` to both Apollo Server and the WebSocket server. So you only need to change how `schema` is built.

### Exercise

✏️ Turn your Claims API into a subgraph:

- In **claims/src/schema.graphql**, link the schema to version 2.9 of the federation specification.
- In **claims/src/index.ts**, build `schema` with `buildSubgraphSchema` instead of `makeExecutableSchema`.

When you save, your Claims API restarts. The terminal should show:

<div data-toolbar-order="">

```text
🚀 Claims API ready at http://localhost:4002/graphql
```

</div>

✏️ In Apollo Sandbox on port `4002`, run:

```graphql
{
  _service {
    sdl
  }
}
```

The response (trimmed for readability) starts with your `@link`, followed by the rest of your schema:

<div data-toolbar-order="">

```json
{
  "data": {
    "_service": {
      "sdl": "extend schema @link(url: \"https://specs.apollo.dev/federation/v2.9\")\n\n\"A date without a time, like 2026-10-01\"\nscalar LocalDate ..."
    }
  }
}
```

</div>

### Verify

✏️ Your queries still work as before. In Apollo Sandbox on port `4002`, run:

```graphql
{
  claims(status: OPEN) {
    claimNumber
  }
}
```

You should see `CLM-5004` and `CLM-5006`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, add this line at the top:

```graphql
extend schema @link(url: "https://specs.apollo.dev/federation/v2.9")
```

✏️ In **claims/src/index.ts**, replace the `makeExecutableSchema` import with these two:

```ts
import { buildSubgraphSchema } from "@apollo/subgraph";
import { parse } from "graphql";
```

✏️ Replace the two lines that build the schema:

```ts
const typeDefs = parse(readFileSync(new URL("./schema.graphql", import.meta.url), "utf8"));
const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);
```

</details>

## Objective 3: Add your subgraph to the gateway

### The list of subgraphs

**gateway/subgraphs.json** lists the subgraphs the supergraph is composed from. Each entry is a subgraph's name and the URL the gateway sends its queries to:

<div data-toolbar-order="">

```json
{
  "policies": "http://localhost:4001/graphql",
  "billing": "http://localhost:4003/graphql"
}
```

</div>

When this file changes, the `npm start` terminal starts composing again, with the new list.

### Exercise

✏️ Add your Claims API to the gateway's subgraphs. Your API runs at `http://localhost:4002/graphql`. Name it `claims`.

When you save, the `npm start` terminal should show:

<div data-toolbar-order="">

```text
[compose] subgraphs.json changed. Restarting.
...
[compose] ✔ Composition successful
```

</div>

If it shows `Waiting for claims to become a subgraph`, your Claims API doesn't have a `_service` field yet. Finish the exercise in Objective 2. Composing starts on its own once it does.

✏️ In the gateway explorer on port `4000`, run a query that uses two subgraphs:

```graphql
{
  policies {
    policyNumber
  }
  claims(status: OPEN) {
    claimNumber
    policyId
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "policies": [
      { "policyNumber": "AUTO-100001" },
      { "policyNumber": "HOME-100002" },
      { "policyNumber": "AUTO-100003" },
      { "policyNumber": "LIFE-100004" },
      { "policyNumber": "RENTERS-100005" }
    ],
    "claims": [
      { "claimNumber": "CLM-5004", "policyId": "p3" },
      { "claimNumber": "CLM-5006", "policyId": "p5" }
    ]
  }
}
```

</div>

The gateway sent `policies` to the Policies subgraph and `claims` to yours, then put the answers together.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/claims-in-graph.svg" alt="The Claims Desk queries the gateway on port 4000, which now asks the Policies, Billing, and Claims APIs for their parts. Your Claims API is connected because it's listed in subgraphs.json." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Your Claims API is now part of the supergraph.</figcaption>
</figure>

✏️ Open the Claims Desk on port `3000`. The label at the top now says **Your Claims API: in the graph, not linked to policies yet**, and the **Claims** column says **Waiting for claims to be linked to policies**.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **gateway/subgraphs.json** to:

```json
{
  "policies": "http://localhost:4001/graphql",
  "billing": "http://localhost:4003/graphql",
  "claims": "http://localhost:4002/graphql"
}
```

</details>

## What's still missing

The response above has a problem. Each claim has a `policyId`, but there's no way to ask for the policy itself. And each policy has no `claims`. To show a policy's claims, the Claims Desk would have to fetch every claim and match the ids itself.

The two subgraphs are in the same supergraph, but their types don't know about each other yet. That's what entities are for.

## Next steps

Next, we'll link claims and policies across subgraphs, so a single query can go from a policy to its claims and back, without changing the Policies team's API.
