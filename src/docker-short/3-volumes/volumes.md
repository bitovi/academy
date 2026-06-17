@page learn-docker-short/volumes Volumes
@parent learn-docker-short 3

@description Learn how to use bind mounts for live-reload and named volumes for data persistence.

@body

## Volumes and Bind Mounts

A container's filesystem is ephemeral: it's a thin writable layer on top of the image, and it's
destroyed with the container. Anything the container writes there — database rows, uploads, logs —
is gone when the container is removed. Mounts solve this by connecting a path inside the container
to storage on the host machine, so the files actually live on the host's disk and outlive any
container that uses them.

There are two kinds, and they differ in who controls the host-side location:

- **Bind mount**: maps a specific host folder you choose into the container. You know the exact
  path on disk, and you can edit those files directly. Ideal for development, where you want the
  container to see your source code as you change it.
- **Named volume**: storage Docker creates and manages, identified by a name rather than a path
  (`docker volume create pgdata`). Docker decides where it lives on disk; you just refer to it by
  name. Ideal for data a container must persist but you never edit by hand, like a database's
  files.

The same mechanism covers two different needs: a named volume is about *persistence* (keep data
across container restarts and rebuilds), while a bind mount is usually about *sharing* (the host
and container working on the same files at the same time).

### Bind Mounts for Live-Reload

The most common development use is bind-mounting your source code. The host folder and the
container path point at the same files, so a change on either side is visible to the other
instantly — no copy step in between.

```bash
# Mount dev/app of the home folder into /app in the container
docker run -p 3000:3000 -v /Users/bobsmith/dev/app:/app my-api

# To do the same thing dynamically regardless of the name of your home folder
docker run -p 3000:3000 -v "$(pwd)"/dev/app:/app my-api
```

The `-v host:container` flag maps a folder on your machine to a path inside the container. The
container now reads your source directly instead of the copy baked into the image at build time.
Pair that with a file watcher running inside the container (something like `nodemon` for Node, or
your framework's dev server) and a save on the host triggers a reload in the container. No rebuild,
no restart.

> **Heads-up:** a bind mount *replaces* what the image had at that path. During the build,
> `npm install` created `/app/node_modules` inside the image — but when you mount your project
> folder over `/app`, the container sees *your* folder instead, and your folder probably has no
> `node_modules` (or one built for the wrong OS). The app crashes with "module not found."
> The fix is an extra flag, `-v /app/node_modules`, which tells Docker to keep that one subfolder
> as container-managed storage instead of reading it from your machine. Your source comes from the
> host; the installed dependencies stay from the image's build.

### Check your understanding

**Q: After a container is removed, the data it wrote is gone. How do you keep it?**

<details>
<summary>Show answer</summary>

Write it to a volume instead of the container's own filesystem. A named volume Docker manages, or a
bind mount to a host folder, both outlive the container.

</details>
