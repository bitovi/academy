@page learn-graphql-101/schemas-and-resolvers Schemas and Resolvers
@parent learn-graphql-101 4
@outline 2

@description Learn how a GraphQL schema and its resolvers work together, then extend both to add a new query argument.

@body

## Overview

In this section, we will:

- Read a GraphQL schema
- Learn what resolvers are and how they receive arguments
- Understand default resolvers
- Add a `riskTier` argument to the `policies` query

## Objective 1: Read the schema

### The schema is the contract

The **schema** describes everything a client can ask for and what comes back. Ours lives in **services/policies/src/schema.graphql**:

```graphql
type Policy {
  id: ID!
  policyNumber: String!
  type: PolicyType!
  monthlyPremium: Float!
  effectiveDate: String!
  riskTier: String
  policyholder: Policyholder!
}

enum PolicyType {
  AUTO
  HOME
  LIFE
  RENTERS
}

type Query {
  policies(type: PolicyType): [Policy!]!
  policy(id: ID!): Policy
  policyholders: [Policyholder!]!
  policyholder(id: ID!): Policyholder
}
```

A few things to notice:

- **Types and fields**: `Policy` is an object type with fields. `ID`, `String`, `Float`, `Int`, and `Boolean` are built-in scalar types.
- **`!` means non-null**: `policyNumber: String!` always has a value. `riskTier: String` may be `null`.
- **`[Policy!]!` is a list**: a non-null list of non-null policies.
- **Enums**: `PolicyType` limits a value to a fixed set.
- **`Query` is special**: its fields are the entry points for reading data. `policies(type: PolicyType)` declares the argument we used in the last section.

## Objective 2: Understand resolvers

### A resolver supplies one field's data

A **resolver** is a function that returns the data for one field. Ours live in **services/policies/src/resolvers.ts**:

```ts
export const resolvers = {
  Query: {
    policies: (_: unknown, args: { type?: PolicyType }) =>
      args.type ? policies.filter((p) => p.type === args.type) : policies,
    // ...
  },
  Policy: {
    policyholder: (policy: Policy) =>
      policyholders.find((ph) => ph.id === policy.policyholderId),
  },
};
```

Apollo matches resolvers to the schema by name: `resolvers.Query.policies` answers the `policies` field on `type Query`.

Every resolver receives four arguments: `(parent, args, contextValue, info)`.

- **`parent`** is the object that owns the field. `Query` fields have no parent, so `policies` ignores it (`_`).
- **`args`** holds the query's arguments. `policies(type: AUTO)` calls the resolver with `{ type: "AUTO" }`.
- **`contextValue`** is shared by every resolver in a request. It's typically where the logged-in user or a database connection lives.
- **`info`** describes the query itself.

### Resolvers chain together

In `policies { policyholder { name } }`:

1. `Query.policies` runs once and returns a list of policies.
2. `Policy.policyholder` runs once **for each policy**, receiving that policy as `parent`. That's how it can read `policy.policyholderId`.

If a query doesn't ask for `policyholder`, `Policy.policyholder` never runs.

### Default resolvers

There's no resolver for `Policy.policyNumber`, yet it works. When a field has no resolver, GraphQL uses a **default resolver**, which returns the property with the same name from the parent object.

## Objective 3: Add a query argument

### Setup 3

✏️ If your server isn't running, start it in the Codespace terminal:

```shell
cd services/policies && npm run dev
```

The server restarts automatically every time you save a file.

### Exercise 3

Let's make the query from the last section work:

```graphql
{
  policies(riskTier: "HIGH") {
    policyNumber
    riskTier
  }
}
```

✏️ Update **services/policies/src/schema.graphql** and **services/policies/src/resolvers.ts** so that `policies` can be filtered by `riskTier`, `type`, both, or neither.

<strong>Hint:</strong> Declaring an argument in the schema only gets it into `args`. The resolver still has to use it.

### Verify 3

✏️ In Apollo Sandbox, confirm that:

- `policies(riskTier: "HIGH")` returns only `AUTO-100003`
- `policies(type: AUTO, riskTier: "MEDIUM")` returns only `AUTO-100001`
- `policies` with no arguments still returns all five policies

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ Update the `policies` field in **services/policies/src/schema.graphql**:

```graphql
type Query {
  policies(type: PolicyType, riskTier: String): [Policy!]!
  policy(id: ID!): Policy
  policyholders: [Policyholder!]!
  policyholder(id: ID!): Policyholder
}
```

✏️ Update the `policies` resolver in **services/policies/src/resolvers.ts**:

```ts
    policies: (_: unknown, args: { type?: PolicyType; riskTier?: string }) =>
      policies.filter((p) => {
        // A type was requested, and this policy isn't that type
        if (args.type && p.type !== args.type) return false;
        // A risk tier was requested, and this policy isn't that tier
        if (args.riskTier && p.riskTier !== args.riskTier) return false;
        // Passed every filter that was requested
        return true;
      }),
```

`filter` calls the function once for each policy (`p`) and keeps the ones that return `true`. A filter only applies when its argument was provided, so `type` and `riskTier` can be combined or left out.

Experienced Node developers will often write the same logic as a single expression:

```ts
      policies.filter(
        (p) =>
          (!args.type || p.type === args.type) &&
          (!args.riskTier || p.riskTier === args.riskTier)
      ),
```

Each line reads as "no filter was requested, **or** this policy matches it." Both versions behave identically.

</details>

## Next steps

Next we'll change data with mutations.
