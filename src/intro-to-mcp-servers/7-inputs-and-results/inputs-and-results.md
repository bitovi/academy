@page learn-mcp/inputs-and-results Inputs and results
@parent learn-mcp 7

@description Declare a tool's arguments with Zod, shape a result, and report a failure the model can act on.

@body

This lesson covers declaring a tool's arguments with Zod, the shape a handler must return, and how to report a failure the model can act on.

**Reference**: [Tool Result](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#tool-result)

## One schema, three jobs

`inputSchema` is where you declare what a tool accepts, written once with <dfn title="Zod: a TypeScript schema library. In MCP it describes a tool's arguments, and the SDK uses that one description to generate JSON Schema, validate incoming calls, and type your handler.">Zod</dfn>.

```ts
inputSchema: z.object({
  title: z.string().describe("A short description of the task")
})
```

- **It generates the schema the client sees.** Clients call `tools/list` and get JSON Schema describing your arguments. You never write that JSON by hand.
- **It validates every call before your handler runs.** Arguments that don't match are rejected by the SDK, so your handler only sees input that passed.
- **It types your handler.** `async ({ title })` knows `title` is a `string`, with no separate interface to keep in sync.

**Note**: `inputSchema` takes a single `z.object({ ... })`, not a bare map of field names to types.

## Describing and constraining

`.describe()` on a field is documentation the model reads. Use it for anything the type alone doesn't convey. Constraints become part of the generated schema and are enforced before your handler runs:

```ts
inputSchema: z.object({
  seconds: z.number()
    .int("Must be a whole number")
    .positive("Must be greater than 0")
    .max(60, "Cannot exceed 60 seconds")
    .describe("Number of seconds to count down from"),

  timezone: z.string()
    .describe("IANA timezone name, for example America/Chicago"),

  format: z.enum(["json", "csv"])
    .describe("Output format")
})
```

`timezone: z.string()` tells the model to send a string. The description is what stops it from sending `"CST"`.

Fields are required by default. `.optional()` makes a field omittable, and `.default(value)` supplies a value when it's missing.

The strings you pass to constraints are the error messages, and they end up in front of the model when a call is rejected. Calling a tool with `seconds: 2.5` comes back as:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Input validation error: Invalid arguments for tool countdown: seconds: Must be a whole number"
    }
  ],
  "isError": true
}
```

Your constraint message is right there in the text the model reads, so it can correct the call and retry without any error handling on your side.

## Where a rule belongs

A schema can only check what's visible in the input itself. Anything that depends on the outside world happens in your handler.

```ts
// Schema: checkable from the input alone
seconds: z.number().int().positive().max(60)
```

```ts
// Handler: depends on state the schema can't see
async ({ taskId }) => {
  const task = await db.tasks.find(taskId);
  if (!task) {
    return { content: [{ type: "text", text: `No task with id ${taskId}` }], isError: true };
  }
  // ...
}
```

The dividing line is whether the rule needs a lookup. "Is this a positive integer" doesn't. "Does this id exist" and "is this user over their quota" both do.

## What a handler returns

Every tool handler returns a `content` array of typed blocks.

```ts
async ({ title }) => {
  tasks.push(title);
  return { content: [{ type: "text", text: `Added: ${title}` }] };
}
```

- **It's always an array**, even for one block. `content: { type: "text", text: "..." }` is not valid.
- **It's always typed.** Every block needs its `type`, and a `text` block puts its payload in a field also called `text`.

Blocks for images, audio, and links to resources also exist, which is why the shape is a list of typed objects rather than a bare string.

**Note**: Non-string results are stringified by you, not by the SDK. Returning a count means `text: String(count)`.

## Reporting a failure

Some failures are part of normal operation: the id doesn't exist, the upstream API is down. The model should see those and get a chance to react, so they come back as a successful response carrying `isError: true`.

```ts
async ({ taskId }) => {
  const task = tasks.get(taskId);

  if (!task) {
    return {
      content: [{ type: "text", text: `No task with id "${taskId}". Known ids: ${[...tasks.keys()].join(", ")}` }],
      isError: true
    };
  }

  return { content: [{ type: "text", text: task.label }] };
}
```

Throwing gets you the same thing: the SDK catches it and converts it into an `isError: true` result using the exception's message. Both land identically on the wire, so throwing is shorter for a guard clause and returning explicitly gives you control over the content.

An `isError` result goes to the model, which decides what to do next from the text you put in it. Include whatever the caller needs to succeed on the next attempt: valid options, the accepted format, the actual limit, or what you received against what you expected.

```ts
// Nothing to act on
return { content: [{ type: "text", text: "Not found" }], isError: true };
```

```ts
// Enough for the model to correct its call
return {
  content: [{ type: "text", text: `No task with id "abc". Known ids: t-1, t-2, t-3` }],
  isError: true
};
```

## ✏️ Exercise

Start from this tool and fix it. It has three separate problems.

```ts
server.registerTool(
  "repeat",
  {
    title: "Repeat",
    description: "Repeat a string a number of times",
    inputSchema: z.object({
      text: z.string(),
      times: z.number()
    })
  },
  async ({ text, times }) => {
    if (times > 100) {
      return { content: [{ type: "text", text: "Error" }], isError: true };
    }
    return { content: { type: "text", text: text.repeat(times) } };
  }
);
```

1. `times: z.number()` accepts `2.5` and `-1`. Add constraints so neither reaches your handler, with messages a model can act on.

2. One problem here fails immediately and obviously. Which, and what's the fix?

3. One works but leaves the model stuck. Which, and how would you rewrite it?

4. The `times > 100` cap: should it stay in the handler, or move to the schema? Why?

<details>
<summary>Answers</summary>

1. ```ts
   times: z.number()
     .int("Must be a whole number")
     .positive("Must be greater than 0")
   ```
   Both are checkable from the input alone, so both belong in the schema.

2. `content` is an object instead of an array. Fix it to `content: [{ type: "text", text: text.repeat(times) }]`. TypeScript rejects this at compile time, and forced through it fails at runtime with `Invalid tools/call result: expected array, received object`.

3. The `"Error"` message. It tells the model a failure happened but nothing about why or what to try next, so its only options are to give up or repeat the identical call. Name the limit and what was received: `` `times must be 100 or less. You asked for ${times}.` ``

4. **Move it to the schema** as `.max(100, "Cannot exceed 100 repetitions")`. It's checkable from the input with no lookup, so the SDK can reject it before your handler runs. Once it's in the schema, the handler check is unreachable and should come out.

</details>
