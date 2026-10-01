@page learn-graphql-102/performance-and-hosting Performance and Hosting
@parent learn-graphql-102 10
@outline 2

@description Learn the GraphQL documentation's performance recommendations, and what changes when a GraphQL API runs in production.

@body

## Overview

In this section, we will:

- Review the GraphQL documentation's performance recommendations, and where the course covered them
- Learn how persisted queries, compression, and monitoring make an API faster
- Learn how a hosting platform checks that the API is healthy
- Review what changes when the API runs in production

This section has no exercise. It collects the recommendations you'll want to know when you put a GraphQL API in front of real users.

## Objective 1: Understand GraphQL performance

### The recommendations

The [GraphQL documentation's performance page](https://graphql.org/learn/performance/) lists six recommendations. You've already worked through most of them:

<table>
   <tr>
      <th>Recommendation</th>
      <th>Where it's covered</th>
   </tr>
   <tr>
      <td><a href="https://graphql.org/learn/performance/#the-n1-problem">The N+1 problem</a></td>
      <td>101's N+1 and DataLoader section</td>
   </tr>
   <tr>
      <td><a href="https://graphql.org/learn/performance/#demand-control">Demand control</a>: limiting page size, depth, and cost</td>
      <td>The Security section</td>
   </tr>
   <tr>
      <td><a href="https://graphql.org/learn/performance/#client-side-caching">Client-side caching</a></td>
      <td>The Caching section</td>
   </tr>
   <tr>
      <td><a href="https://graphql.org/learn/performance/#get-requests-for-queries"><code>GET</code> requests for queries</a></td>
      <td>The Caching section, and below</td>
   </tr>
   <tr>
      <td><a href="https://graphql.org/learn/performance/#json-with-gzip">JSON with gzip</a></td>
      <td>Below</td>
   </tr>
   <tr>
      <td><a href="https://graphql.org/learn/performance/#performance-monitoring">Performance monitoring</a></td>
      <td>Below</td>
   </tr>
</table>

### Persisted queries

Every request a client sends includes the full text of its query. For a big query, that's a lot to send again and again. It also makes `GET` requests awkward, because the query has to fit in the URL.

A **persisted query** replaces the text with a short ID: the query's SHA-256 hash. [Apollo Server supports automatic persisted queries](https://www.apollographql.com/docs/apollo-server/performance/apq) (APQ) with no configuration:

1. The client sends only the hash. If the server hasn't seen it, it answers with a `PERSISTED_QUERY_NOT_FOUND` error.
2. The client sends the hash **and** the query text. The server saves the query under that hash, and runs it.
3. From then on, the client sends only the hash, and the server looks up the query.

The hash goes in the request's `extensions`, an extra field next to `query` and `variables`:

```json
{ "persistedQuery": { "version": 1, "sha256Hash": "15e5dba064bd39d724f2b496de5e639781d5bf1dce7ca4df025b7053d647efda" } }
```

That hash is for the query `{ policies { policyNumber } }`. Once a query can be sent as a short hash, it fits in a `GET` URL, so browsers and CDNs can cache the response, as described in the Caching section. In real apps, a client library like Apollo Client handles all of this.

Automatic persisted queries make requests smaller, but any client can still register any query. Some APIs go further, with **trusted documents**: only queries registered ahead of time, by the API's own apps, are allowed at all. The GraphQL documentation [recommends them as a security measure](https://graphql.org/learn/security/#trusted-documents) too.

### Compression

GraphQL responses are JSON, and JSON compresses well. When a client sends the header `Accept-Encoding: gzip`, a server can compress the response, and the client unpacks it. The GraphQL documentation [recommends turning this on](https://graphql.org/learn/performance/#json-with-gzip), because large responses shrink a lot.

Compression usually happens outside GraphQL: in the web framework, or in a proxy or CDN in front of the server. The course API's `startStandaloneServer` doesn't compress responses. An API that needs compression runs Apollo Server inside a framework like Express and adds it there, or turns it on in the proxy.

### Monitoring

To improve performance, you first need to know which operations are slow. The GraphQL documentation recommends [collecting metrics, traces, and logs](https://graphql.org/learn/performance/#performance-monitoring), often with a standard like OpenTelemetry, and sending them to a monitoring tool.

In Apollo Server, the place to measure is a **plugin**, like the response cache plugin from the Caching section. A plugin's functions run at points in each request's life, listed in Apollo's [plugin event reference](https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference). For example, this plugin logs how long each operation takes:

```ts
import { ApolloServer, type ApolloServerPlugin } from "@apollo/server";

// Logs how long each operation takes
const logTiming: ApolloServerPlugin = {
  async requestDidStart() {
    const start = Date.now();
    return {
      async willSendResponse(requestContext) {
        const ms = Date.now() - start;
        console.log(`[TIMING] ${requestContext.operationName ?? "(anonymous)"} took ${ms} ms`);
      },
    };
  },
};
```

- **`requestDidStart`** runs when a request arrives, and records the time.
- **`willSendResponse`** runs just before that same request's response is sent, and works out how long it took.

Added to the server's `plugins` list, it logs a line like `[TIMING] PolicyList took 7 ms` for each request. A query answered by the response cache shows up as much faster, often `0 ms`. A real API would send these numbers to a monitoring tool instead of the terminal, so it can show the slowest operations over time.

### What to watch

The GraphQL documentation doesn't recommend specific dashboards or alerts, and [OpenTelemetry's GraphQL conventions](https://opentelemetry.io/docs/specs/semconv/graphql/graphql-spans/) cover only traces: they name the attributes a trace should record, like `graphql.operation.name` and `graphql.operation.type`. Monitoring tools fill the gap. Apollo GraphOS, for example, can [alert on](https://www.apollographql.com/docs/graphos/platform/insights/notifications/performance-alerts) request rate, p50/p95/p99 response time, and error percentage, for the whole API or for one operation, measured over a rolling five-minute window.

One thing is different from monitoring a REST API. A GraphQL request that fails often still returns HTTP `200`, with an `errors` array, as you saw in the Error Handling section. Monitoring that only counts HTTP error statuses misses those failures, so a tool has to look inside the response.

A common starting point is:

- **For each operation, by name:** how many requests it gets, how long the slowest 5% take (p95), and what share of its responses have errors. Watching each operation separately is why naming operations, like `PolicyList`, matters.
- **Errors by code:** count errors by `extensions.code`, like `BAD_USER_INPUT` or `INTERNAL_SERVER_ERROR`, so a spike in one kind stands out.
- **The server itself:** a separate alert on HTTP `5xx` responses and failed health checks, for outages.

Alert thresholds depend on each API's normal traffic, so there's no standard number. Teams usually start by watching the dashboards for a while, then alert when error percentage or p95 response time rises well above normal.

## Objective 2: Run the API in production

### Health checks

Hosting platforms, load balancers, and container systems like Kubernetes check each copy of a server regularly, and stop sending it traffic if it stops answering.

Apollo Server [has no built-in health check endpoint](https://www.apollographql.com/docs/apollo-server/monitoring/health-checks). Apollo recommends a `GET` request for the smallest possible query, `{__typename}`, with an `apollo-require-preflight: true` header:

```shell
curl -s 'http://localhost:4001/?query=%7B__typename%7D' -H 'apollo-require-preflight: true'
```

```json
{ "data": { "__typename": "Query" } }
```

A successful answer shows the server is up **and** can run GraphQL. The header is needed because Apollo Server's [CSRF protection](https://www.apollographql.com/docs/apollo-server/security/cors#preventing-cross-site-request-forgery-csrf) blocks `GET` requests that could have come from an ordinary web page. Without it, the check fails with a `400` status.

### A production checklist

Most of what changes in production, you've already done in this course. Before putting a GraphQL API in front of real users:

- **Set `NODE_ENV=production`.** It turns off introspection and stack traces, unless you've set `introspection` or `includeStacktraceInErrorResponses` yourself. An explicit `introspection: true` keeps introspection on, so tie it to the environment with `introspection: process.env.NODE_ENV !== "production"`. Also turn off field suggestions, as in the Security section.
- **Limit what a query can ask for.** Cap page sizes and query depth, as in the Security section.
- **Check who's asking.** Put the user in `contextValue`, and check permissions, as in the Authorization section.
- **Share the cache.** With several copies of the server, use a shared store like Redis, as described in the Caching section.
- **Share events.** If the API has subscriptions, publish events through a system every copy can reach, as described in the Subscriptions section.
- **Send smaller requests.** Use persisted queries, or trusted documents if only your own apps should be able to query the API.
- **Compress responses**, in the server or the proxy in front of it.
- **Add a health check**, so the platform knows when a copy is down.
- **Measure.** Send timings and errors to a monitoring tool, so you can see which operations are slow.

## Next steps

Next, we'll wrap up the course.
