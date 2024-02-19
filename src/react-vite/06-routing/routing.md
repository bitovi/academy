@page learn-react/routing Routing in React
@parent learn-react 6
@outline 3

@description Learn how to set up and use React Router to update the application's
user interface in response to URL changes.

@body

## Overview

Routing is a mechanism used by single-page applications to determine what their
user interface looks like based on the browser's current URL. This follows the
standard pattern for browsers where changing the URL fetches a new resource;
however in client-rendered applications like React, there is no communication
between the browser and server; instead, a specific component is displayed.

Routing is crucial for:

- User Experience (UX): Provides seamless navigation without page reloads.
- Bookmarking: Enables users to bookmark or share URLs that lead directly to a specific state of the application.
- Organization: Helps in structuring the application into logical views or components.

We will use the [React Router](https://reactrouter.com/) package to provide
routing for the Place My Order application. This router is popular in the React
community and a great de facto choice when building a React application.

## Objective 1: Defining routes and Outlets

Our goal is to split the homepage of our Place My Order application so that we only
see the Home content on the homepage.

In this section, we will:

- Install React Router.
- Set up a `RouterProvider` with static routes.
- Create an `Outlet` to display the route's component.

### createBrowserRouter

React Router works by matching the segments of the browser's URL path to
components, i.e. each segment of the URL's path corresponds to a particular
React component based on the segment’s value. The mapping of a segment’s value
to a component is done through a collection of `RouteObject` items that are
passed to the router when it is initialized.

The `createBrowserRouter` function is a key part of React Router. This function is
used to create a `router` object that defines the navigation structure of our app.
The structure is defined through a configuration object that specifies the paths
and corresponding components. Let’s break down its usage with the example below:

@sourceref ./createBrowserRouter.tsx
@highlight 8-28, only

The first argument to `createBrowserRouter` is an array of route objects.
Each route object represents a navigation route in our application, and
it typically contains the following properties:

- `path`: A string that defines the URL path for the route.
- `element`: A React component that will be rendered when the route's path matches the current URL.
- `children`: An array of nested route objects, allowing for the creation of nested URL structures.
- `index`: A boolean for indicating that the route should act as a default or fallback route within a group of nested routes.

The second argument to `createBrowserRouter` is an optional configuration object.
In the code above, it sets the `basename`, which is the base URL for all locations.
Here, it’s dynamically set based on the environment variable `import.meta.env.BASE_URL`.
This is useful for scenarios where your application is served from a subdirectory on your server.

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

The final piece of React Router API that we need to use is the `<Outlet>`
component.

The `Outlet` component is used within a parent route component to render its
child route components. Think of it as a marker that tells React Router,
“Insert the child route component here.”

When you define nested routes in your route configuration above, you don’t
immediately specify where in the parent component’s JSX the child components
should appear. Instead, you use `Outlet` in the parent component’s JSX as a
placeholder for where the matched child route component should be rendered.

In the example below, the child component (`<AboutPage>` or `<HomePage>` from
our `createBrowserRouter` example) would be rendered inside the `<main>` element:

```tsx
const Layout = () => {
  return (
    <>
      <header>My awesome site</header>
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <footer>©</footer>
    </>
  );
};
```
@highlight 6

### Setup 1

To get starting with React Router in our application,
let’s install `react-router-dom` with npm:

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

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-solution/src/App.test.tsx ../../../exercises/react-vite/06-routing/01-problem/src/App.test.tsx only

### Exercise 1

Create routes for the `<Home>` component and `<RestaurantList>` component.
When the route is `""`, the `<Home>` component should display, and when
the route is `/restaurants` then the `<RestaurantList>` component should
display. These changes should be made in `src/App.tsx` and `src/main.tsx`.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-problem?file=App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-problem?file=App.tsx) to do this exercise in an online code editor.

### Solution 1

<details>

<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-problem/src/App.tsx ../../../exercises/react-vite/06-routing/01-solution/src/App.tsx only

✏️ Update **src/main.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-problem/src/main.tsx ../../../exercises/react-vite/06-routing/01-solution/src/main.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-solution?file=App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/06-routing/01-solution?file=App.tsx).

</details>

## Objective 2: Creating links between pages

Next, we want to update Place My Order to include links in our `<header>`
so we can navigate between pages. We also want to update our `<Home>`
component to use React Router for its link to the `/restaurants` page.

### Link

The `Link` component is a basic building block in React Router. It allows
you to create links in our application that navigate to different routes
(or paths) defined in our React application.

Use the `Link` component similarly to how you use an `<a>` element in HTML.
Instead of using `href`, you use `to` to specify the path.

```tsx
<Link to="/about">
    About
</Link>
```

When users click on this link, they are directed to the `/about` route in
your application, without causing a full page reload.

### NavLink

`NavLink` is a special version of the `Link` component that can add styling
attributes to the rendered element when it matches the current URL.
This is particularly useful for highlighting the active link in the navigation.

Use `NavLink` in place of Link where you need to style the active link.

```tsx
<NavLink to="/home" activeClassName="active">
    Home
</NavLink>
```

The `activeClassName` prop is used to specify the class name that will be added when
the link is active (i.e., when the path in the `to` prop matches the current URL).
You can also use the `activeStyle` prop for inline styling.

### Match based on the current route

The `activeClassName` API above is useful if you only need styling on the `<a>` itself.
However, if you want to style another element based on the current route, you’ll need
to use the `useMatches` function:

```tsx
const aboutMatch = useMatch('/about');
if (aboutMatch) {
  // The current path is /about
}
```
@highlight 1

In the example above, `aboutMatch` will be an object with details about the route if
the current route is `/about`; otherwise, `useMatch` will return `undefined` if the
current route is something else.

### Setup 2

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-solution/src/App.tsx ../../../exercises/react-vite/06-routing/02-problem/src/App.tsx only

### Verify 2

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/01-solution/src/App.test.tsx ../../../exercises/react-vite/06-routing/02-problem/src/App.test.tsx only

### Exercise 2

Add a Link and update class names based on route matching

In the `<Home>` component, we want to use React Router for the
link to `/restaurants`.

In the `<App>` component, we want to use React Router to add
navigation links inside the `<nav>` component. Here’s an example
of what the DOM should look like when the home page is active:

```html
<ul>
    <li class="active">
        <a href='/'>Home</a>
    </li>
    <li>
        <a href='/restaurants'>Restaurants</a>
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

TODO
