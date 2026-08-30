@page learn-mcp/debugging-with-inspector Debugging with MCP Inspector
@parent learn-mcp 8

@description Drive MCP Inspector's web client and read the wire to diagnose a misbehaving tool.

@body

<dfn title="MCP Inspector: an official tool that acts as an MCP client, letting you connect to a server and call its tools without wiring up an editor or writing a client.">MCP Inspector</dfn> is a client you can point at any MCP server to list its capabilities and call them by hand. You used its `--cli` mode for single calls in earlier lessons. The web client is the fuller surface, and it's what this lesson uses: you'll work through its panels, then use them to find and fix a bug that reports itself as a success.

**Reference**: [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)

## Connecting on the modern protocol

Inspector connects on the **legacy** protocol era by default. To get the modern era (`2026-07-28`), give your server an entry in an Inspector catalog file with `protocolEra` set, then launch against that file:

```json
{
  "mcpServers": {
    "demo-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "src/stdio-server.ts"],
      "protocolEra": "modern"
    }
  }
}
```

```bash
npx @modelcontextprotocol/inspector --catalog inspector-catalog.json
```

Keep that file in your project root, not `.vscode/`. It belongs to Inspector alone, unrelated to `.vscode/mcp.json` or Claude Code's `.mcp.json`.

## ✏️ Exercise: launch it

1. Create `inspector-catalog.json` in your project root with the entry above.
2. Run the launch command. Open the URL it prints exactly as printed: the token in it authenticates your browser to Inspector's backend, which can spawn processes on your machine.
3. From the **Servers** tab, connect to `demo-server`.
4. Open **Connection Info** and confirm **Protocol** reads `2026-07-28` and **Era** reads `Modern`.

## The panels

Once connected, the tab bar across the top carries one panel per capability your server declared:

<table>
   <tr>
      <th>Panel</th>
      <th>What you see in it</th>
   </tr>
   <tr>
      <td><strong>Servers</strong></td>
      <td>Your server list, connection state, and per-server settings</td>
   </tr>
   <tr>
      <td><strong>Tools</strong></td>
      <td>Every registered tool, its arguments as a generated form, and the result of a call</td>
   </tr>
   <tr>
      <td><strong>Prompts</strong></td>
      <td>Every registered prompt, its arguments, and the messages it renders</td>
   </tr>
   <tr>
      <td><strong>Resources</strong></td>
      <td>Every registered resource by URI, and the content a read returns</td>
   </tr>
</table>

The monitoring panels sit in a separate column down the right-hand side rather than in that tab bar:

<table>
   <tr>
      <th>Panel</th>
      <th>What you see in it</th>
   </tr>
   <tr>
      <td><strong>Protocol</strong></td>
      <td>The JSON-RPC transcript: each request paired with its response</td>
   </tr>
   <tr>
      <td><strong>Console</strong></td>
      <td>Your server process's stderr, which is where its own logging goes</td>
   </tr>
</table>

Keeping them in their own column is the point: you can watch the traffic while you work in Tools or Resources, instead of switching away from what you're doing.

**Note**: A server with a `logging` capability, task support, or an HTTP transport also gets Logs, Tasks, or Network panels alongside those two. Yours has none of those, so they don't appear.

## ✏️ Exercise: explore the panels

Work through each panel and note what it tells you that the others don't.

1. **Tools**: call `add-task` with `title: "Buy milk"`. Where did the input field and its help text come from?
2. **Resources**: read `demo://tasks`. Is the task from step 1 there? Why does that differ from the `--cli` read in lesson 4?
3. **Prompts**: render `daily-standup` with a name. Where does the name end up in the message?
4. **Protocol**: find the `tools/call` entry from step 1 and expand it. Which field ties the request to its response, and which field holds your tool's output?
5. **Console**: what's in here, and which line of your server put it there?

<details>
<summary>Answers</summary>

1. From your `inputSchema`. Inspector generates the form from the Zod schema and uses your `.describe()` text as the field's help, so a wrong-looking field means a wrong schema.
2. **Yes.** The web client holds one connection open across all these calls, so the tool and the resource share the same `tasks` array. Each `--cli` invocation was a separate process, a separate connection, and a separate array.
3. Substituted into the message text by your callback, which received it as `argsSchema` validated it.
4. **`id`** pairs them: the result carries back the same id as its request. Your output is under **`result.content`**. The result also carries `resultType: "complete"`, which only appears because you connected on the modern era.
5. Your startup banner, `demo MCP server running on stdio`. `console.error` wrote it to stderr, which is the only stream a server may use for its own output.

</details>

## Where to look when a call goes wrong

1. **Is `content` populated?** Empty `content` on a successful call means the result shape is wrong, almost always a misspelled or missing key.
2. **Is `isError` set?** If so, the message text is your error, and the fix is usually in your handler.
3. **Did the request carry the arguments you expected?** Check the request half of the Protocol entry. A tool behaving as though it got nothing may have received nothing.
4. **Is there a matching response at all?** A request with no paired response means the server didn't answer, so look for a crash in the Console panel rather than a logic bug.

## ✏️ Exercise: break it and debug it

Introduce a bug in `add-task` and track it down. Restart the server entry in Inspector after each edit so it picks up the change.

**Bug 1.** Change your handler's return to misspell the result key:

```ts
return { message: [{ type: "text", text: `Added: ${title}` }] };
```

1. Call `add-task` from the Tools panel. Does it report an error?
2. Open Protocol and read the result. Where did your text go, and what is `content`?
3. Why did neither the SDK nor Inspector reject this?

**Bug 2.** Now fix the key but return `content` as a single object instead of an array:

```ts
return { content: { type: "text", text: `Added: ${title}` } };
```

4. Call it again. How does this failure differ from Bug 1, and where does Inspector show it?
5. Fix the tool. Which of the two bugs would you rather ship, and what does that tell you about which failures to look for?

<details>
<summary>Answers</summary>

1. **No.** The call reports success, and the Tools panel shows an empty result.

2. Your text is in a field called `message`, which no client reads. `content` is an empty array:

   ```json
   {
     "content": [],
     "message": [{ "type": "text", "text": "Added: Buy milk" }],
     "resultType": "complete"
   }
   ```

3. Nothing is invalid. `content` is absent so the SDK defaults it to empty, and `message` is an unrecognized key that gets passed through untouched. Both halves are individually acceptable, so there's nothing to reject. A model calling this tool gets an empty result with no explanation.

4. This one fails loudly. `content` has a known type, so the SDK's result validation rejects it and the Tools panel shows the error directly:

   ```
   Invalid tools/call result: expected array, received object
   ```

   TypeScript also catches it before you ever run the server.

5. **Bug 2**, every time. It names the field and what was wrong with it, and it fails the moment you call the tool. Bug 1 is the dangerous class: a successful-looking call that delivers nothing, invisible until someone notices the model has no idea what your tool returned. That's why the first question in the list above is whether `content` is populated, and why calling every tool once and asserting `content` is non-empty catches this whole family of bugs.

</details>
