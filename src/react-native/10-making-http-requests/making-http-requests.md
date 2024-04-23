@page learn-react-native/making-http-requests Making HTTP Requests
@parent learn-react-native 10

@description Learn about how to make `fetch` requests and render requested data in React components.

@body

## Overview

TODO

## Objective 1: Add a `fetch` request for states

In this section, we will:

- Learn about the `useEffect` Hook
- TODO: Review TypeScript generics?

### The `useEffect` Hook

`useEffect` is a React Hook that lets you perform side effects in your functional components.
It serves as a powerful tool to execute code in response to component renders or state changes.

Here is an example component with `useEffect`:

@sourceref dependency-array-empty.tsx
@highlight 1, 6-12, only

Let’s break this example down by the two arguments that `useEffect` takes:

#### Effect callback function

The first argument of `useEffect` is a function, often referred to as the “effect” function.
This is where you perform your side effects, such as fetching data, setting up a subscription,
or manually changing the DOM in React components.

The key aspect of this function is that it’s executed after the component renders. The effects
in `useEffect` don’t block the browser from updating the screen, leading to more responsive UIs.

This effect function can optionally return another function, known as the “cleanup” function.
The cleanup function is useful for performing any necessary cleanup activities when the component
unmounts or before the component re-renders and the effect is re-invoked. Common examples include
clearing timers, canceling network requests, or removing event listeners.

#### The dependency array

The second argument of `useEffect` is an array, called the “dependency array”, which determines
when your effect function should be called. The behavior of the effect changes based on the
contents of this array:

Consider three scenarios based on the dependency array:

##### Empty dependency array (`[]`)

If the dependency array is an empty array, the effect runs once
after the initial render.

@sourceref dependency-array-empty.tsx
@highlight 6-12, only

##### Array with values

When you include values (variables, props, state) in the dependency array,
the effect will only re-run if those specific values change between renders. This selective
execution can optimize performance by avoiding unnecessary work.

@sourceref dependency-array-with-values.tsx
@highlight 4, 7-8, only

##### No dependency array

If the dependency array is omitted, the effect runs after every render
of the component.

@sourceref dependency-array-undefined.tsx
@highlight 8, only

#### Async operations inside useEffect

You can use APIs that return a `Promise` normally within a `useEffect`:

@sourceref fetch-with-promise.tsx
@highlight 7-15, only

However, unlike traditional functions, `useEffect` functions can’t be marked as async.
This is because returning a `Promise` from `useEffect` would conflict with its mechanism,
which expects either nothing or a clean-up function to be returned.

To handle asynchronous operations, you typically define an `async` function inside the
effect and then call it:

@sourceref fetch-with-async.tsx
@highlight 7-18, only

When using async/await, error handling is typically done using try-catch blocks. This allows
you to gracefully handle any errors that occur during the execution of your async operation.

In this example, if `fetch` throws an error, the `catch` block catches and handles it.
This pattern is crucial to prevent unhandled promise rejections and ensure that your application
can respond appropriately to failures in asynchronous tasks.

### TypeScript generics

TODO? We’ve used generics, but maybe explain the ones we’re going to use so it’s a little familiar?

### Cleanup functions

The effect function can optionally return another function, known as the “cleanup” function. The cleanup function is useful for performing any necessary cleanup activities when the component unmounts or before the component re-renders and the effect is re-invoked. Common examples include clearing timers, canceling network requests, or removing event listeners.

@sourceref useEffect-with-cleanup.tsx
@highlight 7-21, only

In the example above, we’re creating a WebSocket connection to an API when the component
is first rendered (note the empty dependency array).

When the component is removed from the DOM, the cleanup function will run and tear down
the WebSocket connection.

### Environment variables

The way we’re accessing our locally run API during development may be different than how
we access it in production. To prepare for this, we’ll set an environment variable to do
what we need.

TODO: Explain that setting environment variables is a generic thing you do, and on this
project in particular, Vite will make anything prefixed with `VITE_` available in our
client-side source code.

### Setup

✏️ Create **.env** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/.env
@highlight 1

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/03-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/01-problem/src/pages/RestaurantList/RestaurantList.tsx only

#### Install the Place My Order API

Before we begin requesting data from our API, we need to install the
`place-my-order-api` module, which will generate fake restaurant data and
serve it from port `7070`.

✏️ Run:

```bash
npm install place-my-order-api@1
```

✏️ Next add an API script to your `package.json`

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/package.json
@highlight 7, only

✏️ In a **new** terminal window, start the API server by running:

```bash
npm run api
```

Double check the API by navigating to <a href="http://localhost:7070/restaurants">localhost:7070/restaurants</a>.
You should see a JSON list of restaurant data. It will be helpful to have a second terminal tab to run the `api` command from.

### Verify

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

- Update `RestaurantList.tsx` to call `useState()` and use the `StateResponse` interface.
- Call `useEffect()` and `fetch` data from `${import.meta.env.VITE_PMO_API}/states`.

Hint: Call your state setter after you parse the JSON response from `fetch()`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

</details>

## Objective 2: Move the fetch to a `useStates` Hook

In this section, we will:

- Refactor our `<RestaurantList>` component to depend on a custom Hook.

### Writing custom Hooks as services

In a previous section, we created a `useCities` Hook in our `hooks.ts` file.

Putting stateful logic into a custom Hook has numerous benefits:

**Reusability:** One of the primary reasons for creating custom Hooks is reusability.
You might find yourself repeating the same logic in different components—for
example, fetching data from an API, handling form input, or managing a subscription.
By refactoring this logic into a custom Hook, you can easily reuse this functionality
across multiple components, keeping your code DRY (Don't Repeat Yourself).

**Separation of concerns:** Custom Hooks allow you to separate complex logic from the
component logic. This makes your main component code cleaner and more focused on
rendering UI, while the custom Hook handles the business logic or side effects.
It aligns well with the principle of single responsibility, where a function or
module should ideally do one thing only.

**Easier testing and maintenance:** Isolating logic into custom Hooks can make your code
easier to test and maintain. Since Hooks are just JavaScript functions, they can be
tested independently of any component. This isolation can lead to more robust and
reliable code.

**Simplifying components:** If your component is becoming too large and difficult to
understand, moving some logic to a custom Hook can simplify it. This not only
improves readability but also makes it easier for other developers to grasp what
the component is doing.

**Sharing stateful logic:** Custom Hooks can contain stateful logic, which is not
possible with regular JavaScript functions. This means you can have a Hook that
manages its own state and shares this logic across multiple components, something
that would be difficult or impossible with traditional class-based components.

### Setup

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/02-problem/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/02-problem/src/services/restaurant/hooks.ts only

### Verify

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/hooks.test.ts only

### Exercise

- Refactor the existing `useState` and `useEffect` logic into a new `useStates` Hook.

Hint: After moving the state and effect logic into `hooks.ts`, use your new Hook in `RestaurantList.tsx`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/02-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-problem/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 3: Update the `useCities` Hook to fetch data from the API.

In this section, we will:

- Learn about including query parameters in our API calls.

### Including query parameters in API calls

Query parameters are a defined set of parameters attached to the end of a URL.
They are used to define and pass data in the form of key-value pairs. The
parameters are separated from the URL itself by a `?` symbol, and individual
key-value pairs are separated by the `&` symbol.

A basic URL with query parameters looks like this:

```
http://www.example.com/page?param1=value1&param2=value2
```

Here’s a breakdown of this URL:

- Base URL: `http://www.example.com/page`
- Query Parameter Indicator: `?`
- Query Parameters:
    - `param1=value1`
    - `param2=value2`

### Setup

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/03-problem/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/hooks.test.ts only

### Exercise

Update our useCities Hook to fetch cities from the Place My Order API, given a selected state.

When calling the Place My Order API, include the `state` query parameter:

```
http://localhost:7070/cities?state=MO
```

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 4: Create an `apiRequest` helper and use it in the Hooks.

In this section, we will learn how to:

- Handle HTTP error statuses (e.g. `404 Not Found`)
- Catch network errors from `fetch()`

### Checking for error responses

- `.ok`
- `.status`
- `.statusText`

When you make a request with the Fetch API, it does not reject on HTTP error
statuses (like `404` or `500`). Instead, it resolves normally (with an `ok`
status set to `false`), and it only rejects on network failure or if anything
prevented the request from completing.

Here’s the API that `fetch` provides to handle these HTTP errors:

- `.ok`: This is a shorthand property that returns `true` if the response’s status code is in the range `200`-`299`, indicating a successful request.
- `.status`: This property returns the status code of the response (e.g. `200` for success, `404` for `Not Found`, etc.).
- `.statusText`: This provides the status message corresponding to the status code (e.g. `'OK'`, `'Not Found'`, etc.).

@sourceref fetch-handle-not-ok.js

In the example above, we check the `response.ok` property to see if the status
code is in the `200`-`299` (successful) range. If not, we create an `error`
object that contains the status code and text (e.g. `404 Not Found`).

### Handling network errors

Network errors occur when there is a problem in completing the request, like when
the user is offline, the server is unreachable, or there is a DNS lookup failure.

In these cases, the `fetch` API will _not_ resolve with data, but instead it will
throw an error that needs to be caught.

Let’s take a look at how to handle these types of errors:

@sourceref fetch-handle-thrown-error.js

In the example above, we `catch` the `error` and check its type. If it’s already an
`instanceof Error`, then it will have a `message` property and we can use it as-is.
If it’s not, then we can create our own `new Error()` so we _always_ have an error
to consume in our Hooks or components.

### Setup

✏️ Create **src/services/api.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/04-problem/src/services/api.ts

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/04-problem/src/services/restaurant/hooks.ts only

### Verify

✏️ Create **src/services/api.test.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/api.test.ts

✏️ Update **src/services/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.test.ts only

### Exercise

- Implement the `apiRequest` helper function to handle errors returned and thrown from `fetch()`.
- Update the `useCities` and `useStates` Hooks to use the `data` and `error` returned from `apiRequest`.

Hint: Use the new `stringifyQuery` function to convert an object of query parameters to a string:

```js
stringifyQuery({
    param1: "value1",
    param2: "value2",
})
```

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-problem/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/api.ts only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-problem/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 5: Fetch restaurant data

In this section, we will:

- Create a `useRestaurants` Hook for fetching the restaurant data.

<img src="../static/img/react-vite/09-making-http-requests/5-problem.png"
  style="border: solid 1px black; max-width: 800px;"/>

Now that we are able to capture a user’s state and city preferences, we want to only
return restaurants in the selected city.:

<img src="../static/img/react-vite/09-making-http-requests/5-solution.png"
  style="border: solid 1px black; max-width: 800px;"/>

### Setup

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/05-problem/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/interfaces.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/interfaces.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/interfaces.ts only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/05-problem/src/services/restaurant/hooks.ts only

### Verify

If you’ve implemented the solution correctly, when you use the select boxes to choose state
and city, you should see a list of just restaurants from the selected city returned.

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/restaurant/hooks.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.test.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/hooks.test.ts only

### Exercise

- Implement a `useRestaurants` Hook to fetch restaurant data.
- Update `RestaurantList.tsx` to use your new `useRestaurants` Hook.

Hint: The requested URL with query parameters should look like this:
`'/api/restaurants?filter[address.state]=IL&filter[address.city]=Chicago'`

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/05-problem/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/hooks.ts only

</details>

## Next steps

TODO