@page learn-persistence/databases Databases
@parent learn-persistence 1

@description Learn database seeding, transactions, and indexes for reliable and fast data access.

@body

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
