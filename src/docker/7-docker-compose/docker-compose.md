@page learn-docker/docker-compose Docker Compose
@parent learn-docker 7

@description Make Docker easier to use and orchestrate multiple containers.

@body

<iframe width="560" height="315" src="https://youtu.be/HLPEIKVaZeE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview
At this point, we are building our image with
```
$ MY_ENV=dev
$ docker build -t my-node-app:$MY_ENV --target $MY_ENV .
```
and running it with
```
$ MY_PORT=9000
$ docker run \
--name my-container \
-p 8000:$MY_PORT \
-e PORT=$MY_PORT \
-v "$(pwd)"/src:/app/src \
my-node-app:dev
```
That's a lot of typing and memorization to run a container. Docker compose condenses all of this into one command: `docker-compose up`.

## Docker Compose
Docker Compose is a cli included with Docker that provides a declarative way to building and running multiple Docker containers. With Docker Compose, the nomenclature for one of these containers is called a "service".

Docker Compose reads a special file called `docker-compose.yml` that defines any number of services' port mappings, volumes, interdependencies and more. Docker Compose ensures containers are run in a consistent way without needing to type `docker build` and `docker run` along with numerous arguments into the console.

## Replacing docker run
Instead of running
``` 
$ MY_PORT=9000
$ docker run \
--name my-container \
-p 8000:$MY_PORT \
-e PORT=$MY_PORT \
-v "$(pwd)"/src:/app/src \
my-node-app:dev
```
we can capture all of these arguments in a `docker-compose.yml` file. 

First create a `.env` file with the following content. `docker-compose` will automatically read these environment variables and allow us to use them throughout `docker-compose.yml`.
```
MY_PORT=8000
MY_ENV=dev
```
Create a `docker-compose.yml` in the root of your application repo and paste the following content:
```
version: "3.8"
services:
  my-app:
    image: my-node-app:${MY_ENV}
    ports:
      - "9000:${MY_PORT}"
    volumes:
      - ./src:/app/src
    environment:
      PORT: ${MY_PORT}
```
Hopefully, this file is self-explanatory. It creates a service called "my-app" that creates an instance of our `my-node-app` image with the desired port mapping, volumes and environment variables defined.

Run `docker-compose up` and watch the magic.
```
$ docker-compose up
Starting nodeapp_my-app_1 ... done
Attaching to nodeapp_my-app_1
my-app_1  | 
my-app_1  | > bitovi-academy-app@1.0.0 start
my-app_1  | > nodemon src/index.js
my-app_1  | 
my-app_1  | [nodemon] 2.0.6
my-app_1  | [nodemon] to restart at any time, enter `rs`
my-app_1  | [nodemon] watching path(s): *.*
my-app_1  | [nodemon] watching extensions: js,mjs,json
my-app_1  | [nodemon] starting `node src/index.js`
my-app_1  | Example app listening at http://localhost:8000
```
You can press `ctrl+c` or run `docker-compose down` from a separate tab to kill your container(s). 

## Replacing docker build
Now that we've replaced `docker run` with `docker-compose up`, Let's update `docker-compose.yml` to allow Docker Compose to manage builds too.
```
version: "3.8"
services:
  my-app:
    build:
        context: .
        target: ${MY_ENV}
    image: my-node-app:${MY_ENV}
    ports:
      - "9000:${MY_PORT}"
    volumes:
      - ./src:/app/src
    environment:
      PORT: ${MY_PORT}
```
We've added a `build` section to our `my-app` service.
* `context: .` tells Docker Compose where to find the Dockerfile
* `target: ${MY_ENV}` tells Docker to build either a dev or prod image
Run `docker-compose build` to build a fresh copy of `my-node-app`.

## Customizing Behaviour
Now we can control how our image is built and run from `.env`. 

Changing `MY_ENV=dev` to `MY_ENV=prod` will cause `docker-compose up` to create a container in the production mode. If an image does not exist, `docker-compose up` will automatically run `docker-compose build` for us! 

## Let's add more containers!
Let's add a MySQL database and ensure it is running before starting the `my-app` service.

### .env
```
# My App
MY_ENV=prod
MY_PORT=8000

# MySQL
MYSQL_ROOT_PASSWORD=S3cure!
MYSQL_DATABASE=my_db
MYSQL_USER=my_user
MYSQL_PASSWORD=S3cure!_user
```
### docker-compose.yml
```
version: "3.8"
services:
  my-app:
    build:
        context: .
        target: ${MY_ENV}
    image: my-node-app:${MY_ENV}
    ports:
      - "9000:${MY_PORT}"
    volumes:
      - ./src:/app/src
    environment:
      PORT: ${MY_PORT}
    depends_on: 
      - db
  db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
       MYSQL_DATABASE: ${MYSQL_DATABASE}
       MYSQL_USER: ${MYSQL_USER}
       MYSQL_PASSWORD: ${MYSQL_PASSWORD}
volumes:
    db_data: {}
```

Finally, let's start everything up
```
$ docker-compose up
Creating network "nodeapp_default" with the default driver
Creating nodeapp_db_1 ... done
Creating nodeapp_my-app_1 ... done
Attaching to nodeapp_db_1, nodeapp_my-app_1
...
my-app_1  | 
my-app_1  | > bitovi-academy-app@1.0.0 start:prod
my-app_1  | > node src/index.js
my-app_1  | 
db_1      | 2020-11-24T20:43:30.390198Z 0 [Note] Event Scheduler: Loaded 0 events
db_1      | 2020-11-24T20:43:30.390526Z 0 [Note] mysqld: ready for connections.
db_1      | Version: '5.7.32'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
my-app_1  | Example app listening at http://localhost:8000
```

## Review
This course has taken you through Docker fundamentals and has only scratched the surface of container orchestration. Docker Compose has a large list of commands (`docker-compose --help`) and an extensive [compose file reference](https://docs.docker.com/compose/compose-file) for all your container needs. It could be an entire course in itself.

I hope this course has whet your appetite on containers and orchestration. What do you want to see next? Kubernetes? AWS? Load Testing? CI/CD? [Let us know](https://github.com/bitovi/academy/issues)!