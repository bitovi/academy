@page learn-graphql-102/security Security
@parent learn-graphql-102 6
@outline 2

@description Stop the API from leaking details about its schema and code, and reject queries that ask for too much data or nest too deeply.

@body

## Overview

In this section, we will:

- Turn off introspection, and hide field suggestions and stack traces from error responses
- Limit how many items a client can ask for in one page
- Limit how deeply a query can nest
- Learn about other protections production APIs use

The recommendations in this section come from the [OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html). OWASP is a nonprofit that publishes widely used guidance on web application security.

## Objective 1: Stop leaking details

### What the API gives away

Right now, the course API tells anyone who asks exactly how it's built, in three ways:

- **Introspection.** In 101, you used introspection to explore the schema. Anyone who can reach the API can do the same, and see every type and field, including ones your own apps never use. That's what you want while developing, but a public API can give attackers a map of every field to probe.
- **Field suggestions.** Ask for a field that doesn't exist, and the error suggests a real one, like `Did you mean "claims"?`. Someone who guesses enough field names can rebuild much of the schema from those suggestions, even with introspection off.
- **Stack traces.** In the Error Handling section, you saw that Apollo adds a `stacktrace` to errors while you're developing. A stack trace shows file names, function names, and the libraries the server uses. That helps you fix bugs, and it helps an attacker look for weaknesses.

The OWASP cheat sheet recommends [restricting introspection and turning off field suggestions](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#introspection-graphiql), and [not returning stack traces](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#dont-return-excessive-errors) in production. Apollo Server has an [option for each](https://www.apollographql.com/docs/apollo-server/api/apollo-server), set in the `ApolloServer` constructor:

- **`introspection`**: when `false`, introspection queries are rejected. It's `true` by default, unless `NODE_ENV` is `production`. The course API sets it to `true` in **services/policies/src/index.ts**, so Apollo Sandbox works in the Codespace.
- **`hideSchemaDetailsFromClientErrors`**: when `true`, error messages leave out the "Did you mean" suggestions. It's `false` by default.
- **`includeStacktraceInErrorResponses`**: when `false`, errors leave out the `stacktrace`. It's `true` by default, unless `NODE_ENV` is `production` or `test`.

In a real deployment, setting `NODE_ENV` to `production` turns off introspection and stack traces for you. Suggestions have to be turned off yourself.

Hiding these details doesn't protect the data. Every field is still there for anyone who knows or guesses its name. Real protection comes from authorization and from limits on expensive queries, which the rest of this section and the Authorization section cover.

### Exercise

✏️ In **services/policies/src/index.ts**, turn introspection off.

✏️ Run this introspection query:

```graphql
{
  __type(name: "Claim") {
    name
  }
}
```

It fails before any resolver runs. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "GraphQL introspection is not allowed by Apollo Server, but the query contained __schema or __type. To enable introspection, pass introspection: true to ApolloServer in production",
      "extensions": { "validationErrorCode": "INTROSPECTION_DISABLED", "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

✏️ Reload Sandbox. It can no longer load the schema, so the **Documentation** panel and autocomplete stop working.

✏️ Run this query, which asks for a field that doesn't exist:

```graphql
{
  claim {
    id
  }
}
```

Introspection is off, but the error still suggests the real field name, and includes a stack trace. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"claim\" on type \"Query\". Did you mean \"claims\"?",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED", "stacktrace": ["GraphQLError: Cannot query field..."] }
    }
  ]
}
```

Your `stacktrace` is longer: a list of lines showing where in the server's code the error happened.

✏️ In **services/policies/src/index.ts**, also turn off field suggestions and stack traces in error responses.

✏️ Run the `claim` query again. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"claim\" on type \"Query\".",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

The suggestion and the `stacktrace` are both gone. The error still says which field is wrong, so a developer can fix the query.

✏️ Turn introspection back on in **services/policies/src/index.ts**, and reload Sandbox. The rest of the course uses it. Leave suggestions and stack traces off.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ While you test, **services/policies/src/index.ts** has all three options set:

```ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: false,
  hideSchemaDetailsFromClientErrors: true,
  includeStacktraceInErrorResponses: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});
```

✏️ At the end, change `introspection` back to `true`, so Sandbox works for the rest of the course.

Apollo checks for introspection while it validates the query, the same step that rejects a misspelled field. That's why the error has the code `GRAPHQL_VALIDATION_FAILED` and no resolver runs.

Stack traces are still useful while you develop. A common setup leaves `includeStacktraceInErrorResponses` out, and lets `NODE_ENV` decide: stack traces on your own machine, and none in production. We set it here so you can see the difference in the Codespace.

</details>

## Objective 2: Limit the page size

### Every query costs the server something

A GraphQL client decides how much data it asks for. That's what makes GraphQL flexible, and it's also what makes it easy to abuse. One request can ask the server to do a huge amount of work, and nothing in the schema stops it.

The OWASP cheat sheet recommends [limiting both](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth-amount):

- **Amount**: how many items one field can return
- **Depth**: how deeply fields can nest inside each other

### Limit the page size

`claimsConnection` lets the client choose `first`, and nothing limits it. A client can ask for `first: 1000000`, and the server will try to build a page of a million claims.

Most public APIs set a maximum. GitHub's GraphQL API, for example, [requires `first` to be between 1 and 100](https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api#node-limit).

### Exercise

<strong>Before you start:</strong> this exercise builds on `claimsConnection`, which you add in the Pagination section. Complete Pagination first.

✏️ Before changing anything, run this query, with a negative `first`:

```graphql
{
  claimsConnection(first: -1) {
    edges {
      node {
        claimNumber
      }
    }
  }
}
```

It doesn't fail. `slice` treats a negative end as "count from the end of the list", so you get every claim except the last one:

```json
{
  "data": {
    "claimsConnection": {
      "edges": [
        { "node": { "claimNumber": "CLM-5001" } },
        { "node": { "claimNumber": "CLM-5002" } },
        { "node": { "claimNumber": "CLM-5003" } },
        { "node": { "claimNumber": "CLM-5004" } },
        { "node": { "claimNumber": "CLM-5005" } }
      ]
    }
  }
}
```

✏️ In **services/policies/src/resolvers.ts**, make `claimsConnection` throw an error when `first` is less than 1 or more than 100. The message is `first must be between 1 and 100`, and the code is `BAD_USER_INPUT`.

✏️ Run the query again. Your response (trimmed for readability) should be:

```json
{
  "errors": [
    {
      "message": "first must be between 1 and 100",
      "path": ["claimsConnection"],
      "extensions": { "code": "BAD_USER_INPUT" }
    }
  ],
  "data": null
}
```

✏️ Run it with `first` too large:

```graphql
{
  claimsConnection(first: 1000000) {
    edges {
      node {
        claimNumber
      }
    }
  }
}
```

It fails with the same error.

### Verify

✏️ Run it with `first` at the maximum:

```graphql
{
  claimsConnection(first: 100) {
    edges {
      node {
        claimNumber
      }
    }
  }
}
```

It works, and returns all six claims.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/resolvers.ts**, add a check to the start of the `claimsConnection` resolver:

```ts
    claimsConnection: (_: unknown, args: { first: number; after?: string }) => {
      if (args.first < 1 || args.first > 100) {
        throw new GraphQLError("first must be between 1 and 100", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      // ...the rest of the resolver is unchanged
```

The check comes first, so the resolver stops before it does any work.

</details>

## Objective 3: Limit how deeply a query can nest

### Limit the depth

In 101, you saw that nested queries can get expensive, and that production APIs add depth limits. Policies have a policyholder, policyholders have policies, and policies have claims that point back to their policy. Those connections go in circles, so a client can nest them as deeply as it likes:

```graphql
{
  policyholders {
    policies {
      policyholder {
        policies {
          policyholder {
            policies {
              policyNumber
            }
          }
        }
      }
    }
  }
}
```

Each level multiplies the work, and a query can repeat the pattern hundreds of times. A real screen never needs that.

A **depth limit** rejects any query that nests deeper than a set number of levels. The OWASP cheat sheet names the [`graphql-depth-limit`](https://github.com/stems/graphql-depth-limit) library for JavaScript APIs, and the course API already has it installed. It checks a query while GraphQL validates it, before any resolver runs, and it ignores introspection queries, so Sandbox keeps working.

### Adding a validation rule

A **validation rule** is a check GraphQL runs on every query before any resolver runs. Apollo Server's `validationRules` option takes a list of extra rules to run, on top of GraphQL's own.

For example, the `graphql` package has a built-in rule, `NoSchemaIntrospectionCustomRule`, that rejects introspection queries. Adding it would look like this:

```ts
import { NoSchemaIntrospectionCustomRule } from "graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [NoSchemaIntrospectionCustomRule],
});
```

Don't add this one. The course API uses introspection, and the `introspection` option already does the same job. It only shows how a rule is added.

### Exercise

✏️ In **services/policies/src/index.ts**, add a depth limit of `5`, using the default export of `graphql-depth-limit`, called `depthLimit`. `depthLimit(5)` returns a validation rule.

✏️ Run this query, named `AgentView`, which nests 5 levels below `policyholder`:

```graphql
query AgentView {
  policyholder(id: "ph1") {
    policies {
      claims {
        policy {
          policyholder {
            name
          }
        }
      }
    }
  }
}
```

It works, because it's within the limit.

✏️ Run this query, which nests one level deeper:

```graphql
query TooDeep {
  policyholder(id: "ph1") {
    policies {
      claims {
        policy {
          policyholder {
            policies {
              policyNumber
            }
          }
        }
      }
    }
  }
}
```

It fails before any resolver runs. The response (trimmed for readability) is:

```json
{
  "errors": [
    {
      "message": "'TooDeep' exceeds maximum operation depth of 5",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

### Verify

✏️ Reload Apollo Sandbox. The **Documentation** panel still loads. Sandbox's introspection query nests much deeper than 5 levels, but `graphql-depth-limit` doesn't count introspection.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/index.ts**, import the library:

```ts
import depthLimit from "graphql-depth-limit";
```

✏️ Add the rule to the `ApolloServer` constructor:

```ts
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  hideSchemaDetailsFromClientErrors: true,
  includeStacktraceInErrorResponses: false,
  validationRules: [depthLimit(5)],
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});
```

`graphql-depth-limit` counts levels below each top-level field. In `AgentView`, `policies` is level 1 and `name` is level 5.

Choosing the limit is a judgment call. Set it deep enough for the deepest query your own apps send, and no deeper.

</details>

## Other protections

Depth and page-size limits stop the most common problems, but a query can still be expensive without being deep. The OWASP cheat sheet also recommends:

- **[Query cost analysis](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-cost-analysis)**: give each field a cost, add up the cost of each query before running it, and reject queries that cost too much.
- **[Timeouts](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#timeouts)**: stop any request that runs too long.
- **[Limits on batching](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#batching-attacks)**: stop one request from running the same expensive field many times at once.

## Next steps

Next, we'll look at authorization: deciding who can see and change which data.
