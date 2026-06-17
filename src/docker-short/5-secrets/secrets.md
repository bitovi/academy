@page learn-docker-short/secrets Secrets
@parent learn-docker-short 5

@description Learn how to keep credentials out of Docker images using build args and env vars.

@body

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
ENV STRIPE_API_KEY="your-stripe-key-here"

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
docker run -p 3000:3000 -e STRIPE_API_KEY="your-stripe-key-here" my-api

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
