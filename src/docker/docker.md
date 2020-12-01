@page learn-docker Learn Docker
@parent bit-academy 4

@description Build and containerize a Node app then orchestrate multiple containers with docker-compose in this Docker guide.

@body

<iframe width="560" height="315" src="https://youtu.be/uu9bsgiBo40" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Before You Begin

<a href="https://www.bitovi.com/community/slack">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or JavaScript and DevOps problems.

Please ask questions related to DevOps in the [DevOps Chat Room](https://bitovi-community.slack.com/archives/CFNC1510S).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Video

Who has time to read?  This video covers the content on this page. Watch fullscreen. 

<video width="560" height="315" controls>
                     <source src="https://www.bitovi.com/hubfs/DevOps%20Page/academy/learn-docker.mp4" type="video/mp4">
                   Your browser does not support the video tag.
</video>

## Overview

In this tutorial we will take a simple node api and containerize it to run with Docker. We will explore how to optimize the image for production as well as how to streamline local development workflows.

Afterwards, we will look at orchestrating multiple docker images to form a full stack application using docker-compose.

## Outline

- [learn-docker/what-is-docker] - Explore Docker concepts and architecture
- [learn-docker/build-node-app] - Build a simple Express API to use for the rest of the course
- [learn-docker/writing-a-dockerfile] - Write a Dockerfile to containerize the node app
- [learn-docker/build-and-run-image] - Build an image and run a container for our node app
- [learn-docker/volumes-and-local-development] - Streamline local development workflows with bind mounts
- [learn-docker/production-readiness] - Trimming the fat from our docker image
- [learn-docker/docker-compose] - Make Docker easier to use and orchestrate multiple containers

## Prerequisites

- This course only requires Docker Desktop installed. Follow the official docs for [installation steps](https://docs.docker.com/get-docker/).
- This guide uses NodeJS. However, the code is all explained. If you want to run the code without Docker, you will need to [install NodeJS](https://nodejs.org/en/download/). This is optional.