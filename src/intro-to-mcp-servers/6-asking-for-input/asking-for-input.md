@page learn-mcp/asking-for-input Asking the user for input
@parent learn-mcp 6

@description Build a tool that stops mid-call to ask the user a question.

@body

A tool doesn't have to answer with only what the caller gave it. It can stop mid-call, ask the user a question, and finish once the answer comes back. That's <dfn title="Elicitation: a server asking the connected client to collect input from the end user during a call, then resuming with the answer.">elicitation</dfn>, and it's what a confirmation step or a missing detail the model shouldn't invent both need.

**Reference**: [input_required](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/servers/input-required.md)

## ✏️ Add a tool that asks

A server can't ask directly. Every interaction in MCP begins with the client, and a server must never initiate a request of its own: it answers requests, and that's all. So a handler asks by returning `inputRequired(...)` in place of a result. The client reads the question, puts it to the user, and calls your tool a second time with the answer attached. The spec calls that two-round shape a multi round-trip request, or MRTR.

One action by the user, two `tools/call` requests with different ids, and your handler running once for each.

Add a `clear-tasks` tool that confirms before wiping the list:

```ts
import { McpServer, inputRequired, acceptedContent, inputResponse } from "@modelcontextprotocol/server";

const confirmSchema = z.object({
  confirm: z.boolean().meta({ title: "Yes, clear the list" })
});
```

```ts
server.registerTool(
  "clear-tasks",
  {
    title: "Clear Tasks",
    description: "Remove every task from the list, after the user confirms",
    inputSchema: z.object({})
  },
  async (_args, ctx) => {
    const view = inputResponse(ctx.mcpReq.inputResponses, "confirm");

    if (view.kind === "missing") {
      return inputRequired({
        inputRequests: {
          confirm: inputRequired.elicit({
            message: `Clear all ${tasks.length} tasks? This cannot be undone.`,
            requestedSchema: confirmSchema
          })
        }
      });
    }

    const answer = acceptedContent(ctx.mcpReq.inputResponses, "confirm", confirmSchema);
    if (answer?.confirm !== true) {
      return { content: [{ type: "text", text: "Nothing cleared." }] };
    }

    const cleared = tasks.length;
    tasks.length = 0;
    return { content: [{ type: "text", text: `Cleared ${cleared} tasks.` }] };
  }
);
```

Your handler runs once per round and works out where it is from what arrived, since nothing on the server survives between rounds. `inputResponse` reports that: `missing` means nobody has answered yet, so ask. Anything else means an answer came back, so decide.

`acceptedContent` validates the answer against the same schema you sent, and returns `undefined` when the user declined, cancelled, or submitted a false value. Treating all three alike is what stops this tool asking forever, which is the loop you get if you re-issue the request whenever the answer isn't the one you wanted.

## ✏️ Exercise: answer a question from your own tool

Elicitation needs a client that can put a dialog in front of you, so this one runs in your assistant rather than through Inspector's `--cli` mode, which declares no elicitation capability and is refused before the question is even sent.

Add `clear-tasks` to your server, restart `demo-server` the way you did in lesson 5, and ask the assistant to add a couple of tasks so the list isn't empty.

1. Ask it to clear the list. Your assistant shows a confirmation dialog carrying your `message` and the checkbox from `confirmSchema`. Tick the box, then submit. In Copilot you click both; in Claude Code's terminal UI you press **space** to tick the box and **enter** to choose Accept. What comes back?
2. Ask it to clear the list again, and decline the dialog this time. What comes back?
3. Take the `view.kind === "missing"` check out and re-run step 2. What happens, and why?

**Note**: If step 1 answers `"Nothing cleared."`, the box wasn't ticked when the form went back. Submitting an untouched checkbox sends `confirm: false`, which is a perfectly valid accepted answer, so your handler correctly takes the same branch a decline takes. Nothing errors and nothing warns you, which is what makes it worth recognizing: the tool did exactly what the input told it to.

<details>
<summary>Answers</summary>

1. `"Cleared 2 tasks."` The dialog is the client rendering the `inputRequired` request your handler returned; submitting it runs the handler a second time with the answer attached.

2. `"Nothing cleared."` The second round still runs, carrying a declined answer instead of an accepted one, so `acceptedContent` returns `undefined` and the handler takes the other branch.

3. It asks again, and keeps asking. Without the `missing` check the handler can't tell "nobody answered yet" from "someone said no", so a decline looks identical to a first entry and it re-issues the request forever. This is why a declined answer and an unticked box both have to end the call rather than restart it.

</details>
