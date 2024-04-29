@page learn-docker Learn Docker
@parent bit-academy 4

@description Build and containerize a Node.js app then orchestrate multiple containers with docker-compose in this Docker guide.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/BBpXqLUy05U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img alt="" src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other Angular, React, CanJS and JavaScript problems.

Please ask questions related to DevOps and Docker in our [DevOps](https://discord.gg/KXjD2eGA) and [Docker](https://discord.gg/VpnGUmee) channels.

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email <a href="mailto:contact@bitovi.com">contact@bitovi.com</a>.

## Overview

In this tutorial we will take a simple Node.js api and containerize it to run with Docker. We will explore how to optimize the image for production as well as how to streamline local development workflows.

Afterwards, we will look at orchestrating multiple docker images to form a full stack application using docker-compose.

## Outline

- [learn-docker/what-is-docker] - Explore Docker concepts and architecture
- [learn-docker/build-node-app] - Build a simple Express API to use for the rest of the course
- [learn-docker/writing-a-dockerfile] - Write a Dockerfile to containerize the Node.js app
- [learn-docker/build-and-run-image] - Build an image and run a container for our Node.js app
- [learn-docker/volumes-and-local-development] - Streamline local development workflows with bind mounts
- [learn-docker/production-readiness] - Trimming the fat from our docker image
- [learn-docker/docker-compose] - Make Docker easier to use and orchestrate multiple containers

## Prerequisites

- ✏️ This course only requires Docker Desktop installed. Follow the official docs for [installation steps](https://docs.docker.com/get-docker/).
- ✏️ This guide uses Node.js. However, the code is all explained. If you want to run the code without Docker, you will need to [install Node.js](https://nodejs.org/en/download/). This is optional.


## Next steps

✏️ Head over to the [first lesson](learn-docker/what-is-docker.html) where we will explore Docker concepts and architecture.
