# Security

This guide walks the boundaries an attacker probes, in the order data crosses them. Each topic is
one of those boundaries:

1. **Secrets**: keep credentials out of your code, your git history, and your logs
2. **Encryption in Transit**: TLS turns plaintext HTTP into HTTPS and defeats man-in-the-middle
3. **Password Hashing**: store passwords so a database leak isn't a password leak — and compare
   secrets in constant time
4. **Untrusted Input**: never let user data become code — SQL injection, HTML injection, and
   directory traversal
5. **Browser Trust**: CORS and CSRF, and what the same-origin policy does and doesn't protect

The thread connecting them: **never trust the boundary**. Don't trust that your repo stays private,
that the network is private, that your database stays private, that input is well-formed, or that a
request came from your own site. Each topic is one place that assumption fails and what to do
instead.

---

# Secrets

A secret is any credential your code needs but no one else should have: database passwords, API
keys, signing keys, tokens. The whole problem is keeping the secret *out* of every place that gets
shared — and a surprising number of places get shared.

The rule is one sentence: **a secret never goes in your source code.** Everything below is a
consequence of that rule.

## Where Secrets Leak

The mistake is almost always the same — a value typed directly into a file that later travels
somewhere you didn't think about:

- **Committed to git.** Even if you delete it in the next commit, it's still in the history. Anyone
  who clones the repo gets every version of every file. A leaked key isn't un-leaked by a later
  commit — it has to be **rotated** (revoked and reissued).
- **Baked into a built artifact.** A secret in a Docker image or a frontend bundle ships with every
  copy of that artifact to everyone who can pull it.
- **Printed to logs.** Logging a whole request object, or a config dump on startup, quietly writes
  the secret into log files and log aggregators that a much wider group can read.

## How to Use It

Keep secrets in the **environment**, not the code. The app reads them at runtime; the file that
holds them is never committed.

```bash
# .env  — listed in .gitignore, never committed
DATABASE_URL=postgres://app:s3cr3t@db:5432/app
STRIPE_API_KEY=sk_live_...
```

```js
// The code references the name, never the value
const stripe = new Stripe(process.env.STRIPE_API_KEY);
```

```gitignore
# .gitignore — the single most important line in this section
.env
```

For a solo project or one machine, a `.env` file kept out of git is enough. Once a team shares
infrastructure, move up to a **secret manager** — AWS Secrets Manager, HashiCorp Vault, Google
Secret Manager. These store the value encrypted, hand it to the app at runtime, control *who* can
read each secret, and give you an audit log and one-click rotation. The code still just reads a
name; only the source of the value changes.

> **Heads-up:** if a secret ever lands in a commit, rotating it is not optional. Force-pushing to
> erase the commit doesn't help — assume every clone, fork, and CI cache already has it. Revoke the
> old credential and issue a new one.

### Common Reason You May Need This

- Connecting to a database, payment processor, or any third-party API
- Signing tokens or sessions (the signing key is a secret — see Password Hashing and the IAM guide)
- Sharing a codebase publicly, or even privately across a team, without leaking access along with it

### Check your understanding

**Q: You committed an API key, noticed an hour later, and deleted it in a new commit. Are you safe?**

<details>
<summary>Show answer</summary>

No. The key is still in the git history and in every clone made in that hour. Deleting it going
forward doesn't remove it from past commits. Rotate the key: revoke the old one and issue a new one.
That's the only fix that actually closes the hole.

</details>

**Q: Why is reading a secret from an environment variable safer than writing it in the source file
that uses it?**

<details>
<summary>Show answer</summary>

The source file gets committed, built into artifacts, and shared; the value would travel with it
everywhere. An environment variable supplies the value at runtime from a file (or secret manager)
that's kept out of all of those, so the same code ships safely to every environment, each providing
its own credentials.

</details>

---

# Encryption in Transit

When a request leaves the client, it passes through Wi-Fi access points, routers, ISPs, and load
balancers before it reaches your server. Over plain **HTTP**, every one of those hops can read the
request and change it. A password, a session cookie, an API response — all of it is in the clear.

**TLS** (Transport Layer Security) is what fixes this. It's the "S" in HTTP**S**. You'll also hear
"SSL" — that was TLS's predecessor, now obsolete, but the name stuck, so "SSL certificate" almost
always means a TLS certificate today.

## TLS Does Two Jobs

People think of TLS as "encryption," but it does two distinct things, and the second is the one
that's easy to forget:

- **Encryption** — scrambles the traffic so an eavesdropper on the path sees only ciphertext.
  Confidentiality.
- **Authentication** — proves the server is who it claims to be, using a **certificate** signed by a
  **Certificate Authority** (CA) the browser already trusts. Identity.

Encryption without authentication is useless against a man-in-the-middle. If you encrypt a
conversation but can't verify who's on the other end, you may have set up a perfectly secure channel
*to the attacker*.

## The Man-in-the-Middle Attack

A **man-in-the-middle (MITM)** sits between the client and the real server, relaying traffic while
reading or altering it. Picture connecting to coffee-shop Wi-Fi: a malicious access point can pose
as your bank's server, take the client's connection, and open its own connection to the bank — two
encrypted tunnels with the attacker reading everything in the middle.

The certificate is what stops this. When the client connects, the server presents a certificate that
says "I am `bank.com`," signed by a trusted CA. The attacker can copy the certificate, but can't
forge the CA's signature for a domain they don't control. The client checks the signature, sees it
doesn't validate for the connection it's actually on, and refuses to continue.

```
Without TLS:   client → 🕵️ attacker reads & rewrites → server     (plaintext, no identity check)
With TLS:      client → 🔒 encrypted, cert verified 🔒 → server     (attacker can't read or impersonate)
```

This is why **clicking through a certificate warning is dangerous** — and why your code must never
disable certificate validation to "make the error go away." That warning is exactly the MITM
defense doing its job.

## How to Use It

Most apps terminate TLS at a load balancer or a service like Cloudflare, so your app speaks plain
HTTP internally. Two things stay your responsibility:

```js
// 1. Redirect any plaintext request to the encrypted equivalent
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// 2. Tell the browser to never even try HTTP for this domain again (HSTS)
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});
```

The `Strict-Transport-Security` header (**HSTS**) closes a gap: the *first* request a user makes is
often plain HTTP, before the redirect — a window a MITM can exploit. HSTS tells the browser to
upgrade to HTTPS on its own from then on, before any request leaves the machine.

### Check your understanding

**Q: An attacker on the same Wi-Fi sets up a fake access point and proxies traffic to your bank.
TLS is in use. Why does the attack still fail?**

<details>
<summary>Show answer</summary>

TLS authenticates the server with a CA-signed certificate, not just encrypting the channel. The
attacker can relay traffic but can't present a valid certificate for `bank.com` — they don't control
the domain and can't forge the CA's signature. The browser detects the mismatch and refuses to
connect.

</details>

**Q: Why is encryption alone not enough to stop a man-in-the-middle?**

<details>
<summary>Show answer</summary>

Encryption only guarantees nobody *else* can read the channel — it says nothing about *who* is on
the other end. Without authentication you could be encrypting traffic straight to the attacker. TLS
pairs encryption with certificate-based identity so you know the encrypted channel goes to the real
server.

</details>

---

# Password Hashing

If your user database leaks — and you should plan as if it will — the damage depends entirely on how
you stored passwords. Store them so that even with the full database in hand, an attacker can't
recover the passwords.

That rules out two tempting options:

- **Plaintext** — a leak is an instant, total compromise. Never.
- **Encryption** — reversible by design. Whoever has the database probably has the key too (it lives
  on the same servers). Also wrong.

The answer is **hashing**: a one-way function. You store the hash, and on login you hash the
submitted password and compare. You never store, and can never recover, the original.

## Not Just Any Hash

The obvious choice — a fast hash like MD5 or SHA-256 — is wrong here, for two reasons:

- **Fast is bad.** Those hashes are built to be fast, so an attacker with a GPU can try *billions*
  of guesses per second against a leaked hash.
- **Identical passwords produce identical hashes.** Everyone who picked `password123` has the same
  hash, so cracking one cracks them all — and precomputed **rainbow tables** map common hashes
  straight back to their inputs.

Two ingredients fix this:

- **Salt** — a random value generated per user and stored alongside the hash. It makes every hash
  unique even for identical passwords, which defeats rainbow tables and hides the fact that two
  users chose the same password.
- **A slow, adaptive hash** — **bcrypt**, **scrypt**, or **Argon2**. These are deliberately
  expensive and have a tunable **work factor** you raise as hardware gets faster, so brute force
  stays impractical for years.

## How to Use It

A good password library generates the salt, applies the work factor, and embeds both in the output
string — so you store one value and never manage the salt by hand:

```js
import bcrypt from "bcrypt";

// On sign-up: 12 is the work factor; the salt is generated and stored inside `hash`
const hash = await bcrypt.hash(plainPassword, 12);
// Store `hash`. It looks like: $2b$12$Nf3...<salt+digest>

// On login: bcrypt reads the salt and work factor back out of the stored hash
const ok = await bcrypt.compare(submittedPassword, hash);
```

When you need to raise the work factor later, do it on next login: the stored hash records the
factor it was made with, so you can detect old hashes and re-hash transparently.

## Comparing Secrets in Constant Time

There's a subtler attack on the comparison itself. The obvious way to check a token or a hash is
`===`, but string comparison **short-circuits**: it returns `false` at the first byte that differs.
That means a near-miss takes microscopically longer than an early mismatch — and an attacker who can
measure response times can use that signal to recover a secret one byte at a time. This is a
**timing attack**.

The defense is a **constant-time comparison** that always examines every byte, so the time taken
reveals nothing about how much of the guess was right:

```js
import crypto from "node:crypto";

function safeEqual(a, b) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;     // length isn't secret
  return crypto.timingSafeEqual(ab, bb);          // compares all bytes, always
}
```

Use this anywhere you compare a user-supplied value against a secret: API tokens, password-reset
tokens, and webhook **HMAC signatures** (the APIs guide builds on exactly this). Password libraries
like bcrypt already compare in constant time internally — so this matters most for the secrets you
compare yourself.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Finish this auth helper. Hash a new password with a per-user salt and work
  factor, and verify a submitted password without leaking timing information.
  Fill in the work-factor argument and the constant-time comparison call.
starter: |
  import bcrypt from "bcrypt";
  import crypto from "node:crypto";

  export async function hashPassword(plain) {
    // Cost factor 12 — salt is generated and embedded automatically
    return bcrypt.hash(plain, __1__);
  }

  export function safeTokenEqual(a, b) {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) return false;
    return crypto.__2__(ab, bb);
  }
solution: |
  import bcrypt from "bcrypt";
  import crypto from "node:crypto";

  export async function hashPassword(plain) {
    return bcrypt.hash(plain, 12);
  }

  export function safeTokenEqual(a, b) {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) return false;
    return crypto.timingSafeEqual(ab, bb);
  }
verify: Passwords are stored salted and slow-hashed; token comparison examines every byte regardless of where the first mismatch is.
```

### Check your understanding

**Q: Your database leaks. You used SHA-256 with no salt. Why is that nearly as bad as plaintext for
common passwords?**

<details>
<summary>Show answer</summary>

SHA-256 is fast, so a GPU can try billions of guesses per second, and without a salt every common
password hashes to the same well-known value — a rainbow table reverses it instantly. A slow,
salted hash (bcrypt/scrypt/Argon2) makes each guess expensive and every hash unique, so a leak
doesn't hand over the passwords.

</details>

**Q: Why compare a password-reset token with `crypto.timingSafeEqual` instead of `===`?**

<details>
<summary>Show answer</summary>

`===` short-circuits at the first differing byte, so a closer guess takes slightly longer. An
attacker measuring response times can recover the token byte by byte. A constant-time comparison
checks every byte regardless, so the timing reveals nothing.

</details>

---

# Untrusted Input

Every value that comes from outside your code — a form field, a URL parameter, a header, an uploaded
filename — is **untrusted**. The entire family of injection attacks comes from one mistake: letting
that untrusted data get interpreted as **code** instead of staying **data**.

It helps to separate three things people lump together as "sanitizing input":

- **Validation** — reject input that doesn't fit the expected shape (an email that isn't an email, a
  quantity that isn't a positive number). Do it at the boundary, but it's a *filter*, not a
  security guarantee.
- **Sanitization** — strip or neutralize dangerous content from input you intend to keep.
- **Escaping / parameterizing** — the real fix: keep data and code in separate lanes so the data can
  *never* be parsed as a command, no matter what it contains.

The principle below appears three times, in three different interpreters: a SQL database, an HTML
renderer, and a filesystem. Same bug, same fix.

## SQL Injection

A SQL injection happens when user input is concatenated into a query string and the database parses
part of it as SQL:

```js
// DON'T: the input becomes part of the SQL command
db.query(`SELECT * FROM users WHERE email = '${email}'`);
// email = "' OR '1'='1"        → returns every user
// email = "'; DROP TABLE users; --"  → exactly what it looks like
```

The fix is a **parameterized query** (a prepared statement). You send the SQL and the values
*separately*; the driver guarantees the values are only ever treated as data:

```js
// DO: the $1 placeholder is filled with `email` as a pure value, never parsed as SQL
db.query("SELECT * FROM users WHERE email = $1", [email]);
```

There's no clever escaping to get right by hand — parameterized queries are the answer, and every
database driver and ORM supports them.

## HTML Injection (XSS)

The same bug in the browser is **cross-site scripting (XSS)**: untrusted input rendered into a page
where the browser parses it as HTML and runs any script it contains — in the victim's session, with
their cookies.

```js
// DON'T: input is parsed as markup, so a <script> or onerror handler runs
element.innerHTML = `<p>${comment}</p>`;
// comment = "<img src=x onerror=alert(document.cookie)>"  → runs in the victim's browser

// DO: render it as text, so the browser shows the characters literally
element.textContent = comment;
```

Modern frameworks escape by default — React's `<p>{comment}</p>` is safe — but every framework also
has an escape hatch (`dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`) that re-opens the hole the
moment you feed it untrusted data. A second layer, a **Content-Security-Policy** header, limits what
scripts can run even if something slips through:

```js
res.setHeader("Content-Security-Policy", "default-src 'self'");
```

## Directory Traversal

When a filename from the user is used to build a filesystem path, `../` lets the request climb out
of the intended folder:

```
GET /files/../../etc/passwd     → reads a system file, far outside your uploads folder
```

The fix is to resolve the final path and confirm it's still inside the directory you meant to serve:

```js
import path from "node:path";

const ROOT = "/var/www/files";

app.get("/files/:name", (req, res) => {
  const target = path.resolve(ROOT, req.params.name);   // collapses any ../ segments
  if (!target.startsWith(ROOT + path.sep)) {
    return res.status(403).end();                        // escaped the root — reject
  }
  res.sendFile(target);
});
```

Validating the *input* for `..` is fragile — encodings and edge cases slip past. Resolving the path
and checking the *result* stays inside the root is robust, because it verifies the actual outcome.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Rewrite this login lookup to be injection-safe. Fill in the query so the
  email and password-hash values are sent as parameters, never concatenated
  into the SQL string.
starter: |
  export function findUser(db, email) {
    // Vulnerable: do NOT interpolate user input into the SQL
    // return db.query(`SELECT * FROM users WHERE email = '${email}'`);

    return db.query(
      "SELECT * FROM users WHERE email = __1__",
      [__2__]
    );
  }
solution: |
  export function findUser(db, email) {
    return db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
  }
verify: The email value reaches the database as a bound parameter, so input like "' OR '1'='1" is treated as a literal string and matches no rows.
```

### Check your understanding

**Q: A teammate "fixes" SQL injection by stripping quotes and semicolons from input before building
the query string. Why isn't that enough?**

<details>
<summary>Show answer</summary>

Blocklist sanitizing always misses cases — different encodings, comment syntax, payloads that need
no quotes. As long as input is concatenated into the SQL string, it can still be parsed as code. The
robust fix is a parameterized query, where the value is never part of the SQL in the first place.

</details>

**Q: Your framework escapes interpolated values automatically, yet a stored comment still ran a
script. What's the likely cause?**

<details>
<summary>Show answer</summary>

The code used an escape hatch like `dangerouslySetInnerHTML` / `innerHTML` to render the comment as
raw HTML, bypassing the auto-escaping. Render untrusted content as text, and reserve raw-HTML APIs
for content you fully control (or sanitize it first).

</details>

---

# Browser Trust

The last two attacks aren't about your server's code — they're about the trust the **browser**
places in origins. The foundation is the **same-origin policy (SOP)**: by default, script on one
origin (scheme + host + port) can't read responses from another. CORS and CSRF are the two ways that
default gets relaxed — one on purpose, one by an attacker.

## CORS

The same-origin policy blocks `app.example.com` from reading a response from `api.example.com` — even
though you own both. **CORS (Cross-Origin Resource Sharing)** is how the *server* grants the browser
permission to relax that, by sending headers that name the origins allowed to read its responses.

The crucial misconception to clear up:

> **Heads-up:** CORS does **not** protect your server. It's not a server-side access control — it's
> the server telling the *browser* whose script is allowed to read the response. A non-browser
> client (curl, your backend, an attacker's script) ignores CORS entirely. Real protection is
> authentication and authorization on the endpoint; CORS only governs which web origins a browser
> will hand the response to.

```js
// Allow one specific origin to read responses — never reflect arbitrary origins,
// and never combine "*" with credentials.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://app.example.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
```

For requests that can change data, the browser first sends a **preflight** `OPTIONS` request asking
"is this method, from this origin, allowed?" Your server answers with the `Access-Control-Allow-*`
headers before the real request is sent.

## CSRF

**Cross-Site Request Forgery** exploits one browser behavior: the browser **automatically attaches
your cookies** to a request to a site, no matter which site triggered it. So if you're logged into
your bank and visit a malicious page, a hidden form there can POST to the bank — and the browser
helpfully includes your session cookie. The bank sees a fully authenticated request you never meant
to make.

Note this is the mirror image of CORS: CORS is about *reading* a cross-origin response; CSRF doesn't
need to read anything — the *side effect* (transfer money, change email) is the whole attack.

Two defenses, used together:

- **`SameSite` cookies** — tell the browser not to attach the cookie on cross-site requests, which
  removes the ammunition the attack depends on. `Lax` is a sensible default; `Strict` is tighter.
- **CSRF tokens** — a per-session random value the server embeds in your forms and checks on
  submit. The attacker's page can't read it (the same-origin policy stops them), so it can't forge a
  valid request.

```js
// A session cookie that resists both theft and forgery:
res.cookie("session", sessionId, {
  httpOnly: true,   // JavaScript can't read it → limits XSS theft
  secure: true,     // sent only over HTTPS
  sameSite: "lax",  // not attached to cross-site requests → blocks CSRF
});
```

Those cookie flags tie this guide to the IAM guide's "Storing Tokens in the Browser" topic — the
same flags decide whether a stolen-or-forged session is even possible.

### Check your understanding

**Q: A developer says "our API doesn't need auth checks because CORS only allows our own frontend."
Why is this wrong?**

<details>
<summary>Show answer</summary>

CORS is enforced by *browsers*, not by your server. It controls which web origins a browser will let
read a response — it does nothing to stop curl, a script, or any non-browser client from calling the
endpoint directly. The API still needs its own authentication and authorization.

</details>

**Q: A logged-in user visits a malicious page that silently POSTs to your `/transfer` endpoint, and
it succeeds. What browser behavior made this possible, and what stops it?**

<details>
<summary>Show answer</summary>

The browser automatically attached the user's session cookie to the cross-site request — that's
CSRF. Set the session cookie `SameSite=Lax` (or `Strict`) so it isn't sent on cross-site requests,
and require a CSRF token the attacker's page can't read.

</details>

---

# Recap

You walked the boundaries an attacker probes, and the same theme — *never trust the boundary* — held
at each one:

- **Secrets**: keep credentials out of source, history, artifacts, and logs. Read them from the
  environment or a secret manager, and rotate anything that leaks.
- **Encryption in Transit**: TLS both encrypts traffic *and* authenticates the server with a
  CA-signed certificate. That pairing is what defeats a man-in-the-middle — never disable it.
- **Password Hashing**: store passwords with a salted, slow hash (bcrypt/scrypt/Argon2), never
  plaintext or encryption, and compare secrets in constant time to defeat timing attacks.
- **Untrusted Input**: one bug in three interpreters. Keep data out of the code lane — parameterized
  queries for SQL, output escaping for HTML, and resolve-then-verify for file paths.
- **Browser Trust**: the same-origin policy is the baseline. CORS relaxes it on purpose (and
  protects browsers, not your server); CSRF abuses automatic cookie attachment — block it with
  `SameSite` cookies and CSRF tokens.

These stack into one habit: assume every boundary is hostile, keep secrets and code separated from
data, and prove identity — of servers, of users, and of the requests themselves — before trusting
anything on the other side.
