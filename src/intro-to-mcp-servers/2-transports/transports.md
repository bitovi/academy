@page learn-mcp/transports Transports
@parent learn-mcp 2

@description The two transports MCP defines, how to choose between them, and the rule about standard output.

@body

This lesson covers both transports MCP defines, how to choose between them, and the one rule a stdio server must follow about standard output.

A <dfn title="Transport: the mechanism that carries MCP messages between a client and a server. It defines how messages are framed and delivered, not what they mean.">transport</dfn> is how MCP messages get between a client and your server. MCP defines two: <dfn title="stdio transport: the client launches your server as a subprocess and exchanges newline-delimited JSON-RPC messages over its standard input and output streams.">stdio</dfn> and <dfn title="Streamable HTTP transport: each message is an HTTP POST to a single endpoint on your server, and the reply is either a JSON object or an SSE stream scoped to that request.">Streamable HTTP</dfn>.

Tools, resources, and prompts behave the same way on both, and the code you write for them doesn't change.

**Reference**: [Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports)

## stdio: a program the client launches

In the stdio transport, the client launches the MCP server as a subprocess. The server reads JSON-RPC messages from <dfn title="stdin: the standard input stream, where a process receives data.">stdin</dfn> and writes JSON-RPC messages to <dfn title="stdout: the standard output stream. In a stdio MCP server this channel carries valid MCP messages only.">stdout</dfn>. Messages are delimited by newlines and must not contain embedded newlines.

Nothing listens on a port. You configure it by telling the client what command to run:

```json
{
  "servers": {
    "my-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "src/stdio-server.ts"]
    }
  }
}
```

This is the right choice when your server works with local things: files on this machine, a local database, installed CLI tools. It's also the fastest way to develop, which is why we use it today.

## Streamable HTTP: a service clients connect to

With Streamable HTTP, your server exposes one endpoint and accepts `POST` requests to it. Each message is its own POST. The reply is either a plain JSON object, or a stream scoped to that request when the tool reports progress along the way.

```json
{
  "servers": {
    "my-server": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

This is the right choice when many people need to reach one shared instance, or when the server needs to live somewhere other than each user's laptop.

## Picking one

<table>
   <tr>
      <th></th>
      <th>stdio</th>
      <th>Streamable HTTP</th>
   </tr>
   <tr>
      <td>Started by</td>
      <td>The client, as a subprocess</td>
      <td>You, as a long-running service</td>
   </tr>
   <tr>
      <td>Reachable by</td>
      <td>The one client that launched it</td>
      <td>Anyone who can reach the URL</td>
   </tr>
   <tr>
      <td>Addressed by</td>
      <td>A command to run</td>
      <td>A URL</td>
   </tr>
   <tr>
      <td>Good for</td>
      <td>Local files, local tooling, development</td>
      <td>Shared or hosted servers</td>
   </tr>
   <tr>
      <td>Concurrent clients</td>
      <td>One per process</td>
      <td>Many</td>
   </tr>
</table>
The choice isn't permanent. You can serve the same tools over either transport, and moving from stdio to HTTP later changes the file that serves your server, not the tools themselves.

## ✏️ Registering a stdio server with your assistant

A stdio server is only useful once a client is configured to launch it. Every assistant reads its own configuration, so the examples below cover the two you'll be using today, GitHub Copilot and Claude Code. Set up the one you're on before moving on.

**If you're using GitHub Copilot**, create `.vscode/mcp.json` in your workspace with this content:

```json
{
  "servers": {
    "demo-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "src/stdio-server.ts"]
    }
  }
}
```

**If you're using Claude Code**, run this in the terminal instead.

```bash
claude mcp add demo-server --transport stdio -- npx tsx src/stdio-server.ts
```

Both name a command that starts your server as a subprocess, which is exactly what "stdio" means. You don't have a server for it to launch yet, that's lesson 3, so it won't connect successfully. Do it anyway: the config will be sitting there once `src/stdio-server.ts` exists.

## Writing to the standard streams

**Important**: A server must not write anything to its stdout that is not a valid MCP message. That stream carries the protocol, and `console.log` writes to it:

```ts
async ({ title }) => {
  console.log("adding task:", title);  // goes into the protocol stream
  tasks.push(title);
  return { content: [{ type: "text", text: `Added: ${title}` }] };
}
```

Read the raw stdout of a server doing that and the log text sits alongside the response:

```
adding task: Buy milk
{"result":{"content":[{"type":"text","text":"Added: Buy milk"}],...},"jsonrpc":"2.0","id":1}
```

In practice the call may still succeed, because the SDK client and MCP Inspector skip any line that doesn't parse as a JSON-RPC message. That tolerance is their own behavior, not something the protocol promises, so don't build on it.

For logging, use <dfn title="stderr: the standard error stream, separate from stdout. A server may write log messages here for any purpose; clients may capture, forward, or ignore it.">stderr</dfn> instead, which a server may write to for any purpose:

```ts
console.error("adding task:", title);  // safe
```

## ✏️ Exercise

1. You're building a server that reads and edits files in the user's current project. Which transport, and why?

2. You're building a server that wraps your company's internal API so anyone on the team can use it from their editor. Which transport, and why?

3. A stdio server has `console.log("done")` inside a tool handler. You call the tool through MCP Inspector and it returns the right answer. Is the code correct?

<details>
<summary>Answers</summary>

1. **stdio.** The files are local to that user's machine, so the server needs to run there. The client launches it as a subprocess and nothing needs to be hosted.

2. **Streamable HTTP.** Many people need to reach one shared instance, and the server needs to live somewhere other than each user's laptop.

3. **No.** A server must not write anything to stdout that is not a valid MCP message, and `console.log` writes there. Inspector skipped the line because it didn't parse as a JSON-RPC message, so the call appeared to succeed. A stricter client doesn't have to do that. Use `console.error`.

</details>
