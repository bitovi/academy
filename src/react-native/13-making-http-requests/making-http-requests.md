@page learn-react-native/making-http-requests Making HTTP Requests
@parent learn-react-native 13
@outline 3

@description Learn about how to make `fetch` requests and render requested data in React Native components.

@body

## Overview

In this section, you will:

- TODO

## Objective: Add `fetch` requests

### Concept TODO

TODO

### Setup

Before we begin requesting data from our API, we need to install the "place-my-order-api" module, which will generate fake restaurant data and serve it from port `7070`.

✏️ Run:

```bash
npm install place-my-order-api@1
```

We will also need to set up our environment.

✏️ Run:

```bash
npm install react-native-dotenv@3
```
✏️ Update **babel.config.js** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-solution/babel.config.js ../../../exercises/react-native/13-http-requests/01-problem/babel.config.js

✏️ Create **.env** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/.env.example

✏️ Next add an API script to your `package.json`

@diff ../../../exercises/react-native/12-navigation-params/01-solution/package.json ../../../exercises/react-native/13-http-requests/01-problem/package.json only

✏️ In a **new** terminal window, start the API server by running:

```bash
npm run api
```

Double-check the API by navigating to <a href="http://localhost:7070/restaurants">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data.

It will be helpful to have a third terminal tab for the `npm run api` command.

✏️ Create **src/services/pmo/api/api.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/api/api.ts

✏️ Create **src/services/pmo/api/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/api/index.ts

✏️ Create **src/services/pmo/restaurant/hooks.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/restaurant/hooks.ts

✏️ Create **src/services/pmo/restaurant/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/restaurant/interfaces.ts

✏️ Create **src/services/pmo/restaurant/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/restaurant/index.ts

✏️ Create **src/components/Loading/Loading.tsx** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/components/Loading/Loading.tsx

✏️ Create **src/components/Loading/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/components/Loading/index.ts

### Verify

✏️ Create **src/services/pmo/api/api.test.tx** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/api/api.test.ts

✏️ Create **src/services/pmo/restaurant/hooks.test.ts** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/restaurant/hooks.test.ts

✏️ Create **src/components/Loading/Loading.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/13-http-requests/01-problem/src/components/Loading/Loading.test.tsx

### Exercise

TODO

### Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/api/api.ts ../../../exercises/react-native/13-http-requests/01-solution/src/services/pmo/api/api.ts only

✏️ Update **src/services/pmo/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-native/13-http-requests/01-problem/src/services/pmo/restaurant/hooks.ts ../../../exercises/react-native/13-http-requests/01-solution/src/services/pmo/restaurant/hooks.ts only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/13-http-requests/01-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/13-http-requests/01-solution/src/screens/StateList/StateList.tsx only

✏️ Update **src/screens/CityList/CityList.tsx** to be:

@diff ../../../exercises/react-native/13-http-requests/01-problem/src/screens/CityList/CityList.tsx ../../../exercises/react-native/13-http-requests/01-solution/src/screens/CityList/CityList.tsx only

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/13-http-requests/01-problem/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/13-http-requests/01-solution/src/screens/RestaurantList/RestaurantList.tsx only

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/13-http-requests/01-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/13-http-requests/01-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx only

</details>

## Next steps

Next, we will learn how to [learn-react-native/user-inputs] in React Native applications.