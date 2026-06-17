# APIs

This guide covers three ways a backend exposes functionality to the outside world, and when to
reach for each:

1. **REST** — resources, HTTP methods, and the JSON:API convention: sparse fieldsets, pagination,
   relationships, and how it compares to GraphQL
2. **WebHooks** — letting a service call *you* when something happens, and verifying who's calling
3. **RPC** — calling a remote function as if it were local, with gRPC and Protobuf

---

# REST

REST stands for **Representational State Transfer**. It isn't a protocol — it's a *style* of
designing web APIs that maps naturally onto HTTP. The core idea is simple: **everything is a
resource** (a book, a user, an order), and HTTP methods define what you want to do to it.

Before REST, every API invented its own vocabulary: one called creating a user `createUser`,
another `addUser`, another `user.new`. REST standardizes this. URLs are nouns (`/books`,
`/books/42`), HTTP methods are the verbs, and a developer who knows HTTP already knows the shape
of any REST API before reading a single line of docs.

### The Verbs

```
GET    /books       → list all books (safe, no side effects)
GET    /books/42    → get one book
POST   /books       → create a book (server assigns the ID, returns 201)
PUT    /books/42    → replace the whole book — omitted fields are erased
PATCH  /books/42    → update only the fields you send
DELETE /books/42    → remove it (idempotent — calling twice is safe)
```

Three properties REST leverages from HTTP:

- **Stateless** — every request carries all the info the server needs. No session memory between
  calls.
- **Uniform interface** — the same methods mean the same thing everywhere. GET always reads; POST
  always creates.
- **Resource-based** — URLs identify *things*, methods describe *actions* on them.

Responses carry standard status codes: `2xx` success (`201 Created`, `204 No Content`), `4xx` the
client's fault (`400` malformed input, `404` not found), `5xx` the server's fault (`500` unhandled
error).

### Check your understanding

**Q: You PATCH a book with `{ "author": "Tolkien" }`. What happens to its title?**

<details>
<summary>Show answer</summary>

Nothing — PATCH is a partial update, so only the fields you send change. A PUT with the same body
would have erased the title, because PUT replaces the entire resource.

</details>

**Q: Why is it fine to retry a failed DELETE but risky to retry a failed POST?**

<details>
<summary>Show answer</summary>

DELETE is idempotent — deleting an already-deleted resource leaves the same end state. POST is not:
each call creates a new resource, so a blind retry can create duplicates.

</details>

## JSON:API

Plain REST tells you which verbs to use, but says nothing about what the JSON in the body should
look like. Every team ends up debating the same questions: where do errors go, how do you embed
related records, what's the pagination envelope? **JSON:API** (jsonapi.org) is a specification that
answers all of them once, so your team can stop bikeshedding response shapes and ship.

A JSON:API response identifies every record by `type` and `id`, puts its fields under
`attributes`, and links related records under `relationships`:

```json
{
  "data": {
    "type": "books",
    "id": "42",
    "attributes": {
      "title": "The Hobbit",
      "isAvailable": true
    },
    "relationships": {
      "author": {
        "data": { "type": "authors", "id": "7" }
      }
    }
  }
}
```

Requests and responses use the media type `application/vnd.api+json`. The payoff isn't this one
document — it's the conventions that come with it: sparse fieldsets, pagination, and compound
documents, covered next.

## Sparse Fieldsets

A REST endpoint normally returns every field of a resource on every request. A list view that only
needs each book's title still downloads due dates, timestamps, and author bios. That's
**over-fetching**, and on large lists it adds up.

Sparse fieldsets fix it with a query parameter: the client names exactly the fields it wants,
per type.

### How to Use It

```
GET /books?fields[books]=title,isAvailable
```

```json
{
  "data": [
    {
      "type": "books",
      "id": "42",
      "attributes": { "title": "The Hobbit", "isAvailable": true }
    }
  ]
}
```

The same parameter works per type, so a request that includes related resources can trim both
sides:

```
GET /books?include=author&fields[books]=title&fields[authors]=name
```

```json
{
  "data": [
    {
      "type": "books",
      "id": "42",
      "attributes": { "title": "The Hobbit" },
      "relationships": {
        "author": { "data": { "type": "authors", "id": "7" } }
      }
    }
  ],
  "included": [
    { "type": "authors", "id": "7", "attributes": { "name": "J.R.R. Tolkien" } }
  ]
}
```

The server returns only the requested attributes. `type` and `id` always come back, since they
identify the record.

### Common Reason You May Need Sparse Fieldsets

- List views that show two or three fields out of twenty
- Mobile clients on slow connections where payload size matters
- Wide tables with large text or blob columns you rarely need

### Exercise

```exercise
type: code
runtime: none
prompt: |
  A dropdown only needs each book's title, and each author's name. Build the
  query string that requests just those fields, using JSON:API sparse
  fieldsets. Fill in the two field lists.
starter: |
  export function bookDropdownUrl() {
    return "/books?include=author"
      + "&fields[books]=__1__"
      + "&fields[authors]=__2__";
  }
solution: |
  export function bookDropdownUrl() {
    return "/books?include=author"
      + "&fields[books]=title"
      + "&fields[authors]=name";
  }
verify: The response contains only title for books and only name for authors, plus type and id.
```

## Pagination

Returning every row of a large table in one response is slow for the server, heavy on the network,
and useless to a client that renders twenty rows at a time. Pagination splits the collection into
pages, and the response tells the client how to get the next one.

JSON:API reserves the `page` query parameter family and asks servers to return `links` for
navigation:

```
GET /books?page[number]=2&page[size]=20
```

```json
{
  "data": [
    { "type": "books", "id": "21", "attributes": { "title": "The Hobbit" } },
    { "type": "books", "id": "22", "attributes": { "title": "Dune" } },
    { "type": "books", "id": "23", "attributes": { "title": "1984" } }
  ],
  "links": {
    "next": "/books?page[number]=3&page[size]=20",
    "prev": "/books?page[number]=1&page[size]=20"
  }
}
```

Clients follow the `links` instead of constructing page URLs themselves, so the server is free to
change its pagination strategy without breaking anyone. And there are two strategies to choose
from.

### Offset/Limit vs. Cursor-Based

**Offset/limit** is the classic approach: skip N rows, take the next M
(`?offset=40&limit=20`, or JSON:API's `page[number]`/`page[size]`).

- Simple to implement — it maps directly to SQL's `OFFSET`/`LIMIT`
- Supports jumping to an arbitrary page ("go to page 9")
- **Drifts under writes**: if a row is inserted while a user is on page 2, page 3 starts one row
  earlier than expected — they see a duplicate or miss a row
- **Slow at depth**: `OFFSET 100000` makes the database walk and discard 100,000 rows before
  returning any

**Cursor-based** pagination replaces the page number with an opaque token pointing at the last
item the client saw: "give me 20 books *after this one*."

```
GET /books?page[size]=20&page[after]=eyJpZCI6NDJ9
```

- **Stable under writes**: the cursor anchors to a row, not a position, so inserts and deletes
  can't shift the window
- **Fast at any depth**: the database seeks straight to the cursor via an index (`WHERE id > 42`),
  no rows discarded
- No random access — you can't jump to page 9, only walk forward (and sometimes backward)

Rule of thumb: offset/limit for admin tables and small datasets where "jump to page" matters;
cursors for infinite scroll, feeds, and anything large or frequently written.

### Check your understanding

**Q: A user scrolling a busy feed sees the same post twice at a page boundary. Which pagination
strategy is the API using, and why does this happen?**

<details>
<summary>Show answer</summary>

Offset/limit. New posts inserted while the user scrolls shift every row's position, so page 3
overlaps with what was page 2. A cursor anchored to the last-seen post wouldn't drift.

</details>

**Q: Why does `OFFSET 100000 LIMIT 20` get slower as the offset grows, while a cursor query
doesn't?**

<details>
<summary>Show answer</summary>

The database has to walk and discard all 100,000 skipped rows on every request. A cursor query
(`WHERE id > :cursor LIMIT 20`) seeks directly to the starting row using an index.

</details>

## Relationships

Resources reference each other: a book has an author, an author has many books. Plain REST gives
you two bad defaults — embed everything (bloated responses) or return only IDs and force the
client into follow-up requests. That second one is the **network N+1 problem**:

```
GET /books        → [{ id: 1, authorId: "a1" }, { id: 2, authorId: "a2" }, ...]
GET /authors/a1   → { name: "Fitzgerald" }
GET /authors/a2   → { name: "Orwell" }
...one more round trip per author
```

JSON:API handles this in two parts. First, every resource declares its relationships as
type/id pairs plus links to fetch them:

```json
{
  "type": "books",
  "id": "42",
  "attributes": { "title": "The Hobbit" },
  "relationships": {
    "author": {
      "data": { "type": "authors", "id": "7" },
      "links": { "related": "/books/42/author" }
    }
  }
}
```

Second, the client can ask for related resources **in the same response** with `include`. The
result is a *compound document*: related records arrive in a top-level `included` array, each one
appearing exactly once no matter how many books reference it.

```
GET /books?include=author
```

```json
{
  "data": [
    {
      "type": "books", "id": "42",
      "attributes": { "title": "The Hobbit" },
      "relationships": { "author": { "data": { "type": "authors", "id": "7" } } }
    }
  ],
  "included": [
    { "type": "authors", "id": "7", "attributes": { "name": "J.R.R. Tolkien" } }
  ]
}
```

One round trip, no duplicated author records, and the client stitches records together by
`type` + `id`.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Fetch books together with their authors in a single request, then resolve
  each book's author from the compound document. Fill in the query parameter
  that embeds related resources and the top-level array they arrive in.
starter: |
  export async function booksWithAuthors() {
    const res = await fetch("/books?__1__=author");
    const doc = await res.json();

    const authorsById = new Map(
      doc.__2__.map((a) => [a.id, a.attributes])
    );

    return doc.data.map((book) => ({
      title: book.attributes.title,
      author: authorsById.get(book.relationships.author.data.id),
    }));
  }
solution: |
  export async function booksWithAuthors() {
    const res = await fetch("/books?include=author");
    const doc = await res.json();

    const authorsById = new Map(
      doc.included.map((a) => [a.id, a.attributes])
    );

    return doc.data.map((book) => ({
      title: book.attributes.title,
      author: authorsById.get(book.relationships.author.data.id),
    }));
  }
verify: One HTTP request returns every book paired with its author's attributes.
```

## REST vs. GraphQL

As apps grow — especially when multiple clients (web, mobile, third-party) hit the same API — two
friction points emerge with plain REST: **over-fetching** (getting more fields than you need) and
**under-fetching** (needing multiple round trips to assemble a view). GraphQL was designed
specifically to fix both: a single endpoint where the client describes exactly the data it wants,
and the response mirrors the shape of the query.

```graphql
query {
  books {
    title          # only this
    author {
      name         # and this
    }
  }
}
```

Notice what you just read in the previous topics, though: JSON:API gives REST the same two powers.
Sparse fieldsets are field selection; `include` is nested fetching. The real differences lie
elsewhere:

| | REST + JSON:API | GraphQL |
|---|---|---|
| Endpoints | Many URLs, one per resource | One URL; the query body decides |
| Field selection | `fields[type]=...` | Part of every query |
| Related data | `include=author` | Nested in the query |
| HTTP caching | **GET URLs cache in browsers and CDNs for free** | All POSTs to one endpoint — needs persisted queries to cache |
| Contract | Conventions in docs | Typed, introspectable schema with autocomplete tooling |
| Server cost | Predictable queries | Arbitrary queries; resolvers can hide a database N+1 (use DataLoader) |

The schema is also an access-control boundary: if a field isn't in the GraphQL schema, no client
can ever request it. With REST, omitting a field is a per-endpoint decision.

Rule of thumb: REST with JSON:API conventions is hard to beat for public, cacheable, CRUD-shaped
APIs. GraphQL earns its complexity when many differently-shaped clients consume the same rich data
graph and you want one flexible contract instead of an endpoint per view.

### Check your understanding

**Q: Your GraphQL API answers one HTTP request per view, but the database logs show one query per
book's author. What's happening?**

<details>
<summary>Show answer</summary>

The N+1 problem moved server-side: each `author` resolver fires its own database query
independently. Batch them with a tool like DataLoader. GraphQL fixed the *network* N+1, not the
*database* one.

</details>

**Q: Why do REST APIs get CDN caching "for free" while GraphQL APIs don't?**

<details>
<summary>Show answer</summary>

REST reads are GETs against distinct URLs, which browsers and CDNs cache out of the box. GraphQL
sends every operation as a POST to one endpoint, so the URL says nothing about the content —
caching requires extra machinery like persisted queries.

</details>

---

# WebHooks

WebHooks flip the request model: instead of your app asking a service "anything new?" over and
over, the service calls *you* the instant an event happens.

Imagine you're waiting for a package. You could call the delivery company every five minutes to
ask "is it here yet?" — or you could give them your phone number and let them call you when it
arrives. Webhooks are the phone number.

## What They Are, When to Use Them

Before webhooks, apps used **polling**: make a GET request on a timer, check for changes, repeat.
This wastes bandwidth, hammers rate limits, and introduces latency equal to half your poll
interval. Webhooks eliminate all three problems.

**A webhook is just an HTTP POST** — the event source sends JSON to a URL you registered, and your
server processes it. That's the whole mechanism. No special protocol, no persistent connection, no
SDK required.

### How It Works

1. **Register** — you tell the third-party service: "POST to this URL when things happen." Usually
   done in a dashboard or via an API call.
2. **Event fires** — something happens on their side (a payment completes, a pull request is
   merged). They build a JSON payload describing it.
3. **POST arrives** — they send an HTTP POST to your URL. Your server must be publicly reachable —
   no localhost, unless you're using a tunnel like ngrok.
4. **Respond fast** — return `200 OK` immediately, ideally within 5 seconds. If you don't, the
   sender assumes delivery failed and retries.
5. **Process async** — drop the event into a queue or background job. Do the actual work (send
   email, update DB) outside the HTTP response cycle.

Senders typically add custom headers so you can route the event before parsing the body —
`x-webhook-event` here, `x-github-event` or `stripe-signature` in the wild.

### Common Reason You May Need One

- Payment events (charge succeeded, subscription cancelled) from Stripe and friends
- CI/CD and repo events (push, PR merged) from GitHub
- Any third-party integration where polling would be too slow or too expensive
- Notifying *your own* services of events without coupling them together

### Idempotency — Handling Duplicate Deliveries

Networks are unreliable. If your server is slow to respond, the sender will retry — delivering the
same event more than once. Without a guard, you might charge a card twice or send two welcome
emails.

Every webhook payload includes a unique **event ID**. Before processing, check whether you've seen
that ID before. If yes, respond 200 and skip the work. This property — where running the same
operation multiple times has the same effect as running it once — is called **idempotency**.

```ts
// Use an atomic insert to prevent race conditions
async function handleWebhook(event) {
  // If two duplicate webhooks hit at exactly the same time,
  // the database enforces the unique constraint and fails one.
  const inserted = await db.events.insertIfNotExists(event.id);
  if (!inserted) return; // another request beat us to it

  await processEvent(event); // safe to run exactly once
}
```

### Check your understanding

**Q: Why must a webhook handler respond before doing the real work?**

<details>
<summary>Show answer</summary>

Senders time out fast (often ~5 seconds) and treat a slow response as a failed delivery, triggering
retries. Respond 200 immediately and process the event in a queue or background job.

</details>

**Q: A customer was charged twice after a network blip. The sender behaved correctly. What did the
receiver forget?**

<details>
<summary>Show answer</summary>

Idempotency. The sender retried an unacknowledged delivery, and the receiver processed the same
event ID twice. Record processed event IDs (with an atomic insert) and skip duplicates.

</details>

## Authentication

Anyone on the internet can POST to your webhook URL. You must prove the request came from the
legitimate sender before acting on it. There is no single standard — each platform picks an
approach:

| Method | Used by | How it works |
|---|---|---|
| **HMAC signature header** | GitHub, Stripe, Shopify | Sender signs the raw body with a shared secret, puts the hash in a header. You recompute and compare. Most common and most secure. |
| **Bearer / API token** | many simpler services | A secret token in the `Authorization` header. Simple, but can't prove body integrity. |
| **Basic Auth** | older systems, some CI platforms | Username + password encoded in the `Authorization` header. |
| **mTLS (mutual TLS)** | financial / enterprise | Both sides present certificates. Very strong but complex to set up. |
| **IP allowlist** | supplementary guard | Only accept requests from the sender's published IP ranges. Easy but fragile if their IPs change. |

### How to Use It

HMAC verification is the pattern worth knowing by heart. The sender computes
`HMAC(secret, rawBody)` and sends it in a header like `x-webhook-signature`. You recompute it over
the **raw** request body (not the parsed-and-re-stringified JSON) and compare using a
**constant-time** function to prevent timing attacks:

```ts
import crypto from "node:crypto";

function verifySignature(rawBody: Buffer, signatureHeader: string, secret: string) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // Constant-time comparison — never use === for signatures
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signatureHeader)
  );
}

app.post("/webhooks/receive", (req, res) => {
  if (!verifySignature(req.rawBody, req.headers["x-webhook-signature"], SECRET)) {
    return res.status(401).end(); // not from who it claims to be
  }
  res.status(200).end(); // acknowledge fast
  enqueue(req.body);     // process async
});
```

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Verify a webhook's HMAC signature. Fill in the hashing input (sign the raw
  body, not parsed JSON) and the comparison function that resists timing
  attacks.
starter: |
  import crypto from "node:crypto";

  export function verifySignature(rawBody, signatureHeader, secret) {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(__1__)
      .digest("hex");

    return crypto.__2__(
      Buffer.from(expected),
      Buffer.from(signatureHeader)
    );
  }
solution: |
  import crypto from "node:crypto";

  export function verifySignature(rawBody, signatureHeader, secret) {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signatureHeader)
    );
  }
verify: A request signed with the shared secret passes; a tampered body or forged signature is rejected.
```

### Check your understanding

**Q: Why is an HMAC signature stronger than a bearer token for webhooks?**

<details>
<summary>Show answer</summary>

A token only proves the sender knows a secret; the body could still be tampered with in transit or
replayed with different content. An HMAC is computed over the body itself, so it proves both who
sent it and that the payload wasn't modified.

</details>

---

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
