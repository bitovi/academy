@page learn-ngrx Learn NgRx
@parent bit-academy 4

@description Learn how to manage state in an Angular application using NgRx.

@body

## Before You Begin


<p><a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a></p>

<br/>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to Angular in the [Angular chat room](https://discord.gg/Qv26e4uq5z).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.


## Overview

In this guide, we'll be building an application with a login page and a user dashboard.

Our application will be making use of a Global State (`@ngrx/store`) to manage user login.


## Outline

1. This guide begins ([learn-ngrx/why-ngrx]) with a discussion of NgRx's strengths and an overview of its main concepts. We will also checkout the application starting point repository ([learn-ngrx/getting-started]) and install the necessary NgRx dependencies ([learn-ngrx/ngrx-init]).

2. Then we will learn how to create _Actions_ ([learn-ngrx/create-actions]) for our Login Store to handle login success and failures. Next, we'll learn how to _dispatch_ Actions ([learn-ngrx/dispatch-actions]) from within Components.

3. With our implementation using Actions complete, we'll learn how to unit test NgRx Actions ([learn-ngrx/test-actions]) and update our Component spec files. 

4. We'll next create _Effects_ ([learn-ngrx/create-api-effects]) so we can connect our store an authentication Service, and learn how to write unit tests for NgRx Effects ([learn-ngrx/test-api-effects]).

5. Next, we'll create additional Effects ([learn-ngrx/create-redirect-effects]) to redirect on login successes and failures, and cover them with unit tests ([learn-ngrx/test-redirect-effects]).

6. With our Actions and Effects in place, we'll create a _Reducer_ ([learn-ngrx/create-reducer]) so our Actions can lead to updates to our Login State, and learn how to write unit tests for NgRx Reducers ([learn-ngrx/test-reducer]).

7. Next, we'll create _Selectors_ ([learn-ngrx/create-selectors]) so we can access the data stored within our NgRx State, and learn how to write unit tests for NgRx Selectors ([learn-ngrx/test-selectors]).

8. With the logic for our store in place, we'll then learn how to use NgRx Selectors within our Components to display data ([learn-ngrx/use-selectors]), and how to test these selectors within Component spec files ([learn-ngrx/test-used-selectors]).


## Requirements

In order to complete this guide, you need to have git and [NodeJS](https://nodejs.org/en/) version 14 or later installed.

We'll be using Angular 14.

We highly recommend you take our [Angular](../learn-angular.html) and [RxJS](../learn-rxjs.html) courses before attempting this one.
