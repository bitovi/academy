@page learn-persistence Learn Data Persistence
@parent bit-academy 7

@description Learn the three places data lives in a typical backend: databases, storage buckets, and key/value caches.

@body

## Overview

The content is grouped into the three places data lives in a typical backend:

1. **Databases** — Seeding, Transactions, Indexes
2. **Storage Buckets** — S3, Streaming Files, Signed URLs, Object Expirations
3. **Key/Value Cache** — SET/GET, Expirations, Namespace Conventions

## Outline

Start with [learn-persistence/databases Databases] — loading a known starting set of data with
seeding, grouping writes so they can't half-finish with transactions, and speeding up reads
with indexes.

Then [learn-persistence/storage-buckets Storage Buckets] covers object storage using the S3
interface: uploading files, streaming large ones to avoid memory exhaustion, generating signed
URLs for temporary private access, and setting lifecycle rules for automatic cleanup.

Finally, [learn-persistence/key-value-cache Key/Value Cache] explains the SET/GET pattern,
cache-aside vs. write-through strategies, TTLs for freshness, and namespace conventions that
prevent collisions in a shared cache.

## Next steps

✏️ Head over to the [first lesson](learn-persistence/databases.html) to learn about databases.
