@page learn-graphql-102/wrapping-up Wrapping Up
@parent learn-graphql-102 11
@outline 2

@description Review what you changed to get the course API ready for real users, and where to go next.

@body

## What you built

You started GraphQL 102 with a working API that wasn't ready for real users. Here's what changed:

- **Long lists come back one page at a time.** `claimsConnection` uses cursors and the connection pattern, so clients can page through claims without skipping or repeating any.
- **Dates are real dates.** `LocalDate`, from a well-tested library, rejects dates that don't exist before they reach your code.
- **Errors say what went wrong.** Mistakes come back in `errors` with a code a client can check, and expected problems, like a claim that's already decided, are part of the schema.
- **The API gives away less.** Introspection, field suggestions, and stack traces can all be turned off, and page size and query depth are limited.
- **The API checks who's asking.** The logged-in user reaches every resolver through `contextValue`, and only agents can issue policies. `approveClaim` and `fileClaim` are still open to anyone. The same check, or the `requireRole` helper from the Authorization section, would protect them.
- **Repeated queries are cheaper.** Cache hints say how long data stays correct, and the server can answer repeated queries from a cache.

You also saw how subscriptions push live updates to clients, and what else to set up before running a GraphQL API in production: persisted queries, compression, monitoring, and health checks.

## Reset the course data

To go back to the starting data, stop the server, run `npm run reset-data` in **services/policies**, and start it again.

## Where to go next

- **Federation** combines APIs owned by separate teams into one graph that clients query through a single endpoint. It has its own training.
- **The GraphQL documentation's [Best Practices](https://graphql.org/learn/best-practices/)** covers each topic in this course in more depth, along with others like schema design and performance monitoring.
- **The [OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)** is worth keeping at hand whenever you put a GraphQL API in front of real users.
