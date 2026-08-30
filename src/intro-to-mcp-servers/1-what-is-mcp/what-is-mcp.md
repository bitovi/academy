@page learn-mcp/what-is-mcp What is MCP?
@parent learn-mcp 1

@description What the Model Context Protocol is, the three roles it defines, and what a server exposes.

@body

The <dfn title="Model Context Protocol: an open protocol that lets AI applications call tools and read data from separate services through one standard interface.">Model Context Protocol</dfn> (MCP) is a protocol, built on JSON-RPC, that lets an AI application call capabilities hosted by a separate service. This lesson covers the three roles it defines, what a server exposes, and why the protocol is stateless.

**Reference**: [Architecture](https://modelcontextprotocol.io/specification/2026-07-28/architecture)

**Note**: This training follows the `2026-07-28` revision of the spec. That revision deprecated several capabilities and changed how others work, so an older tutorial or an answer you find online may describe something this revision has already replaced.

## Why build an MCP server

- **Internal system access**: Give an agent a way into a ticketing tool, a deploy pipeline, or a customer database
- **One integration instead of many**: Expose a service once and every MCP-capable application can use it, instead of writing and maintaining a separate integration per assistant
- **Live data**: Let an agent read schemas, logs, or config that isn't in the model's training data
- **Tasks a model shouldn't guess at**: Wrap operations like running a query or sending an email

## The three roles

<table>
   <tr>
      <th>Role</th>
      <th>What it is</th>
      <th>Examples</th>
   </tr>
   <tr>
      <td><dfn title="MCP host: the application a person uses, which coordinates the AI model and manages connections to MCP servers.">Host</dfn></td>
      <td>The application a person uses, with a model in it</td>
      <td>VS Code, Claude Desktop, Cursor</td>
   </tr>
   <tr>
      <td><dfn title="MCP client: a component created by the host that communicates with exactly one MCP server, attaching protocol version and capabilities to every request.">Client</dfn></td>
      <td>Created by the host, communicates with exactly one server</td>
      <td>The MCP client built into VS Code</td>
   </tr>
   <tr>
      <td><dfn title="MCP server: a service that exposes tools, resources, and prompts, and answers requests from MCP clients.">Server</dfn></td>
      <td>Exposes capabilities and answers requests</td>
      <td>What you'll build today</td>
   </tr>
</table>
A host runs one client per server and aggregates the context they provide. Add a new server to the host and its capabilities become available immediately, with no changes to the model or the host itself.

**Note**: The server you build today runs as a <dfn title="Subprocess: a program started and owned by another program, communicating over its standard input and output streams.">subprocess</dfn> that the host launches on your own machine, with nothing listening on a port. "Server" here means a program that answers MCP requests, not a machine in a data center.

## What a server exposes

A server exposes three primitives. The useful way to tell them apart is by asking who decides when each one gets used.

<table>
   <tr>
      <th>Primitive</th>
      <th>Control</th>
      <th>Description</th>
      <th>Example</th>
   </tr>
   <tr>
      <td><dfn title="Tool: an executable function a server exposes, which a language model can invoke to perform an action or retrieve information.">Tools</dfn></td>
      <td>Model-controlled</td>
      <td>Functions the model discovers and invokes on its own</td>
      <td>Sending an email, creating a support ticket</td>
   </tr>
   <tr>
      <td><dfn title="Resource: structured data or content a server exposes at a URI, providing additional context to a language model.">Resources</dfn></td>
      <td>Application-controlled</td>
      <td>Read-only data at a URI, which the host retrieves and decides how to use</td>
      <td>File contents, git history</td>
   </tr>
   <tr>
      <td><dfn title="Prompt: a pre-defined template or set of instructions a server exposes to guide language model interactions.">Prompts</dfn></td>
      <td>User-controlled</td>
      <td>Message templates a person explicitly selects</td>
      <td>Slash commands, menu options</td>
   </tr>
</table>
**Reference**: [Server Features](https://modelcontextprotocol.io/specification/2026-07-28/server)

## MCP is stateless

All the information needed to process a request is contained in the request itself, including its protocol version and capabilities. A server processes each request independently and infers no state from previous requests, even ones that arrived on the same connection.

State that needs to span multiple requests, like a long-running task, is referenced by an explicit identifier the client passes on each request.

**Important**: An open connection is not a conversation. A client may interleave unrelated requests on the same transport, so a server must not treat connection or process identity as a proxy for conversation continuity. This is also what lets any running copy of a server answer any request.

## ✏️ Exercise

Answer before moving on.

1. You want to let an AI coding assistant create tickets in your team's internal issue tracker. Are you building an MCP client or an MCP server?

2. In the sentence "VS Code Copilot calls the `create_issue` tool on GitHub's MCP server," name the host, the client, and the server.

3. For each of these, would you expose it as a tool, a resource, or a prompt?
   - Deploying the current branch to staging
   - Your company's coding style guide, a long document that changes a few times a year
   - A standard way to phrase "review this pull request for security problems"

4. A colleague says "we need sticky sessions on the load balancer so each user keeps hitting the same copy of the MCP server." What's wrong with that assumption?

<details>
<summary>Answers</summary>

1. **A server.** You're exposing a capability for AI applications to call. The client side already exists inside the coding assistant.

2. **Host:** VS Code. **Client:** the MCP client built into VS Code. **Server:** GitHub's MCP server, which exposes `create_issue`.

3. **Tool** (it performs an action with side effects), **resource** (stable content the host brings into context), **prompt** (a reusable way of phrasing a request that a user selects).

4. All the information needed to process a request is in the request itself, so the server keeps nothing about a client between requests. Any copy can answer any request, which means no sticky routing is needed.

</details>
