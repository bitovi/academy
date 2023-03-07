@page learn-docker Learn Docker
@parent bit-academy 4

@description Build and containerize a NodeJS app then orchestrate multiple containers with docker-compose in this Docker guide.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/uu9bsgiBo40" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Before You Begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or JavaScript and DevOps problems.

Please ask questions related to DevOps in the [DevOps Chat Room](https://discord.gg/KQRU5NmBkz).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In this tutorial we will take a simple NodeJS api and containerize it to run with Docker. We will explore how to optimize the image for production as well as how to streamline local development workflows.

Afterwards, we will look at orchestrating multiple docker images to form a full stack application using docker-compose.

## Outline

- [learn-docker/what-is-docker] - Explore Docker concepts and architecture
- [learn-docker/build-node-app] - Build a simple Express API to use for the rest of the course
- [learn-docker/writing-a-dockerfile] - Write a Dockerfile to containerize the NodeJS app
- [learn-docker/build-and-run-image] - Build an image and run a container for our NodeJS app
- [learn-docker/volumes-and-local-development] - Streamline local development workflows with bind mounts
- [learn-docker/production-readiness] - Trimming the fat from our docker image
- [learn-docker/docker-compose] - Make Docker easier to use and orchestrate multiple containers

## Prerequisites

- ✏️ This course only requires Docker Desktop installed. Follow the official docs for [installation steps](https://docs.docker.com/get-docker/).
- ✏️ This guide uses NodeJS. However, the code is all explained. If you want to run the code without Docker, you will need to [install NodeJS](https://nodejs.org/en/download/). This is optional.


## Next Steps

✏️ Head over to the [first lesson](learn-docker/what-is-docker.html) where we will explore Docker concepts and architecture.
