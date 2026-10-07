@page learn-graphql-101/writing-queries Writing Queries
@parent learn-graphql-101 4
@outline 2

@description Write GraphQL queries with nested fields, arguments, variables, directives, and fragments, send them from code, and see how the schema validates every request.

@body

## Overview

In this section, we will:

- Select fields, including fields of related objects
- Filter results with arguments
- Pass arguments as variables
- Include or skip fields with directives
- Reuse fields with fragments
- Send a query from code, without Sandbox
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
- **Click a field to drill in.** Clicking `policies` shows its arguments (like `type`), what it returns (a list of `Policy`), and below that, every field a `Policy` has, such as `policyNumber`, `monthlyPremium`, and `policyholder`.
- **Read the descriptions.** Some fields include a short explanation written into the schema. For example, `monthlyPremium` says it's in US dollars.
- **Add fields without typing.** Click the **⊕** button next to a field to add it to the query in the editor. Sandbox adds the surrounding braces for you.

A field that returns an object, like `policyholder`, needs its own selection set. The Documentation panel shows this: its type is `Policyholder`, not a plain value like `String` or `Float`.

### Exercise

This time, build the query without typing it, using only the Documentation panel.

✏️ In Apollo Sandbox, clear the editor, then:

1. In the Documentation panel, select **Root** near the top.
2. Click the **⊕** button to the right of `Query`.

✏️ Keep using the **⊕** buttons to build this query. Sandbox names the operation `Query` for you, so the button that runs it says **Query** instead of **Run**. Click it:

<div data-toolbar-order="">

```graphql
query Query {
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

<strong>Hint:</strong> When you click **⊕** next to a field that returns an object, like `policies`, Sandbox adds it and opens it, so you can add the fields inside it. Clicking a field's name opens it without adding it.

### Solution

<details>
<summary>Click to see the solution</summary>

From `Query`, click **⊕** next to `policies`. Sandbox opens `policies`. Click **⊕** next to `policyNumber`, then next to `policyholder`. Sandbox opens `policyholder`. Click **⊕** next to `name` and `email`.

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

A directive changes how GraphQL treats the thing it's attached to. The GraphQL specification defines a few **built-in** directives. Two of them are for queries, and the specification says [every GraphQL server should support them](https://spec.graphql.org/September2025/#sec-Type-System.Directives.Built-in-Directives):

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

## Objective 4: Reuse fields with fragments

### What is a fragment?

The same object often appears in more than one place in a query. When it does, you list the same fields each time. A **fragment** is a named set of fields that you write once and reuse with `...`:

<div data-toolbar-order="">

```graphql
query PolicyholderNames {
  first: policyholder(id: "ph1") {
    ...ContactDetails
  }
  second: policyholder(id: "ph2") {
    ...ContactDetails
  }
}

fragment ContactDetails on Policyholder {
  name
  email
}
```

</div>

- **`fragment ContactDetails on Policyholder`** names the fragment and says which type its fields come from. A fragment can only be used where that type is returned.
- **`...ContactDetails`** (three dots, then the name) is replaced by the fragment's fields, as if you'd typed them there.
- **`first:` and `second:`** are **aliases**. A response can't have two entries named `policyholder`, so an alias gives each one its own name.

The response is the same as if you'd written out `name` and `email` both times. Fragments only change how the query is written. The [GraphQL documentation](https://graphql.org/learn/queries/#fragments) covers fragments with the rest of the query basics.

### Why use them

In a frontend app, fragments let each component declare the fields it needs. A `PolicyCard` component can own a `PolicyCard` fragment, and every query that shows a policy card includes it. When the card needs a new field, you change the fragment once. [Apollo Client's documentation](https://www.apollographql.com/docs/react/data/fragments#colocating-fragments) recommends this pattern, called **colocating** fragments.

### Exercise

The agent's dashboard now shows a policy card in two places: under the policyholder's details, for each of their policies, and in the list of policies of one type. Each card shows a policy's `policyNumber`, `type`, and `monthlyPremium`.

✏️ In Apollo Sandbox, update your `AgentDashboard` query from Objective 2 so both places use one fragment named `PolicyCard`.

✏️ Run it for policyholder `ph2` and `AUTO` policies. Your response should be:

<div data-toolbar-order="">

```json
{
  "data": {
    "policyholder": {
      "name": "James Okafor",
      "email": "james.okafor@example.com",
      "policies": [
        { "policyNumber": "AUTO-100003", "type": "AUTO", "monthlyPremium": 210.75 }
      ]
    },
    "policies": [
      { "policyNumber": "AUTO-100001", "type": "AUTO", "monthlyPremium": 142.5 },
      { "policyNumber": "AUTO-100003", "type": "AUTO", "monthlyPremium": 210.75 }
    ]
  }
}
```

</div>

### Solution

<details>
<summary>Click to see the solution</summary>

```graphql
query AgentDashboard($policyholderId: ID!, $type: PolicyType) {
  policyholder(id: $policyholderId) {
    name
    email
    policies {
      ...PolicyCard
    }
  }
  policies(type: $type) {
    ...PolicyCard
  }
}

fragment PolicyCard on Policy {
  policyNumber
  type
  monthlyPremium
}
```

Both `policyholder.policies` and `policies` return `Policy` objects, so both can use a fragment `on Policy`. To show a new field on every card, like `effectiveDate`, you'd add it to `PolicyCard` only.

</details>

## Objective 5: Send a query from code

### What Sandbox sends

Apollo Sandbox is a convenient way to explore, but an app sends queries itself. A GraphQL request over HTTP is usually a `POST` with a JSON body. The [GraphQL documentation](https://graphql.org/learn/serving-over-http/#post-request-and-body) describes its fields:

- **`query`**: the operation, as a string
- **`variables`**: the variables, as a JSON object (optional)
- **`operationName`**: which operation to run, when the string has more than one (optional)

You can send one from the Codespace's terminal with `curl`, a command-line tool that sends HTTP requests:

```shell
curl -s http://localhost:4001/ -H 'content-type: application/json' --data '{"query":"query PoliciesByType($type: PolicyType) { policies(type: $type) { policyNumber type } }","variables":{"type":"AUTO"}}'
```

The response is the same JSON you see in Sandbox:

<div data-toolbar-order="">

```json
{"data":{"policies":[{"policyNumber":"AUTO-100001","type":"AUTO"},{"policyNumber":"AUTO-100003","type":"AUTO"}]}}
```

</div>

In a browser app, `fetch` sends the same request:

<div data-toolbar-order="">

```js
const response = await fetch("http://localhost:4001/", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    query: `query PoliciesByType($type: PolicyType) {
      policies(type: $type) { policyNumber type }
    }`,
    variables: { type: "AUTO" },
  }),
});
const { data, errors } = await response.json();
```

</div>

Check `errors` as well as `data`. A request can reach the server and still fail, and the reason is in `errors`. You'll see examples in the next few sections.

Most apps don't call `fetch` directly. A GraphQL client, like [Apollo Client](https://www.apollographql.com/docs/react/get-started), sends the same request for you, and also caches the results.

### Exercise

✏️ Open a second terminal in the Codespace, so the server keeps running in the first one. In the **Terminal** panel, click **+**.

✏️ In the second terminal, use `curl` to send a query for policyholder `ph3`'s `name` and the `policyNumber` of each of their policies. Pass the policyholder's id as a variable, not in the query string. Your response should be:

<div data-toolbar-order="">

```json
{"data":{"policyholder":{"name":"Priya Raman","policies":[{"policyNumber":"LIFE-100004"},{"policyNumber":"RENTERS-100005"}]}}}
```

</div>

### Solution

<details>
<summary>Click to see the solution</summary>

```shell
curl -s http://localhost:4001/ -H 'content-type: application/json' --data '{"query":"query Holder($id: ID!) { policyholder(id: $id) { name policies { policyNumber } } }","variables":{"id":"ph3"}}'
```

The query string declares `$id`, and `variables` gives it a value. The single quotes around the whole body stop the terminal from treating `$id` as one of its own variables.

</details>

## Objective 6: Understand request validation

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
