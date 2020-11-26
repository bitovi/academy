@page learn-docker/production-readiness Production Readiness
@parent learn-docker 6

@description Trimming the fat from our docker image.

@body

## Overview
We want to make our image as lightweight as possible. Reducing image size will make it faster to pull and run in production. In its current state, our simple node app is a staggering `944MB`!
```
$ docker image ls my-node-app
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my-node-app         latest              78ef31600011        7 seconds ago       944MB
```
We're going to explore 2 simple ways to make our image small and ready for production.

## Base Image Variants
The simplest and most significant change is updating the `FROM` instruction in our Dockerfile. The `node:15` image is `935MB`. That's 99% of our image!
```
$ docker image ls node
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                15                  969d445a1755        6 days ago          935MB
```
Docker provides a set of official images that are designed to provide drop-in solutions for popular runtimes and services. Many of these images provide variants of the image based on a developer's requirements. The `node` image repository on Dockerhub has 3 main variants:
* `node:<version>`: This is the standard image that contains everything you'll need to run `node`. It's often the default choice if your specific needs and requirements are unclear. It's also the largest of all the variants
* `node:<version>-slim`: The "slim" variant contains only the necessary packages needed to run `node`. It is a good choice if your image only requires `node` and can operate without other external dependencies like `gcc`.
* `node:<version>-alpine`: Instead of using debian as the base image, The alpine variant uses [Alpine Linux](https://hub.docker.com/_/alpine). The alpine Docker image is designed to be as minimal as possible at only `5MB` in size.

Pulling these images into our local registry from Dockerhub using `docker pull`, allows us to inspect the size difference between the node variants
```
$ docker pull node:15
$ docker pull node:15-slim
$ docker pull node:15-alpine
$ docker image ls node
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                15-slim             4b7012d853dc        6 days ago          159MB
node                15                  969d445a1755        6 days ago          935MB
node                15-alpine           7ddc154413f5        7 days ago          109MB
```
As you can see, `node:15-slim` is `159MB`, a fraction of the size of `node:15`. Meanwhile, `node:15-alpine` is even smaller at `109MB`. As a general rule, you'll want to use the smallest base image that meets your needs.  

## Updating our `FROM` instruction
Update `FROM node:15` in our Dockerfile to `FROM node:15-alpine`. The whole file should now look like this:
```
FROM node:15-alpine

ARG PORT=8000
ENV PORT=$PORT

WORKDIR app
COPY src src
COPY package.json .

RUN npm install
EXPOSE $PORT
CMD npm start
```
Now rebuild the image with an `alpine` tag
```
docker build -t my-node-app:alpine .
```
Finally, lets compare the difference:
```
$ docker image ls my-node-app
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my-node-app         alpine              a86e7ef34019        12 seconds ago      118MB
my-node-app         latest              78ef31600011        18 minutes ago      944MB
```
By using the `alpine` node image variant, we've reduced the total image size by 87.5%!

## Multi-Stage Builds
We are using `npm install` to install application dependencies during the Docker build phase. By default, `npm install` installs both standard and dev dependencies. We want to conditionally install all dependencies when building for local development, but only download standard dependencies with `npm install --only=prod` when building to run in production.

A multi-stage build is a Dockerfile with multiple `FROM` instructions. This is typically done to keep the final image size down by separating what is required to build an application from what is required to run it by allowing selective artifacts to be copied from one stage to another.

This is especially powerful in compiled languages like Go or Java where multi-stage builds can be used to have your first stage compile the source code into a runtime artifact and then only the runtime artifact is copied in to a leaner final image.

## Targets
By using the `--target` cli argument when building our image, we can tell Docker to stop building at a specific stage. We will use this alone with a `prod` stage and a `dev` stage to give us our desired result. 

Replace our node app's Dockerfile to the following:
```
FROM node:15-alpine as prod
ARG PORT=8000
ENV PORT=$PORT

WORKDIR app
COPY src src
COPY package.json .

RUN npm install --only=prod
EXPOSE $PORT
CMD npm run start:prod

FROM prod as dev
RUN npm install --only=dev
CMD npm start
```
Most of the Dockerfile remains the same with some notable exceptions:
* `FROM node:15-alpine as prod`: We added `as prod` here to give our stage a name.
* `RUN npm install --only=prod`: We added `--only=prod` to tell `npm` to ignore dev dependencies when building for production.
* `CMD npm run start:prod`: We updated our CMD to `start:prod` to run our app with node instead of nodemon. `start:prod` is defined in `package.json`
* `FROM prod as dev`: We are starting a new stage called `dev` and using our `prod` stage as the base image.
* `RUN npm install --only=dev`: Install only dev dependencies because we've already installed standard dependencies in the prerequisite `prod` stage
* `CMD npm start`: Start the container with nodemon

Now when building our image, we can provide `--target=prod` or `--target=dev` to customize our final image. If we run `docker build` without the `--target` flag, it will run all stages by default, but we will be explicit with `--target=dev`
```
# Build our prod image
docker build -t my-node-app:prod --target=prod .

# Build our dev image
docker build -t my-node-app:dev --target=dev .

# Compare the results
$ docker image ls my-node-app
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my-node-app         dev                 57966959f28a        13 seconds ago      118MB
my-node-app         prod                739cd7430f03        25 seconds ago      115MB
my-node-app         alpine              a86e7ef34019        54 minutes ago      118MB
my-node-app         latest              78ef31600011        About an hour ago   944MB
```
The savings in size we see in this example are trivial (`3MB`) because we only have the one dev dependency (nodemon). The savings and complexity added from utilizing multi-stage builds increases as the number of dependencies increases. Running nodemon is also more memory and cpu intensive so there are also underlying performance savings with this approach.

There are a lot of powerful things you can do with multi-stage builds. Check out the [Official Docs](https://docs.docker.com/develop/develop-images/multistage-build/) for more inspiration.

## Test our images

Let's run both prod and dev images to make sure they work. Notice when we run our prod image, we don't bother mounting our local source code as nodemon is not running to enable reloading.
```
# Start Dev image
$ docker run --name my-dev-container -p 8000:8000 -d -v "$(pwd)"/src:/app/src my-node-app:dev
b67e760ef59c2c42c2737720031537f169302513b37b4b97478c8f21e59791bb

# Start Prod image
$ docker run --name my-prod-container -p 9000:8000 -d my-node-app:prod
200d00aafb79ed371428c9f647e5f7ef2ad9d2ddd3281587401a6fc6267c0101

# Test Dev container
$ curl localhost:8000
Hello Bitovi!

# Test Prod container
$ curl localhost:9000
Hello Bitovi!

# Kill our containers
docker rm -f my-dev-container my-prod-container
```

## A word of caution
Using multi-stage builds to customize container behavior can create issues where an image works locally, but doesn't work in production. Be sure to test your production image during your CI pipeline or before committing to source control.

## Review
Our Dockerfile has been updated to be significantly smaller from a smaller base image and eliminating unnecessary dependencies. We also use multi-stage builds to allow local development to still be done efficiently. 

With all this complexity, there are a lot of cli commands and flags to remember. In the last section, we will be looking at using `docker-compose` to simplify the building and running of images.