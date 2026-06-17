@page learn-persistence/storage-buckets Storage Buckets
@parent learn-persistence 2

@description Learn object storage with S3: streaming files, signed URLs, and object expirations.

@body

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
