@page learn-graphql-102/pagination Pagination
@parent learn-graphql-102 3
@outline 2

@description Return a long list one page at a time, using cursors and the connection pattern.

@body

## Overview

In this section, we will:

- Learn why APIs return long lists one page at a time
- Compare offset pagination with cursor pagination
- Learn the connection pattern that most GraphQL APIs use for pages
- Add a paginated `claimsConnection` query to the API, and use it to page through every claim

## Objective 1: Understand pagination

### Why paginate?

Right now, `claims` returns every claim in one response. With six claims, that's fine. A real insurance company has millions, and a single request for all of them would be slow for the server to build, slow to send, and more than any screen can show.

**Pagination** means returning a list one page at a time. The client asks for a page, and then asks for the next one only if it needs more.

### Offset pagination

The simplest approach is to count. The client asks for "2 claims, skipping the first 2", usually with arguments like `limit` and `offset`:

```graphql
{
  claims(limit: 2, offset: 2) {
    claimNumber
  }
}
```

This is easy to build, but it breaks when the list changes between requests. Imagine a screen that shows the newest claims first, 2 at a time:

<table>
   <tr>
      <th>Step</th>
      <th>List, newest first</th>
      <th>Client asks for</th>
      <th>Client gets</th>
   </tr>
   <tr>
      <td>1</td>
      <td>CLM-5006, CLM-5004, CLM-5002, CLM-5005, …</td>
      <td>limit 2, offset 0</td>
      <td>CLM-5006, CLM-5004</td>
   </tr>
   <tr>
      <td>2</td>
      <td>A new claim, CLM-5007, is filed. It goes to the front.</td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td>3</td>
      <td>CLM-5007, CLM-5006, CLM-5004, CLM-5002, …</td>
      <td>limit 2, offset 2</td>
      <td>CLM-5004, CLM-5002</td>
   </tr>
</table>

The client sees `CLM-5004` twice, because everything shifted down one place. If a claim had been deleted instead, the client would have skipped one without knowing.

### Cursor pagination

Instead of counting, **cursor pagination** asks for "the next 2 claims **after this one**". A **cursor** is a string that points to one item in the list. The server gives the client a cursor for the last item on each page, and the client sends it back to get the next page.

In the example above, the client would ask for the 2 claims after `CLM-5004`, and get `CLM-5002` and `CLM-5005`, no matter how many claims were filed at the front of the list.

Cursors are usually **opaque**: they look like random text, such as `YzQ=`, and clients shouldn't try to read or build them. That leaves the server free to change what a cursor contains later without breaking any clients. The GraphQL documentation [suggests base64-encoding cursors](https://graphql.org/learn/pagination/) as a reminder that they're opaque, which is what we'll do.

## Objective 2: Learn the connection pattern

### The shape of a page

Many GraphQL APIs return pages in the same shape, called a **connection**. The pattern comes from Relay, a GraphQL client, which publishes it as the [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm). The official GraphQL documentation [recommends the same pattern](https://graphql.org/learn/pagination/) for any API, whether or not its clients use Relay. A query for the first 2 claims looks like this:

```graphql
{
  claimsConnection(first: 2) {
    edges {
      cursor
      node {
        claimNumber
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

- **`first`**: how many items to return
- **`after`** (not used here): the cursor to start after. Leave it out to start at the beginning.
- **`edges`**: the items on this page. Each edge has the item itself, called the **`node`**, and the item's **`cursor`**.
- **`pageInfo`**: information about the page as a whole. **`endCursor`** is the cursor of the last item, and **`hasNextPage`** says whether there's more after it. **`startCursor`** and **`hasPreviousPage`** are the same for the other end of the page: the first item's cursor, and whether there's anything before it.

To get the next page, the client sends the same query with `after` set to the `endCursor` it just received. It keeps going until `hasNextPage` is `false`.

The specification [requires all four `pageInfo` fields](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo). The course API only pages forward, with `first` and `after`, so `startCursor` and `hasPreviousPage` matter less here. They're still part of the shape clients expect, so the API includes them.

`edges` and `node` look like extra nesting at first. They're there so the API can add information about an item's place in the list, like its cursor, without adding fields to `Claim` itself.

### Why a new field?

The API already has a `claims` query that returns a list. Changing it to return a connection would break every client that uses it today, because the response would have a different shape. Instead, we'll add a new `claimsConnection` query next to it. Clients can move over when they're ready. Once they have, `claims` can be marked `@deprecated`, as you did with `policy(id:)` in 101.

### Exercise

✏️ In **services/policies/src/schema.graphql**, add three new object types and a query:

<table>
   <tr>
      <th>Add</th>
      <th>What it holds</th>
   </tr>
   <tr>
      <td><code>ClaimConnection</code> type</td>
      <td>One page of claims: a list of <code>edges</code>, and the <code>pageInfo</code> for the page</td>
   </tr>
   <tr>
      <td><code>ClaimEdge</code> type</td>
      <td>One claim on the page: its <code>cursor</code>, and the claim itself as <code>node</code></td>
   </tr>
   <tr>
      <td><code>PageInfo</code> type</td>
      <td>The page's <code>startCursor</code> and <code>endCursor</code>, and whether it <code>hasPreviousPage</code> and <code>hasNextPage</code></td>
   </tr>
   <tr>
      <td><code>claimsConnection</code> query</td>
      <td>Takes a required <code>first</code> argument, and returns a <code>ClaimConnection</code></td>
   </tr>
</table>

`startCursor` and `endCursor` can be `null`, because an empty page has no first or last item. Every other field, and every list item, is required.

✏️ In **services/policies/src/resolvers.ts**, add a resolver for it that returns the first `first` claims, in the order they're stored. Each claim's cursor is its `id`, base64-encoded. The first page never has anything before it, so `hasPreviousPage` is `false`.

<strong>Hint:</strong> Node.js can base64-encode a string with `Buffer`.

✏️ Run this query:

```graphql
{
  claimsConnection(first: 2) {
    edges {
      cursor
      node {
        claimNumber
        status
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Your response should be:

```json
{
  "data": {
    "claimsConnection": {
      "edges": [
        { "cursor": "YzE=", "node": { "claimNumber": "CLM-5001", "status": "APPROVED" } },
        { "cursor": "YzI=", "node": { "claimNumber": "CLM-5002", "status": "DENIED" } }
      ],
      "pageInfo": { "startCursor": "YzE=", "endCursor": "YzI=", "hasPreviousPage": false, "hasNextPage": true }
    }
  }
}
```

✏️ Run the same query with `first: 10`:

```graphql
{
  claimsConnection(first: 10) {
    edges {
      cursor
      node {
        claimNumber
        status
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

You should get all six claims, ending with `CLM-5006`, and `"hasPreviousPage": false` and `"hasNextPage": false`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, add the new types:

```graphql
"One page of claims"
type ClaimConnection {
  edges: [ClaimEdge!]!
  pageInfo: PageInfo!
}

"A claim, and the cursor that points to it"
type ClaimEdge {
  cursor: String!
  node: Claim!
}

type PageInfo {
  "The cursor of the first item on this page"
  startCursor: String
  "The cursor of the last item on this page. Pass it as after to get the next page."
  endCursor: String
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}
```

✏️ Add `claimsConnection` to `Query`:

```graphql
type Query {
  # ...existing fields
  claimsConnection(first: Int!): ClaimConnection!
}
```

✏️ In **services/policies/src/resolvers.ts**, add a `claimsConnection` resolver under `Query`:

```ts
    claimsConnection: (_: unknown, args: { first: number }) => {
      const page = claims.slice(0, args.first);
      const edges = page.map((claim) => ({
        cursor: Buffer.from(claim.id).toString("base64"),
        node: claim,
      }));

      return {
        edges,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
          hasPreviousPage: false,
          hasNextPage: args.first < claims.length,
        },
      };
    },
```

- **`claims.slice(0, args.first)`** takes the first `first` claims.
- **`Buffer.from(claim.id).toString("base64")`** turns `c1` into `YzE=`. Base64 isn't a secret code: anyone can decode it. It only signals to clients that the cursor isn't meant to be read.
- **`edges[0]`** is the first edge on the page, and **`edges[edges.length - 1]`** is the last.
- **`hasPreviousPage: false`**: this resolver always starts at the beginning of the list, so there's never anything before the page.

The resolver returns plain objects in the shape of the schema, so the default resolvers answer `edges`, `cursor`, `node`, and `pageInfo`. `node` is a `Claim`, so `Claim.policy` still works inside it.

`PageInfo` doesn't mention claims. You can reuse it for any other connection you add later.

</details>

## Objective 3: Get the next page

### Exercise

The client can get the first page, but not the next one.

✏️ Update **services/policies/src/schema.graphql** and **services/policies/src/resolvers.ts** so `claimsConnection` also takes an optional `after` cursor, and starts with the claim after the one it points to. `hasPreviousPage` is now `true` whenever the page doesn't start at the first claim.

✏️ Get the second page by passing the `endCursor` from the first page, `YzI=`, as `after`:

```graphql
{
  claimsConnection(first: 2, after: "YzI=") {
    edges {
      cursor
      node {
        claimNumber
        status
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Your response should be:

```json
{
  "data": {
    "claimsConnection": {
      "edges": [
        { "cursor": "YzM=", "node": { "claimNumber": "CLM-5003", "status": "APPROVED" } },
        { "cursor": "YzQ=", "node": { "claimNumber": "CLM-5004", "status": "OPEN" } }
      ],
      "pageInfo": { "startCursor": "YzM=", "endCursor": "YzQ=", "hasPreviousPage": true, "hasNextPage": true }
    }
  }
}
```

✏️ Get the third page by passing the `endCursor` from the second page, `YzQ=`, as `after`:

```graphql
{
  claimsConnection(first: 2, after: "YzQ=") {
    edges {
      cursor
      node {
        claimNumber
        status
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Your response should be:

```json
{
  "data": {
    "claimsConnection": {
      "edges": [
        { "cursor": "YzU=", "node": { "claimNumber": "CLM-5005", "status": "APPROVED" } },
        { "cursor": "YzY=", "node": { "claimNumber": "CLM-5006", "status": "OPEN" } }
      ],
      "pageInfo": { "startCursor": "YzU=", "endCursor": "YzY=", "hasPreviousPage": true, "hasNextPage": false }
    }
  }
}
```

`hasNextPage` is `false`, so this is the last page.

✏️ Ask for the page after the last claim, `YzY=`:

```graphql
{
  claimsConnection(first: 2, after: "YzY=") {
    edges {
      cursor
      node {
        claimNumber
        status
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

There's nothing after the last claim, so you should get `"edges": []` and `"pageInfo": { "startCursor": null, "endCursor": null, "hasPreviousPage": true, "hasNextPage": false }`. `hasPreviousPage` is still `true`, because there are claims before the cursor.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **services/policies/src/schema.graphql**, add `after` to `claimsConnection`:

```graphql
type Query {
  # ...existing fields
  claimsConnection(first: Int!, after: String): ClaimConnection!
}
```

✏️ In **services/policies/src/resolvers.ts**, update the `claimsConnection` resolver:

```ts
    claimsConnection: (_: unknown, args: { first: number; after?: string }) => {
      // Start after the claim the cursor points to, or at the beginning
      let start = 0;
      if (args.after) {
        const afterId = Buffer.from(args.after, "base64").toString("utf8");
        start = claims.findIndex((c) => c.id === afterId) + 1;
      }

      const page = claims.slice(start, start + args.first);
      const edges = page.map((claim) => ({
        cursor: Buffer.from(claim.id).toString("base64"),
        node: claim,
      }));

      return {
        edges,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
          hasPreviousPage: start > 0,
          hasNextPage: start + args.first < claims.length,
        },
      };
    },
```

- **`Buffer.from(args.after, "base64").toString("utf8")`** decodes the cursor back into a claim id: `YzI=` becomes `c2`.
- **`findIndex(...) + 1`** finds that claim's position, and moves one past it. The page starts with the claim **after** the cursor.
- **`hasNextPage`** now counts from `start`, since the page no longer begins at the start of the list.
- **`hasPreviousPage: start > 0`** is `true` when there are claims before the page. The specification lets an API that only pages forward always return `false` here, but it may return `true` when that's cheap to work out, as it is here.

Try passing a cursor that doesn't point to any claim, like `after: "bogus"`. `findIndex` returns `-1`, so `start` becomes `0`, and the client quietly gets the first page again. A client with a broken cursor would never find out. We'll fix that kind of problem in the Error Handling section.

</details>

## Next steps

Next, we'll look at custom scalars: types like dates, with rules about what values they accept.
