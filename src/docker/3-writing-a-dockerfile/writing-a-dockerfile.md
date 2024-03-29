@page learn-docker/writing-a-dockerfile Writing a Dockerfile
@parent learn-docker 3

@description Write a Dockerfile to containerize the Node.js app.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/LiAkpRc6z0Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Our Dockerfile
Starting with the solution, the `Dockerfile` for our Node.js app should look like this. 

✏️ Copy and paste this to the root of your project and name the file `Dockerfile`:
```dockerfile
FROM node:15

ARG PORT=8000
ENV PORT=$PORT

WORKDIR app
COPY src src
COPY package.json .

RUN npm install
EXPOSE $PORT
CMD npm start
```

Let’s break down each line.
## FROM instruction
The `FROM` instruction is the first line of any Dockerfile. It sets the base image to be used as a starting point for all other instructions. Using base images allows deferring:

- installation of a kernel and
- installtion of low level packages

to the provider of the base image.

In our case, We are using `node:15`. `node` specifies the name of the base image and `15` is a tag specifying the version of the image. This base image has the latest version of Node.js 15 pre-installed, allowing the rest of the `Dockerfile` to focus on logic specific to our application. The `node:15` image also has a `Dockerfile` which means it also has a `FROM` instruction. `node:15` uses [Debian](https://hub.docker.com/_/debian) as its base image. This layering of Docker images repeats until a Dockerfile uses `FROM scratch` as its base image.

By default, Docker will look for images  on [Dockerhub](https://hub.docker.com/). For example, the `node` image we are using is pulled from [here](https://hub.docker.com/_/node), but you can create your own base images and share them publicly or privately to Dockerhub or other package registries.

Keep reading about the [FROM instruction](https://docs.docker.com/engine/reference/builder/#from)

## ARG instruction
The `ARG` instruction is used to define variables that are only available during the image build process. The instruction follows the syntax `ARG <name> [=<default value>]`.

In our case, `ARG PORT=8000` is defining an argument called `PORT` with a default value of `8000`. It can be accessed in later instructions in the `Dockerfile` like a standard environment variable (`$PORT`) and overwritten during the build process with the `--build-arg` cli argument ([Docs](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg)).

Keep reading about the [ARG instruction](https://docs.docker.com/engine/reference/builder/#arg)

## ENV instruction
The `ENV` instruction is used to define environment variables. Like `ARG`, it follows the syntax `ENV <name> [=<default value>]`. The difference between `ARG` and `ENV` is that variables defined with the `ENV` instruction can be used during the image build process and also when the container is running as standard environment variables. However, only `ARG` defined variables can be actually overwritten during the build process with the `--build-arg` cli argument. `ENV` can be overwritten at run time with the `-e` cli argument or an env file ([Docs](https://docs.docker.com/engine/reference/run/#env-environment-variables)).

To give us the flexibility to set and use variables at build time and run time, we use both `ARG` and `ENV` instructions together:

```dockerfile
ARG PORT=8000
ENV PORT=$PORT
```

### ARG vs ENV

<table>
   <tr>
      <th>Capability</th>
      <th>ARG</th>
      <th>ENV</th>
   </tr>
   <tr>
      <td>Set during build time</td>
      <td>&check;</td>
      <td>&cross;</td>
   </tr>
   <tr>
      <td>Set during run time</td>
      <td>&cross;</td>
      <td>&check;</td>
   </tr>
   <tr>
      <td>Use during build time</td>
      <td>&check;</td>
      <td>&check;</td>
   </tr>
   <tr>
      <td>Use during run time</td>
      <td>&cross;</td>
      <td>&check;</td>
   </tr>
   </table>
</table>

Keep reading about [ENV](https://docs.docker.com/engine/reference/builder/#env)

## WORKDIR instruction
The `WORKDIR` instruction sets the working directory for any subsequent instructions. If the directory does not exist, it will be automatically created.

The `WORKDIR` instruction can be used multiple times.
```dockerfile
WORKDIR x
WORKDIR y
WORKDIR z
RUN pwd
```
Will result in `RUN pwd` and any later instruction being run in the `/x/y/z/` directory.

In our case, `WORKDIR app` will create the `/app/` directory for us to copy our source code in to.

Keep reading about the [WORKDIR instruction](https://docs.docker.com/engine/reference/builder/#workdir)

## COPY instruction
The `COPY` instruction follows the syntax `COPY [--chown=<user>:<group>] <src>... <dest>`.
- `--chown=<user>:<group>` allows setting the ownership of the target file or directory using [chown](https://linux.die.net/man/1/chown). This is only available to Linux based images
- `<src>...` specifies what file(s) or directories should be copied in to the docker image.
    - Each file/directory should be separated by a space (` `)
    - Each entry supports wildcards and matching. For example: `COPY hom* .` Will match all files starting with "hom"
- `<dest>` specifies where each src entry should be copied to in the docker image. `.` will put each entry in the `WORKDIR` or the root directory if no `WORKDIR` is specified.

In our case, we have
```dockerfile
WORKDIR app
COPY src src
COPY package.json .
```
This will result in our `src/` directory being copied to `/app/src/` and `package.json` file to `/app/package.json` within the image. Using two `COPY` instructions instead of one is just preference and has no functional difference one way or another.

There are more complex cases on when a trailing slash is required on a `<src>` or `<dest>` and how to handle whitespace. These advanced rules can be found in the official docs.

[Official Docs](https://docs.docker.com/engine/reference/builder/#copy)

## RUN instruction
The `RUN` instruction allows arbitrary commands to be run during build time.

In our case, we are using `RUN npm install` to install dependencies from the `package.json` file copied in to our image. As a reminder, `npm` is pre-installed as a part of our `node:15` base image.

Keep reading about the [RUN instruction](https://docs.docker.com/engine/reference/builder/#run)

## EXPOSE instruction
`EXPOSE` specifies which ports the when running the container. Each port is separated by a space (` `). By default the container listens using TCP, but UDP can be used by adding `/udp` after the port.

For example:
```dockerfile
EXPOSE 80/udp
```

In our case, we want the port exposed by our container to match the port our application is running on (remember: `const port = process.env.PORT || 3000` in `src/index.js`), therefore, we are publishing the value of our `PORT` environment variable.
```dockerfile
ARG PORT=8000
ENV PORT=$PORT
...
EXPOSE $PORT
```

`EXPOSE` does not actually publish the port. When running the container with `docker run`, the `-p` flag needs to be used to access the port from your host machine. More on this in the next section.
Learn more about [EXPOSE](https://docs.docker.com/engine/reference/builder/#expose)

## CMD instruction
`CMD` is a special instruction. It is not run during build time like a `RUN` instruction. Instead, it is run at runtime. When the `CMD` instruction finishes, the docker container will be destroyed.

In our case, we are running our express server with `CMD npm start`. This will cause our container to run until a fatal error occurs or it is manually killed.

More information about [CMD](https://docs.docker.com/engine/reference/builder/#cmd)

## What’s next
That was a lot on Dockerfiles. Next we’ll be looking at actually building and running our image!