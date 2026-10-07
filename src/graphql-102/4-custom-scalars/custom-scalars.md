@page learn-graphql-102/custom-scalars Custom Scalars
@parent learn-graphql-102 4
@outline 2

@description Replace plain-string dates with a custom scalar from a library, so the API rejects invalid dates, and document its format with @specifiedBy.

@body

## Overview

In this section, we will:

- Learn what a custom scalar is, and why you'd use one instead of `String`
- Learn why it's safer to use a scalar from a library than to write your own
- Change the API's dates to a `LocalDate` scalar from the `graphql-scalars` library
- Link `LocalDate` to its format with `@specifiedBy`, and work around a catch when the scalar comes from a library

## Objective 1: Understand custom scalars

### The problem with dates as strings

A **scalar** is a type that holds a single value, like a number or a string, instead of an object with fields. As you saw in 101, GraphQL has five built in: `Int`, `Float`, `String`, `Boolean`, and `ID`.

GraphQL has no built-in date type, so the course API stores dates like `effectiveDate` as `String`s. That means the schema accepts any text at all as a date.

✏️ Run this mutation, which issues a policy that starts on February 30th:

```graphql
mutation {
  issuePolicy(input: { type: HOME, monthlyPremium: 112.0, policyholderId: "ph2", riskTier: LOW, effectiveDate: "2026-02-30" }) {
    policyNumber
    effectiveDate
  }
}
```

It succeeds, and saves a policy that starts on a day that doesn't exist:

<div data-toolbar-order="">

```json
{
  "data": {
    "issuePolicy": { "policyNumber": "HOME-100006", "effectiveDate": "2026-02-30" }
  }
}
```

</div>

So would `"10/01/2026"`, or `"next Tuesday"`. Every client and every resolver has to check dates for itself, and a client developer can't tell from the schema which format to send.

If you've issued other policies, your `policyNumber` ends in a higher number. You'll clean this policy up in this objective's exercise.

### What a custom scalar is

A **custom scalar** is a scalar type the API defines itself. In the schema, it's one line:

<div data-toolbar-order="">

```graphql
scalar LocalDate
```

</div>

A field can then use `LocalDate` wherever it used `String`. The schema only has the name. The rules live in server code, which tells GraphQL how to:

- **Check and convert values the client sends**, and reject ones that don't fit
- **Convert values the server returns** into what goes in the response

Because GraphQL checks arguments before any resolver runs, an invalid date is rejected before it reaches your code, the same way a missing required field is.

### Use a scalar from a library

You could write the code for a date scalar yourself, but dates are easy to get wrong. The code has to know that February has 29 days only in leap years, and that `2026-02-30` isn't a date even though it looks like one. Code that turns a date into a JavaScript `Date` can also shift it by a day, depending on the server's time zone.

It's usually better to use a scalar that's already been written and tested. The [`graphql-scalars`](https://the-guild.dev/graphql/scalars/docs/scalars) library, from The Guild, has dozens of them: dates and times, email addresses, URLs, currencies, and more. The course API already has it installed.

The library has two date scalars that look similar:

- **`Date`** turns each date into a JavaScript `Date` object before your resolver sees it.
- **[`LocalDate`](https://the-guild.dev/graphql/scalars/docs/scalars/local-date)** keeps each date as a `YYYY-MM-DD` string, and only checks that it's a real date.

The course API saves dates as strings in **services/policies/data.json**, and a policy's effective date is a calendar day, not a moment in time. `LocalDate` is the one that fits.

### Connecting a library scalar

Using a scalar from the library takes two changes: one in the schema, and one in the resolvers.

For example, `graphql-scalars` also has an `EmailAddress` scalar, which rejects values that aren't email addresses. To use it for `Policyholder.email`, you'd first name the scalar in the schema, and use it in place of `String`:

<div data-toolbar-order="">

```graphql
scalar EmailAddress

type Policyholder {
  # ...other fields
  email: EmailAddress!
}
```

</div>

Then, in the resolvers, you'd import the library's scalar and add it to the resolvers object, under the same name as in the schema:

<div data-toolbar-order="">

```ts
import { EmailAddressResolver } from "graphql-scalars";

export const resolvers = {
  EmailAddress: EmailAddressResolver,

  Query: {
    // ...
  },
};
```

</div>

The scalar goes at the top level of the resolvers object, next to `Query` and `Mutation`, not inside them. The name on the left, `EmailAddress`, has to match the name in the schema. That's how GraphQL knows which code checks which scalar.

The course API doesn't use `EmailAddress`. This example only shows the pattern, which is the same for every scalar in the library.

### Exercise

✏️ In **services/policies/src/schema.graphql**, add a `LocalDate` scalar, and use it for every date in the schema:

<table>
   <tr>
      <th>Field</th>
      <th>Change from</th>
      <th>Change to</th>
   </tr>
   <tr>
      <td><code>Policy.effectiveDate</code></td>
      <td><code>String!</code></td>
      <td><code>LocalDate!</code></td>
   </tr>
   <tr>
      <td><code>Claim.filedDate</code></td>
      <td><code>String!</code></td>
      <td><code>LocalDate!</code></td>
   </tr>
   <tr>
      <td><code>IssuePolicyInput.effectiveDate</code></td>
      <td><code>String</code></td>
      <td><code>LocalDate</code></td>
   </tr>
</table>

✏️ In **services/policies/src/resolvers.ts**, connect the `LocalDate` scalar in the schema to the library's `LocalDateResolver`, which you import from `graphql-scalars`. It works the same way as the `EmailAddress` example in **Connecting a library scalar**.

Both changes are needed. A scalar in the schema with no code in the resolvers accepts any value at all, even looser than `String`: it also takes numbers, `true`, and objects. So invalid dates still get through until the resolver is connected.

✏️ Run this query:

```graphql
{
  findPolicy(by: { id: "p1" }) {
    policyNumber
    effectiveDate
    claims {
      claimNumber
      filedDate
    }
  }
}
```

The dates come back exactly as before:

<div data-toolbar-order="">

```json
{
  "data": {
    "findPolicy": {
      "policyNumber": "AUTO-100001",
      "effectiveDate": "2025-01-15",
      "claims": [
        { "claimNumber": "CLM-5001", "filedDate": "2025-04-02" },
        { "claimNumber": "CLM-5002", "filedDate": "2025-06-18" }
      ]
    }
  }
}
```

</div>

✏️ Run the February 30th mutation again:

```graphql
mutation {
  issuePolicy(input: { type: HOME, monthlyPremium: 112.0, policyholderId: "ph2", riskTier: LOW, effectiveDate: "2026-02-30" }) {
    policyNumber
    effectiveDate
  }
}
```

This time it fails before the resolver runs, and no policy is saved. The response (trimmed for readability) is:

<div data-toolbar-order="">

```json
{
  "errors": [
    {
      "message": "Value is not a valid LocalDate: 2026-02-30",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

</div>

✏️ Run it with the date in a different format:

```graphql
mutation {
  issuePolicy(input: { type: HOME, monthlyPremium: 112.0, policyholderId: "ph2", riskTier: LOW, effectiveDate: "10/01/2026" }) {
    policyNumber
    effectiveDate
  }
}
```

It fails the same way, with `Value is not a valid LocalDate: 10/01/2026`.

An app wouldn't type the date into the query. It would send it as a variable, as you did in 101's Writing Queries section.

✏️ Send the February 30th date as a variable. In Apollo Sandbox, run this mutation:

```graphql
mutation IssuePolicy($input: IssuePolicyInput!) {
  issuePolicy(input: $input) {
    policyNumber
    effectiveDate
  }
}
```

with these variables:

```json
{ "input": { "type": "HOME", "monthlyPremium": 112.0, "policyholderId": "ph2", "riskTier": "LOW", "effectiveDate": "2026-02-30" } }
```

It's rejected too, but the error looks different. The response (trimmed for readability) is:

<div data-toolbar-order="">

```json
{
  "errors": [
    {
      "message": "Variable \"$input\" got invalid value \"2026-02-30\" at \"input.effectiveDate\"; Value is not a valid LocalDate: 2026-02-30",
      "extensions": { "code": "BAD_USER_INPUT" }
    }
  ]
}
```

</div>

GraphQL checks values typed into the query while it validates the request, so those errors have the code `GRAPHQL_VALIDATION_FAILED`. It checks variables separately, just before running the operation, and Apollo reports those errors as `BAD_USER_INPUT`. Apps send variables, so `BAD_USER_INPUT` is the code a frontend will usually see for a bad value.

✏️ Now list every policy's effective date:

```graphql
{
  policies {
    policyNumber
    effectiveDate
  }
}
```

It fails. The response (trimmed for readability) is:

<div data-toolbar-order="">

```json
{
  "errors": [
    {
      "message": "Value is not a valid LocalDate: 2026-02-30",
      "path": ["policies", 5, "effectiveDate"],
      "extensions": { "code": "INTERNAL_SERVER_ERROR" }
    }
  ],
  "data": null
}
```

</div>

The policy you issued at the start of this section is still saved, with its February 30th date. `LocalDate` checks dates on the way **out** too, and that one isn't valid. The `path` points at `policies` entry `5` (counting from 0), which is that policy. If you've issued other policies, it may point at a different entry.

This is the same problem you saw with `riskTier` in 101: tightening a type doesn't fix data that was saved before the change.

✏️ To go back to the starting data, stop the server, run `npm run reset-data` in **services/policies**, and start it again. Then run the `policies` query again. It returns the five starting policies, each with a valid `effectiveDate`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, add the scalar at the top of the file:

```graphql
scalar LocalDate
```

✏️ Change the three date fields:

```graphql
type Policy {
  # ...other fields
  effectiveDate: LocalDate!
}

type Claim {
  # ...other fields
  filedDate: LocalDate!
}

input IssuePolicyInput {
  # ...other fields
  effectiveDate: LocalDate
}
```

✏️ In **services/policies/src/resolvers.ts**, import the scalar:

```ts
import { LocalDateResolver } from "graphql-scalars";
```

✏️ Add it to the top of the `resolvers` object:

```ts
export const resolvers = {
  LocalDate: LocalDateResolver,

  Query: {
    // ...
```

`LocalDateResolver` isn't a function like the other resolvers. It's an object that holds the scalar's rules, and GraphQL uses it wherever the schema says `LocalDate`.

No other resolver changes. `LocalDate` values are still strings, so `issuePolicy` and `fileClaim` keep saving dates the same way. Dates the server makes itself, like a new claim's `filedDate`, are already in `YYYY-MM-DD` format. They're the date in UTC, so in the evening in the Americas, a new claim can be dated tomorrow. A real API would decide which time zone its dates belong to.

</details>

## Objective 2: Document the scalar's format

### `@specifiedBy`

A client developer who sees `effectiveDate: LocalDate!` in the schema still has to guess what a `LocalDate` looks like. The built-in [`@specifiedBy` directive](https://spec.graphql.org/September2025/#sec--specifiedBy) solves that: it links a custom scalar to the document that defines its format.

`LocalDate` uses the `full-date` format from [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6), the standard for dates on the internet. In a schema you write yourself, you'd add the URL to the scalar:

<div data-toolbar-order="">

```graphql
scalar LocalDate @specifiedBy(url: "https://datatracker.ietf.org/doc/html/rfc3339#section-5.6")
```

</div>

Introspection then reports the URL as the scalar type's `specifiedByURL`, so tools and developers can look up the format.

### A catch with library scalars

With a scalar from a library, the directive isn't enough. The library's scalar **replaces** everything the schema file says about `LocalDate`, including its `@specifiedBy` URL and any description. `graphql-scalars` doesn't set a URL for `LocalDate`, so introspection reports no URL, even with the directive in the schema file.

To keep the URL, the resolvers have to use a copy of the library's scalar with the URL added. Every scalar has a `toConfig()` method that returns its settings, including the functions that check its values. Pass those settings, plus a `specifiedByURL`, to `new GraphQLScalarType(...)` from the `graphql` package, and you get the same scalar with a URL.

The URL then lives in two places: the schema file, for people reading it, and **services/policies/src/resolvers.ts**, which is what the server actually reports. Keep them the same.

### Exercise

✏️ In Apollo Sandbox, ask the API how `LocalDate` is specified:

```graphql
{
  __type(name: "LocalDate") {
    name
    specifiedByURL
  }
}
```

It has no URL yet:

<div data-toolbar-order="">

```json
{ "data": { "__type": { "name": "LocalDate", "specifiedByURL": null } } }
```

</div>

✏️ In **services/policies/src/schema.graphql** and **services/policies/src/resolvers.ts**, link `LocalDate` to RFC 3339's `full-date` format, `https://datatracker.ietf.org/doc/html/rfc3339#section-5.6`.

✏️ Run the query again. Your response should be:

<div data-toolbar-order="">

```json
{
  "data": {
    "__type": {
      "name": "LocalDate",
      "specifiedByURL": "https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"
    }
  }
}
```

</div>

✏️ Make sure dates are still checked. Run the February 30th mutation from Objective 1 again. It should still fail with `Value is not a valid LocalDate: 2026-02-30`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, add the directive to the scalar:

```graphql
scalar LocalDate @specifiedBy(url: "https://datatracker.ietf.org/doc/html/rfc3339#section-5.6")
```

✏️ In **services/policies/src/resolvers.ts**, add `GraphQLScalarType` to the import from `"graphql"` at the top of the file:

```ts
import { GraphQLError, GraphQLScalarType } from "graphql";
```

✏️ Replace `LocalDate: LocalDateResolver` with a copy that has the URL:

```ts
export const resolvers = {
  LocalDate: new GraphQLScalarType({
    ...LocalDateResolver.toConfig(),
    specifiedByURL: "https://datatracker.ietf.org/doc/html/rfc3339#section-5.6",
  }),

  Query: {
    // ...
```

`...LocalDateResolver.toConfig()` copies the library scalar's settings, including the functions that check dates, so February 30th is still rejected. Only the URL is new.

If you only add the directive to the schema file, the query still returns `null`. The server reports what the resolvers say.

</details>

## Next steps

Next, we'll look at error handling: returning errors that clients can understand and act on.
