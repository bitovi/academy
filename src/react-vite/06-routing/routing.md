@page learn-react/routing Routing in React
@parent learn-react 6
@outline 3

@description Learn how to set up and use React Router to update the application’s user interface in response to URL changes.

@body

## Overview

In this section, we will:

- Think through why routing is important.
- Learn about React Router’s API for creating routes.
- Set up a `RouterProvider` with static routes.
- Create an `Outlet` to display the route’s component.
- Create links between pages.
- Determine which route is the active route with `useMatch()`.

## Objective 1: Defining routes and Outlets

Our goal is to split the homepage of our Place My Order application so that we only see the Home content on the homepage.

### Why is routing important?

Routing is a mechanism used by single-page applications to determine what their user interface looks like based on the browser’s current URL. This follows the standard pattern for browsers where changing the URL fetches a new resource; however in client-rendered applications like React, there is no communication between the browser and server; instead, a specific component is displayed.

Routing is crucial for:

- User Experience (UX): Provides seamless navigation without page reloads.
- Bookmarking: Enables users to bookmark or share URLs that lead directly to a specific state of the application.
- Organization: Helps in structuring the application into logical views or components.

We will use the [React Router](https://reactrouter.com/) package to provide routing for the Place My Order application. This router is popular in the React community and a great de facto choice when building a React application.

### What is React Router?

React Router is the de facto standard for routing in React applications. It’s extremely popular in the React community, especially when not using a framework like Next.js, which comes with its own routing solution. React Router adds dynamic, client-side routing to React, enabling the creation of single-page applications (SPAs) that can handle different URLs and render different content accordingly.

React Router allows applications to dynamically render different components based on the URL, all without the need for a page reload. This is a significant enhancement over traditional multi-page applications, where navigating to a new page requires a complete reload of the page’s resources.

React Router’s API is declarative. Routes are defined using configuration through `createBrowserRouter()` and with components like `RouterProvider`, `Outlet`, and `Link`, which makes the routing rules readable and integrated seamlessly into the rest of the React component structure.

Nested routes are a powerful feature of React Router, allowing the creation of complex application structures. You can define routes within routes, which is particularly useful for creating layouts that persist across multiple pages, like headers and footers.

### createBrowserRouter

React Router works by matching the segments of the browser’s URL path to components, i.e. each segment of the URL’s path corresponds to a particular React component based on the segment’s value. The mapping of a segment’s value to a component is done through a collection of `RouteObject` items that are passed to the router when it is initialized.

The `createBrowserRouter` function is a key part of React Router. This function is used to create a `router` object that defines the navigation structure of our app. The structure is defined through a configuration object that specifies the paths and corresponding components. Let’s break down its usage with the example below:

@sourceref ./createBrowserRouter.tsx
@highlight 8-28, only

The first argument to `createBrowserRouter` is an array of route objects. Each route object represents a navigation route in our application, and it typically contains the following properties:

- `path`: A string that defines the URL path for the route.
- `element`: A React component that will be rendered when the route’s path matches the current URL.
- `children`: An array of nested route objects, allowing for the creation of nested URL structures.
- `index`: A boolean for indicating that the route should act as a default or fallback route within a group of nested routes.

The second argument to `createBrowserRouter` is an optional configuration object. In the code above, it sets the `basename`, which is the base URL for all locations. Here, it’s dynamically set based on the environment variable `import.meta.env.BASE_URL`. This is useful for scenarios where your application is served from a subdirectory on your server.

### RouterProvider

Next, we can use `RouterProvider` to render our `<App>` component.
Remember that our `main.tsx` file currently looks like this:

@sourceref ../../../exercises/react-vite/05-props/01-solution/src/main.tsx
@highlight 8, only

Instead of only rendering our `<App>` component, we can use `<RouterProvider>`:

@sourceref ../../../exercises/react-vite/06-routing/01-solution/src/main.tsx
@highlight 33, only

The `RouterProvider` requires the `router` object created by `createBrowserRouter`.
This object contains all the route configurations and settings for our application.

### Outlet

The final piece of React Router API that we need to use is the `<Outlet>` component.

The `Outlet` component is used within a parent route component to render its child route components. Think of it as a marker that tells React Router, “Insert the child route component here.”

When you define nested routes in your route configuration above, you don’t immediately specify where in the parent component’s JSX the child components should appear. Instead, you use `Outlet` in the parent component’s JSX as a placeholder for where the matched child route component should be rendered.

In the example below, the child component (`<AboutPage>` or `<HomePage>` from our `createBrowserRouter` example) would be rendered inside the `<main>` element:

```tsx
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <header>My awesome site</header>
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <footer>©</footer>
    </>
  )
}
```

@highlight 6

### Setup 1

To get starting with React Router in our application, let’s install `react-router-dom` with npm:

✏️ Run:

```shell
npm install react-router-dom@6
```

✏️ Create **src/pages/Home/** (folder)

✏️ Create **src/pages/Home/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/06-routing/01-solution/src/pages/Home/index.ts

✏️ Create **src/pages/Home/Home.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/06-routing/01-problem/src/pages/Home/Home.tsx

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-solution/src/App.tsx ../../../exercises/react-vite/06-routing/01-problem/src/App.tsx only

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-solution/src/main.tsx ../../../exercises/react-vite/06-routing/01-problem/src/main.tsx only

### Verify 1

✏️ Create **src/pages/Home/Home.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/06-routing/01-solution/src/pages/Home/Home.test.tsx

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-solution/src/App.test.tsx ../../../exercises/react-vite/06-routing/01-problem/src/App.test.tsx only

### Exercise 1

Create routes for the `<Home>` component and `<RestaurantList>` component. When the route is `""`, the `<Home>` component should display, and when the route is `/restaurants` then the `<RestaurantList>` component should display. These changes should be made in `src/App.tsx` and `src/main.tsx`.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-problem?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-problem?file=src/App.tsx) to do this exercise in an online code editor.

### Solution 1

<details>

<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-problem/src/App.tsx ../../../exercises/react-vite/06-routing/01-solution/src/App.tsx only

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-problem/src/main.tsx ../../../exercises/react-vite/06-routing/01-solution/src/main.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-solution?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-solution?file=src/App.tsx).

</details>

## Objective 2: Creating (active) links between pages

Next, we want to update Place My Order to include links in our `<header>` so we can navigate between pages. Each link should show its active state when it matches the currently-selected page.

### Link

The `Link` component is a basic building block in React Router. It allows you to create links in our application that navigate to different routes (or paths) defined in our React application.

Use the `Link` component similarly to how you use an `<a>` element in HTML. Instead of using `href`, you use `to` to specify the path.

```tsx
import { Link } from "react-router-dom"

const content = <Link to="/about">About</Link>
```

When users click on this link, they are directed to the `/about` route in your application, without causing a full page reload.

### Match based on the current route

If you want to style another element based on the current route, you’ll need
to use the `useMatches` function:

```tsx
import { useMatch } from "react-router-dom"

function App() {
  const aboutMatch = useMatch("/about")
  const contactMatch = useMatch("/contact")

  return (
    <>
      <p>
        {aboutMatch ? "Current page is /about" : "About page is not a match"}
      </p>
      <p>
        {contactMatch
          ? "Current page is /contact"
          : "Contact page is not a match"}
      </p>
    </>
  )
}
```

@highlight 4-5, 9-10

In the example above, `aboutMatch` will be an object with details about the route if the current route is `/about`; otherwise, `useMatch` will return `undefined` if the current route is something else.

### Setup 2

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-solution/src/App.tsx ../../../exercises/react-vite/06-routing/02-problem/src/App.tsx only

### Verify 2

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-solution/src/App.test.tsx ../../../exercises/react-vite/06-routing/02-problem/src/App.test.tsx only

### Exercise 2

- Create links to the `/` (`Home`) and `/restaurants` (`RestaurantList`) pages.
- When the current page is Home, give the parent `<li>` of the link an `active` class.
- Likewise, on the `RestaurantList` page, the parent `<li>` of the `/restaurants` link should have an `active` class.

In the `<App>` component, we want to use React Router to add navigation links inside the `<nav>` component. Here’s an example of what the DOM should look like when the home page is active:

```html
<ul>
  <li class="active">
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/restaurants">Restaurants</a>
  </li>
</ul>
```

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/02-problem?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/02-problem?file=src/App.tsx) to do this exercise in an online code editor.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/02-problem/src/App.tsx ../../../exercises/react-vite/06-routing/02-solution/src/App.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/02-solution?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/02-solution?file=src/App.tsx).

</details>

## Next steps

Next, let’s learn about different ways to [apply CSS styles](./styling-in-react.html) in React applications.
