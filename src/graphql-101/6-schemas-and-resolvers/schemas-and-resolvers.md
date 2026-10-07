@page learn-graphql-101/schemas-and-resolvers Schemas and Resolvers
@parent learn-graphql-101 6
@outline 2

@description Learn how a GraphQL schema and its resolvers work together, then extend both to add a new query argument.

@body

## Overview

In this section, we will:

- Read a GraphQL schema
- Learn what resolvers are and how they receive arguments
- Understand default resolvers, and add a calculated field that needs its own resolver
- Add a `riskTier` argument to the `policies` query

## Objective 1: Read the schema

### The schema is the contract

The **schema** describes everything a client can ask for and what comes back. Ours lives in **services/policies/src/schema.graphql**. Here's part of it, with the descriptions left out:

<div data-toolbar-order="">

```graphql
type Policy {
  id: ID!
  policyNumber: String!
  type: PolicyType!
  monthlyPremium: Float!
  effectiveDate: String!
  riskTier: RiskTier
  policyholder: Policyholder!
}

enum PolicyType {
  AUTO
  HOME
  LIFE
  RENTERS
}

enum RiskTier {
  LOW
  MEDIUM
  HIGH
}

type Query {
  policies(type: PolicyType): [Policy!]!
  policy(id: ID!): Policy
  policyholders: [Policyholder!]!
  policyholder(id: ID!): Policyholder
}
```

</div>

A few things to notice:

- **Types and fields**: `Policy` is an object type with fields. `ID`, `String`, `Float`, `Int`, and `Boolean` are built-in scalar types.
- **`!` means non-null**: `policyNumber: String!` always has a value. `riskTier: RiskTier` may be `null`.
- **`[Policy!]!` is a list**: a non-null list of non-null policies.
- **Enums**: `PolicyType` and `RiskTier` limit a value to a fixed set.
- **`Query` is special**: its fields are the entry points for reading data. `policies(type: PolicyType)` declares the argument you used in the Writing Queries section.
- **Descriptions**: in the real file, many types and fields have a string just above them, like `"Monthly premium in US dollars"` above `monthlyPremium`. That string is the field's **description**. Apollo Sandbox shows it in the Documentation panel. A description that needs more than one line uses three quotes on each side, `"""like this"""`.

## Objective 2: Understand resolvers

### A resolver supplies one field's data

A **resolver** is a function that returns the data for one field. Ours live in **services/policies/src/resolvers.ts**:

<div data-toolbar-order="">

```ts
export const resolvers = {
  Query: {
    policies: (_: unknown, args: { type?: PolicyType }) =>
      policies.filter((p) => {
        if (args.type && p.type !== args.type) return false;
        return true;
      }),
    // ...
  },
  Policy: {
    policyholder: (policy: Policy) =>
      policyholders.find((ph) => ph.id === policy.policyholderId),
  },
};
```

</div>

Apollo matches resolvers to the schema by name: `resolvers.Query.policies` answers the `policies` field on `type Query`.

Every resolver receives four arguments: `(parent, args, contextValue, info)`.

- **`parent`** is the object that owns the field. `Query` fields have no parent, so `policies` ignores it (`_`).
- **`args`** holds the query's arguments. `policies(type: AUTO)` calls the resolver with `{ type: "AUTO" }`.
- **`contextValue`** is shared by every resolver in a request. It's typically where the logged-in user or a database connection lives.
- **`info`** describes the query itself.

### Reading the `policies` resolver

Here's what each part of `Query.policies` does:

- **`args: { type?: PolicyType }`** lists the arguments this resolver expects. `type` is the argument from `policies(type: PolicyType)` in the schema. The `?` means it's optional: `args.type` is empty when the query doesn't pass a `type`.
- **`policies.filter((p) => { ... })`** goes through every policy, one at a time, calling each one `p`. It keeps a policy when the code inside returns `true` and leaves it out when it returns `false`.
- **`if (args.type && p.type !== args.type) return false;`** reads as: "if a type was requested, **and** this policy isn't that type, leave it out."
- **`return true;`** keeps every policy that wasn't left out.

So `policies(type: AUTO)` returns only the auto policies, and `policies` with no arguments returns all of them.

The `if` line is a **filter**. Each argument you want to filter by gets its own `args` entry and its own `if` line, in the same shape.

### Resolvers chain together

In `policies { policyholder { name } }`:

1. `Query.policies` runs once and returns a list of policies.
2. `Policy.policyholder` runs once **for each policy**, receiving that policy as `parent`. That's how it can read `policy.policyholderId`.

If a query doesn't ask for `policyholder`, `Policy.policyholder` never runs.

### Default resolvers

Look back at the resolvers above. There's a resolver for `Policy.policyholder`, but none for `Policy.policyNumber`, `Policy.type`, or any other `Policy` field. Yet all of them work.

When a field has no resolver, GraphQL uses a **default resolver**. It returns the property with the same name from the parent object. In `policies { policyNumber }`, `Query.policies` returns objects from **services/policies/src/data.ts** like this one:

<div data-toolbar-order="">

```ts
{ id: "p1", policyNumber: "AUTO-100001", type: "AUTO", monthlyPremium: 142.5, /* ... */ policyholderId: "ph1" }
```

</div>

For each policy, GraphQL resolves `policyNumber` by reading `policy.policyNumber`. You get this for free whenever the schema's field names match your data's property names.

**The default resolver only reads properties. It can't compute anything.** Two things follow from that:

- **Data can have properties the schema doesn't expose.** `policyholderId` is on every policy object, but it isn't a field on `type Policy`, so clients can't ask for it. The `Policy.policyholder` resolver uses it behind the scenes.
- **A field with no matching property comes back as `null`.** If the schema declares a field that isn't in the data and has no resolver, the default resolver finds nothing. For a non-null field (`!`), that's an error.

When a field's value has to be looked up or calculated, write a resolver for it, the way `Policy.policyholder` looks up a policyholder from `policyholderId`.

### Exercise

Billing wants to show each policy's yearly cost, which is its `monthlyPremium` times 12. We'll add this as an `annualPremium` field. The data doesn't have an `annualPremium` property, so the server will calculate it.

This exercise has two parts. The first one breaks things on purpose.

**Part 1: Add the field to the schema only.**

✏️ In **services/policies/src/schema.graphql**, add a required `annualPremium` field to the `Policy` type. It's a dollar amount, like `monthlyPremium`, so give it the same kind of type. Don't add a resolver yet.

The server restarts automatically every time you save a file.

✏️ Run this query:

```graphql
{
  policies {
    policyNumber
    monthlyPremium
    annualPremium
  }
}
```

The query fails. The response (trimmed for readability) is:

<div data-toolbar-order="">

```json
{
  "errors": [{ "message": "Cannot return null for non-nullable field Policy.annualPremium." }],
  "data": null
}
```

</div>

The schema accepted the new field, so the request passed validation. But no resolver was written for `annualPremium`, so the default resolver ran. It looked for `policy.annualPremium`, found nothing, and returned `null`, which breaks the `!`.

**Part 2: Add the resolver.**

✏️ In **services/policies/src/resolvers.ts**, add a resolver so `annualPremium` returns the policy's yearly cost.

<strong>Hint:</strong> Look at how `Policy.policyholder` gets the policy it's resolving a field for.

✏️ Run the query from Part 1 again. Your response should be:

<div data-toolbar-order="">

```json
{
  "data": {
    "policies": [
      { "policyNumber": "AUTO-100001", "monthlyPremium": 142.5, "annualPremium": 1710 },
      { "policyNumber": "HOME-100002", "monthlyPremium": 98, "annualPremium": 1176 },
      { "policyNumber": "AUTO-100003", "monthlyPremium": 210.75, "annualPremium": 2529 },
      { "policyNumber": "LIFE-100004", "monthlyPremium": 45, "annualPremium": 540 },
      { "policyNumber": "RENTERS-100005", "monthlyPremium": 18.25, "annualPremium": 219 }
    ]
  }
}
```

</div>

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, add the field to `Policy`:

```graphql
type Policy {
  id: ID!
  policyNumber: String!
  type: PolicyType!
  monthlyPremium: Float!
  annualPremium: Float!
  effectiveDate: String!
  riskTier: RiskTier
  policyholder: Policyholder!
}
```

✏️ In **services/policies/src/resolvers.ts**, add an `annualPremium` resolver next to `policyholder`:

```ts
  Policy: {
    policyholder: (policy: Policy) => policyholders.find((ph) => ph.id === policy.policyholderId),
    annualPremium: (policy: Policy) => policy.monthlyPremium * 12,
  },
```

Like `policyholder`, `annualPremium` receives the policy as `parent`. Every other `Policy` field still uses the default resolver.

The resolver runs only when a query asks for `annualPremium`, so the calculation costs nothing for queries that don't use it.

</details>

## Objective 3: Add a query argument

### Exercise

Let's make the query that failed in the Writing Queries section work:

```graphql
{
  policies(riskTier: HIGH) {
    policyNumber
    riskTier
  }
}
```

✏️ Update **services/policies/src/schema.graphql** and **services/policies/src/resolvers.ts** so that `policies` can be filtered by `riskTier`, `type`, both, or neither.

<strong>Hint:</strong> Declaring an argument in the schema only gets it into `args`. The resolver still has to use it.

✏️ Run the query above. Your response should be:

<div data-toolbar-order="">

```json
{ "data": { "policies": [{ "policyNumber": "AUTO-100003", "riskTier": "HIGH" }] } }
```

</div>

✏️ Combine both filters:

```graphql
{
  policies(type: AUTO, riskTier: MEDIUM) {
    policyNumber
    riskTier
  }
}
```

Your response should be:

<div data-toolbar-order="">

```json
{ "data": { "policies": [{ "policyNumber": "AUTO-100001", "riskTier": "MEDIUM" }] } }
```

</div>

### Verify

✏️ Run `policies` with no arguments:

```graphql
{
  policies {
    policyNumber
  }
}
```

It still returns all five policies.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update the `policies` field in **services/policies/src/schema.graphql**:

```graphql
type Query {
  policies(type: PolicyType, riskTier: RiskTier): [Policy!]!
  policy(id: ID!): Policy
  policyholders: [Policyholder!]!
  policyholder(id: ID!): Policyholder
}
```

✏️ In **services/policies/src/resolvers.ts**, update the `policies` resolver:

```ts
    policies: (_: unknown, args: { type?: PolicyType; riskTier?: RiskTier }) =>
      policies.filter((p) => {
        // A type was requested, and this policy isn't that type
        if (args.type && p.type !== args.type) return false;
        // A risk tier was requested, and this policy isn't that tier
        if (args.riskTier && p.riskTier !== args.riskTier) return false;
        // Passed every filter that was requested
        return true;
      }),
```

Two things changed:

1. **`riskTier?: RiskTier`** was added to `args`, so the resolver knows about the new argument. `RiskTier` is already imported at the top of the file.
2. **A second `if` line** was added. It follows the same shape as the `type` line: "if a risk tier was requested, **and** this policy isn't that tier, leave it out."

Each filter only applies when its argument was provided, so `type` and `riskTier` can be combined or left out.

</details>

## Next steps

Next, we'll change data with mutations.
