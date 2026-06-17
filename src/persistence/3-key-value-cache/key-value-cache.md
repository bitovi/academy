@page learn-persistence/key-value-cache Key/Value Cache
@parent learn-persistence 3

@description Learn key/value caching with Redis: SET/GET, TTLs, and namespace conventions.

@body

# Key/Value Cache

A key/value cache maps string keys to values and lives in memory, so reads and writes take
microseconds instead of milliseconds. It sits in front of slower systems like your database.

Think of sticky notes on your monitor versus digging through a filing cabinet. The note is instant,
but it's temporary and you can afford to lose it. A cache complements your database. It doesn't
replace it: durable data lives in the database, fast and temporary data lives in the cache.

### Common Reason You May Need One

- Caching expensive query results so repeat reads skip the database
- Sessions and short-lived auth state
- Rate limiting (counting requests per user per window)
- Short-lived data like one-time passwords

## SET / GET

`SET` writes a value under a key. `GET` reads it back. These two operations are the foundation of
almost everything you do with a cache.

The most common pattern is **cache-aside**: check the cache first; on a miss, load from the
database and write the result back so next time is fast. It's not the only pattern, though:

- **Cache-aside (lazy)** — the app checks the cache, and on a miss loads from the database and writes
  the result back. The cache only ever fills with data that's actually been requested.
- **Write-through** — every write goes to the cache and the database together, so the cache stays
  warm. Reads never miss on data that's been written, at the cost of writing twice.
- **Write-back (write-behind)** — writes land in the cache first and are flushed to the database
  later. Fast, but you can lose data if the cache dies before the flush, so it's used carefully.

### How to Use It

```ts
import { createClient } from "redis";

const cache = createClient();
await cache.connect();

async function getPopularPosts() {
  const cached = await cache.get("popular_posts"); // check the cache
  if (cached) return JSON.parse(cached); // hit

  const posts = await fetchPopularPostsFromDb(); // miss
  await cache.set("popular_posts", JSON.stringify(posts)); // fill the cache
  return posts;
}
```

A cache stores strings, not objects. Serialize on the way in with `JSON.stringify` and parse on the
way out with `JSON.parse`. A **hit** means the key was found; a **miss** means you fall back to the
source.

### Collisions

A cache is one shared pool of keys, with no tables or schemas to keep things apart. If two different
pieces of data pick the same key, the second `SET` silently overwrites the first. That's a
**collision**. Store a user under `42` and an order under `42`, and one clobbers the other. You
won't get an error, just wrong data.

The fix is disciplined key naming, which the **Namespace Conventions** topic covers in depth. For
now, just know that *what* you name a key matters as much as what you store in it.

### Exercise

```exercise
type: code
runtime: mock-redis
prompt: |
  Implement cache-aside: serve from the cache on a hit, otherwise load from the
  db, backfill the cache, and return the value. Fill in the write operation and
  the serialization. A connected `cache` client is provided.
starter: |
  export async function getPopularPosts(cache, db) {
    const cached = await cache.get("popular_posts");
    if (cached) return JSON.parse(cached);

    const posts = await db.fetchPopularPosts();
    await cache.__1__("popular_posts", __2__(posts));
    return posts;
  }
solution: |
  export async function getPopularPosts(cache, db) {
    const cached = await cache.get("popular_posts");
    if (cached) return JSON.parse(cached);

    const posts = await db.fetchPopularPosts();
    await cache.set("popular_posts", JSON.stringify(posts));
    return posts;
  }
verify: A second call returns the cached value without querying the database again.
```

## Expirations

Every cached key can have a **time-to-live (TTL)**: a timer after which the cache deletes it
automatically. TTLs keep data fresh and stop memory from filling up forever.

### How to Use It

```ts
await cache.set(
  "popular_posts",
  JSON.stringify(posts),
  { EX: 60 * 5 } // expires in 5 minutes
);

await cache.set("otp:user-123", "482910", { EX: 60 }); // gone after a minute
```

### Freshness vs. Staleness

A cached value is a copy, so it can go stale when the real data changes. Two ways to handle it:

- **Short TTL** — accept that data may be a little out of date, and let it refresh on its own
- **Invalidate on write** — delete the cache key whenever the underlying data changes

Even without a TTL, a cache has limited memory. When it's full, it **evicts** keys to make room
(commonly the least recently used). So treat every cached value as something that can disappear at
any time.

### Don't Confuse the Three "Expirations"

By now you've seen three different things that "expire," and they're easy to mix up. The TTL here is
the one that lives in memory:

| Expiration | What goes away | Used for |
|---|---|---|
| Cache TTL | A value in memory | Freshness |
| Object expiration | The file itself, after N days | Cost, compliance, temp files |
| Signed URL expiry | The link; the file stays | Time-limited access |

### Exercise

```exercise
type: code
runtime: mock-redis
prompt: |
  Cache a user's profile with a five-minute TTL, and invalidate it on demand.
  Fill in the option that sets the expiry and the operation that deletes a key.
  A connected `cache` client is provided.
starter: |
  export async function cacheUser(cache, id, profile) {
    await cache.set(
      `user:${id}:profile`,
      JSON.stringify(profile),
      { __1__: 60 * 5 } // expire in 5 minutes
    );
  }

  export async function invalidateUser(cache, id) {
    await cache.__2__(`user:${id}:profile`);
  }
solution: |
  export async function cacheUser(cache, id, profile) {
    await cache.set(
      `user:${id}:profile`,
      JSON.stringify(profile),
      { EX: 60 * 5 } // expire in 5 minutes
    );
  }

  export async function invalidateUser(cache, id) {
    await cache.del(`user:${id}:profile`);
  }
verify: The profile is cached with a TTL of up to 300 seconds and is gone after invalidation.
```

## Namespace Conventions

A cache is one big shared pool of keys, so naming matters. The convention is colon-delimited
namespaces that read from general to specific: `user:42:profile`.

Good key names prevent collisions, make the cache easy to reason about, and let you find or clear
related keys by their shared prefix.

### A Naming Pattern

```ts
const key = (userId: number) => `user:${userId}:profile`;

await cache.set(key(42), JSON.stringify(profile), { EX: 300 });
const cached = await cache.get(key(42));
```

### Mirror Your Entity Hierarchy

Structure keys to reflect the relationships in your data model. If users own posts and posts have comments, that nesting should show up in the key: `user:42:post:7:comments`. A reader can look at any key and immediately know what entity it belongs to, where it sits in the hierarchy, and what other keys are related to it.

This also makes invalidation natural. When a user is deleted, all keys under `user:42:` are candidates for eviction. When a post is updated, `user:42:post:7:` keys are the scope to clear.

### Why Conventions Help

- **No collisions** — `user:42` and `post:42` never clash, even though both end in 42
- **Grouping** — every key under `user:42:` belongs to one user and can be cleared together
- **Versioning** — bump a prefix (`v2:user:42:profile`) to invalidate a whole shape of data at once
- **Shared caches** — prefix by service name (`auth:`, `catalog:`) when multiple services share a cache instance so their keys never overlap

Pick one convention and apply it everywhere. A consistent scheme is what keeps a shared cache from
turning into a junk drawer.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Build colon-delimited keys that mirror the entity hierarchy (user → post →
  comments). Fill in the final, most-specific segment of each key.
starter: |
  export const profileKey = (userId) =>
    `user:${userId}:__1__`;

  export const postCommentsKey = (userId, postId) =>
    `user:${userId}:post:${postId}:__2__`;
solution: |
  export const profileKey = (userId) =>
    `user:${userId}:profile`;

  export const postCommentsKey = (userId, postId) =>
    `user:${userId}:post:${postId}:comments`;
verify: The builders produce user:42:profile and user:42:post:7:comments.
```

---

# Recap

You've now seen the three places data lives in a typical backend, and when to reach for each.

- **Databases** — your durable source of truth for structured, related data. Seed it for
  predictable starting data, wrap multi-step writes in transactions, and add indexes to keep reads
  fast.
- **Storage Buckets** — for files and binary blobs, using the S3 interface. Stream large ones, hand
  out signed URLs for direct and temporary access, and use lifecycle rules to expire what you don't
  need.
- **Key/Value Cache** — for fast, in-memory, disposable data. SET/GET with cache-aside, give keys a
  TTL, and name them with a consistent namespace.

These aren't either/or choices. A real app uses all three at once: a database row points at a file
in object storage, and a cache sits in front of the database to serve hot reads. The skill is
matching each piece of data to the layer that fits it best.
