@page learn-mcp/adding-a-prompt Adding a prompt
@parent learn-mcp 5

@description Add a prompt to your server and try all three primitives from a real editor.

@body

A prompt is the third primitive, and the user-controlled one: a message template a person selects by name, typically as a slash command, rather than something the model reaches for or the host attaches automatically. You'll add one, then try all three primitives from a real editor instead of Inspector.

**Reference**: [Prompts](https://modelcontextprotocol.io/specification/2026-07-28/server/prompts)

## ✏️ Register the prompt

Add one that puts the task list to use. `daily-standup` asks the model to read the current tasks and turn them into a short update:

```ts
server.registerPrompt(
  "daily-standup",
  {
    title: "Daily Standup",
    description: "Turn the current task list into a short standup update",
    argsSchema: z.object({
      name: z.string().describe("Who the standup update is for")
    })
  },
  ({ name }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Read the tasks resource and write a short daily standup update for ${name} based on what's there.`
        }
      }
    ]
  })
);
```

`registerPrompt` takes a name, a config, and a callback that returns `{ messages }`. `argsSchema` is a Zod object schema, same as a tool's `inputSchema`, doing the same three jobs: it generates what `prompts/list` advertises, validates arguments, and types the callback.

Each message names a `role`, `"user"` or `"assistant"`, and a `content` block. The host hands these to the model in the order you return them, filled in with the caller's arguments.

This prompt never reads `tasks` or fetches the resource. It tells the model to, and the model is what decides to fetch `demo://tasks` before answering. Same model-controlled behavior as lesson 3, triggered by a prompt instead of a user's own words.

## ✏️ Fetch it

List it:

```bash
npx @modelcontextprotocol/inspector --cli npx tsx src/stdio-server.ts --method prompts/list
```

Fetch it with an argument:

```bash
npx @modelcontextprotocol/inspector --cli npx tsx src/stdio-server.ts \
  --method prompts/get --prompt-name daily-standup --prompt-args name=Alex
```

```json
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Read the tasks resource and write a short daily standup update for Alex based on what's there."
      }
    }
  ]
}
```

**Note**: Drop a required argument and a prompt fails differently than a tool does. A tool with bad arguments comes back as a normal result with `isError: true`, something the model reads and can react to. A prompt with bad arguments is rejected as a JSON-RPC error before your callback runs:

```json
{"jsonrpc":"2.0","id":1,"error":{"code":-32602,"message":"Invalid arguments for prompt daily-standup: name: Invalid input: expected string, received undefined"}}
```

A prompt is invoked by a person through the host's UI, not by the model mid-conversation, so there's no model on the other end to read a recovery message. The failure goes to whatever's driving the host instead.

Your server now exposes all three primitives.

## ✏️ Try it with your assistant

Inspector is deliberately precise: exact arguments in, exact response out. That's not how anyone will use your server. You registered `demo-server` with your assistant back in lesson 2, before there was a server for it to launch. There is now.

Restart the connection so your assistant runs the file as it stands:

**If you're using GitHub Copilot**, run **MCP: List Servers** from the Command Palette and restart `demo-server`. If it never started successfully in lesson 2, use the inline "Start" action in `.vscode/mcp.json` instead.

**If you're using Claude Code**, `demo-server` connects fresh each time a session starts, so start a new session in this project, or run `/mcp` to reconnect.

Once it's running:

1. Ask the assistant to add a couple of tasks, in your own words rather than naming the tool, for example "add a task to buy milk." Watch it invoke `add-task` on its own.
2. Bring the task list into context. In **Copilot**, use the chat's "Add Context" control and pick `demo://tasks`. In **Claude Code**, write `@demo-server:demo://tasks` in your message. The connection has stayed open since step 1, so the tasks you just added are there.
3. Invoke the prompt. In **Copilot** that's `/demo-server.daily-standup`. In **Claude Code** it's `/mcp__demo-server__daily-standup Alex`, with arguments space-separated after the command. Watch the model read the task list before writing the update.


## ✏️ Exercise

Add a second tool to your server: `word-count`, which takes text and returns the number of words in it. Work in your assistant throughout, restarting the connection after each edit.

1. Write it, then ask your assistant how many words are in a sentence of your choosing, without naming the tool. Did it call `word-count`?

2. Write the description two ways: `"Counts things"` and your own attempt. Which would you keep, and why does it matter?

3. Add a second resource at `demo://server-info` that returns the server's name and version as text. Attach it in your assistant, and confirm both it and `demo://tasks` are offered.

4. Someone suggests replacing the `tasks` resource with a `list-tasks` tool instead. What would that change about who decides when the content is used?

5. Add a prompt called `commit-message` that takes one argument, `changes` (a string describing what changed), and asks the model to write a commit message for it. Invoke it as a slash command with an argument and confirm the argument reaches the message.


<details>
<summary>Answers</summary>

1. **It should**, and nothing but your description told it to. Something like:

   ```ts
   server.registerTool(
     "word-count",
     {
       title: "Word Count",
       description: "Count the number of words in some text. Use when the user asks how long a piece of text is.",
       inputSchema: z.object({
         text: z.string().describe("The text to count words in")
       })
     },
     async ({ text }) => {
       const count = text.trim().split(/\s+/).length;
       return { content: [{ type: "text", text: String(count) }] };
     }
   );
   ```

2. `"Counts things"` is too broad to match a specific request and too vague to rule one out. The description is what the model reads when deciding whether to invoke your tool, so it should name the action and the situation it applies to.

3. ```ts
   server.registerResource(
     "server-info",
     "demo://server-info",
     { title: "Server info", mimeType: "text/plain" },
     async (uri) => ({
       contents: [{ uri: uri.href, text: "demo-server v1.0.0" }]
     })
   );
   ```

   Both are offered because the assistant lists whatever the server advertises, and it re-reads that list when the connection restarts. A resource missing from the picker usually means the server didn't restart, not that the registration is wrong.

4. It moves the decision from the host to the model. As a resource, the host decides when to put the task list in front of the model. As a tool, the model only gets it if it thinks to ask, and each fetch is a round trip that spends context.

5. ```ts
   server.registerPrompt(
     "commit-message",
     {
       title: "Commit Message",
       description: "Draft a commit message for a set of changes",
       argsSchema: z.object({
         changes: z.string().describe("A summary of what changed")
       })
     },
     ({ changes }) => ({
       messages: [
         {
           role: "user" as const,
           content: { type: "text" as const, text: `Write a concise commit message for these changes:\n\n${changes}` }
         }
       ]
     })
   );
   ```

   Your assistant prompts you for `changes` before sending anything, because `argsSchema` advertised it as required. Whatever you type is substituted into the message text by the callback, which is what the model then answers.

</details>
