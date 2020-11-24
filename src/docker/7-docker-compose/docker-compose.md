@page learn-docker/docker-compose Docker Compose
@parent learn-docker 7

@description Learn to setup a basic CanJS application using StealJS as the module loader.

@body

## Overview
At this point, we are building our image with
```
$ MY_ENV=dev
$ docker build -t my-node-app:latest --target $MY_ENV .
```
and running it with
```
$ MY_PORT=9000
$ docker run \
--name my-container \
-p 8000:$MY_PORT \
-d \
-e PORT=$MY_PORT \
-v "$(pwd)"/src:/app/src \
my-node-app:latest
```
That's a lot of typing and memorization to run a container. Docker compose condenses all of this into one command: `docker-compose up`.