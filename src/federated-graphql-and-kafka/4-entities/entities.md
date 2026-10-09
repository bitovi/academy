@page learn-federated-graphql-and-kafka/entities Entities
@parent learn-federated-graphql-and-kafka 4
@outline 2

@description Link claims and policies across subgraphs: add each policy's claims to the Policies team's type, and each claim's policy, without changing their API.

@body

## Overview

In this section, we will:

- Learn what an entity is, and how `@key` lets several subgraphs add fields to the same type
- See how the gateway asks another subgraph for an entity's fields
- Add a paginated `claims` field to the Policies team's `Policy` type
- Add a `policy` field to `Claim`, whose fields come from the Policies subgraph
- Learn why entity resolvers need batching

## Objective 1: Understand entities

### One type, several subgraphs

You've already queried a type that two subgraphs build together. `Policy` has `policyNumber` from the Policies subgraph and `totalPaidOut` from the Billing subgraph. That works because `Policy` is an **entity**.

Apollo's [entities guide](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/entities/intro) defines them: "Entities are objects that can be fetched with one or more unique key fields." The `@key` directive names those fields. For `Policy`, the key is `id`:

<div data-toolbar-order="">

```graphql
type Policy @key(fields: "id") {
  id: ID!
  policyNumber: String!
}
```

</div>

Any subgraph can declare the same entity, with the same key, and add its own fields. The guide says key fields "enable your router to associate fields from different subgraphs with the same entity instance": the gateway knows `p3` in one subgraph is `p3` in another.

### How the gateway fetches an entity's fields

When a query needs fields from two subgraphs, the gateway asks for them in steps. Take this query, which you'll be able to run by the end of this section:

<div data-toolbar-order="">

```graphql
{
  policies {
    policyNumber
    claims(first: 2) {
      edges {
        node {
          claimNumber
        }
      }
    }
  }
}
```

</div>

The gateway first asks the Policies subgraph for every policy, including its key, `id`. Then it sends your Claims subgraph a **representation** of each policy. A representation is "an object that contains the entity's `@key` fields, plus its `__typename` field," according to the guide. It looks like `{ "__typename": "Policy", "id": "p1" }`.

They go to the `_entities` field that `buildSubgraphSchema` adds. The [subgraph specification](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec) says the gateway "uses this entry point to directly fetch fields of entity objects. It combines those fields with other fields of the same entity that are returned by other subgraphs."

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/entities-query-plan.svg" alt="1: the gateway asks the Policies subgraph for every policy's policyNumber and id. 2: Policies returns p1 to p5. 3: in one request, it sends your Claims subgraph's _entities field a representation of each policy, its __typename and id. 4: Claims returns each policy's claims, in order. 5: the gateway merges both answers into one response." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">The gateway sends all five policies to your subgraph in one request.</figcaption>
</figure>

When this query runs, your Claims subgraph receives one request like this:

<div data-toolbar-order="">

```graphql
query ($representations: [_Any!]!) {
  _entities(representations: $representations) {
    ... on Policy {
      claims(first: 2) {
        edges {
          node {
            claimNumber
          }
        }
      }
    }
  }
}
```

</div>

Its `representations` variable holds all five policies, `p1` through `p5`.

For each representation, your subgraph calls the entity's **reference resolver**, `__resolveReference`. It turns a representation into the object the rest of your resolvers work with. The guide puts it this way: `@key` tells the router "This subgraph can resolve an instance of this entity if you provide its unique key," so the subgraph needs a reference resolver.

### How the Billing team did it

The Billing subgraph adds `payouts` and `totalPaidOut` to `Policy`. Its schema declares `Policy` with the same key, and only the fields Billing resolves:

<div data-toolbar-order="">

```graphql
extend schema @link(url: "https://specs.apollo.dev/federation/v2.9", import: ["@key"])

type Policy @key(fields: "id") {
  id: ID!
  payouts: [Payout!]!
  totalPaidOut: Float!
}
```

</div>

Its resolvers add a reference resolver for `Policy`. Billing doesn't store policies, so it returns just the id. Its field resolvers use that id:

<div data-toolbar-order="">

```ts
Policy: {
  __resolveReference: (reference: { id: string }) => ({ id: reference.id }),
  payouts: (policy: { id: string }) => payouts.filter((p) => p.policyId === policy.id),
},
```

</div>

The Policies team didn't change anything for this. Neither will they for yours.

## Objective 2: Add a policy's claims

### Exercise

✏️ Add a paginated `claims` field to `Policy`, from your Claims subgraph. It takes the same arguments as `claimsConnection`, and returns the same `ClaimConnection`, but only with that policy's claims:

<table>
   <tr>
      <th>Field</th>
      <th>Returns</th>
   </tr>
   <tr>
      <td><code>Policy.claims(first: Int!, after: String)</code></td>
      <td>A <code>ClaimConnection!</code> of the claims whose <code>policyId</code> is the policy's <code>id</code></td>
   </tr>
</table>

You'll change two files:

- **claims/src/schema.graphql**: import `@key` in your `@link`, and declare `Policy` as an entity with the new field.
- **claims/src/resolvers.ts**: add a reference resolver and a `claims` resolver for `Policy`.

**claims/src/pagination.ts** has a `paginate(items, args)` function. `claimsConnection` already uses it to turn a list into one page.

When you save, the `npm start` terminal should show `[compose] ✔ Composition successful`.

✏️ In the gateway explorer on port `4000`, run:

```graphql
{
  policies {
    policyNumber
    claims(first: 2) {
      edges {
        node {
          claimNumber
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
```

The response (trimmed for readability) starts with:

<div data-toolbar-order="">

```json
{
  "data": {
    "policies": [
      {
        "policyNumber": "AUTO-100001",
        "claims": {
          "edges": [
            { "node": { "claimNumber": "CLM-5001" } },
            { "node": { "claimNumber": "CLM-5002" } }
          ],
          "pageInfo": { "hasNextPage": false }
        }
      },
      {
        "policyNumber": "HOME-100002",
        "claims": {
          "edges": [
            { "node": { "claimNumber": "CLM-5003" } }
          ],
          "pageInfo": { "hasNextPage": false }
        }
      }
    ]
  }
}
```

</div>

`LIFE-100004` has no claims, so its `edges` is empty.

✏️ Open the Claims Desk on port `3000`. The label at the top says **Your Claims API: claims on every policy**, and each policy's claims appear in the **Claims** column, with their status.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, import `@key`:

```graphql
extend schema @link(url: "https://specs.apollo.dev/federation/v2.9", import: ["@key"])
```

✏️ At the end of the file, add the `Policy` entity:

```graphql
"A policy. The Policies team owns it; the Claims API adds each policy's claims."
type Policy @key(fields: "id") {
  id: ID!
  claims(first: Int!, after: String): ClaimConnection!
}
```

✏️ In **claims/src/resolvers.ts**, add a `Policy` entry to `resolvers`, after `Mutation`:

```ts
  Policy: {
    // The gateway sends a policy's id; the Policies team has the rest of it.
    __resolveReference: (reference: { id: string }) => ({ id: reference.id }),
    claims: (policy: { id: string }, args: { first: number; after?: string }) =>
      paginate(claims.filter((c) => c.policyId === policy.id), args),
  },
```

</details>

## Objective 3: Add each claim's policy

### Returning an entity you don't own

A claim stores only its policy's id. To return the whole policy, your subgraph doesn't need the Policies team's data. It returns a reference, and the gateway fetches the rest from the Policies subgraph, the same way it fetched `claims` from yours.

Your `Policy` type already has the key. So a resolver that returns `{ id: "p3" }` for a `Policy` field is enough.

### Exercise

✏️ Add a `policy` field to `Claim`, which returns the claim's `Policy!`. Change **claims/src/schema.graphql** and **claims/src/resolvers.ts**.

✏️ In the gateway explorer, run:

```graphql
{
  claims(status: OPEN) {
    claimNumber
    policy {
      policyNumber
      policyholder {
        name
      }
    }
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "claims": [
      {
        "claimNumber": "CLM-5004",
        "policy": {
          "policyNumber": "AUTO-100003",
          "policyholder": { "name": "James Okafor" }
        }
      },
      {
        "claimNumber": "CLM-5006",
        "policy": {
          "policyNumber": "RENTERS-100005",
          "policyholder": { "name": "Priya Raman" }
        }
      }
    ]
  }
}
```

</div>

Your subgraph answered `claims`, but only returned `{ __typename: "Policy", id: "p3" }` for each `policy`. The gateway took those representations to the Policies subgraph, which filled in `policyNumber` and `policyholder`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, add the field to `Claim`:

```graphql
  "The policy this claim is against"
  policy: Policy!
```

✏️ In **claims/src/resolvers.ts**, add a `Claim` entry to `resolvers`:

```ts
  Claim: {
    // Return just the policy's id. The gateway gets its
    // other fields from the Policies subgraph.
    policy: (claim: Claim) => ({ id: claim.policyId }),
  },
```

</details>

## Objective 4: Batch entity lookups

### The N+1 problem across subgraphs

The gateway sent all five policies in one `_entities` request, so there's no N+1 problem between the gateway and your subgraph. But inside your subgraph, the work is still done one policy at a time. Apollo's guide to [handling the N+1 problem](https://www.apollographql.com/docs/graphos/schema-design/guides/handling-n-plus-one) explains: the reference resolver "doesn't take a list of keys but rather a single key. Therefore, the subgraph library calls the reference resolver once for each key."

Your resolvers filter a list in memory, so that's fine here. With a database, five policies would mean five queries. The guide's answer is the same one you'd use in any GraphQL API: "The solution for the N+1 problem—whether for federated or monolithic graphs—is the DataLoader pattern."

The Policies team does this. Every claim's `policy` reaches their reference resolver, which loads policies through a DataLoader created for each request:

<div data-toolbar-order="">

```ts
Policy: {
  __resolveReference: (reference: { id: string }, contextValue: Context) =>
    contextValue.loaders.policy.load(reference.id),
},
```

</div>

When your `claims(status: OPEN)` query returned two claims, their two policies were looked up in one batch.

## Next steps

Next, we'll see what happens when another team changes their subgraph in a way that no longer fits yours, and how to change a shared schema without breaking anyone.
