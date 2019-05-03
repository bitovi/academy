@page learn-angular Learn Angular
@parent bit-academy 4

@description Learn how to use Angular to build an application.

@body

## Before You Begin

<a href="https://join.slack.com/t/bitovi-community/shared_invite/enQtNTIzMTE5NzYxMjA3LWMwMzE4MjFkMTI5ZmZjNzllYjc2MzcxOWNmOTg3YjI4NjE0MGFkZGNkOTNlZjlkNDBhNTlmYTcwMzJlZDZjY2Y">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to Angular in the [Angular chat room](https://bitovi-community.slack.com/messages/CFD2J3HT3).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In this guide, we will build this restaurant ordering app with Angular:

<img src="./static/img/place-my-order.png" title="Place My Order App screenshot"
  style="max-width: 100%"/>

You can see a DoneJS implementation of this application at [www.place-my-order.com](http://www.place-my-order.com).

This application:

- Is written in Angular 7
- Is a single page application (SPA) that uses pushstate to simulate routing between several pages.
  - A `home` page
  - A `restaurant list` page that lets the user filter restaurants by state and city
  - A `restaurant details` page that provides more information about a particular restaurant
  - An `order` page that allows us to place an order for a restaurant
  - A realtime `order history` page that tracks orders as they are created, being prepared, out for delivery,
    delivered, and deleted

## Outline

1. Why angular
2. Building our first app
3. Generating our first component
4. Adding routing
5. Creating navigation
6. Writing a restaurant data service
7. Pulling restaurant data into our view
8. Creating city & state options for filtering restaurants
9. Listening to form value changes
10. Updating restaurant service to use params
11. Writing unit tests
12. Creating nested restaurant routes
13. Building an order form
14. Writing an order data service
15. Creating an order history component
16. Updating order history view with real time connection
