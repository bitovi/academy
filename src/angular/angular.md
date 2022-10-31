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

In this guide, we will build this restaurant ordering app with Angular:

<img src="./static/img/place-my-order.png" title="Place My Order App screenshot"
  style="max-width: 100%"/>

You can see a DoneJS implementation of this application at
[www.place-my-order.com](http://www.place-my-order.com).

This application (and course) is moderately complex. Its purpose is to teach
intermediate developers how to write a real-world application in practice. Thus, it covers
the features that are present across almost all single page apps:

- Navigation between pages
- Handling complex state mechanics
- Creating, Reading, Updating, and Deleting (CRUD) data from a server.

As for the application itself, it:

- Is written in Angular 13
- Is a single page application (SPA) that uses [pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) to simulate routing between several pages.
  - A `home` page
  - A `restaurant list` page that lets the user filter restaurants by state and city
  - A `restaurant details` page that provides more information about a particular restaurant
  - An `order` page that allows us to place an order for a restaurant
  - A realtime `order history` page that tracks orders as they are created, being prepared, out for delivery,
    delivered, and deleted
- Will make requests to a local API server that provides the following APIs:
  - `/api/states` - Returns a list of US states.
  - `/api/cities` - Returns a list of US cities for a state.
  - `/api/restaurants` - Returns a list of Restaurants in a city.
  - `/api/order` - Creates, Returns, Updates, or Deletes orders for a restaurant.

## Outline

The guide begins ([learn-angular/why-angular]) with a discussion of Angular's
strengths. We will install Angular ([learn-angular/building-our-first-app]) and use it to generate a new project. Then we will set out creating some _components_ ([learn-angular/creating-components]) and ([learn-angular/creating-pipes]) to manipulate their data, the component will be shown when
the right url is present ([learn-angular/adding-routing]) and adding navigation links ([learn-angular/creating-navigation]) to route to those _components_.

With that complete, we will explore how to get data from the server ([learn-angular/restaurant-service]) and write that data out to the page ([learn-angular/pull-restaurant-data-into-view]).

After that, we will begin exploring how to handle complex state mechanics by creating a
form that displays cities and states ([learn-angular/state-city-options]). We will
make selecting a state filter cities ([learn-angular/form-value-changes]) and
selecting a city filter the restaurants ([learn-angular/updating-service-params]). As
an optional and advanced exercise, you can convert handle the state declaratively
with RxJS ([learn-angular/declarative-state]).

After writing all that code, it's good to learn a bit about testing. While this tutorial
has tests to verify your solutions, we will turn the tables and have you write a test for
retrieving a single restaurant from the service layer ([learn-angular/writing-unit-tests]). This will prepare us to create a nested route for the restaurant details page ([learn-angular/nested-routes]).

Now we are ready to turn our attention to learning about creating, updating, and deleting
data. We will start by building an Order Form ([learn-angular/building-order-form]) and then update it to utilize directives
([learn-angular/creating-directive]), which in turn allows us to create orders on the server ([learn-angular/order-service]). We'll then create a page that lets us update an order's status or delete an order ([learn-angular/order-history-component]). 
We will utilize pipes to create an item total calculation across the application ([learn-angular/item-total-pipe])
and will even make the order page update when someone else updates an order ([learn-angular/real-time-connection]).

At this point, we will have completed the app. The final step will be building it to
production and deploying it for others to see ([learn-angular/deploy-app]).

## Requirements

In order to complete this guide, you need to have [NodeJS](https://nodejs.org/en/) version
12 or later installed.
