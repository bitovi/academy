@page learn-graphql-101/exploring-the-schema Exploring the Schema
@parent learn-graphql-101 5
@outline 2

@description Ask a GraphQL API to describe its own schema with introspection queries, and find out which type each object in a response is.

@body

## Overview

In this section, we will:

- Learn what introspection is, and which tools depend on it
- Explore the schema with introspection queries
- Ask for the type of any object with `__typename`

## Objective 1: Ask the schema about itself

### What is introspection?

**Introspection** lets you query a GraphQL API about its own schema: what types it has, what fields each type has, and what arguments each field takes. You send it to the same endpoint, as an ordinary query. The [GraphQL documentation](https://graphql.org/learn/introspection/) covers it as part of the basics, because every GraphQL server supports it.

Introspection is how Apollo Sandbox knows what to show you. When Sandbox connects, it sends an introspection query and builds the **Documentation** panel and autocomplete from the answer. Code generators, editor plugins, and API gateways use it the same way.

Introspection queries use special fields that start with two underscores:

- **`__schema`**: the whole schema, including every type and the entry points (`queryType`, `mutationType`)
- **`__type(name:)`**: one type, by name

For example, this query lists every field on `Query`:

```graphql
{
  __schema {
    queryType {
      fields {
        name
      }
    }
  }
}
```

```json
{
  "data": {
    "__schema": {
      "queryType": {
        "fields": [{ "name": "policies" }, { "name": "policy" }, { "name": "policyholders" }, { "name": "policyholder" }]
      }
    }
  }
}
```

### Reading a field's type

In the schema, a type like `[Policy!]!` reads as one piece. Introspection breaks it into layers. `NON_NULL` (the `!`) and `LIST` (the `[ ]`) are **wrappers** with no name of their own, and `ofType` points to what they wrap:

<table>
   <tr>
      <th>Schema</th>
      <th>Introspection</th>
   </tr>
   <tr>
      <td><code>String</code></td>
      <td><code>SCALAR</code> named <code>String</code></td>
   </tr>
   <tr>
      <td><code>String!</code></td>
      <td><code>NON_NULL</code> → <code>SCALAR</code> named <code>String</code></td>
   </tr>
   <tr>
      <td><code>[Policy!]!</code></td>
      <td><code>NON_NULL</code> → <code>LIST</code> → <code>NON_NULL</code> → <code>OBJECT</code> named <code>Policy</code></td>
   </tr>
</table>

Each field in the introspection result has a `kind` (`SCALAR`, `OBJECT`, `ENUM`, `LIST`, `NON_NULL`, and so on) and a `name`. Wrappers have a `name` of `null`.

### Exercise 1

Imagine you've just joined the team that owns this API, and you want to know what a `Policyholder` looks like without reading the server's code.

✏️ In Apollo Sandbox, write one query that returns the name of every field on `Policyholder`, with each field's type. Your response should be:

```json
{
  "data": {
    "__type": {
      "name": "Policyholder",
      "fields": [
        { "name": "id", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "ID" } } },
        { "name": "name", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "String" } } },
        { "name": "email", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "String" } } },
        { "name": "policies", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "LIST", "name": null } } }
      ]
    }
  }
}
```

<strong>Hint:</strong> Autocomplete works inside introspection queries too. Start typing `__type` and see what Sandbox suggests.

### Solution 1

<details>
<summary>Click to see the solution</summary>

```graphql
{
  __type(name: "Policyholder") {
    name
    fields {
      name
      type {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
}
```

Every `Policyholder` field is required, so every `type` is a `NON_NULL` wrapper, and the real type is one level down in `ofType`.

`policies` stops at `LIST`, because `[Policy!]!` is wrapped more deeply: `NON_NULL` → `LIST` → `NON_NULL` → `Policy`. Reaching the name `Policy` takes two more `ofType` levels. That's why tools that introspect a whole schema send much longer queries than this one.

</details>

## Objective 2: Find out an object's type

### `__typename`

**`__typename`** returns the name of an object's type. Unlike `__schema` and `__type`, you can ask for it on any object, in any query:

```graphql
{
  policies(type: AUTO) {
    __typename
    policyNumber
    policyholder {
      __typename
      name
    }
  }
}
```

```json
{
  "data": {
    "policies": [
      { "__typename": "Policy", "policyNumber": "AUTO-100001", "policyholder": { "__typename": "Policyholder", "name": "Maria Alvarez" } },
      { "__typename": "Policy", "policyNumber": "AUTO-100003", "policyholder": { "__typename": "Policyholder", "name": "James Okafor" } }
    ]
  }
}
```

Here the answer is obvious, but `__typename` matters in two places:

- **When a field can return more than one type.** You'll see this in GraphQL 102, where a mutation can return either a claim or a problem.
- **In client-side caches.** [Apollo Client](https://www.apollographql.com/docs/react/caching/overview), for example, stores each object under an ID made from its `__typename` and `id`, like `Policy:p1`. That's how it knows two responses contain the same policy.

## Next steps

Next, we'll look inside the server at the schema and resolvers, and add the missing `riskTier` argument ourselves.
