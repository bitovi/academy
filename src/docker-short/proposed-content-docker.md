# Docker

This guide follows an app from a folder on your laptop to a running, multi-container setup. Each
topic is one step in that path:

1. **Taxonomy**: image, container, Dockerfile
2. **Containerize Your App**: write a Dockerfile, build an image, run a container
3. **Volumes**: bind your source into the container for live-reload
4. **Compose**: tie multiple containers together with one file
5. **Secrets**: keep credentials out of the image, using build args and env vars

---

# Taxonomy

Docker has three core building blocks: the Dockerfile, the image, and the container. They're easy to confuse, but the rest of this guide builds on telling them apart, so it's worth getting them straight first.

## Image vs. Container vs. Dockerfile

- **Dockerfile**: a text file of instructions for building an image.
- **Image**: the built, read-only package containing your app plus everything it needs to run. You build it
  once and it never changes.
- **Container**: a running instance of an image. You can run many containers from one image, all
  identical at the start.

The relationship that trips people up: a Dockerfile **builds** an image, and an image **runs** as a
container. Editing your Dockerfile changes nothing until you rebuild, and a rebuild doesn't touch an
already-running container until you start a new one.

### Check your understanding

**Q: You changed your Dockerfile but the running app behaves exactly as before. Why?**

<details>
<summary>Show answer</summary>

A Dockerfile only takes effect when you rebuild the image, and the image only takes effect when you
start a new container. The old container is still running the old image. Rebuild, then re-run.

</details>

**Q: Two containers from the same image. Is the image duplicated?**

<details>
<summary>Show answer</summary>

No. The image is read-only and shared. Each container adds its own thin writable layer on top, so
running ten containers doesn't cost ten copies of the image.

</details>

---

# Containerize Your App

Containerizing means packaging your app and its environment into an image, so it runs the same way
on any machine with Docker. The container carries its own runtime, dependencies, and system
libraries, so it no longer matters what's installed on the host.

You describe that environment in a **Dockerfile**, build it into an image, and run the image as a
container.

## Writing a Dockerfile

Think about what you'd do to run this app on a brand-new machine: install Node, make a project
folder, copy in the package files, run `npm install`, copy in the source, start the server. A
Dockerfile is exactly that list of setup steps, written down so Docker can replay them. Each
instruction builds on the one before, every instruction creates a layer, and Docker caches layers
it has already built.

### How to Use It

```dockerfile
# Start from an official Node image
FROM node:20-alpine

# All following commands run inside this directory
WORKDIR /app

# Copy package files first, on their own, so npm install is cached
COPY package*.json ./
RUN npm install

# Now copy the rest of the source
COPY . .

# Documentation only — has no impact on the container's behavior at runtime
EXPOSE 3000

# The command that runs when the container starts
CMD ["node", "server.js"]
```

### Where `FROM` Gets Its Image

On that brand-new machine, step one would be installing Node yourself. `FROM node:20-alpine` is
that step, already done: instead of building Node from scratch, it starts your image on top of a
prebuilt **base image** with Node and its system dependencies in place. When you build, Docker
looks for that image locally first; if it isn't there, it pulls it from a **registry**, a store of
prebuilt images (Docker Hub by default, where the official `node` images live). The part after the colon is the **tag**: `20` pins the Node major
version, and `-alpine` picks a variant built on Alpine Linux, a minimal distribution that keeps the
image small. The pull happens once; after that the base image is cached on your machine.

### Order Your Layers by How Often They Change

Copying `package*.json` and running `npm install` *before* copying your source is deliberate. Docker
reuses a cached layer until one of its inputs changes. Your source changes on every edit; your
dependencies rarely do. Put the rarely-changing step first and Docker skips reinstalling every
package on each rebuild.

### Passing Values In: `ARG` and `ENV`

Two more instructions you'll see in real Dockerfiles let you feed values into the process instead
of hardcoding them:

- **`ARG`**: a value available *only while the image is being built*. You set it with
  `docker build --build-arg NODE_VERSION=20`, and once the build finishes it's gone — the running
  container never sees it. Good for build-time choices like a version number.
- **`ENV`**: an environment variable baked into the image and available to the app *at runtime*,
  the same way `process.env.PORT` works outside Docker. You can also set or override env vars when
  starting a container with `docker run -e PORT=4000`.

```dockerfile
# Build-time value: which Node base image variant to use
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine

# Runtime value: available to the app as process.env.NODE_ENV
ENV NODE_ENV=production
```

The distinction — build-time vs. runtime — matters more than it looks. It's the foundation of the
Secrets section later: where a value lives determines who can read it back out.

## Building and Running

`docker build` turns the Dockerfile into an image. `docker run` starts a container from it.

### How to Use It

```bash
# Build an image and tag it "my-api"
docker build -t my-api .

# Run a container, mapping host port 3000 to container port 3000
docker run -p 3000:3000 my-api
```

The `-p host:container` flag is what makes the app reachable. A container's ports are isolated by
default. Without publishing one, the app is running but nothing on your machine can reach it.

### Common Reason You May Need This

- Shipping an app that runs identically in development, CI, and production
- Onboarding: a new engineer runs one command instead of installing the right Node, database, and
  system libraries by hand
- Packaging a service so it can be deployed to any container platform

### Exercise

```exercise
type: code
runtime: none
prompt: |
  Complete this Dockerfile for a Node app. Fill in the instruction that sets the
  working directory, the one that copies dependency manifests before installing,
  and the command the container runs on start.
starter: |
  FROM node:20-alpine

  __1__ /app

  COPY __2__ ./
  RUN npm install

  COPY . .
  EXPOSE 3000

  CMD [__3__]
solution: |
  FROM node:20-alpine

  WORKDIR /app

  COPY package*.json ./
  RUN npm install

  COPY . .
  EXPOSE 3000

  CMD ["node", "server.js"]
verify: The image builds, installs dependencies in a cached layer, and starts the app with `node server.js`.
```

### Check your understanding

**Q: You run `docker run my-api` and the app starts, but `localhost:3000` won't connect. What's
missing?**

<details>
<summary>Show answer</summary>

You didn't publish the port. The container's port is isolated until you map it with
`-p 3000:3000`. The app was running fine inside the container the whole time.

</details>

**Q: With this Dockerfile, every rebuild reinstalls all your npm packages, even when you only
edited one source file. Why?**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

<details>
<summary>Show answer</summary>

`COPY . .` runs before `npm install`, so any source change busts the cache for the install layer.
Copy `package*.json` and run `npm install` first, then copy the rest. Dependencies reinstall only
when the manifest changes.

</details>

---

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

<details>
<summary>Show answer</summary>

The container reads the same files on your host instead of a copy baked into the image. Saving a
file changes what the container sees immediately, so a watcher inside can reload without a rebuild.

</details>

**Q: After a container is removed, the data it wrote is gone. How do you keep it?**

<details>
<summary>Show answer</summary>

Write it to a volume instead of the container's own filesystem. A named volume Docker manages, or a
bind mount to a host folder, both outlive the container.

</details>

---

# Compose

A real app is rarely one container. It's an API, a database, maybe a cache. **Docker Compose** lets
you describe all of them in a single `compose.yaml` (the older name `docker-compose.yaml` also
works) and start the whole set with one command. Compose reads that file, builds or pulls each
image, and starts the containers, respecting any `depends_on` ordering you declare.

Not every service needs a Dockerfile. In the example below, the `db` service has none: it just
names a prebuilt image (`postgres:16`), and Compose pulls it from a registry, the same place your
`FROM node:20-alpine` base image came from. The difference is that here the pulled image *is* the
whole service — there's no build step on top.

## How to Use It

```yaml
services:
  api:
    build: .                    # build from the Dockerfile in this folder
    ports:
      - "3000:3000"
    volumes:
      - .:/app                  # bind mount for live-reload
    environment:
      DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16          # pulled prebuilt from a registry, no Dockerfile needed
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}   # read from the environment, not hardcoded
    volumes:
      - pgdata:/var/lib/postgresql/data   # named volume keeps data across restarts

volumes:
  pgdata:
```

`${POSTGRES_PASSWORD}` tells Compose to read the value from your shell or a `.env` file in the same
folder, instead of writing the password into a file you commit. Keep `.env` out of source control.
The Secrets section covers why this matters and what else belongs there.

```bash
# Build the images for services that have a `build:` (the api here).
# This only creates the images; it does not start any containers.
docker compose build

# Start everything; pass --build to rebuild images first if your code changed
docker compose up
docker compose up --build

# Stop and remove the containers and the network.
# Named volumes survive; add -v to remove those too.
docker compose down
```

`docker compose up` only builds an image the first time. After you change your code or Dockerfile,
run `docker compose build` first, or `docker compose up --build`, so the running container uses the
new image rather than a stale one.

## Containers Talk by Service Name

Compose puts every service on a shared network and uses the **service name** as a hostname. That's
why the `api` reaches the database at `db:5432`, not `localhost`. Inside the network, `db` resolves
to the database container.

## `depends_on` Orders Startup, Not Readiness

In the example above, `depends_on` tells Compose to *start* the `db` container before the `api`
container. That sounds like it solves the ordering problem, but there's a catch: "started" only
means the container process has launched. It says nothing about whether the software inside is
actually ready to do its job.

Postgres is a good example. When its container starts, it spends a few seconds initializing —
setting up its data directory, replaying logs, opening its port. If the api boots faster and
immediately tries to connect, the database isn't listening yet, and the api crashes or errors with
"connection refused." Both containers are running; the timing is just off.

There are two common fixes:

**1. Make Compose wait until the db is actually ready.** Give the `db` service a `healthcheck`, a
command Compose runs repeatedly inside the container to test if the service is working. For
Postgres, `pg_isready` does exactly that. Then use the long form of `depends_on` to wait for the
check to pass:

```yaml
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 2s
      timeout: 2s
      retries: 10

  api:
    build: .
    depends_on:
      db:
        condition: service_healthy   # wait for the healthcheck, not just the start
```

Now Compose holds the `api` back until Postgres reports it's accepting connections.

**2. Make the app resilient instead.** Have the api retry its database connection a few times on
startup rather than giving up on the first failure. This is good practice anyway: in production, a
database can briefly drop out at any time, not just at startup.

## Common Reason You May Need This

- Running your app together with its database, cache, or queue in one step
- Giving every engineer the same multi-service setup from one checked-in file
- Spinning up dependencies for integration tests, then tearing them down cleanly

## Exercise

```exercise
type: code
runtime: none
prompt: |
  Complete this Compose file. Fill in the key that builds the api from its local
  Dockerfile, the key that starts the db container before the api, and the host
  the api uses to reach the database over the Compose network.
starter: |
  services:
    api:
      __1__: .
      ports:
        - "3000:3000"
      environment:
        DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@__3__:5432/app
      __2__:
        - db

    db:
      image: postgres:16
      environment:
        POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
solution: |
  services:
    api:
      build: .
      ports:
        - "3000:3000"
      environment:
        DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@db:5432/app
      depends_on:
        - db

    db:
      image: postgres:16
      environment:
        POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
verify: `docker compose up` builds the api, starts the db first, and the api connects to the database at host `db`.
```

## Check your understanding

**Q: Your api can't reach the database at `localhost:5432`, even though both containers are up. Why?**

<details>
<summary>Show answer</summary>

Inside a container, `localhost` is that container itself, not the database. On the Compose network,
reach the database by its service name: `db:5432`.

</details>

**Q: You run `docker compose down`, bring the stack back up, and all the database's data is gone.
What was missing from the Compose file?**

<details>
<summary>Show answer</summary>

A volume for the database's data directory. Without a named volume mapped to
`/var/lib/postgresql/data`, the data lives only in the container and disappears when it's recreated.

</details>

---

# Secrets

A secret is any credential your app needs but no one else should see: database passwords, API keys,
tokens. The rule is simple. Don't bake them into the image. An image is shared and its layers can be
inspected, so a secret built into one is a secret leaked to everyone who can pull it.

Two mechanisms feed values into a build or container, and only one is reasonable for secrets.

## Build Args vs. Env Vars

- **Build arg (`ARG`)**: a value available *only while the image is being built*, passed with
  `--build-arg`. Good for build-time choices like a version number. **Not** for secrets: the value
  is visible in the image's build history.
- **Env var (`ENV` / `-e`)**: a value available to the app *at runtime*. This is where
  configuration belongs, and secrets are injected here at run time, never written into the
  Dockerfile.

### What Not to Do

```dockerfile
# DON'T: hardcode a real secret as an ENV in the image.
# It's baked into a layer and ships with every copy of the image.
ENV STRIPE_API_KEY="your api key here"

# DON'T: pass a secret as a build arg either.
# Build args are recorded in the image history; `docker history` reveals them.
ARG STRIPE_API_KEY
RUN echo "$STRIPE_API_KEY" > /app/.key
```

Anyone who pulls the image can run `docker history` or inspect its layers and read these back, even
if a later instruction appears to delete the value.

### How to Use It

```dockerfile
# Build-time only: a non-secret choice
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
```

```bash
# DO: inject the real secret at run time, not at build time
docker run -p 3000:3000 -e STRIPE_API_KEY="your api key here" my-api

# DO: load a whole file of vars (keep this file out of git)
docker run -p 3000:3000 --env-file .env my-api
```

In Compose, the same idea uses `environment` for non-secret config and `env_file` for values you
keep out of source control.

### Two Caveats

**Env vars are a baseline, not a vault.** Injecting secrets at runtime keeps them out of the
image, which is the main goal — the image can be shared freely. But the values aren't invisible:
anyone with access to the Docker host can run `docker inspect` on a running container and read its
environment. For a solo project or a dev machine that's usually fine. When more people share the
infrastructure, production platforms (Kubernetes, AWS, etc.) provide dedicated secret stores that
encrypt values and control who can read them.

**Sometimes a secret is needed during the build itself.** Say `npm install` has to pull a package
from a private registry that requires a token. You can't use a runtime env var — the build is
already over by run time — and you now know not to use a build arg. Docker has a purpose-built
escape hatch for this: a **BuildKit secret mount**. You pass the secret with
`docker build --secret`, and a `RUN --mount=type=secret,...` instruction makes it available to
that single step only. The value is never written into a layer or the build history, so it doesn't
ship with the image. You don't need to memorize the syntax now — just remember that "secret needed
at build time" has a dedicated tool, and reach for it when you hit that wall.

### Why It Matters

- Image layers and build history are inspectable. A `RUN` or `ARG` that touched a secret can be read
  back out, even if a later layer "removes" it
- Images get pushed to registries and shared. A baked-in secret travels with every copy
- Runtime env vars stay out of the image, so the same image is safe to ship to every environment,
  each supplying its own credentials

### Check your understanding

**Q: Why is passing an API key via `--build-arg` not safe?**

<details>
<summary>Show answer</summary>

Build args are recorded in the image's build history and can be read back from the built image. Use
a runtime env var instead, so the secret never becomes part of the image.

</details>

**Q: How can one image run safely in dev, staging, and production with different credentials?**

<details>
<summary>Show answer</summary>

Keep credentials out of the image and inject them at runtime as env vars (`-e` or `--env-file`).
Each environment supplies its own values to the same image.

</details>

---

# Recap

You followed one app from a folder on your laptop to a running, multi-container setup.

- **Taxonomy**: a Dockerfile builds an image, and an image runs as a container. Changes need a
  rebuild and a re-run to take effect.
- **Containerize Your App**: write a Dockerfile, order layers so dependencies cache, build with
  `docker build`, and publish a port with `docker run -p`.
- **Volumes**: bind-mount your source for live-reload in development, and use named volumes for data
  that must outlive a container.
- **Compose**: describe every service in one `compose.yaml`, start them together, and let
  them reach each other by service name.
- **Secrets**: never bake credentials into the image. Build args are build-time and inspectable;
  inject secrets as runtime env vars instead.

These steps stack into one workflow: a Dockerfile defines the app, Compose runs it alongside its
database with the right volumes, and secrets stay outside the image so the same build runs safely
everywhere.