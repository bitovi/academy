@page learn-docker/what-is-docker What is Docker
@parent learn-docker 1

@description Explore Docker concepts and architecture.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/eD2xZZis2GI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview
Traditional application deployment requires packaging application source code into an artifact. An artifact is the output of the transformation from application source code to a runnable asset. In the case of NodeJS, it is Javascript with dependencies installed (node_modules). The artifact is deployed to a server that has a compatible operating system, runtime and other dependent libraries.

Docker exists to address these issues. Docker bundles runtime dependencies with application source code into an image - creating a unified experience whether an application is being run on a developer's workstation or a production server.

## VMs vs Docker Containers
[Virtual machines](https://www.vmware.com/topics/glossary/content/virtual-machine) (VM) are an abstraction of a physical server turning one server into many. A [hypervisor](https://www.vmware.com/topics/glossary/content/hypervisor) is installed on the host server allowing multiple VMs to run on a single machine. Each VM includes a full copy of an operating system (OS) making it resource intensive to run and slow to boot.

Containers are an abstraction at the app layer that packages application artifacts and dependencies together. The fundamental difference is containers share the same host operating system, but each container runs in it's own isolated process controlled by the Docker Engine. Containers are more lightweight than VMs and typically boot in seconds instead of minutes.

![Docker Architecture](../static/img/docker/1-what-is-docker/docker-arch.png)

## Dockerfiles, Images and Containers
A Dockerfile is used to build a Docker image. A dockerfile is a plain-text file that contains a series of instructions telling Docker what operating system, application dependencies and application source code is required to run the application.

A Docker image is a static artifact that is built from a Dockerfile and is tagged and published to a registry where it can be shared.

A Docker container is a running instance of a Docker image.

![Dockerfile images and containers](../static/img/docker/1-what-is-docker/dockerfile-images-containers.png)

## Review
Docker images combine source code with the dependencies required to run an application. Images are built from Dockerfiles and are more lightweight and portable than traditional VMs making them great for both developers and operators.