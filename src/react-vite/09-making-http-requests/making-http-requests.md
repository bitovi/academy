@page learn-react-vite/making-http-requests Making HTTP Requests
@parent learn-react-vite 9
@outline 2

@description TODO

@body

## Overview

TODO

## Objective 1

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Create **src/services/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/interfaces.ts

✏️ Create **src/services/restaurant/hooks.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/restaurant/hooks.ts

✏️ Create **src/services/restaurant/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/interfaces.ts

✏️ Create **src/services/restaurant/restaurant.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/restaurant.ts

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

TODO

✏️ Create **src/services/restaurant/restaurant.test.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/restaurant.test.ts

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/01-problem/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/01-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 2

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

Before we begin making services, we must:

- Install the place-my-order API
- Create an environment variable to point to the API

#### Install the Place My Order API

We’ve done some work to create a Place My Order API for use in this app by creating an npm package that will generate fake restaurant data and serve it from port 7070.

✏️ Run:

```bash
npm install place-my-order-api@1
```

✏️ Next add an API script to your `package.json`

@sourceref ../../../exercises/react-vite/09-making-http-requests/01-solution/package.json
@highlight 7, only

✏️ In a **new** terminal window, start the API server by running:

```bash
npm run api
```

Double check the api by navigating to <a href="http://localhost:7070/restaurants">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data. It will be helpful to have a second terminal tab to run the api command from.

#### Create an environment variable

TODO

✏️ Create **.env** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/.env

#### Create the API file

✏️ Create **src/services/api.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.ts

### Verify

TODO

✏️ Create **src/services/api.test.ts** and update it to be:

@sourceref ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.test.ts

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-problem/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.ts only

</details>

## Objective 3

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/api.ts only

✏️ Update **src/services/restaurant/interfaces.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/interfaces.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/interfaces.ts only

✏️ Update **src/services/restaurant/restaurant.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/restaurant.ts ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/restaurant/restaurant.ts only

### Verify

TODO

✏️ Update **src/services/api.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/api.test.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/api.test.ts only

✏️ Update **src/services/restaurant/restaurant.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/02-solution/src/services/restaurant/restaurant.test.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/restaurant.test.ts only

### Exercise

TODO

Give them `stringifyQuery` and have them make `getCities`

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/services/api.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/api.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/api.ts only

✏️ Update **src/services/restaurant/restaurant.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-problem/src/services/restaurant/restaurant.ts ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/restaurant.ts only

</details>

## Objective 4

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

### Verify

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

TODO

Now use getCities to build a Hook and use it.

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/03-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.ts only

</details>

## Objective 5

TODO

### Key concepts

TODO

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Update **src/services/restaurant/hooks.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/hooks.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/hooks.ts only

✏️ Update **src/services/restaurant/interfaces.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/interfaces.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/interfaces.ts only

### Verify

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

✏️ Update **src/services/restaurant/restaurant.test.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/restaurant.test.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/restaurant.test.ts only

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/09-making-http-requests/05-solution/src/pages/RestaurantList/RestaurantList.tsx only

✏️ Update **src/services/restaurant/restaurant.ts** to be:

@diff ../../../exercises/react-vite/09-making-http-requests/04-solution/src/services/restaurant/restaurant.ts ../../../exercises/react-vite/09-making-http-requests/05-solution/src/services/restaurant/restaurant.ts only

</details>

## Next steps

TODO