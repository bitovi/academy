@page learn-graphql-102/introspection Introspection
@parent learn-graphql-102 3
@outline 2

@description Ask a GraphQL API to describe its own schema, and see what changes when introspection is turned off.

@body

## Overview

In this section, we will:

- Learn what introspection is, and which tools depend on it
- Explore the schema with introspection queries
- Turn introspection off, the way production APIs often do, and see what changes

## Objective 1: Ask the schema about itself

### What is introspection?

**Introspection** lets you query a GraphQL API about its own schema: what types it has, what fields each type has, and what arguments each field takes. You send it to the same endpoint, as an ordinary query.

Introspection is how Apollo Sandbox knew what to show you in 101. When Sandbox connects, it sends an introspection query and builds the **Documentation** panel and autocomplete from the answer. Code generators, editor plugins, and API gateways use it the same way.

Introspection queries use special fields that start with two underscores:

- **`__schema`**: the whole schema, including every type and the entry points (`queryType`, `mutationType`)
- **`__type(name:)`**: one type, by name
- **`__typename`**: the name of an object's type. You can ask for it on any object, not only in introspection queries.

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
        "fields": [
          { "name": "policies" },
          { "name": "policy" },
          { "name": "policyholders" },
          { "name": "policyholder" },
          { "name": "claims" }
        ]
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

Imagine you've just joined the claims team, and you want to know what a `Claim` looks like without reading the server's code.

✏️ In Apollo Sandbox, write one query that returns the name of every field on `Claim`, with each field's type. Your response should match this shape exactly:

```json
{
  "data": {
    "__type": {
      "name": "Claim",
      "fields": [
        { "name": "id", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "ID" } } },
        { "name": "claimNumber", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "String" } } },
        { "name": "amount", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "Float" } } },
        { "name": "status", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "ENUM", "name": "ClaimStatus" } } },
        { "name": "filedDate", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "SCALAR", "name": "String" } } },
        { "name": "policy", "type": { "kind": "NON_NULL", "name": null, "ofType": { "kind": "OBJECT", "name": "Policy" } } }
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
  __type(name: "Claim") {
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

Every `Claim` field is required, so every `type` is a `NON_NULL` wrapper, and the real type is one level down in `ofType`. A field whose type is wrapped more deeply, like `Policy.claims: [Claim!]!`, needs more `ofType` levels to reach the name. That's why tools that introspect a whole schema send much longer queries than this one.

</details>

## Objective 2: Turn introspection off

### Why production APIs turn it off

Introspection shows anyone who can reach your API the whole schema, including fields your own apps never use. That's what you want during development, but a public API can give attackers a map of every field to probe.

That's why Apollo Server turns introspection off by default when `NODE_ENV` is `production`. The course API turns it back on in **services/policies/src/index.ts**, so Sandbox works in the Codespace.

Turning introspection off hides the map, but it doesn't protect the data. Every field is still there for anyone who knows or guesses its name. Real protection comes from authorization and limits on expensive queries, which we'll cover in the Security section.

### Exercise 2

✏️ In **services/policies/src/index.ts**, turn introspection off.

✏️ Run your query from Exercise 1 again. It fails before any resolver runs:

```json
{
  "errors": [
    {
      "message": "GraphQL introspection is not allowed by Apollo Server, but the query contained __schema or __type. To enable introspection, pass introspection: true to ApolloServer in production",
      "extensions": {
        "validationErrorCode": "INTROSPECTION_DISABLED",
        "code": "GRAPHQL_VALIDATION_FAILED"
      }
    }
  ]
}
```

✏️ Reload Apollo Sandbox. It can no longer load the schema, so the **Documentation** panel and autocomplete stop working.

✏️ Run a query that isn't introspection, like this one. It still works, and `__typename` still works too:

```graphql
{
  claims(status: OPEN) {
    __typename
    claimNumber
  }
}
```

```json
{
  "data": {
    "claims": [
      { "__typename": "Claim", "claimNumber": "CLM-5004" },
      { "__typename": "Claim", "claimNumber": "CLM-5006" }
    ]
  }
}
```

✏️ Now ask for a field that doesn't exist: `{ claim { id } }`. Read the error message carefully:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"claim\" on type \"Query\". Did you mean \"claims\"?"
    }
  ]
}
```

Introspection is off, but the error message still suggests a real field name. Someone who guesses enough names can piece the schema back together. We'll look at closing that gap in the Security section.

✏️ Turn introspection back on in **services/policies/src/index.ts**, and reload Sandbox. The rest of the course uses it.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/index.ts**, change `introspection` to `false`:

```ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});
```

Apollo checks for introspection while it validates the query, the same step that rejects a misspelled field. That's why the error has the code `GRAPHQL_VALIDATION_FAILED` and no resolver runs.

`__typename` isn't blocked, because clients depend on it for ordinary queries. For example, Apollo Client combines `__typename` with `id` to identify each object in its cache.

To turn introspection back on, change `introspection` back to `true`.

</details>

## Next steps

Next, we'll look at pagination: returning a long list one page at a time.
