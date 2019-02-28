@page angular/adding-routing Adding Routing
@parent angular 4

@description Adding Routing

@body

## Overview

In this part, we will:

- Add two routes to our generated routing module
- Hook the router outlet into our markup
- Test that new routes are working

### Routing

To be able to navigate between different views in our app, we'll need routing. We already told Angular we'd like to set up routing, so it generated `src/app/app-routing.module.ts` for us and included it in our root module. The router module takes an array of routes we can generate in a few different ways:

## Setting Paths to Components 

@sourceref ./route-component.html
@codepen
@highlight 19-22, only

### Using Wildcards

### Redirecting Routes

### Setting Paths to Modules


### <base-href>

In our index.html file, the angular cli included `<base href="/>`. This tells the router how to compose URLs. 

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



To create a route to our restaurants component, we'll need to import our restaurants component and update our routes variable to include the new path.

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 3-15

Our router was already added to our index file during our initial app creation. Replace the whole file with the following: 

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 1,only

Navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a> to see the new view. You may have noticed the ```routerLink``` attribute on the a tag in our home component markup. This one of the ways we link to specific routes in our app.

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```
