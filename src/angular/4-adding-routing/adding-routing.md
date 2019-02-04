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

To be able to navigate to our restaurant component, we'll need routing. We already told Angular we'd like to set up routing, so it generated `src/app/app-routing.module.ts` for us and included it in our root module.

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
