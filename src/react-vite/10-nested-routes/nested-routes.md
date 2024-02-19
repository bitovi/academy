@page learn-react/nested-routes Creating Nested Routes
@parent learn-react 10
@outline 3

@description Learn how to have child routes within parent routes.

@body

## Overview

- Introduction to nested routes
- Creating a nested routing configuration
- Nesting component folders

## Objective 1: Restaurant details page

We want to have a component to display individual restaurants details, and want the path to be nested under the restaurants path.

<img alt="Screenshot of the Place My Order app with a nested route, displaying the “/restaurants/brunch-place” URL in the browser’s address bar." src="../static/img/react-vite/10-nested-routes/objective-1.png" style="max-width: 640px;"/>

### Introduction to nested routes

React Router nested routes provide a way to modify smaller portions of a page, rather than reloading everything. With nested routes, we can alter just sections of a page while also maintaining state in the URL so the page can still be reloaded or shared.

Imagine a manufacturer's product site. Not only do they have a lot of information about each product, but they also need to support both new and existing customers. New customers want to see list of features, specs, and where to buy the product. Old customers need to download owner's manuals and a way to contact customer support. Nested routes provide a mechanism to handle this structure

Our main product page loads at "/product/:id". The matching route will load the product name, picture, and basic description. Within the main product page, we can create a tabbed section with our various types of content. The route to show the main product info along with support information is "/product/:id/support". The full structure will look like the following tree:

<div class="directory-list">

- /product/:id
  - /features
  - /specs
  - /where-to-buy
  - /downloads
  - /support

</div>

You could create this sort of page without nested routes, but using nested routes is a well-organized and performant solution that can be linked because it maintains state in the URL.

### Creating a nested route config

Recall our router config from the [first React Router lesson](./routing.html).

@sourceref ../06-routing/createBrowserRouter.tsx
@highlight 9-25, only

Notice that our home and about pages are under the `children` key. These are actually nested routes of the root path. Route children can accept a `children` property themselves, on and on, until the browser runs out of resources.

The route config for our product page could look like this:

@sourceref ./createBrowserRouter.tsx
@highlight 15, 19-32, only

### Nesting component folders

Notice that the child page components have simple names like `<Support />` instead of `<ProductSupport />`. Assuming this component is specifically designed for the product page and will not be reused elsewhere, the component file can reside within the product page's folder. Since the files live together, longer names aren't needed and will make your JSX a little harder to read.

The larger directory tree should look like the following:

<div class="directory-list">

- pages
  - Home
    - Home.tsx
    - Home.module.css
    - Home.test.tsx
    - index.ts
  - Product
    - components
      - Features
        - Features.tsx
        - Features.module.css
        - Features.test.tsx
        - index.ts
      - Support
        - Support.tsx
        - Support.module.css
        - Support.test.tsx
        - index.ts
    - Product.tsx
    - Product.module.css
    - Product.test.tsx
    - index.ts

</div>

### Setup 1

✏️ Create **src/components/RestaurantHeader/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/01-solution/src/components/RestaurantHeader/index.ts

✏️ Create **src/components/RestaurantHeader/RestaurantHeader.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/01-solution/src/components/RestaurantHeader/RestaurantHeader.tsx

✏️ Create **src/pages/RestaurantDetails/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/RestaurantDetails/index.ts

✏️ Create **src/pages/RestaurantDetails/RestaurantDetails.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/RestaurantDetails/RestaurantDetails.tsx

✏️ Update **src/pages/RestaurantList/ListItem.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/ListItem.tsx ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/RestaurantList/ListItem.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/10-nested-routes/01-solution/src/services/restaurant/hooks.ts only

### Verify 1

The existing test already cover routing, so no new tests are needed. Ensure the existing tests pass when you run `npm run test`.

✏️ Create **src/components/RestaurantHeader/RestaurantHeader.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/01-solution/src/components/RestaurantHeader/RestaurantHeader.test.tsx

✏️ Create **src/pages/RestaurantDetails/RestaurantDetails.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/RestaurantDetails/RestaurantDetails.test.tsx

✏️ Update **src/pages/RestaurantList/ListItem.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/ListItem.test.tsx ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/RestaurantList/ListItem.test.tsx only

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/hooks.test.ts ../../../exercises/react-vite/10-nested-routes/01-solution/src/services/restaurant/hooks.test.ts only

### Exercise 1

Let's reorganize the existing `/restaurants` routes so they are nested. For this exercise, change the routing config so the restaurant list and details pages are nested under `/restaurants`.

Refactor the router config in **src/main.tsx** to nest the restaurant routes.

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-solution/src/main.tsx ../../../exercises/react-vite/10-nested-routes/01-solution/src/main.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx).

</details>

## Objective 2: Create the order page

We learned to create nested routes, let's practice by adding another page to our application. Add the order page to the route config and add a link to it.

<img alt="Screenshot of the Place My Order app with a nested route, displaying the “/restaurants/brunch-place/order” URL in the browser’s address bar." src="../static/img/react-vite/10-nested-routes/objective-2.png" style="max-width: 640px;"/>

### Setup 2

Add the order page files.

✏️ Create **src/pages/RestaurantOrder/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/index.ts

✏️ Create **src/pages/RestaurantOrder/RestaurantOrder.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx

### Verify 2

✏️ Create **src/pages/RestaurantOrder/RestaurantOrder.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx

### Exercise 2

Refactor the router config in **src/main.tsx** to contain the new RestaurantOrder components. You will need to come up with the route path on your own.

Add a link to the order page inside the `ListItem` component.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/01-solution/src/main.tsx ../../../exercises/react-vite/10-nested-routes/02-solution/src/main.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx).

</details>

## Next steps

Next we'll learn to handle form data.