@page learn-ngrx Learn NgRx
@parent bit-academy 4

@description Learn how to manage state in an Angular application using NgRx.

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

In this guide, we'll be building an application with a login page and a user dashboard.

Our application will be making use of a Global State (`@ngrx/store`) to manage user login.

## Outline

This guide begins ([learn-ngrx/why-ngrx]) with a discussion of NgRx's strengths and an overview of its main concepts. We will also checkout the application starting point repository ([learn-ngrx/getting-started]) and install the necessary NgRx dependencies ([learn-ngrx/ngrx-init]).

Then we will learn how to create _actions_ ([learn-ngrx/create-actions]) for our login store to handle login success and failures. Next, we'll learn how to _dispatch_ actions ([learn-ngrx/dispatch-actions]) from within components.

With our actions complete, we'll learn how to unit test NgRx actions ([learn-ngrx/test-actions]) and update our component spec files. 

We'll next create an _effect_ ([learn-ngrx/create-api-effects]) so we can connect our store to a mock API service, and learn how to write unit tests for NgRx effects ([learn-ngrx/test-api-effects]).

Next, we'll create additional effects ([learn-ngrx/create-redirect-effects]) to redirect on login successes and failures, and cover them with unit tests ([learn-ngrx/test-redirect-effects]).

With our actions and effects in place, we'll create a _reducer_ ([learn-ngrx/create-reducer]) so our actions can update our login store, and learn how to write unit tests for NgRx reducers ([learn-ngrx/test-reducer]).

Next, we'll create ([learn-ngrx/create-selectors]) and test ([learn-ngrx/test-selectors]) _selectors_ so we can access the data stored within our NgRx store.

With the logic for our store in place, we'll then learn how to use NgRx selectors within our components to display data ([learn-ngrx/use-selectors]), and how to test these selectors within component spec files ([learn-ngrx/test-used-selectors]).

## Requirements

In order to complete this guide, you need to have git and [NodeJS](https://nodejs.org/en/) version
14 or later installed.

We'll be using Angular 14.

We highly recommend you take our [Angular](../learn-angular.html) and [RxJS](../learn-rxjs.html) courses before attempting this one.
