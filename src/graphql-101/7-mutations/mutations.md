@page learn-graphql-101/mutations Mutations
@parent learn-graphql-101 7
@outline 2

@description Change data with GraphQL mutations and input types, learn why making a field required is a promise your server has to keep, and change a schema without breaking clients.

@body

## Overview

In this section, we will:

- Write a mutation that issues a new policy
- Use input types to pass data to a mutation
- See how the mutation's resolver creates data and reports errors
- Make a field required, and see what breaks when data doesn't keep that promise
- Understand why data saved before a schema change has to be fixed
- Add a new way to look up a policy with `@oneOf`, and retire the old one with `@deprecated`

## Objective 1: Write a mutation

### What is a mutation?

Queries read data. **Mutations** change it. They're declared on the `Mutation` type in the schema, the same way queries are declared on `Query`:

```graphql
type Mutation {
  issuePolicy(input: IssuePolicyInput!): Policy!
}
```

Writing one looks almost like a query, with two differences:

- It starts with the `mutation` keyword. (A query can leave out `query`, but a mutation can't leave out `mutation`.)
- It **does** something first, then returns the fields you select from the result.

```graphql
mutation {
  issuePolicy(input: { type: HOME, monthlyPremium: 112.0, policyholderId: "ph2" }) {
    policyNumber
  }
}
```

### Input types

`issuePolicy` takes a single argument, `input`, whose type is `IssuePolicyInput`:

```graphql
input IssuePolicyInput {
  type: PolicyType!
  monthlyPremium: Float!
  policyholderId: ID!
  effectiveDate: String
}
```

An **input type** groups the values a mutation needs into one object. It's declared with `input` instead of `type`, and it can only contain values, not fields with resolvers.

- `type`, `monthlyPremium`, and `policyholderId` are required (`!`).
- `effectiveDate` is optional. If it's left out, the server uses today's date.

### Required input fields are validated too

Like any other request, a mutation is checked against the schema before the resolver runs. Leaving out required input fields fails immediately, and **no policy is created**:

```graphql
mutation {
  issuePolicy(input: { type: HOME }) {
    policyNumber
  }
}
```

The response (trimmed for readability) is:

```json
{
  "errors": [
    { "message": "Field \"IssuePolicyInput.monthlyPremium\" of required type \"Float!\" was not provided." },
    { "message": "Field \"IssuePolicyInput.policyholderId\" of required type \"ID!\" was not provided." }
  ]
}
```

### Exercise 1

James Okafor (`ph2`) wants home insurance at $112.00 a month.

✏️ Write and run a mutation that issues the policy and returns its `id`, `policyNumber`, `effectiveDate`, and the policyholder's `name`. Your response should look like:

```json
{
  "data": {
    "issuePolicy": {
      "id": "p6",
      "policyNumber": "HOME-100006",
      "effectiveDate": "2026-09-24",
      "policyholder": { "name": "James Okafor" }
    }
  }
}
```

`effectiveDate` will be today's date. If you've already issued other policies, your `id` and `policyNumber` numbers will be higher.

### Solution 1

<details>
<summary>Click to see the solution</summary>

```graphql
mutation {
  issuePolicy(input: { type: HOME, monthlyPremium: 112.0, policyholderId: "ph2" }) {
    id
    policyNumber
    effectiveDate
    policyholder {
      name
    }
  }
}
```

The response can include related data, like `policyholder`, because `issuePolicy` returns a `Policy`. Every `Policy` field and its resolvers are available.

</details>

## Objective 2: Understand the mutation resolver

### Mutation resolvers work like query resolvers

The resolver for `issuePolicy` lives in **services/policies/src/resolvers.ts**, under `Mutation`:

```ts
  Mutation: {
    issuePolicy: (_: unknown, { input }: { input: IssuePolicyInput }) => {
      // 1. Check the input. The schema confirms policyholderId is an ID,
      //    but only the resolver can check that the policyholder exists.
      if (!policyholders.some((ph) => ph.id === input.policyholderId)) {
        throw new GraphQLError(`Policyholder ${input.policyholderId} not found`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      // 2. Fill in server-generated values. The client never chooses the
      //    id or policyNumber, and effectiveDate defaults to today.
      const n = policies.length + 1;
      const policy: Policy = {
        ...input,
        id: `p${n}`,
        policyNumber: `${input.type}-${100000 + n}`,
        effectiveDate: input.effectiveDate ?? new Date().toISOString().slice(0, 10),
      };

      // 3. Save the policy: add it to the list, then write the list to data.json.
      policies.push(policy);
      savePolicies();

      // 4. Return the new policy. GraphQL then resolves whatever fields
      //    the mutation selected (policyNumber, policyholder, ...).
      return policy;
    },
  },
```

It follows the same `(parent, args, contextValue, info)` signature as any resolver. The difference is what it does:

1. **Checks the input.** The schema can confirm `policyholderId` is an `ID`, but not that the policyholder exists. That check belongs in the resolver.
2. **Fills in server-generated values.** The client never chooses the `id` or `policyNumber`. `effectiveDate` defaults to today.
3. **Saves the policy** by adding it to the list, then calling `savePolicies()` to write the list to **services/policies/data.json**.
4. **Returns the new policy.** GraphQL then resolves whatever fields the mutation selected.

Because the list is written to a file, every policy you issue is still there after the server restarts.

### Errors from resolvers

When a resolver throws a `GraphQLError`, the response contains an error instead of data. Try issuing a policy for a policyholder that doesn't exist:

```graphql
mutation {
  issuePolicy(input: { type: HOME, monthlyPremium: 112.0, policyholderId: "ph99" }) {
    policyNumber
  }
}
```

The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "Policyholder ph99 not found",
      "path": ["issuePolicy"],
      "extensions": { "code": "BAD_USER_INPUT" }
    }
  ],
  "data": null
}
```

- **`path`** shows which field failed.
- **`extensions.code`** gives clients a machine-readable reason, so they don't have to parse the message.

### Exercise 2

✏️ Using the `id` from Exercise 1, query the new policy and ask for **every** field `Policy` has, including `riskTier`. Your response should look like:

```json
{
  "data": {
    "policy": {
      "id": "p6",
      "policyNumber": "HOME-100006",
      "type": "HOME",
      "monthlyPremium": 112,
      "annualPremium": 1344,
      "effectiveDate": "2026-09-24",
      "riskTier": null,
      "policyholder": { "name": "James Okafor" }
    }
  }
}
```


### Solution 2

<details>
<summary>Click to see the solution</summary>

```graphql
{
  policy(id: "p6") {
    id
    policyNumber
    type
    monthlyPremium
    annualPremium
    effectiveDate
    riskTier
    policyholder {
      name
    }
  }
}
```

`riskTier` is `null` because `IssuePolicyInput` has no `riskTier` field, so there was no way to provide one. The schema allows this: `riskTier: RiskTier` has no `!`.

</details>

## Objective 3: Make a field required

### Non-null is a promise

Underwriting says every policy must have a risk tier. In the schema, that means changing `riskTier: RiskTier` to `riskTier: RiskTier!`.

A `!` isn't just documentation. It's a **promise** to every client that the field will never be `null`. If the server can't keep it, GraphQL returns an error instead of the bad value.

Changing the schema doesn't change the data you already have. The policy you issued in Exercise 1 was saved without a risk tier, and it's still there. In a real system, there could be thousands of records like it.

### Exercise 3

This exercise has two parts. The first one breaks things on purpose.

**Part 1: Change the field only.**

✏️ In **services/policies/src/schema.graphql**, make `riskTier` required for the `Policy` type.

Saving restarts the server, but the policy from Exercise 1 is still saved, and it still has no risk tier.

✏️ Run `{ policies { policyNumber riskTier } }`. It fails. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Policy.riskTier.",
      "path": ["policies", 5, "riskTier"]
    }
  ],
  "data": null
}
```

The `path` points at `policies` entry `5` (counting from 0): the policy from Exercise 1. The schema now promises every policy has a risk tier, but data saved before the change breaks that promise. Because one policy breaks it, the whole `policies` query fails, not just that one policy.

If you've issued other policies, your `path` may point at a different entry.

✏️ Run the Exercise 1 mutation again, but also select `riskTier` in the response. It fails too. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Policy.riskTier.",
      "path": ["issuePolicy", "riskTier"]
    }
  ],
  "data": null
}
```

Even though the mutation returned an error, **the policy was still created.** The error happened while GraphQL was building the response, after the resolver had already saved the policy. Run `{ policies { id policyNumber } }` without `riskTier` and you'll see it listed. Now there are two policies without a risk tier.

**Part 2: Keep the promise for new policies.**

✏️ In **services/policies/src/schema.graphql**, make sure a policy can't be issued without a risk tier.

✏️ Run the Exercise 1 mutation again, without `riskTier`. It fails before the resolver runs, and nothing is created. The response (trimmed for readability) is:

```json
{
  "errors": [{ "message": "Field \"IssuePolicyInput.riskTier\" of required type \"RiskTier!\" was not provided." }]
}
```

✏️ Run it with `riskTier: LOW` in the input. It succeeds, and the response includes `"riskTier": "LOW"`.

✏️ Run `{ policies { policyNumber riskTier } }` again. **It still fails**, with the same error as in Part 1. New policies keep the promise, but the two policies saved without a risk tier are still there. We'll talk about that after the solution.

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, make `riskTier` required on both `Policy` and `IssuePolicyInput`:

```graphql
type Policy {
  id: ID!
  policyNumber: String!
  type: PolicyType!
  monthlyPremium: Float!
  annualPremium: Float!
  effectiveDate: String!
  riskTier: RiskTier!
  policyholder: Policyholder!
}

input IssuePolicyInput {
  type: PolicyType!
  monthlyPremium: Float!
  policyholderId: ID!
  riskTier: RiskTier!
  effectiveDate: String
}
```

That's the only change needed. GraphQL checks every request against the schema before any resolver runs, so a mutation without `riskTier` is rejected right there. The resolver doesn't change either: `...input` already copies every input field, including `riskTier`, onto the new policy.

#### What about the TypeScript type in resolvers.ts?

Near the top of **services/policies/src/resolvers.ts** there's a line that also describes the input:

```ts
type IssuePolicyInput = Pick<Policy, "type" | "monthlyPremium" | "policyholderId"> & { effectiveDate?: string };
```

It reads as: "an `IssuePolicyInput` has the same `type`, `monthlyPremium`, and `policyholderId` fields as a `Policy`, plus an optional `effectiveDate`."

This is a **TypeScript** type, not part of GraphQL. It only helps your editor: it powers autocomplete for `input.` and flags typos. It doesn't affect what the server does. The code runs the same whether this type is up to date or not, which is why your mutation worked without touching it.

Keeping it in sync with the schema is still good practice. If the resolver ever reads `input.riskTier` directly, the editor would flag it as a field that doesn't exist. To keep them in sync, add `"riskTier"` to the list:

```ts
type IssuePolicyInput = Pick<Policy, "type" | "monthlyPremium" | "policyholderId" | "riskTier"> & { effectiveDate?: string };
```

Once a field is required on the output, every way of creating that data has to guarantee it. Here, that means requiring it on the input too, so bad data is rejected before it's saved.

</details>

### Fixing the existing data

Part 2 protects new policies, but it can't do anything about the ones already saved. The schema is a contract: `riskTier: RiskTier!` promises every policy has a risk tier. **Until the saved data matches that contract, the server can't keep the promise**, and any query that asks for `riskTier` fails.

The fix happens in the data, not in GraphQL. How the data gets fixed doesn't matter to GraphQL. In a real system it could be a database migration, a one-off script, an admin tool, or someone in underwriting filling in the missing values. GraphQL only cares that, by the time a resolver returns a policy, the value is there.

### Reset the course data

✏️ For this course, restore the starting data, where every policy has a risk tier. To go back to the starting data, stop the server, run `npm run reset-data` in **services/policies**, and start it again.

This deletes the policies you've issued. `{ policies { policyNumber riskTier } }` works again.

### We did it in the wrong order on purpose

This exercise tightened the schema first, then dealt with the data. That's why things broke along the way. When you make a field required in a real API, the safe order is:

1. **Fix the existing data** (a *backfill*), so every record already has a value.
2. **Require the field on writes**, on the input type, so no new record can be missing it.
3. **Only then make the output field non-null** (`!`), once every record keeps the promise.

Done in that order, clients never see an error.

## Objective 4: Evolve the schema

### Schema directives

In the Writing Queries section, you used directives in queries: `@include` and `@skip`. Directives can also go in the **schema**, where the API's author uses them to add rules or information to a type or field. The [GraphQL specification](https://spec.graphql.org/September2025/#sec-Type-System.Directives) defines two that help a schema change over time.

### `@oneOf`

**`@oneOf`** goes on an input type. It means the client must set **exactly one** of the input's fields: not zero, and not two. It was added in the [September 2025 edition](https://spec.graphql.org/September2025/#sec-OneOf-Input-Objects) of the GraphQL specification.

It's useful when there are several ways to identify the same thing. For example, if policyholders could be looked up by `id` or by `email`, the input would look like this:

```graphql
"Look up a policyholder by exactly one of these fields"
input PolicyholderLookupInput @oneOf {
  id: ID
  email: String
}
```

Because the client can only set one field, every field in a `@oneOf` input must be optional: `ID`, not `ID!`. GraphQL checks the "exactly one" rule itself, before any resolver runs. The course API has no `PolicyholderLookupInput`. This example only shows the shape.

### `@deprecated`

**`@deprecated(reason: String)`** marks a field, argument, input field, or enum value as retired. In What is GraphQL?, you saw that GraphQL APIs change without version numbers: new fields are added, and old ones are deprecated instead of removed.

A schema directive goes after the thing it describes. For example, if the API had an old `premium` field that was replaced by `monthlyPremium`:

```graphql
type Policy {
  # ...other fields
  premium: Float @deprecated(reason: "Use monthlyPremium.")
}
```

A deprecated field still works. Clients that use it keep getting data. What changes is how the field is shown to people writing new queries:

- Introspection leaves it out of `fields` by default. A tool has to ask for `fields(includeDeprecated: true)` to see it.
- When a tool does ask, introspection reports the field as deprecated, along with the `reason`, so the tool can warn whoever is writing the query.

Once no clients use the field anymore, it can be removed from the schema. GraphQL doesn't track that for you: the server has to report which fields each request uses. Apollo GraphOS, for example, [shows when each field was first and last requested](https://www.apollographql.com/docs/graphos/platform/insights/field-usage), and which clients requested it.

### Exercise 4

Agents often know a policy's number, like `LIFE-100004`, but not its id. Right now, `policy(id:)` only accepts an id.

✏️ In **services/policies/src/schema.graphql** and **services/policies/src/resolvers.ts**, add a `findPolicy` query that takes a required `by` argument. `by` is an input type named `PolicyLookupInput`, where the client sets exactly one of `id` or `policyNumber`. `findPolicy` returns the matching policy, or `null` if none matches.

✏️ Run this query:

```graphql
{
  findPolicy(by: { policyNumber: "LIFE-100004" }) {
    id
    policyNumber
  }
}
```

Your response should be:

```json
{ "data": { "findPolicy": { "id": "p4", "policyNumber": "LIFE-100004" } } }
```

✏️ Run it with both fields set:

```graphql
{
  findPolicy(by: { id: "p4", policyNumber: "LIFE-100004" }) {
    id
    policyNumber
  }
}
```

It fails before your resolver runs. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "OneOf Input Object \"PolicyLookupInput\" must specify exactly one key.",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

✏️ Run it with neither field set:

```graphql
{
  findPolicy(by: {}) {
    id
    policyNumber
  }
}
```

It fails with the same error.

`findPolicy` does everything `policy(id:)` does, so `policy(id:)` can be retired.

✏️ In **services/policies/src/schema.graphql**, deprecate the `policy` query, with the reason `Use findPolicy, which can look a policy up by id or policy number.`

✏️ Run this query:

```graphql
{
  policy(id: "p4") {
    policyNumber
  }
}
```

It still works, and returns `LIFE-100004`.

✏️ Run this introspection query. `policy` is missing from the list:

```graphql
{
  __type(name: "Query") {
    fields {
      name
    }
  }
}
```

✏️ Run it again, this time asking for deprecated fields too:

```graphql
{
  __type(name: "Query") {
    fields(includeDeprecated: true) {
      name
      isDeprecated
      deprecationReason
    }
  }
}
```

`policy` is back, with its reason:

```json
{ "name": "policy", "isDeprecated": true, "deprecationReason": "Use findPolicy, which can look a policy up by id or policy number." }
```

Every other field has `"isDeprecated": false` and `"deprecationReason": null`.

### Solution 4

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, add the input type:

```graphql
"Look up a policy by exactly one of these fields"
input PolicyLookupInput @oneOf {
  id: ID
  policyNumber: String
}
```

✏️ Add `findPolicy` to `Query`, and deprecate `policy`:

```graphql
type Query {
  # ...other fields
  policy(id: ID!): Policy @deprecated(reason: "Use findPolicy, which can look a policy up by id or policy number.")
  findPolicy(by: PolicyLookupInput!): Policy
}
```

✏️ In **services/policies/src/resolvers.ts**, add a `findPolicy` resolver under `Query`:

```ts
    findPolicy: (_: unknown, { by }: { by: { id?: string; policyNumber?: string } }) =>
      policies.find((p) => p.id === by.id || p.policyNumber === by.policyNumber),
```

The resolver doesn't check that exactly one field was set. By the time it runs, GraphQL has already rejected any request that set zero or two. Only one of `by.id` and `by.policyNumber` has a value, so only that one can match.

`findPolicy` returns `Policy`, not `Policy!`, so a policy number that doesn't match anything returns `null` instead of an error.

Nothing in **resolvers.ts** changes for the deprecation, because `policy` still works exactly as before.

</details>

## Next steps

Next, we'll look at how nested fields can quietly multiply the work your server does, and how to fix it.
