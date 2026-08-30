@page learn-mcp/adding-a-resource Adding a resource
@parent learn-mcp 4

@description Add a resource to your server and read it back with MCP Inspector.

@body

Nothing yet reads the list back. You could write a `list-tasks` tool for that and it would work, but then the list only reaches the model when the model thinks to ask for it. A resource is the other option: read-only content the host can pull in on its own, without the model deciding anything. You'll add one to the server you just built, then read it back with Inspector.

**Reference**: [Resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources)

## ✏️ Register the resource

Add this inside the factory, next to the tool, so it can close over the same `tasks` array:

```ts
server.registerResource(
  "tasks",
  "demo://tasks",
  { title: "Task list", mimeType: "text/plain" },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: tasks.length
        ? tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")
        : "No tasks yet."
    }]
  })
);
```

`registerResource` takes four arguments: a name, the URI clients use to read it, a config object, and a read handler. The handler returns `contents`, a list because one read can return several parts, each carrying the `uri` it came from.

**Note**: `demo://tasks` is a made-up URI, not a location that resolves to anything, just the identifier a client uses to ask for this resource. A resource doesn't have to be static content on disk, it only has to be safe to read: this handler reports on `tasks` without ever changing it.

A resource differs from a tool in two ways:

- **It's addressed by a URI**, not a name. Clients read `demo://tasks` rather than calling `tasks`.
- **There's no input schema.** A resource read takes no arguments. If you find yourself wanting arguments, you either want a tool, or a resource template, which parameterizes the URI itself.

## ✏️ List and read it

List it:

```bash
npx @modelcontextprotocol/inspector --cli npx tsx src/stdio-server.ts --method resources/list
```

```json
{
  "resources": [
    {
      "name": "tasks",
      "title": "Task list",
      "uri": "demo://tasks",
      "mimeType": "text/plain"
    }
  ]
}
```

Read it:

```bash
npx @modelcontextprotocol/inspector --cli npx tsx src/stdio-server.ts \
  --method resources/read --uri "demo://tasks"
```

```json
{
  "contents": [
    {
      "uri": "demo://tasks",
      "text": "No tasks yet."
    }
  ]
}
```

**Note**: That's `"No tasks yet."` even though you added `"Buy milk"` in the last lesson. Every `--cli` invocation starts your server as a brand new process, and `tasks` is an array in that process's memory, so it begins empty each time and nothing you did in an earlier command survives. The tool and the read only see the same list when they happen against one running process, which is what the next lesson gives you by connecting a real assistant and leaving it open.

Your server now exposes both kinds of capability, one the model reaches for and one the host does.
