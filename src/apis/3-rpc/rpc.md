@page learn-apis/rpc RPC
@parent learn-apis 3

@description Learn RPC — calling remote functions directly, with gRPC, Protobuf, and streaming.

@body

# RPC

RPC — **Remote Procedure Call** — means calling a function on another machine as if it were local.
Where REST thinks in **nouns** (manipulate resources with HTTP verbs: `POST /books`,
`DELETE /books/42`), RPC thinks in **verbs** — you call actions directly: `CreateBook()`,
`CheckoutBook(42)`. Both can accomplish the same work; the difference is the mental model and the
interface contract.

```
REST (resource-oriented)          RPC (action-oriented)
GET    /books    → list books     ListBooks()           → list books
POST   /books    → add a book     CreateBook(title)     → add a book
PUT    /books/1  → update book    UpdateBook(id, title) → update a book
???              → check out?     CheckoutBook(id)      → just say what should happen
```

That last row is the tell: actions that don't map cleanly onto create/read/update/delete feel
forced in REST (`POST /books/1/checkout`?) and natural in RPC.

## gRPC

gRPC is Google's RPC implementation: typed, fast, multi-language service-to-service calls over
HTTP/2 with Protobuf binary serialization. It works in three steps:

1. **Write a `.proto` file** — define your messages and service methods once. This is the
   contract: language-agnostic and source-controlled.
2. **Run `protoc`** — the compiler reads the `.proto` and generates typed client and server stubs
   in any language: Go, Java, Python, Node, Rust…
3. **Call it like a function** — your code calls the generated stub. It serializes arguments to
   binary, sends them over HTTP/2, and deserializes the response, transparently.

```go
// What you write (any language — this is Go)
book, err := bookService.CheckoutBook(ctx, &pb.CheckoutRequest{ Id: 1 })

//   → looks like a local function call
//   → under the hood: Protobuf binary → HTTP/2 → server → Protobuf binary back
```

### Error Handling Is Different

gRPC abstracts HTTP away completely. You never return an HTTP 404 — instead, gRPC has its own set
of 16 standard status codes (`NOT_FOUND`, `FAILED_PRECONDITION`, `UNAVAILABLE`, …) that the
generated stubs surface as errors in your language.

```ts
// Server-side: signal failure with a gRPC status code, not an HTTP one
checkoutBook: (call, callback) => {
  const book = books.find((b) => b.id === call.request.id);
  if (!book?.available) {
    return callback({ code: grpc.status.FAILED_PRECONDITION, message: "Not available" });
  }
  book.available = false;
  callback(null, book);
},
```

### Built-In Streaming — gRPC's Biggest Differentiator vs. REST

Streaming is a first-class primitive in the contract, not a bolt-on:

| Mode | Flow | Use case |
|---|---|---|
| **Unary** | 1 req → 1 res | Same as a REST call. The default. |
| **Server streaming** | 1 req → many res | Client asks once; server pushes a stream. Like SSE but typed and binary. |
| **Client streaming** | many req → 1 res | Client streams data (file chunks); server replies once. |
| **Bidirectional** | many req → many res | Both sides stream independently. Voice, games, live collaboration. |

### When to Use gRPC

**Use it when…**

- **Internal microservices** — same data center, high volume, performance matters. Google,
  Kubernetes, and Uber all use gRPC internally.
- **Multi-language teams** — one `.proto` generates typed stubs for every team's language.
- **You need streaming** — IoT telemetry, video feeds, live analytics.
- **You want strict contracts** — a breaking change is a compile error, not a runtime surprise.

**Skip it when…**

- **Public APIs (usually)** — external developers expect REST + JSON. (Tools like gRPC-Gateway can
  translate a gRPC service into a REST API automatically.)
- **Browser clients** — browsers can't speak raw gRPC: JavaScript APIs like `fetch` don't expose
  HTTP trailers during streaming, which gRPC requires. You need a proxy layer like gRPC-Web or
  ConnectRPC.
- **Simple CRUD services** — the `protoc` toolchain overhead isn't worth it for a small service.
- **You need readable traffic** — binary Protobuf is opaque to `curl` and browser DevTools.

### Check your understanding

**Q: In REST you return HTTP 404 when a resource isn't found. How do you signal the same failure
in gRPC?**

<details>
<summary>Show answer</summary>

Return the gRPC `NOT_FOUND` status code. gRPC abstracts HTTP away entirely — you never set HTTP
status codes; you use gRPC's 16 standard codes instead.

</details>

**Q: Why can't a web browser call a gRPC service directly?**

<details>
<summary>Show answer</summary>

Browsers support HTTP/2, but their JavaScript APIs don't expose the HTTP/2 framing gRPC needs —
specifically, reading trailers while a response streams. Proxy layers like gRPC-Web bridge the gap.

</details>

## Protobuf

Protocol Buffers (**Protobuf**) is the schema language and binary serialization format underneath
gRPC. You define messages and services in a `.proto` file — one schema, every language:

```protobuf
syntax = "proto3";
package library;

service BookService {
  rpc ListBooks    (ListBooksRequest)  returns (ListBooksResponse);
  rpc GetBook      (GetBookRequest)    returns (Book);
  rpc CreateBook   (CreateBookRequest) returns (Book);
  rpc CheckoutBook (CheckoutRequest)   returns (Book);

  // Server-streaming: push an update every time inventory changes
  rpc WatchBooks   (WatchRequest)      returns (stream Book);
}

message Book {
  int32  id        = 1;
  string title     = 2;
  bool   available = 3;
  string author    = 4;
}

message CheckoutRequest   { int32 id = 1; }
message GetBookRequest    { int32 id = 1; }
message CreateBookRequest { string title = 1; string author = 2; }
message ListBooksRequest  {}
message ListBooksResponse { repeated Book books = 1; }
message WatchRequest      {}
```

### Field Numbers Are the Wire Format

The **field numbers** (`= 1`, `= 2`) are the real identifiers sent over the wire — human-readable
field names are entirely stripped from the binary payload. That has a consequence worth burning
into memory:

- **Renaming a field is safe** — the name only exists in generated code.
- **Changing a field's number is a breaking change** — old clients and new servers now disagree
  about which bytes mean what. Never reassign a number without a migration plan.
- Adding new fields and removing old ones are both backward-compatible — unknown fields are
  skipped, missing fields get defaults.

This is what makes Protobuf payloads so much smaller and faster to parse than JSON: no key names,
no quotes, no whitespace — just numbered, typed binary fields.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Complete this .proto file. Fill in the keyword that declares a data shape,
  the wire number for the title field, and the keyword that marks WatchBooks
  as server-streaming.
starter: |
  syntax = "proto3";
  package library;

  service BookService {
    rpc GetBook    (GetBookRequest) returns (Book);
    rpc WatchBooks (WatchRequest)   returns (__3__ Book);
  }

  __1__ Book {
    int32  id        = 1;
    string title     = __2__;
    bool   available = 3;
  }

  message GetBookRequest { int32 id = 1; }
  message WatchRequest   {}
solution: |
  syntax = "proto3";
  package library;

  service BookService {
    rpc GetBook    (GetBookRequest) returns (Book);
    rpc WatchBooks (WatchRequest)   returns (stream Book);
  }

  message Book {
    int32  id        = 1;
    string title     = 2;
    bool   available = 3;
  }

  message GetBookRequest { int32 id = 1; }
  message WatchRequest   {}
verify: protoc compiles the file, and WatchBooks generates a server-streaming stub.
```

### Check your understanding

**Q: Which schema change breaks existing Protobuf clients: renaming `title` to `bookTitle`, or
changing its number from `= 2` to `= 5`?**

<details>
<summary>Show answer</summary>

Changing the number. Field numbers are the actual wire identifiers; names are stripped from the
binary. A rename only changes generated code, but reassigning a number makes old and new code
disagree about the bytes.

</details>

---

# Recap

Three interface styles, three different shapes of conversation:

- **REST** — nouns and verbs over HTTP. JSON:API standardizes the response shape and adds the
  tools that keep REST competitive: sparse fieldsets for over-fetching, `include` for
  under-fetching, and `links`-driven pagination — cursor-based when the data is large or busy,
  offset/limit when "jump to page" matters. GraphQL solves the same two problems with one flexible
  endpoint, trading away free HTTP caching.
- **WebHooks** — the service calls you. A webhook is just a POST to a URL you registered: respond
  fast, process async, deduplicate by event ID, and always verify the sender — ideally with an
  HMAC signature compared in constant time.
- **RPC** — call remote functions directly. gRPC makes the contract a `.proto` file, generates
  typed stubs in every language, streams natively over HTTP/2, and serializes with Protobuf —
  where field numbers, not names, are the wire format.

The skill is matching the style to the audience: REST for public, cacheable APIs; webhooks for
event-driven integrations; gRPC for fast, typed service-to-service calls inside your walls.
