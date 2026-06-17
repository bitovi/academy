@page learn-apis/rest REST
@parent learn-apis 1

@description Learn REST — resources, HTTP methods, the JSON:API convention, and how REST compares to GraphQL.

@body

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
