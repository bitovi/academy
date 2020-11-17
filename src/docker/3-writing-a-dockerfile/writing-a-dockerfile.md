@page learn-docker/writing-a-dockerfile Writing a Dockerfile
@parent learn-docker 3

@description Learn to setup a basic CanJS application using StealJS as the module loader.

@body

## Overview

## Our Dockerfile
The `Dockerfile` for our NodeJS app looks like this
```
FROM node:15

ARG PORT 8000
ENV PORT $PORT

WORKDIR app
COPY src .
COPY package.json .

RUN npm install
EXPOSE $PORT
CMD npm start
```
Copy and paste this to the root of your project and name the file `Dockerfile`.

Let's break down each instruction.
## FROM instruction
The `FROM` instruction is the first line of any Dockerfile. It sets the base image to be used as a starting point for all other instructions. Using base images allows deferring installation of a kernal and low level package installation to the provider of the base image.

In our case, We are using `node:15`. `node` specifies the name of the image and `15` is a tag specifying the version of the image. This base image has the latest version of NodeJS 15 pre-installed, allowing the rest of the `Dockerfile` to focus on application specific logic. The node `Dockerfile` also has a `FROM` instruction, using [Debian](https://hub.docker.com/_/debian) as its base image. This layering of Docker images is one of Docker's most powerful features.

By default, Docker will look for base images from [Dockerhub](https://hub.docker.com/). For example, the `node` image we are using is pulled from [here](https://hub.docker.com/_/node), but you can create your own base images and share them publically or privately to abstract shared tasks from users of it.

[Official Docs](https://docs.docker.com/engine/reference/builder/#from)

## ARG instruction
The `ARG` instruction is used to define variables that are only available during the image build process. The instruction follows the syntax `ARG <name> [=<default value>]`.

In our case, `ARG PORT 8000` is defining an argument called `PORT` with a default value of `8000`. It can be accessed in later instructions in the `Dockerfile` like a standard environment variable (`$PORT`) and overwriten during the build process with the `--build-arg` cli argument ([Docs](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg)).

[Official Docs](https://docs.docker.com/engine/reference/builder/#arg)

## ENV instruction
The `ENV` instruction is used to define environment variables. Like `ARG`, it follows the syntax `ENV <name> [=<default value>]`. The difference between `ARG` and `ENV` is `ENV` can be used during the image build process and also when the container is running, but only `ARG` can be overwritten during the build process. `ENV` can also be overwritten at run time with the `-e` cli argument or an env file ([Docs](https://docs.docker.com/engine/reference/run/#env-environment-variables)).

To give us the flexibility to set and use variables at build time and run time, we use both `ARG` and `ENV` instructions together:

```
ARG PORT 8000
ENV PORT $PORT
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

[Official Docs](https://docs.docker.com/engine/reference/builder/#env)

## WORKDIR instruction
The `WORKDIR` instruction sets the working directory for any subsequent instructions. If the directory does not exist, it will be automatically created.

The `WORKDIR` instruction can be used multiple times.
```
WORKDIR x
WORKDIR y
WORKDIR Z
RUN pwd
```
Will result in `RUN pwd` and any later instruction being run in the `/x/y/z/` directory.

In our case, `WORKDIR app` will create the `/app/` directory for us to copy our source code in to.

[Official Docs](https://docs.docker.com/engine/reference/builder/#workdir)

## COPY instruction
The `COPY` instruction follows the syntax `COPY [--chown=<user>:<group>] <src>... <dest>`.
- `--chown=<user>:<group>` allows setting the permissions of the target file or directory using [chown](https://linux.die.net/man/1/chown). This is only available to Linux based images
- `<src>...` specifies what file(s) or directories should be copied in to the docker image.
    - Each file/directory should be separated by a space (` `)
    - Each entry supports wildcards and matching. For example: `COPY hom* .` Will match all files starting with "hom"
- `<dest>` specifies where each src entry should be copied to in the docker image. `.`. Will put each entry in the `WORKDIR` or the root directory if no `WORKDIR` is specified.

In our case, we have
```
WORKDIR app
COPY src .
COPY package.json .
```
This will result in our `src/` directory and `package.json` file being copied to `/app/src/` and `/app/package.json` within the image. Using two `COPY` instructions instead of one is just preference and has no performance gains one way or another.

There are more complex cases on when a trailing slash is required on a `<src>` or `<dest>` and how to handle whitespace. These advanced rules can be found in the offical docs.

[Official Docs](https://docs.docker.com/engine/reference/builder/#copy)

## RUN instruction
The `RUN` instruction allows arbitrary commands to be run during build time.

In our case, we are using `RUN npm install` to install dependencies from the `package.json` file copied in to our image. As a reminder, `npm` is pre-installed as a part of our `node:15` base image.
[Official Docs](https://docs.docker.com/engine/reference/builder/#run)

## EXPOSE instruction
`EXPOSE` specifies which ports the when running the container. Each port is separated by a space (` `). By default the container listens using TCP, but UDP can be used by adding `/udp` after the port.

For example:
```
EXPOSE 80/udp
```

In our case, we want the port exposed by our container to match the port our application is running on (remember: `const port = process.env.PORT || 3000` in `src/index.js`), therefore, we are publishing the value of our `PORT` environment variable.
```
ARG PORT 8000
ENV PORT $PORT
...
EXPOSE $PORT
```

`EXPOSE` does not actually publish the port. When running the container with `docker run`, the `-p` flag needs to be used to access the port from your host machine. More on this in the next section.
[Official Docs](https://docs.docker.com/engine/reference/builder/#expose)

## CMD instruction
`CMD` is a special instruction. It is not run during build time like a `RUN` instruction. Instead, it is run at runtime. When the `CMD` instruction finishes, the docker container will be destroyed.

In our case, we are running our express server with `CMD npm start`. This will cause our container to run until a fatal error occurs or it is manually killed.

[Official Docs](https://docs.docker.com/engine/reference/builder/#cmd)

## What's next
That was a lot on Dockerfiles. Next we'll be looking at actually building and running our image!