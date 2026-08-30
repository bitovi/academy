@page learn-mcp/going-further Going further
@parent learn-mcp 9

@description Serving over HTTP, progress and cancellation, subscriptions, and authorization.

@body

Nothing to build here. Each section introduces one capability you'll want eventually, names it, and points at its documentation.

## Serving over HTTP

Everything you built today runs over stdio. To host one endpoint that many clients connect to, you serve the same factory over Streamable HTTP instead. Your tools don't change.

`createMcpHandler` takes your factory and returns a handler whose `fetch` is a web-standard `(Request) => Promise<Response>`. On a web-standard runtime, `export default handler` is the whole mount. Under a Node framework, wrap it once with `toNodeHandler`:

```ts
import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { createServer } from "./mcp-server.js";

const handler = createMcpHandler(createServer);
const node = toNodeHandler(handler);
const app = createMcpExpressApp();

app.all("/mcp", (req, res) => void node(req, res, req.body));
app.listen(3000);
```

This is where the factory pattern from lesson 3 pays off: `createMcpHandler` calls it once per HTTP request.

`createMcpExpressApp` is doing more work than it looks: the handler checks no headers and verifies no tokens of its own, so a bare `express()` in its place would leave the endpoint unguarded.

**Reference**: [Serve over HTTP](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/http.md)

## Progress, cancellation, and subscriptions

All three are notifications rather than results: two of them scoped to one request, the third streamed on a request that stays open. The per-request helpers live on `ctx.mcpReq`, the second argument every handler receives.

### Progress

A client that wants updates puts a `progressToken` in the request's `_meta`. No token means it didn't ask, so send nothing. `progress` must increase on every notification, and `total` is optional.

```ts
const progressToken = ctx.mcpReq._meta?.progressToken;

if (progressToken !== undefined) {
  await ctx.mcpReq.notify({
    method: "notifications/progress",
    params: { progressToken, progress: i + 1, total: files.length }
  });
}
```

### Cancellation

`ctx.mcpReq.signal` is an `AbortSignal`, aborted when the client cancels the request and when the connection closes. Check it between units of work, and pass it to your own I/O so a cancelled call stops costing you something.

```ts
for (const page of pages) {
  if (ctx.mcpReq.signal.aborted) break;
  await scan(page, { signal: ctx.mcpReq.signal });
}
```

### Subscriptions

Nothing so far tells a client that your tool list grew or that a resource it read has changed. A client asks to be told by sending `subscriptions/listen` with a filter naming what it wants: `toolsListChanged`, `promptsListChanged`, `resourcesListChanged`, or `resourceSubscriptions` for specific URIs. That request stays open as a stream instead of answering once.

Your server must acknowledge the subscription before sending anything on it, and must never send a type the client didn't request. The SDK handles both, and it handles most of the sending too: `registerTool` and its siblings return a handle, and updating, disabling, or removing through that handle emits the matching list-changed notification by itself. You only send explicitly when something changes that the registration API can't see.

```ts
await server.sendResourceUpdated({ uri: "demo://tasks" });
await server.sendToolListChanged();
```

On stdio those go straight onto the open subscription stream. Over HTTP the server instance is per-request, so there you publish through the handler instead, as `handler.notify.resourceUpdated(uri)`. Either way only the streams that opted in receive it, and per-resource updates additionally need the server to advertise `resources: { subscribe: true }`.

**Reference**: [Progress and cancellation](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/servers/logging-progress-cancellation.md), [Notifications](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/servers/notifications.md), and [Subscriptions](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions)

## Authorization

This applies to HTTP transports only. A stdio server reads credentials from the environment instead.

Your server is an OAuth **resource server**: it verifies tokens, and never issues them. `requireBearerAuth` is that gate, mounted in front of your `/mcp` route. It answers `401 invalid_token` for a bad token and `403 insufficient_scope` for a valid one missing a required scope.

`requiredScopes` covers the whole endpoint. A scope only one tool needs is checked in that handler, where `ctx.http.authInfo` carries the caller, and refused with `isError: true`.

**Reference**: [Require authorization](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/authorization.md)
