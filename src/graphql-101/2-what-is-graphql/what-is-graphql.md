@page learn-graphql-101/what-is-graphql What is GraphQL?
@parent learn-graphql-101 2
@outline 2

@description Learn what GraphQL is, how it compares to REST, and run your first query.

@body

## Overview

In this section, we will:

- Learn what GraphQL is (and what it isn't)
- Compare GraphQL to a REST API
- Weigh the benefits and trade-offs of using GraphQL
- Run our first query

## Objective 1: Understand GraphQL

### What is GraphQL?

GraphQL is a query language for APIs, plus a server runtime that answers those queries using functions you write.

GraphQL is **not a database**. It sits in front of your data sources: databases, REST APIs, or other services. The API in this course reads from a local JSON file, but the same API could read from Postgres without the client ever noticing.

GraphQL was created at Facebook in 2012, open-sourced in 2015, and is now governed by the GraphQL Foundation.

### GraphQL vs REST

Imagine we're building a screen for an insurance company that lists each policy with the name of its policyholder.

With a **REST API**, the server decides the shape of each response, and each resource lives at its own URL:

<div data-toolbar-order="">

```text
GET /policies           # returns every field of every policy
GET /policyholders/ph1  # then one request per policyholder...
GET /policyholders/ph2
GET /policyholders/ph3
```

</div>

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

<div data-toolbar-order="">

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

</div>

### Why teams choose GraphQL

- **Clients get exactly what they need.** A mobile screen and a desktop screen can ask for different fields from the same API.
- **Fewer round trips** for related data.
- **A strongly typed schema is the contract.** It powers tooling for free: autocomplete, documentation, validation, and code generation.
- **APIs evolve without versioning.** New fields can be added at any time, and old ones retired with `@deprecated` instead of shipping a `/v2`.
- **One graph over many services.** Several teams' APIs can be combined into a single graph, using federation. Federation has its own training.

### Trade-offs

- **Caching is harder.** Most clients send every query as a `POST` to the same URL, and browsers and CDNs don't cache `POST` requests. A server can also accept queries [as `GET` requests](https://graphql.org/learn/serving-over-http/#get-request-and-parameters), which can be cached, but that takes extra setup, like persisted queries. Many teams rely on client-side caches instead.
- **Nested queries can get expensive.** A client can ask for `policies → policyholder → policies → policyholder…` as deep as it likes. Production APIs add depth or complexity limits.
- **More upfront work.** You write a schema and resolvers. For a simple CRUD API, that may be overkill.
- **Errors look different.** A request the server can't parse or validate, like one asking for a field that doesn't exist, gets HTTP `400`. But a query that fails while it runs usually still gets [HTTP `200`](https://graphql.org/learn/serving-over-http/#status-codes), with the problem in an `errors` array next to `data`. Code that only checks the HTTP status misses those failures.

## Objective 2: Run your first query

You'll run queries in **Apollo Sandbox**, which you opened in [Course Setup](./setup.html).

### Exercise

✏️ In Apollo Sandbox, write a query that returns the response below, then click **Run**. It should have the same fields, in the same shape, and nothing extra. Your response should be:

<div data-toolbar-order="">

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

</div>

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

Next, we'll meet the policyholders and policies in the course API.
