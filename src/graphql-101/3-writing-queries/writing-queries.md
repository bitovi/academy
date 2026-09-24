@page learn-graphql-101/writing-queries Writing Queries
@parent learn-graphql-101 3
@outline 2

@description Write GraphQL queries with nested fields, arguments, and variables, and see how the schema validates every request.

@body

## Overview

In this section, we will:

- Select fields, including fields of related objects
- Filter results with arguments
- Pass arguments as variables
- See how GraphQL validates every request against the schema

Need a reminder of what's in the API? See [The Course Data](./course-data.html).

## Objective 1: Select nested fields

### Selection sets

The fields inside `{ }` are called a **selection set**. When a field returns an object instead of a plain value, like a policy's `policyholder`, you must give it its own selection set:

```graphql
{
  policies {
    policyNumber
    policyholder {
      name
      email
    }
  }
}
```

Relationships work in both directions. A policyholder can list their policies:

```graphql
{
  policyholder(id: "ph1") {
    name
    policies {
      policyNumber
      type
    }
  }
}
```

### Using the Documentation panel

You don't have to memorize field names. Apollo Sandbox reads the API's schema and lists everything you can ask for in the **Documentation** panel on the left.

- **Start at Root.** Selecting **Root** near the top shows the root types: `Query` (fields for reading data) and `Mutation` (fields for changing data).
- **Click a field to drill in.** Clicking `policies` shows its arguments (like `type`) and what it returns (a list of `Policy`). Clicking `Policy` then lists all of its fields, such as `policyNumber`, `monthlyPremium`, and `policyholder`.
- **Read the descriptions.** Some fields include a short explanation written into the schema. For example, `monthlyPremium` says it's in US dollars.
- **Add fields without typing.** Click the **⊕** button next to a field to add it to the query in the editor. Sandbox adds the surrounding braces for you.

A field that returns an object, like `policyholder`, needs its own selection set. The Documentation panel shows this: its type is `Policyholder`, not a plain value like `String` or `Float`.

### Exercise 1

This time, build the query without typing it, using only the Documentation panel.

✏️ In Apollo Sandbox, clear the editor, then:

1. In the Documentation panel, select **Root** near the top.
2. Click the **⊕** button to the right of `Query`.

✏️ Keep using the **⊕** buttons to build this query, then click **Run**:

```graphql
{
  policies {
    policyNumber
    policyholder {
      name
      email
    }
  }
}
```

<strong>Hint:</strong> Clicking a field's name (instead of its **⊕** button) opens it, so you can add the fields inside it.

### Solution 1

<details>
<summary>Click to see the solution</summary>

From `Query`, click **⊕** next to `policies`. Open `policies`, then click **⊕** next to `policyNumber` and `policyholder`. Open `policyholder`, then click **⊕** next to `name` and `email`.

The response should be:

```json
{
  "data": {
    "policies": [
      { "policyNumber": "AUTO-100001", "policyholder": { "name": "Maria Alvarez", "email": "maria.alvarez@example.com" } },
      { "policyNumber": "HOME-100002", "policyholder": { "name": "Maria Alvarez", "email": "maria.alvarez@example.com" } },
      { "policyNumber": "AUTO-100003", "policyholder": { "name": "James Okafor", "email": "james.okafor@example.com" } },
      { "policyNumber": "LIFE-100004", "policyholder": { "name": "Priya Raman", "email": "priya.raman@example.com" } },
      { "policyNumber": "RENTERS-100005", "policyholder": { "name": "Priya Raman", "email": "priya.raman@example.com" } }
    ]
  }
}
```

</details>

## Objective 2: Filter with arguments and variables

### Arguments

Fields can accept **arguments**. The `policies` field accepts an optional `type` argument:

```graphql
{
  policies(type: AUTO) {
    policyNumber
  }
}
```

`AUTO` has no quotes because `type` is an **enum**: one of a fixed set of values (`AUTO`, `HOME`, `LIFE`, `RENTERS`) defined by the schema.

### Variables

Hard-coding values into a query works for exploring, but applications pass them as **variables** instead. A variable is declared on the operation with a `$` and a type, then used in place of the value:

```graphql
query PoliciesByType($type: PolicyType) {
  policies(type: $type) {
    policyNumber
    type
  }
}
```

The values are sent separately, as JSON. In Apollo Sandbox, they go in the **Variables** panel:

```json
{ "type": "AUTO" }
```

`PoliciesByType` is the **operation name**. It's optional, but it makes requests easier to identify in logs and tools.

### Multiple variables and fields

One operation can declare several variables, separated by commas, and ask for several top-level fields at once. The response contains one entry per field:

```graphql
query PolicyAndHolder($policyId: ID!, $policyholderId: ID!) {
  policy(id: $policyId) {
    policyNumber
  }
  policyholder(id: $policyholderId) {
    name
  }
}
```

A variable's type must match the argument it's used for. `policy(id: ID!)` requires an ID, so `$policyId` is declared as `ID!`. The `!` makes the variable **required**: the request fails if you leave it out. `$type: PolicyType` above has no `!`, so it's optional.

### Exercise 2

An agent's dashboard shows a policyholder's contact details next to a list of policies of one type.

✏️ Write one query named `AgentDashboard` that uses two variables:

- `$policyholderId`, to get a policyholder's `name` and `email`
- `$type`, to get the `policyNumber` and `type` of every policy of that type

✏️ Run it for policyholder `ph2` and `AUTO` policies. Your response should be:

```json
{
  "data": {
    "policyholder": { "name": "James Okafor", "email": "james.okafor@example.com" },
    "policies": [
      { "policyNumber": "AUTO-100001", "type": "AUTO" },
      { "policyNumber": "AUTO-100003", "type": "AUTO" }
    ]
  }
}
```

<strong>Hint:</strong> Check the Documentation panel for the type each argument expects. That's the type your variable needs.

### Solution 2

<details>
<summary>Click to see the solution</summary>

Query:

```graphql
query AgentDashboard($policyholderId: ID!, $type: PolicyType) {
  policyholder(id: $policyholderId) {
    name
    email
  }
  policies(type: $type) {
    policyNumber
    type
  }
}
```

Variables:

```json
{ "policyholderId": "ph2", "type": "AUTO" }
```

`$policyholderId` is required (`ID!`) because `policyholder(id: ID!)` requires an ID. `$type` is optional because `policies(type: PolicyType)` is too. Try removing `type` from the variables: you'll get every policy.

</details>

## Objective 3: Understand request validation

### Every request is checked against the schema

Before any of your server code runs, GraphQL checks the request against the schema. Asking for a field that doesn't exist fails immediately:

```graphql
{
  policies {
    deductible
  }
}
```

```json
{
  "errors": [{ "message": "Cannot query field \"deductible\" on type \"Policy\"." }]
}
```

### Fields and arguments are checked separately

Arguments are validated the same way: an argument the schema doesn't declare is rejected before it reaches your code.

Say underwriting wants a list of high-risk policies. Every policy has a `riskTier` field, so filtering on it seems reasonable:

```graphql
{
  policies(riskTier: "HIGH") {
    policyNumber
    riskTier
  }
}
```

But the request fails:

```json
{
  "errors": [{ "message": "Unknown argument \"riskTier\" on field \"Query.policies\"." }]
}
```

`riskTier` is a **field** you can ask for, but it isn't an **argument** that `policies` accepts. In the Documentation panel, `policies` lists only one argument: `type`. **Being able to read a value doesn't mean you can filter by it; the schema has to declare each one.**

## Next steps

Next we'll look inside the server at the schema and resolvers, and add the missing `riskTier` argument ourselves.
