@page learn-graphql-101/writing-queries Writing Queries
@parent learn-graphql-101 4
@outline 2

@description Write GraphQL queries with nested fields, arguments, variables, and directives, and see how the schema validates every request.

@body

## Overview

In this section, we will:

- Select fields, including fields of related objects
- Filter results with arguments
- Pass arguments as variables
- Include or skip fields with directives
- See how GraphQL validates every request against the schema

Need a reminder of what's in the API? See [The Course Data](./course-data.html).

## Objective 1: Select nested fields

### Selection sets

The fields inside `{ }` are called a **selection set**. When a field returns an object instead of a plain value, like a policy's `policyholder`, you must give it its own selection set:

<div data-toolbar-order="">

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

</div>

Relationships work in both directions. A policyholder can list their policies:

<div data-toolbar-order="">

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

</div>

### Using the Documentation panel

You don't have to memorize field names. Apollo Sandbox reads the API's schema and lists everything you can ask for in the **Documentation** panel on the left.

- **Start at Root.** Selecting **Root** near the top shows the root types: `Query` (fields for reading data) and `Mutation` (fields for changing data).
- **Click a field to drill in.** Clicking `policies` shows its arguments (like `type`) and what it returns (a list of `Policy`). Clicking `Policy` then lists all of its fields, such as `policyNumber`, `monthlyPremium`, and `policyholder`.
- **Read the descriptions.** Some fields include a short explanation written into the schema. For example, `monthlyPremium` says it's in US dollars.
- **Add fields without typing.** Click the **⊕** button next to a field to add it to the query in the editor. Sandbox adds the surrounding braces for you.

A field that returns an object, like `policyholder`, needs its own selection set. The Documentation panel shows this: its type is `Policyholder`, not a plain value like `String` or `Float`.

### Exercise

This time, build the query without typing it, using only the Documentation panel.

✏️ In Apollo Sandbox, clear the editor, then:

1. In the Documentation panel, select **Root** near the top.
2. Click the **⊕** button to the right of `Query`.

✏️ Keep using the **⊕** buttons to build this query, then click **Run**:

<div data-toolbar-order="">

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

</div>

<strong>Hint:</strong> Clicking a field's name (instead of its **⊕** button) opens it, so you can add the fields inside it.

### Solution

<details>
<summary>Click to see the solution</summary>

From `Query`, click **⊕** next to `policies`. Open `policies`, then click **⊕** next to `policyNumber` and `policyholder`. Open `policyholder`, then click **⊕** next to `name` and `email`.

Your response should be:

<div data-toolbar-order="">

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

</div>

</details>

## Objective 2: Filter with arguments and variables

### Arguments

Fields can accept **arguments**. The `policies` field accepts an optional `type` argument:

<div data-toolbar-order="">

```graphql
{
  policies(type: AUTO) {
    policyNumber
  }
}
```

</div>

`AUTO` has no quotes because `type` is an **enum**: one of a fixed set of values (`AUTO`, `HOME`, `LIFE`, `RENTERS`) defined by the schema.

### Variables

Hard-coding values into a query works for exploring, but applications pass them as **variables** instead. A variable is declared on the operation with a `$` and a type, then used in place of the value:

<div data-toolbar-order="">

```graphql
query PoliciesByType($type: PolicyType) {
  policies(type: $type) {
    policyNumber
    type
  }
}
```

</div>

The values are sent separately, as JSON. In Apollo Sandbox, they go in the **Variables** panel:

<div data-toolbar-order="">

```json
{ "type": "AUTO" }
```

</div>

`PoliciesByType` is the **operation name**. It's optional, but it makes requests easier to identify in logs and tools.

### Multiple variables and fields

One operation can declare several variables, separated by commas, and **ask for several top-level fields at once**. The response contains one entry per field:

<div data-toolbar-order="">

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

</div>

A variable's type must match the argument it's used for. `policy(id: ID!)` requires an ID, so `$policyId` is declared as `ID!`. The `!` makes the variable **required**: the request fails if you leave it out. `$type: PolicyType` above has no `!`, so it's optional.

### Exercise

An agent's dashboard shows a policyholder's contact details next to a list of policies of one type.

**This asks for two separate pieces of information, a policyholder and a list of policies, in a single request.**

✏️ Write one query named `AgentDashboard` that uses two variables:

- `$policyholderId`, to get a policyholder's `name` and `email`
- `$type`, to get the `policyNumber` and `type` of every policy of that type

✏️ Run it for policyholder `ph2` and `AUTO` policies. Your response should be:

<div data-toolbar-order="">

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

</div>

<strong>Hint:</strong> Check the Documentation panel for the type each argument expects. That's the type your variable needs.

### Solution

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

## Objective 3: Include or skip fields with directives

### What is a directive?

A **directive** is an instruction attached to part of a query or schema, written as `@` followed by a name. Some directives take arguments, just like fields do:

<div data-toolbar-order="">

```graphql
policies @include(if: $withPolicies)
```

</div>

A directive changes how GraphQL treats the thing it's attached to. The [GraphQL specification](https://spec.graphql.org/September2025/#sec-Type-System.Directives) defines a few built-in directives that every GraphQL server supports. Two of them are for queries:

- **`@include(if: Boolean!)`** returns a field only when `if` is `true`.
- **`@skip(if: Boolean!)`** leaves a field out when `if` is `true`.

They do the same job from opposite directions. Use whichever reads more naturally. You'll see directives used in schemas in the Mutations section.

### Why use them

These directives are most useful with a variable. A screen might show a policyholder's contact details, with a toggle that adds their policies. Without directives, the client would need two separate queries. With `@include`, one query covers both, and the variable decides which fields come back.

When a field is left out, it's missing from the response entirely. It doesn't come back as `null`. GraphQL also doesn't run the resolver for a field that's left out, so the server doesn't do that work.

### Exercise

✏️ In Apollo Sandbox, write one query named `PolicyholderView` that takes two variables: `$id`, a policyholder id, and `$withPolicies`, a `Boolean!`. It returns the policyholder's `name` and `email`. Their policies, with each policy's `policyNumber` and `type`, are included only when `$withPolicies` is `true`.

✏️ Run it with these variables:

```json
{ "id": "ph3", "withPolicies": false }
```

Your response should be:

<div data-toolbar-order="">

```json
{
  "data": {
    "policyholder": { "name": "Priya Raman", "email": "priya.raman@example.com" }
  }
}
```

</div>

✏️ Change the variables so `withPolicies` is `true`, and run it again:

```json
{ "id": "ph3", "withPolicies": true }
```

Your response should be:

<div data-toolbar-order="">

```json
{
  "data": {
    "policyholder": {
      "name": "Priya Raman",
      "email": "priya.raman@example.com",
      "policies": [
        { "policyNumber": "LIFE-100004", "type": "LIFE" },
        { "policyNumber": "RENTERS-100005", "type": "RENTERS" }
      ]
    }
  }
}
```

</div>

### Solution

<details>
<summary>Click to see the solution</summary>

```graphql
query PolicyholderView($id: ID!, $withPolicies: Boolean!) {
  policyholder(id: $id) {
    name
    email
    policies @include(if: $withPolicies) {
      policyNumber
      type
    }
  }
}
```

`@include` goes right after the field name, before its `{ }`. When `$withPolicies` is `false`, GraphQL leaves out `policies` and everything inside it.

`policies @skip(if: $withoutPolicies)` would work too, with the variable's meaning flipped.

</details>

## Objective 4: Understand request validation

### Every request is checked against the schema

Before any of your server code runs, GraphQL checks the request against the schema. Asking for a field that doesn't exist fails immediately:

<div data-toolbar-order="">

```graphql
{
  policies {
    deductible
  }
}
```

</div>

The response (trimmed for readability) is:

<div data-toolbar-order="">

```json
{
  "errors": [{ "message": "Cannot query field \"deductible\" on type \"Policy\"." }]
}
```

</div>

### Fields and arguments are checked separately

Arguments are validated the same way: an argument the schema doesn't declare is rejected before it reaches your code.

Say underwriting wants a list of high-risk policies. Every policy has a `riskTier` field, so filtering on it seems reasonable:

<div data-toolbar-order="">

```graphql
{
  policies(riskTier: HIGH) {
    policyNumber
    riskTier
  }
}
```

</div>

But the request fails. The response (trimmed for readability) is:

<div data-toolbar-order="">

```json
{
  "errors": [{ "message": "Unknown argument \"riskTier\" on field \"Query.policies\"." }]
}
```

</div>

`riskTier` is a **field** you can ask for, but it isn't an **argument** that `policies` accepts. In the Documentation panel, `policies` lists only one argument: `type`. **Being able to read a value doesn't mean you can filter by it; the schema has to declare each one.**

## Next steps

Next, we'll ask the API to describe its own schema, using introspection.
