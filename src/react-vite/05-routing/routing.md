@page learn-react-vite/routing Routing in React
@parent learn-react-vite 5
@outline 3

@description Learn how to setup and use React Router to update the application's
user interface in response to URL changes.

@body

## Overview

Routing is a mechanism used by single-page applications to determine what their
user interface looks like based on the browser's current URL. This follows the
standard pattern for browsers where changing the URL fetches a new resource;
however in client rendered applications like React there is no communication
between the browser and server, instead a specific component is displayed.

We will use the [React Router](https://reactrouter.com/) package to provide
routing for the Place My Order application. This router is popular in the React
community and is the basis of the [Remix](https://remix.run/) framework.

## Objective 1: Defining routes and Outlets

Update the Place My Order application with a router, routes, and an Outlet.

In this section we will:

- install React Router
- setup a `RouterProvider` with static routes
- create an `Outlet` to display the route's component

### Concept: Statically defined routing

React Router works by matching the segments of the browser's URL path to
components, i.e. each segment of the URL's path corresponds to a particular
React component based on the segment's value. The mapping of a segment's value
to a component is done though a collection of `RouteObject` items that are
passed to the router when it is initialized.

**TODO: describe `RouteObject`**

### Concept: Outlet

Say you have a component and you want to combine it with the component mapped to
a route? For example, there's a menu bar at the top of the application and when
one of its items is selected it changes the browser's URL, and you want the
component that maps to the current URL to be displayed below the menu as the
application's content. React Router allows you to do that with its `<Outlet>`
component.

An `<Outlet>` renders a single child of a route — or nothing if the route has no
matches. For example give the following route structure:

```code
/
├── fruit
    ├── apple
    ├── banana
```

If the browser's URL path is `/fruit/apple/` and the component displaying the
`fruit` portion of the path contains an `<Outlet>` then the `apple` component
will be displayed. If the browser's URL path is `/fruit/orange/` then nothing
will be displayed in the `<Outlet>` because there is no matching route.

### Setup

TODO

```shell
npm install react-router-dom@6
```

@diff ../../../exercises/react-vite/04-components/02-solution/src/App.tsx ../../../exercises/react-vite/05-routing/01-problem/src/App.tsx only

@diff ../../../exercises/react-vite/04-components/02-solution/src/main.tsx ../../../exercises/react-vite/05-routing/01-problem/src/main.tsx only

### Verify

TODO

### Exercise: Add routes and an Outlet

TODO

### Solution

<details>

<summary>Click to see the solution</summary>

TODO

@diff ../../../exercises/react-vite/05-routing/01-problem/src/App.tsx ../../../exercises/react-vite/05-routing/01-solution/src/App.tsx only

@diff ../../../exercises/react-vite/05-routing/01-problem/src/main.tsx ../../../exercises/react-vite/05-routing/01-solution/src/main.tsx only

</details>

## Objective 2: Links and useMatch

TODO

### Concept: Types of Links (and why they're not \<a\> tags)

TODO

### Concept: Match based on the current route

TODO

### Setup

TODO

@diff ../../../exercises/react-vite/05-routing/01-solution/src/App.tsx ../../../exercises/react-vite/05-routing/02-problem/src/App.tsx only

@diff ../../../exercises/react-vite/05-routing/01-solution/src/pages/Home/Home.tsx ../../../exercises/react-vite/05-routing/02-problem/src/pages/Home/Home.tsx only

### Verify

TODO

@diff ../../../exercises/react-vite/05-routing/01-solution/src/App.test.tsx ../../../exercises/react-vite/05-routing/02-problem/src/App.test.tsx only

### Exercise: Add a Link and update class names based on route matching

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

@diff ../../../exercises/react-vite/05-routing/02-problem/src/App.tsx ../../../exercises/react-vite/05-routing/02-solution/src/App.tsx only

@diff ../../../exercises/react-vite/05-routing/02-problem/src/pages/Home/Home.tsx ../../../exercises/react-vite/05-routing/02-solution/src/pages/Home/Home.tsx only

</details>
