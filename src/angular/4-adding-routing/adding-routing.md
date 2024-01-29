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

Create routes for the `HomeComponent` and `RestaurantComponent`. When the route is `''`, the `HomeComponent` should display, and when the route is `/restaurants` the `RestaurantComponent` should display. These changes should be made in **src/app/app-routing.module.ts**.

Notice that you will be able to click the **Choose a Restaurant** button
at the end of this tutorial:

![Choose a restaurant routing](../static/img/angular/4-adding-routing/after.gif 'Choose a restaurant routing')

## Setup

`<router-outlet>`, which handles routing to a component based on a url, was added to our **src/app/app.component.html** file when we first generated our app. But since that time, we added components to that view. Let’s remove those components because `<router-outlet>` will handle showing
those components going forward.

✏️ Update **src/app/app.component.html** to:

@sourceref ./app.component.html
@highlight 1-2,only

## How to Verify Your Solution is Correct

If you have completed the exercise successfully you should be able to see the home component when the app loads, and the restaurant component when you navigate to <a href="http://localhost:4200/restaurants" >localhost:4200/restaurants</a>. You may have noticed the `routerLink` attribute on the `<a>` tag in our home component markup. This one of the ways we link to specific routes in our app. When you click that link, you should see the restaurants component.

```html
<a class="btn" routerLink="/restaurants" role="button"> Choose a Restaurant </a>
```

✏️ Update the spec file **src/app/app.component.spec.ts** to be:

@diff ../../../exercises/angular/2-building-first-app/problem/src/app/app.component.spec.ts ./app.component.spec.ts

> If you’ve implemented the solution correctly, when you run `npm run test` all tests will pass!

## What You Need to Know

## Router Outlet

<a href="https://angular.io/api/router/RouterOutlet" >`RouterOutlet`</a> is an Angular directive that is a placeholder for content that is filled when the route changes. In this example the `HomeComponent` template or the `AboutComponent` template are shown below the `<router-outlet>` element as the route changes.

@sourceref ./path-route.html
@codepen
@highlight 31, only

## Router

To be able to navigate between different views in our app, we can take advantage of Angular’s built-in routing module. Angular generated `src/app/app-routing.module.ts` for us and included it in our root module. `src/app/app-routing.module.ts` currently looks like:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

The router module takes an array of routes we can generate in a few different ways that will render content in the `router-outlet` directive.

## Setting Paths to Components

The following example will render the `AboutComponent` in the router-outlet when the path is `/about`:

@sourceref ./path-route.html
@codepen
@highlight 62-63, only

## Using Wildcards

The next example uses the wildcard path, which will render the `PageNotFoundComponent` when any unregistered route is hit:

@sourceref ./wildcard-route.html
@codepen
@highlight 69, only

## Redirecting Routes

This example shows one route redirecting to another:

@sourceref ./redirect-route.html
@codepen
@highlight 71, only

## Setting Paths to Modules

As our applications grow, it doesn’t make sense to load all the code at once. Thanks to <a href="https://angular.io/guide/lazy-loading-ngmodules" >lazy loading</a>, we can wait to render modules until a specific route requiring them is hit.

@sourceref ./lazyload-route.html
@codepen
@highlight 120, only

## <base-href>

In our `index.html` file, the angular cli included `<base href="/>`. This isn’t an Angular specific feature and you can read more about it <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base">here</a>, but it’s important to know this is how the Angular router will know how to compose URLs - the value in the `href` attribute specifies the base URL for all relative URLs contained in the app. If you’d like to serve your app from a different directory (wherever the index.html will be served from) or have a specific hosting URL that your app will be deployed at, you will need to change the `base href` to match.

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

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/app-routing.module.ts** to:

@sourceref ./app-routing.module.ts
@highlight 3,4,6-15

</details>
