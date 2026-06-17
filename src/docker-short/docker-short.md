@page learn-docker-short Learn Docker (Short)
@parent bit-academy 6

@description Follow an app from a folder on your laptop to a running, multi-container setup.

@body

## Overview

This guide follows an app from a folder on your laptop to a running, multi-container setup. Each
topic is one step in that path:

1. **Taxonomy**: image, container, Dockerfile
2. **Containerize Your App**: write a Dockerfile, build an image, run a container
3. **Volumes**: bind your source into the container for live-reload
4. **Compose**: tie multiple containers together with one file
5. **Secrets**: keep credentials out of the image, using build args and env vars

## Outline

Start with [learn-docker-short/taxonomy Taxonomy] to get the three core building blocks straight:
Dockerfile, image, and container.

Then [learn-docker-short/containerize Containerize Your App] walks through writing a Dockerfile,
ordering layers for caching, and running a container with a published port.

[learn-docker-short/volumes Volumes] covers bind mounts for live-reload in development and named
volumes for persisting data across restarts.

[learn-docker-short/compose Compose] ties multiple services together in one `compose.yaml` so the
whole stack starts with one command.

Finally, [learn-docker-short/secrets Secrets] explains why credentials must never be baked into
an image and how to inject them safely at runtime.

## Next steps

✏️ Head over to the [first lesson](learn-docker-short/taxonomy.html) to learn the Docker taxonomy.
