# Data Persistence

The content is grouped into the three places data lives in a typical backend:

1. **Databases** — Seeding, Transactions, Indexes
2. **Storage Buckets** — S3, Streaming Files, Signed URLs, Object Expirations
3. **Key/Value Cache** — SET/GET, Expirations, Namespace Conventions


---

# Databases

You already know what a database is. This section covers three things that make working with one
reliable and fast: loading a known starting set of data, grouping writes so they can't half-finish,
and speeding up the reads you do most.

## Seeding

Seeding is filling a database with a known starting set of data. You write a script once, then run
it whenever you need that baseline back: a fresh local setup, a test run, or a demo.

Seeding is setting the table before guests arrive. Everything is in a predictable place before
anyone sits down to eat.

### Common Reason You May Need One

- Local development, so every engineer starts from the same data
- Automated tests that need predictable rows to assert against
- Demos and staging environments that should look "real"
- Production reference data that ships with the app and rarely changes, like country codes, roles,
  or plan tiers, seeded on deploy so every environment starts from the same rows.

### How to Use It

Prisma runs a seed script through a small bit of config in `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

The script itself uses the Prisma client directly:

```ts
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // upsert keeps the seed idempotent: insert if missing, update if present
  const ada = await prisma.user.upsert({
    where: { email: "ada@example.com" },
    update: {},
    create: { name: "Ada", email: "ada@example.com" },
  });

  await prisma.post.createMany({
    data: [
      { title: "Hello world", authorId: ada.id },
      { title: "Second post", authorId: ada.id },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Run it with:

```bash
npx prisma db seed
```

Prisma also runs this automatically after `prisma migrate reset` and when it creates a fresh dev
database, so a reset always lands you back on the same baseline.

### Idempotence

A seed should be **idempotent**: running it once or five times leaves the database in the same
state. Without that, the second run either errors on a unique constraint or piles up duplicate rows.

Two ways to get there:

- **Clear first** — delete the tables the seed owns, then insert fresh.
- **Upsert** — insert the row if it's missing, update it if it already exists (the `upsert` above),
  keyed on a unique field like `email`.

Keep the data small and meaningful. It's a starting point, not your production dataset.

### Exercise

```exercise
type: code
runtime: pglite
prompt: |
  Make this seed idempotent: running it twice should leave exactly two users,
  not four. Fill in the operation that inserts a row if it's missing and updates
  it if it already exists, keyed on the unique email.
starter: |
  export async function seed(prisma) {
    for (const user of [
      { name: "Ada", email: "ada@example.com" },
      { name: "Linus", email: "linus@example.com" },
    ]) {
      await prisma.user.__1__({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }
  }
solution: |
  export async function seed(prisma) {
    for (const user of [
      { name: "Ada", email: "ada@example.com" },
      { name: "Linus", email: "linus@example.com" },
    ]) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }
  }
verify: Running the seed twice leaves exactly two users, not four.
```

## Transactions

A transaction groups several writes so they all succeed or all fail together. If any step throws,
the database undoes everything as if none of it happened.

Think of a bank transfer: money leaves one account and arrives in another. You never want one half
to happen without the other.

### How to Use It

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// $transaction hands you a scoped `tx` client; everything on it commits together
await prisma.$transaction(async (tx) => {
  await tx.account.update({
    where: { id: fromAccount },
    data: { balance: { decrement: 100 } },
  });

  await tx.account.update({
    where: { id: toAccount },
    data: { balance: { increment: 100 } },
  });
});
// If the second update throws, the first is rolled back automatically.
```

### Common Reason You May Need One

- Any operation that writes to more than one row or table and must agree
- Moving a value from one place to another (transfers, inventory, balances)
- Steps where a partial result would leave your data in a broken state

If you're only doing a single write, you don't need an explicit transaction. One statement is
already all-or-nothing.

### Exercise

```exercise
type: code
runtime: pglite
prompt: |
  Move `amount` from one account to another so the two updates commit together
  or not at all. Fill in the call that groups them into a single transaction.
starter: |
  export async function transfer(prisma, fromId, toId, amount) {
    await prisma.__1__(async (tx) => {
      await tx.account.update({
        where: { id: fromId },
        data: { balance: { decrement: amount } },
      });
      await tx.account.update({
        where: { id: toId },
        data: { balance: { increment: amount } },
      });
    });
  }
solution: |
  export async function transfer(prisma, fromId, toId, amount) {
    await prisma.$transaction(async (tx) => {
      await tx.account.update({
        where: { id: fromId },
        data: { balance: { decrement: amount } },
      });
      await tx.account.update({
        where: { id: toId },
        data: { balance: { increment: amount } },
      });
    });
  }
verify: A valid transfer moves the balance across both accounts, and a transfer that throws midway leaves both balances unchanged.
```

## Indexes

An index is a lookup structure that lets the database find rows without scanning the entire table.
Without one, finding a user by email means checking every single row.

It's the index at the back of a book. Instead of reading every page to find "transactions," you
jump straight to the right page number.

### How to Use It

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String

  @@index([email]) // look users up by email quickly
}
```

By default this creates a **B-tree** index, the same structure the database uses for primary keys.

### Index Types

Most databases offer more than one kind of index. Choosing the perfect one for a given query is out
of scope for this course, but it's worth knowing the options exist:

- **B-tree** (the default) — keeps keys sorted, so it handles equality (`=`), ranges (`<`, `>`,
  `BETWEEN`), and `ORDER BY`. This is what you want the vast majority of the time.
- **Hash** — handles equality (`=`) only, but can be smaller and a touch faster for that one job. No
  range or sort support.
- **Specialized** (GIN, GiST, and friends) — for full-text search, JSON, and geospatial data. Just
  know they exist; reach for them when you hit those cases.

Prisma lets you pick the type explicitly:

```prisma
model Session {
  id    Int    @id @default(autoincrement())
  token String

  @@index([token], type: Hash) // equality lookups only, never ranges
}
```

### The Tradeoff

Indexes make reads fast but aren't free:

- Every write has to update the index too, so writes get slightly slower
- Each index takes up disk space

Index the columns you actually search, sort, or join on. Not every column.

### Check your understanding

**Q: A query filtering on `email` is slow on a big table. What's the likely fix?**

<details>
<summary>Show answer</summary>

Add an index on `email`. The database can then jump to matching rows instead of scanning the whole
table.

</details>

**Q: Why not just index every column to be safe?**

<details>
<summary>Show answer</summary>

Indexes cost write speed and storage. Too many slows down inserts and updates for lookups you never
make. Index what you query.

</details>

---

# Storage Buckets

Object storage is a service for storing files: images, videos, PDFs, anything binary. Instead of
putting files on your server's hard drive, you upload them to a **bucket**, where each file is an
object addressed by a **key**.

The key looks like a path (`avatars/user-123.png`), but the storage is flat. The `/` is just part
of the key string. There are no real folders.

### It's Not a File System

An object store can look and feel like a file system, but it isn't one. There's no atomic move or
rename. To "rename" an object you copy it to a new key and then delete the old one, which is two
separate requests. In between, both keys exist, and anyone listing the bucket can see that. Treat
keys as effectively immutable once written.

## S3

S3 started as an Amazon product, but it's now the **industry-standard interface** for object
storage. Cloudflare R2, MinIO, and Backblaze B2 all speak the same S3 API, so the same client code
works across providers. You write your upload and download logic once and stay free to switch.

### Common Reason You May Need One

- User-uploaded files (avatars, attachments)
- Static assets (images, compiled frontend bundles)
- Large datasets or backups

### How to Use It

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-east-1" });

await s3.send(new PutObjectCommand({
  Bucket: "my-app-uploads",
  Key: "avatars/user-123.png",
  Body: fileBuffer,
  ContentType: "image/png",
}));
```

Don't store files in your database or on your server's filesystem. Object storage is cheaper, more
durable, and scales without you managing disk space.

### Check your understanding

**Q: Why is it useful that R2, MinIO, and S3 share the same API?**

<details>
<summary>Show answer</summary>

You write your code against the S3 interface once, and it works across providers. Switching storage
backends doesn't mean rewriting your upload and download logic.

</details>

**Q: A key is `reports/2026/q1.pdf`. Are `reports/` and `2026/` real folders?**

<details>
<summary>Show answer</summary>

No. The bucket is flat. The slashes are part of the key string. There are no actual directories.

</details>

## Streaming Files

Streaming moves a file in chunks instead of loading the whole thing into memory at once. The bytes
flow straight from storage to the client as they arrive.

It's drinking through a straw instead of swallowing the whole bottle. You take it a sip at a time,
no matter how big the bottle is.

Streaming isn't an S3 feature. It's a general idea that shows up all over: HTTP request and response
bodies, reading a file off disk, piping between processes, and network sockets. S3 just happens to
hand you a stream.

### Why Stream

- A 2 GB video loaded into memory might crash your server; streamed, it barely registers
- Users see the first bytes of a video or PDF immediately, not after a full download
- Ten concurrent downloads cost the same memory as one

### How to Use It

```ts
import { GetObjectCommand } from "@aws-sdk/client-s3";

app.get("/videos/:id", async (req, res) => {
  const object = await s3.send(new GetObjectCommand({
    Bucket: "my-app-uploads",
    Key: `videos/${req.params.id}.mp4`,
  }));

  res.setHeader("Content-Type", "video/mp4");

  // Body is a readable stream; pipe it straight to the HTTP response.
  // Chunks flow through to the client and are never all held in memory at once.
  object.Body.pipe(res);
});
```

### When to Stream (and When Not To)

Streaming should be your default: stream unless you have a concrete reason not to. If you find
yourself reading a whole file into a variable before sending it, that's the signal to stream instead.

The exceptions are narrow:

- The file is tiny and you need it all in memory anyway (parsing a small JSON or CSV, transforming
  the whole thing).
- You need random access, jumping around the file rather than reading start to finish.
- A library or API you're handing the data to only accepts a full buffer.

### Check your understanding

**Q: Your server runs out of memory when several users download large files at once. Why?**

<details>
<summary>Show answer</summary>

Each download is being loaded fully into memory before being sent. Streaming the file in chunks
keeps memory use flat regardless of file size or number of users.

</details>

**Q: What's a user-facing benefit of streaming a download?**

<details>
<summary>Show answer</summary>

They start receiving data right away instead of waiting for the server to load the entire file
first. Time-to-first-byte is much lower.

</details>

## Signed URLs

A signed URL is a temporary, scoped link to a single object. It lets a client read or upload one
file directly to storage, without making the bucket public and without sharing your credentials.

It's a time-limited guest pass. It opens one specific door, and only until it expires.

### How to Use It

```ts
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// A link the browser can use to download one private file for 5 minutes
const url = await getSignedUrl(
  s3,
  new GetObjectCommand({ Bucket: "my-app-uploads", Key: "invoices/123.pdf" }),
  { expiresIn: 60 * 5 }
);
```

The same trick works for uploads with a `PutObjectCommand`. The browser uploads straight to the
bucket, so the file never has to pass through your server.

### Why It Matters

- Your bucket stays private; only holders of a valid link get in
- Large uploads and downloads skip your server, saving bandwidth and memory
- Access expires on its own. No cleanup, no lingering public links

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Return a signed URL that lets a client download one private object for five
  minutes. Fill in the command that reads an object and the expiry (in seconds).
  A pre-configured `s3` client is provided.
starter: |
  import { GetObjectCommand } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

  export async function downloadUrl(s3, bucket, key) {
    return getSignedUrl(
      s3,
      new __1__({ Bucket: bucket, Key: key }),
      { expiresIn: __2__ }
    );
  }
solution: |
  import { GetObjectCommand } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

  export async function downloadUrl(s3, bucket, key) {
    return getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: bucket, Key: key }),
      { expiresIn: 60 * 5 }
    );
  }
verify: The returned URL points at the requested object and expires in 300 seconds.
```

## Object Expirations

An expiration (or lifecycle rule) tells the bucket to automatically delete or move an object after
a set amount of time. You configure it once, and the storage service enforces it.

This is housekeeping on autopilot. Old files clean themselves up so you don't have to remember.

### How to Use It

```ts
import { PutBucketLifecycleConfigurationCommand } from "@aws-sdk/client-s3";

// Tell the bucket to delete anything under "tmp/" 7 days after it's created
await s3.send(new PutBucketLifecycleConfigurationCommand({
  Bucket: "my-app-uploads",
  LifecycleConfiguration: {
    Rules: [
      {
        ID: "expire-tmp",
        Filter: { Prefix: "tmp/" },
        Expiration: { Days: 7 },
        Status: "Enabled",
      },
    ],
  },
}));
```

You set this once per bucket; the storage service enforces it from then on.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Build the lifecycle rule that deletes everything under the `tmp/` prefix
  seven days after it's created. Fill in the prefix, the number of days, and the
  status that makes the rule active.
starter: |
  export function tmpExpiryRule() {
    return {
      ID: "expire-tmp",
      Filter: { Prefix: "__1__" },
      Expiration: { Days: __2__ },
      Status: "__3__",
    };
  }
solution: |
  export function tmpExpiryRule() {
    return {
      ID: "expire-tmp",
      Filter: { Prefix: "tmp/" },
      Expiration: { Days: 7 },
      Status: "Enabled",
    };
  }
verify: The rule targets the tmp/ prefix, expires objects after 7 days, and is enabled.
```

---

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
