@page learn-docker-short/compose Compose
@parent learn-docker-short 4

@description Learn how Docker Compose ties multiple containers together with one file.

@body

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
