@page learn-react-vite/nested-routes Creating Nested Routes
@parent learn-react-vite 10
@outline 3

@description TODO

@body

## Overview

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

## Objective 1: Create a nested route

### Key concepts

- Creating a nested routing configuration
- Folder structure for nested components

#### Creating a nested route config

Recall our router config from the [first React Router lesson](./routing.html).

```tsx
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
```

Notice that our home and about pages are under the `children` key. These are actually nested routes of the root path. Route children can accept a `children` property themselves, on and on, until the browser runs out of resources.

The route config for our product page could look like this:

```tsx
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        ...
        {
          path: 'product',
          element: <ProductPage />,
          children: [
            {
              index: "features",
              element: <Features />,
            },
            {
              index: "where-to-buy",
              element: <WhereToBuy />,
            },
            {
              index: "support",
              element: <Support />,
            },
            ...
          ]
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
```

#### Folder structure

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

### Exercise 1

Let's reorganize the existing `/restaurants` routes so they are nested. For this exercise, change the routing config so the restaurant list and details pages are nested under `/restaurants`.

#### Setup

No additional setup needed.

#### Verify

The existing test already cover routing, so no new tests are needed. Ensure the existing tests pass when you ren `npm run test`.

#### Exercise

Refactor the router config in **src/main.tsx** to nest the restaurant routes.

#### Solution 

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/01-solution/src/main.tsx ../../../exercises/react-vite/10-nested-routes/01-solution/src/main.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx).

</details>

### Exercise 2

We learned to create nested routes, let's practice by adding another page to our application. Add the order page to the route config and add a link to it.

#### Setup

Add the order page files.

✏️ Add **src/pages/RestaurantOrder/index.ts** :

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/index.ts ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/index.ts only

✏️ Add **src/pages/RestaurantOrder/RestaurantOrder.tsx** :

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx only


#### Verify

✏️ Add **src/pages/RestaurantOrder/RestaurantOrder.test.tsx** :

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx only

#### Exercise

Refactor the router config in **src/main.tsx** to contain the new RestaurantOrder components. You will need to come up with the route path on your own.

Add a link to the order page inside the `ListItem` component/

#### Solution 

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/main.tsx ../../../exercises/react-vite/10-nested-routes/02-solution/src/main.tsx only


@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantList/ListItem.tsx ../../../exercises/react-vite/10-nested-routes/02-solution/src/RestaurantList/ListItem.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/10-nested-routes/01-solution?file=src/main.tsx).

</details>

## Next steps

Next we'll learn to handle form data.