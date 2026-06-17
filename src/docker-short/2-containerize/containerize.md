@page learn-docker-short/containerize Containerize Your App
@parent learn-docker-short 2

@description Learn to write a Dockerfile, build an image, and run a container.

@body

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
