@page learn-angular/adding-routing Adding Routing
@parent learn-angular 4

@description Learn how to add basic routing to components in an Angular application.

@body

## Overview

In this part, we will:

- Add two routes to our generated routing module
- Hook the router outlet into our markup
- Test that new routes are working

## Problem

We need to set up routes for the home view and restaurant view.

## Technical Requirements

Create routes for the `HomeComponent` and `RestaurantComponent`. When the route is `''`, the `HomeComponent` should display, and when the route is `/restaurants` the `RestaurantComponent` should display. These changes should be made in __src/app/app-routing.module.ts__.

Notice that you will be able to click the __Choose a Restaurant__ button
at the end of this tutorial:

<video controls style="border: solid 1px black; max-width: 640px;">
  <source src="../static/img/angular/4-adding-routing/after.webm" type="video/webm">
  <source src="../static/img/angular/4-adding-routing/after.mp4" type="video/mp4">
</video>

## Setup

`<router-outlet>`, which handles routing to a component based on a url, was added to our __src/app/app.component.html__ file when we first generated our app and answered `yes` to the routing question. But since that time, we added components to that view.  Let's remove those components because `<router-outlet>` will handle showing
those components going forward.

✏️ Update __src/app/app.component.html__ to:

@sourceref ./app.component.html
@highlight 1-2,only

## How to Verify Your Solution is Correct

If you have completed the exercise successfully you should be able to see the home component when the app loads, and the restaurant component when you navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>. You may have noticed the ```routerLink``` attribute on the `<a>` tag in our home component markup. This one of the ways we link to specific routes in our app. When you click that link, you should see the restaurants component.

```html
<a class="btn" routerLink="/restaurants" role="button">
  Choose a Restaurant
</a>
```

✏️ Update the spec file  __src/app/app.component.spec.ts__ to be:

@sourceref ./app.component.spec.ts
@highlight 2-3,5-9,12-14,19,22,24-26,29-30,32,53-69,only

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## What You Need to Know

## Router Outlet

<a href="https://angular.io/api/router/RouterOutlet" target="\_blank">`RouterOutlet`</a> is an Angular directive that is a placeholder for content that is filled when the route changes. In this example the `HomeComponent` template or the `AboutComponent` template are shown below the `<router-outlet>` element as the route changes.

@sourceref ./path-route.html
@codepen
@highlight 31, only

## Router

To be able to navigate between different views in our app, we can take advantage of Angular's built-in routing module. We already told Angular we'd like to set up routing, so it generated `src/app/app-routing.module.ts` for us and included it in our root module. `src/app/app-routing.module.ts` currently looks like:

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The router module takes an array of routes we can generate in a few different ways that will render content in the `router-outlet` directive.

## Setting Paths to Components

The following example will render the AboutComponent in the router-outlet when the path is `/about`:

@sourceref ./path-route.html
@codepen
@highlight 62, only

## Using Wildcards

The next example uses the wildcard path, which will render the PageNotFoundComponent when any unregistered route is hit:

@sourceref ./wildcard-route.html
@codepen
@highlight 69, only

## Redirecting Routes

This example shows one route redirecting to another:

@sourceref ./redirect-route.html
@codepen
@highlight 71, only

## Setting Paths to Modules

As our applications grow, it doesn't make sense to load all the code at once. Thanks to <a href="https://angular.io/guide/lazy-loading-ngmodules" target="\_blank">lazyloading</a>, we can wait to render modules until a specific route requiring them is hit. (This demo does not work in Codepen unfortunately)

@sourceref ./lazyload-route.html
@codepen
@highlight 114, only

## <base-href>

In our index.html file, the angular cli included `<base href="/>`. This isn't an Angular specific feature and you can read more about it <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" target="\_blank">here</a>, but it's important to know this is how the Angular router will how to compose URLs - the value in the "href" attribute specifies the base URL for all relative URLs contained in the app. If you'd like to serve your app from a different directory(where ever the index.html will be served from) or have a specific hosting url that your app will be deployed at you will need to change the `base href` to match.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>PlaceMyOrder</title>
        <base href="/">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>
        <pmo-root></pmo-root>
    </body>
</html>
```
@highlight 6

## Solution

✏️ Update __src/app/app-routing.module.ts__ to:

@sourceref ./app-routing.module.ts
@highlight 3-15
