@page learn-docker/volumes-and-local-development Volumes and Local Development
@parent learn-docker 5

@description Streamline local development with bind mounts.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/8sGPAiFu66s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview
With the concepts we’ve explored so far, building an image and starting a container after every  code change would be incredibly inefficient. To test every code change, a developer would have to
1. Make the code change
2. Stop the container (`docker rm -f ...`)
3. Rebuild the image (`docker build ...`)
4. Run the container (`docker run ...`)

In particular, rebuilding an image with `docker build` takes too long. We’re going to explore how to make things much more efficient.

## Volumes
A Docker container has no built in persistence. Beyond the image itself, all other data is discarded when a container is destroyed. Without volumes, running databases or applications that require state would be impossible.

Volumes provide a persistent storage mechanism that can be managed through Docker’s CLI. They can be shared between multiple containers and can be stored on remote hosts or cloud providers.

The following creates a volume called `my-vol` and on container creation is mounted to the `/data` directory. As the application runs, the contents of `/data` are persisted in the volume so that when the container is destroyed, the data is not lost.
```bash
docker volume create my-vol
docker run -v my-vol:/data my-image
```
The above commands create a volume called `my-vol` and on container creation is mounted to the `/data` directory. As the application runs, the contents of `/data` are persisted in the volume so that when the container is destroyed, the data is not lost.

[Official Docs](https://docs.docker.com/storage/volumes/)

## Bind Mounts
Bind mounts are similar to volumes, but in comparison have limited functionality. Instead of creating a named volume, the contents of a host machine’s directory can be mounted to a directory in a container.

For example the following command will overwrite the contents of the `/data` directory in the container with the contents of `/Users/connor/data`. When the container is running, the contents are mirrored between the two locations regardless if a change originates from the container or the host machine. 
```bash
docker run -v /Users/connor/data:/data my-image
```
The only catch is the host machine directory must be an absolute path. This can be worked around by using $PWD to print out the current working directory when creating a container.
```bash
docker run -v $PWD/data:/data my-image
```

[Official Docs](https://docs.docker.com/storage/bind-mounts/)

## Local Development
The most common use case for bind mounts is in local development environments. Instead of rebuilding an image on every code change, we can mount our application’s `src/` directory to the `/app/src` directory of our container.

Open a terminal at the root of your application and run
```bash
docker run --name my-container -p 8000:8000 -d -v $PWD/src:/app/src my-node-app:latest
```
Verify it’s working by going to `localhost:8000` in your browser. You should see `Hello World!`.

Now open `src/index.js` and change line 6 from
```js
res.send('Hello World!')
```
to
```js
res.send('Hello Bitovi!')
```
save the file and refresh your browser. It should now say `Hello Bitovi!`. 

What’s happening is the nodemon process is watching the `src/` directory in the container for changes. Because our host-machine’s `src/` directory is mounted to the container’s `app/src/` directory (`-v $PWD/src:/app/src`), when we save the change to `index.js`, it is replicated in the container causing nodemon to restart the server. We can see this by following the container’s log with the `-f` flag:
```bash
$ docker logs -f my-container

> bitovi-academy-app@1.0.0 start
> nodemon src/index.js

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
Example app listening at http://localhost:8000
[nodemon] restarting due to changes...
[nodemon] starting `node src/index.js`
Example app listening at http://localhost:8000
```
This approach means we only need to build an image once