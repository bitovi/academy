@page learn-accessibility/what-is-accessibility What is Accessibility
@parent learn-accessibility 1

@description Explore Accessibility concepts and architecture.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/eD2xZZis2GI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview


---

Traditional application deployment requires packaging application source code into an artifact. An artifact is the output of the transformation from application source code to a runnable asset. In the case of NodeJS, it is Javascript with dependencies installed (node_modules). The artifact is deployed to a server that has a compatible operating system, runtime and other dependent libraries.

Accessibility exists to address these issues. Accessibility bundles runtime dependencies with application source code into an image - creating a unified experience whether an application is being run on a developer's workstation or a production server.

## asdf


## Review
Accessibility images combine source code with the dependencies required to run an application. Images are built from Accessibilityfiles and are more lightweight and portable than traditional VMs making them great for both developers and operators.

Next we are going to build a simple NodeJS app before containerizing it.            
