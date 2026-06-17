@page learn-apis/webhooks WebHooks
@parent learn-apis 2

@description Learn how WebHooks work — letting a service call you when something happens, and verifying who's calling.

@body

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
