@page learn-angular Learn Angular
@parent bit-academy 4

@description Learn how to build a moderately complex application with Angular.


@body

## Before You Begin

<p><a href="https://www.bitovi.com/community/slack">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a></p>

<br/>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to Angular in the [Angular chat room](https://bitovi-community.slack.com/messages/CFD2J3HT3).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In this guide, we will build this restaurant ordering app using Angular and NgRx:

<img src="./static/img/place-my-order.png" title="Place My Order App screenshot"
  style="max-width: 100%"/>

You can see a DoneJS implementation of this application at
[www.place-my-order.com](http://www.place-my-order.com).

This course is a twist on our existing Learn Angular course, where we build the same app using Angular's native state management tools. If you're brand-new to Angular, we reccomend starting with that course (link) and re-visting this
once you have a handle on this basics.

This application (and course) is moderately complex. Its purpose is to teach
intermediate Angular developers how to build a web application using NgRx and the Flux (link) approach to state management. 
In this course we'll:

- Use NgRx and Observables to create a single-source-of-truth for data on our website.
- Leverage Effects to Create, Read, Update and Delete (CRUD) data from a server.
- Demonstrate the pros & cons of using a third-party framework for state management.

As for the application itself, it:

- Is written in Angular 11
- Is a single page application (SPA) that uses pushstate to simulate routing between several pages.
  - A `home` page
  - A `restaurant list` page that lets the user filter restaurants by state and city
  - A `restaurant details` page that provides more information about a particular restaurant
  - An `order` page that allows us to place an order for a restaurant
  - A realtime `order history` page that tracks orders as they are created, being prepared, out for delivery,
    delivered, and deleted
- Will make requests to a local API server that provides the following APIs:
  - `/api/states` - Returns a list of US states.
  - `api/cities` - Returns a list of US cities for a state.
  - `api/restaurants` - Returns a list of Restaurants in a city.
  - `api/order` - Creates, Returns, Updates, or Deletes orders for a restaurant.

## Outline

The course begins (link) with an overview of NgRx and the Flux approach to state management. While NgRx is built for Angular, there are Flux model libraries for other front-end web frameworks. A common example is Redux, which is typically used by React apps.
We'll explain the way data flows in NgRx, and breakdown the five key elements of an NgRx application.

First we'll install Angular and use it to generate a new project. We'll also install NgRx and it's "Effects" module (used primarily for communicating with servers). Then we'll create some _components_ that will be shown when the right url is present, and add navigation links which will route to those _components_.

With that basic page setup complete, we'll create a simple implementation of each of the building blocks needed to create an NgRx application. We'll setup a basic Store, populate our Store's data using Reducers, connect to the store using Selectors and 
request updates to the store using Actions.

Once we have the basics in place, we'll use Effects to fetch restaurant data from a web service. From there, we'll build more Selectors to narrow down our restaurants by state, then city. 

Now that we're able to pick a restaurant, we'll start creating data by submitting an Order. Once we can create orders, we'll build an landing page for viewing all the restaurant orders placed by our hungry customers. This page will be like an order 
tracking system in a restaurant, letting us update orders before sending them out for dlivery.

Finally, we'll set up a websocket connection to handle order updates in real-time.

At this point, we will have completed the app! The final step will be building it to
production and deploying it for others to see ([learn-angular/deploy-app]).

## Requirements

In order to complete this guide, you need to have [NodeJS](https://nodejs.org/en/) version
8  or later installed.
