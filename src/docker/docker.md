@page learn-docker Learn Docker
@parent bit-academy 4

@description Build and containerize a Node app then orchestrate a more complex example with docker-compose in this Docker guide.

@body

## Before You Begin

<a href="https://www.bitovi.com/community/slack">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to DevOps in the [DevOps Chat Room](https://bitovi-community.slack.com/archives/CFNC1510S).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Video

Who has time to read?  This video covers the content on this page. Watch fullscreen. 

<video width="560" height="315" controls>
                     <source src="https://www.bitovi.com/hubfs/DevOps%20Page/academy/learn-docker.mp4" type="video/mp4">
                   Your browser does not support the video tag.
</video>

## Overview

In this tutorial we will take a simple node api, containerize and run it with Docker. We will explore how to optimize the image for production as well as how to optimize local development.

Afterwards, we will look at orchestrating multiple docker images to form a full stack application using docker-compose.

## Outline

TODO

- [learn-rxjs/basics] - Learn how to create observables
- [learn-rxjs/angular] - Read and write to observables in Angular
- [learn-rxjs/clean-card-number] - How to use `map`
- [learn-rxjs/debugging] - How to debug observables without messing up state
- [learn-rxjs/card-error] - Use `map` again
- [learn-rxjs/error-on-blur] - Only show the card error when blurred - `merge`, `scan`
- [learn-rxjs/expiry] - Read, validate, and show the error of the expiry
- [learn-rxjs/cvc] - Read, validate, and show the error of the CVC
- [learn-rxjs/disable-pay-button] - Disable the pay button if any part of the card has an error - `combineLatest`
- [learn-rxjs/request-payment] - Make a request when the pay button is clicked
- [learn-rxjs/show-paying] - Update the pay button's text while payments are pending
- [learn-rxjs/disable-while-pending] - Disable the payment button while payments are pending

## Prerequisites

- This course only requires Docker Desktop installed. Follow the official docs for [installation steps](https://docs.docker.com/get-docker/).
- This guide uses NodeJS. However, the code is all explained. If you want to run the code without Docker, you will need to [install NodeJS](https://nodejs.org/en/download/). This is optional.