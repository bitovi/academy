@page angular/adding-routing Adding Routing
@parent angular 4

@description Adding routing

@body

## Overview

In this part, we will:

- Add two routes to our generated routing module
- Hook the router outlet into our markup
- Test that new routes are working

### Routing

To be able to navigate between different views in our app, we'll need routing. 

We already told Angular we'd like to set up routing, so it generated `src/app/app-routing.module.ts` for us and included it in our root module. The router module takes an array of routes we can generate in a few different ways that will render content in the `router-outlet` directive.

## Setting Paths to Components

The following example will render the `AboutComponent` in the router-outlet when the path is `/about`:

@sourceref ./path-route.html
@codepen
@highlight 62, only

### Using Wildcards

The next example uses the wildcard path, which will render the `PageNotFoundComponent` when any unregistered route is hit:

@sourceref ./wildcard-route.html
@codepen
@highlight 69, only

### Redirecting Routes

This example shows one route redirecting to another:

@sourceref ./redirect-route.html
@codepen
@highlight 71, only

### Setting Paths to Modules

As our applications grow, it doesn't make sense to load all the code at once. Thanks to <a href="https://angular.io/guide/lazy-loading-ngmodules" target="_blank">lazyloading</a>, we can wait to render modules until a specific route requiring them is hit. (This demo does not work in Codepen unfortunately)

@sourceref ./lazyload-route.html
@codepen
@highlight 114, only

### <base-href>

In our `index.html` file, the angular cli included `<base href="/>`. This isn't an Angular specific feature and you can read more about it <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" target="_blank">here</a>, but it's important to know this is how the Angular router will how to compose URLs - the value in the `href` attribute specifies the base URL for all relative URLs contained in the app.

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

## Exercise: Edit the Routing Module to Have Routes for Home and Component

Our router outlet was already added to our __src/app/app.component.html__ file during our initial app creation. However, we're going to remove everything in this file and replace the whole file contents with the following:

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 1,only

### The problem

We need to set up routes for the home view and restaurant view. When the route is `''`, the `HomeComponent` should display, and when the route is `/restaurants` the `RestaurantComponent` should display. Make these changes in __src/app/app-routing.module.ts__.

### What You Need to know

- How to create routes that serve components (you learned this in section above! ✔️)

### To Verify Your Solution is Correct

If you have completed the exercise successfully you should be able to see the home component when the app loads, and the restaurant component when you navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>. 

(You may have noticed the ```routerLink``` attribute on the a tag in our home component markup. This one of the ways we link to specific routes in our app.)

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```

### The Solution

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 3-15