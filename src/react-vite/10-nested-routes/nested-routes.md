@page learn-react-vite/nested-routes Creating Nested Routes
@parent learn-react-vite 10
@outline 3

@description TODO

@body

## Overview

React Router nested routes provide a way to modify smaller portions of a page, rather than reloading everything. With nested routes, we can alter just sections of a page while also maintaining state in the URL so the page can still be reloaded or shared.

Imagine a manufacturer's product site. Not only do they have a lot of information about each product, but they also need to support both new and existing customers. New customers want to see list of features, specs, and where to buy the product. Old customers need to download owner's manuals and a way to contact customer support. Nested routes provide a mechanism to handle this structure

Our main product page loads at "/product/:id". The matching route will load the product name, picture, and basic description. Within the main product page, we can create a tabbed section with our various types of content. The route to show the main product info along with support information is "/product/:id/support". The full structure will look like the following tree:

- /product/:id
  - /features
  - /specs
  - /where-to-buy
  - /downloads
  - /support

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

### Setup

TODO

### Verify

TODO

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/01-solution/src/pages/Home/Home.tsx ../../../exercises/react-vite/07-styling-in-react/01-solution/src/main.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/13-nested-routes/01-solution?file=src/pages/Home/Home.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/13-nested-routes/01-solution?file=src/pages/Home/Home.tsx).

</details>

## Next steps

TODO