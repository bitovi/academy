@page learn-mcp/your-first-server Your first MCP server
@parent learn-mcp 3

@description Build a working MCP server with one tool and call it successfully.

@body

Your task is to build a server that exposes `add-task`, a tool that adds an item to a shared task list, then call it successfully. You'll build on this same server for the rest of the course, adding a resource that reads the list back and a prompt that uses it.

**Reference**: [Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)

## ✏️ Set up the project

```bash
mkdir mcp-demo && cd mcp-demo
npm init -y
npm install @modelcontextprotocol/server zod tsx
mkdir src
```

## ✏️ Write the server

Create `src/stdio-server.ts`:

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

function createServer(): McpServer {
  const server = new McpServer({ name: "demo-server", version: "1.0.0" });
  const tasks: string[] = [];

  server.registerTool(
    "add-task",
    {
      title: "Add Task",
      description: "Add a task to the shared task list",
      inputSchema: z.object({
        title: z.string().describe("A short description of the task")
      })
    },
    async ({ title }) => {
      tasks.push(title);
      return { content: [{ type: "text", text: `Added: ${title}` }] };
    }
  );

  return server;
}

void serveStdio(createServer);
console.error("demo MCP server running on stdio");
```

That's a complete MCP server.

**`new McpServer({ name, version })`** creates the server and gives it an identity. Clients report that name and version back to the user, so it shows up in VS Code's MCP panel and in Inspector's connection info.

**`createServer` is a factory**, a function that builds a server rather than a server sitting at module scope. Both serving entries call it to get a fresh instance: `serveStdio` once per connection, and `createMcpHandler` once per HTTP request when you move to HTTP in lesson 9. Everything connection-scoped goes inside it, both the registrations and the `tasks` array, so nothing leaks between callers.

**`serveStdio(createServer)`** owns the transport. It reads JSON-RPC messages from stdin, calls your factory to build the instance that serves the connection, and writes replies to stdout. You never touch the streams yourself.

## The three arguments to registerTool

```ts
server.registerTool(
  "add-task",                                   // 1. name
  {                                             // 2. config
    title: "Add Task",
    description: "Add a task to the shared task list",
    inputSchema: z.object({ title: z.string() })
  },
  async ({ title }) => {                        // 3. handler
    tasks.push(title);
    return { content: [{ type: "text", text: `Added: ${title}` }] };
  }
);
```

**The name** is the identifier a client uses to call the tool. Lowercase with hyphens is the convention.

**The config** describes the tool. `title` is an optional display name. `description` is what the model reads when deciding whether to invoke this tool, since tools are model-controlled. `inputSchema` declares the arguments, covered in lesson 7.

**The handler** is your code. It receives the validated arguments and returns a result.

## ✏️ Run it

```bash
npx tsx src/stdio-server.ts
```

You'll see the banner and then nothing:

```
demo MCP server running on stdio
```

**Note**: The banner reached your terminal even though stdout carries protocol traffic. That's `console.error` writing to stderr, as covered in lesson 2.

## ✏️ Call the tool

The fastest way to call a tool without wiring up an editor is MCP Inspector's CLI mode:

```bash
npx @modelcontextprotocol/inspector --cli npx tsx src/stdio-server.ts \
  --method tools/call --tool-name add-task --tool-arg title="Buy milk"
```

```json
{
  "content": [
    {
      "type": "text",
      "text": "Added: Buy milk"
    }
  ]
}
```

Lesson 8 covers Inspector properly. For now this one-liner gives you a fast feedback loop while you're writing tools.
