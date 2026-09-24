@page learn-graphql-101/what-is-graphql What is GraphQL?
@parent learn-graphql-101 1
@outline 2

@description Learn what GraphQL is, how it compares to REST, and run your first query.

@body

## Overview

In this section, we will:

- Learn what GraphQL is (and what it isn't)
- Compare GraphQL to a REST API
- Weigh the benefits and trade-offs of using GraphQL
- Launch the course environment and run our first query

## Objective 1: Understand GraphQL

### What is GraphQL?

GraphQL is a query language for APIs, plus a server runtime that answers those queries using functions you write.

GraphQL is **not a database**. It sits in front of your data sources: databases, REST APIs, or other services. The API in this course reads from in-memory arrays, but the same API could read from Postgres without the client ever noticing.

GraphQL was created at Facebook in 2012, open-sourced in 2015, and is now governed by the GraphQL Foundation.

### GraphQL vs REST

Imagine we're building a screen for an insurance company that lists each policy with the name of its policyholder.

With a **REST API**, the server decides the shape of each response, and each resource lives at its own URL:

```shell
GET /policies           # returns every field of every policy
GET /policyholders/ph1  # then one request per policyholder...
GET /policyholders/ph2
GET /policyholders/ph3
```

This shows the two classic REST pain points:

- **Over-fetching**: `/policies` returns every field, even the ones the screen doesn't use.
- **Under-fetching**: one call isn't enough, so the client makes several round trips (or asks the backend team for a new endpoint).

With **GraphQL**, there is one endpoint, and the client describes exactly what it wants:

```graphql
{
  policies {
    policyNumber
    policyholder {
      name
    }
  }
}
```

The response has the same shape as the query:

```json
{
  "data": {
    "policies": [
      { "policyNumber": "AUTO-100001", "policyholder": { "name": "Maria Alvarez" } },
      { "policyNumber": "HOME-100002", "policyholder": { "name": "Maria Alvarez" } }
    ]
  }
}
```

### Why teams choose GraphQL

- **Clients get exactly what they need.** A mobile screen and a desktop screen can ask for different fields from the same API.
- **Fewer round trips** for related data.
- **A strongly typed schema is the contract.** It powers tooling for free: autocomplete, documentation, validation, and code generation.
- **APIs evolve without versioning.** New fields can be added at any time, and old ones retired with `@deprecated` instead of shipping a `/v2`.
- **One graph over many services.** Several teams' APIs can be combined into a single graph, which we'll explore in GraphQL 102.

### Trade-offs

- **Caching is harder.** Every request is a `POST` to the same URL, so standard HTTP caching by URL doesn't apply. Teams rely on client-side caches or persisted queries instead.
- **Nested queries can get expensive.** A client can ask for `policies → policyholder → policies → policyholder…` as deep as it likes. Production APIs add depth or complexity limits.
- **More upfront work.** You write a schema and resolvers. For a simple CRUD API, that may be overkill.
- **Errors look different.** A failed query often still returns HTTP `200`, with an `errors` array next to `data`.

## Objective 2: Run your first query

### Setup

The course environment runs in a GitHub Codespace, a cloud development environment that opens in your browser with everything preinstalled.

✏️ Click the button below to create a Codespace:

<a href="https://codespaces.new/bitovi/graphql-and-kafka-workshop?devcontainer_path=.devcontainer/101/devcontainer.json"><img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces"/></a>

✏️ Confirm these options, then click **Create codespace**:

<table>
   <tr>
      <th>Option</th>
      <th>Value</th>
   </tr>
   <tr>
      <td><strong>Repository</strong></td>
      <td><code>bitovi/graphql-and-kafka-workshop</code></td>
   </tr>
   <tr>
      <td><strong>Branch</strong></td>
      <td><code>main</code></td>
   </tr>
   <tr>
      <td><strong>Dev container configuration</strong></td>
      <td>GraphQL 101</td>
   </tr>
   <tr>
      <td><strong>Region</strong></td>
      <td>East US or West US</td>
   </tr>
   <tr>
      <td><strong>Machine type</strong></td>
      <td>8-core</td>
   </tr>
</table>

✏️ Once the Codespace finishes loading, run this in its terminal:

```shell
cd services/policies && npm run dev
```

You should see:

```shell
🚀 Policies service ready at http://0.0.0.0:4001/
```

Codespaces opens port `4001` in a new browser tab, showing **Apollo Sandbox**, an in-browser editor for writing and running GraphQL queries. If the tab doesn't open, open the **Ports** tab in the Codespace and click the globe icon next to port `4001`.

### Exercise

✏️ In Apollo Sandbox, write a query that returns the response below, then click **Run**. Your response should match this shape exactly, with the same fields and nothing extra:

```json
{
  "data": {
    "policies": [
      { "policyNumber": "AUTO-100001", "type": "AUTO" },
      { "policyNumber": "HOME-100002", "type": "HOME" },
      { "policyNumber": "AUTO-100003", "type": "AUTO" },
      { "policyNumber": "LIFE-100004", "type": "LIFE" },
      { "policyNumber": "RENTERS-100005", "type": "RENTERS" }
    ]
  }
}
```

<strong>Hint:</strong> The **Documentation** panel on the left lists every field you can ask for. For a starting point, look at the query in **GraphQL vs REST** above; you'll only need to change which fields it asks for.

### Solution

<details>
<summary>Click to see the solution</summary>

```graphql
{
  policies {
    policyNumber
    type
  }
}
```

Each field in the query appears in the response, in the same order and nesting.

</details>

## Next steps

Next we'll meet the policyholders and policies in the course API.
