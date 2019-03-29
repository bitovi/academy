@page angular/restaurant-service Writing a Restaurant Service
@parent angular 6

@description Writing a Restaurant Service

@body

## Overview

In this part, we will:

- Install the `place-my-order` API
- Create a proxy to serve the API
- Update `npm start` script
- Generate a new service via the CLI
- Write a method to make an http request
- Write interfaces to describe response object and restaurant object

## Installing the Place My Order API

We've done some work to create a Place My Order API for use in this app.

```bash
npm install place-my-order-api@1 --save
```

Next make add an api script to your ``package.json``

```js
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "api": "place-my-order-api --port 7070"
  }
```
@highlight 8

Double check the api is working by running ``npm run api`` and navigating to <a href="http://localhost:7070/restaurants" target="\_blank">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data. It will be helpful to have a second terminal tab to run the api command from.

> You must have the API running for your app to work. If you don't see any data, make sure that you've run `npm run api` in another terminal window or in your editor.

## Create a Proxy to Serve API

Next, we'll create a <a href="https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md" target="\_blank">proxy</a> file at the root of our Angular project to access our API for local development purposes.

```shell
touch proxy.conf.json
```

Update the newly created __proxy.conf.json__ file with the following json:

```js
{
  "/api": {
    "target": "http://localhost:7070",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug",
    "changeOrigin": true
  }
}
```

Update the package.json `npm start` script to be `ng serve --proxy-config proxy.conf.json`

```js
"scripts": {
  "ng": "ng",
  "start": "ng serve --proxy-config proxy.conf.json",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "api": "place-my-order-api --port 7070"
},
```
@highlight 3

Now, __restart__ our app using `npm start` and it will run it with the proxy config we created. To test that it's working, navigate to <a href="http://localhost:4200/api/restaurants" target="\_blank">http://localhost:4200/api/restaurants</a> and you should be able to see a list of restaurants.

## Angular Services

Angular <a href="https://angular.io/guide/architecture-services" target="\_blank">Services</a> are pieces of functionality that may not need to be tied to a view like components. 

A common example of a service is making an HTTP request to get data. Many components may require functionality to fetch data, and a Service can help abstract that logic into one place to be used across components.

@sourceref ./service.html
@codepen
@highlight 18-48,81-83,90,95, only

## Importing `HttpClientModule` into _app.module.ts_

For making HTTP requests to interact with an API, Angular provides <a href="https://angular.io/api/common/http/HttpClientModule" target="_blank">HttpClient Module</a>. To use it we'll need to import it in the root module of our app and include it the imports array.

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 3,21

## Using HTTPClient to make a request

<a href="https://angular.io/api/common/http/HttpClient" target="_blank">HTTPClient</a> is a class with methods for making HTTP requests. Methods will return <a href="https://angular.io/guide/observables" target="_blank">Observables</a>. This tutorial won't cover RxJS in depth, but it's worth being aware of Angulars heavy use of it.  

@sourceref ./http.html
@codepen
@highlight 23,25-27,29-31, only

## Exercise: Write a Restaurant Service to fetch a list of restaurants

### The problem

We want to write a service with a method `getRestaurants` that uses `httpClient` to get a list of restaurants from our `/api/restaurants` url.


### What You Need to Know

- How to create a service via the CLI

  ```bash
    ng g service restaurant/restaurant
  ```

- How to use `httpClient` to make a get request (you learned this in section above! ✔️)

### To Verify Your Solution is Correct

Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@sourceref ./restaurant.service.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### Solution

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 3,21

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service-1.ts

## Take Advantage of TypeScript

Thanks to TypeScript we can write interfaces to describe what we expect objects to look like. Consider the user service above returning an array of users. This interface describes what a user (and array of users) should look like:

@sourceref ./service-interface.html
@codepen
@highlight 18-22,28, only

Arrays can also be written as:

```javascript
users: Array<User>
```

To learn more about interfaces in TypeScript, check out our [typescript/interfaces TypeScript guide].

## Exercise: Write an Interface to Describe the Restaurant Object and Data Response

### The problem

We're going to write interfaces to tell Typescript what we expect a restaurant and other related objects to look like, and use them in our restaurant service. A `Restaurant` interface should represent an object like this:

```javascript
let restaurant = {
  name: '', //string
  slug: '', //string
  images: [{
    thumbnail: '', //string
    owner: '', //string
    banner: '' //string
  }],
  menu: {
    lunch: [{
      name: '', //string
      price: '' //number
    }],
    dinner: [{
      name: '', //string
      price: '' //number
    }]
  },
  address: {
    street: '', //string
    city: '', //string
    state: '', //string
    zip: '' //string
  },
  _id: '' //string
}
```

This interface can be written in the __src/app/restaurant/restaurant.service.ts__ file. *

## What You Need to Know

- How to generate an interface via the CLI

  ```bash
    ng g interface restaurant/restaurant
  ```

- How to write an interface in TypeScript (you learned this in section above! ✔️)

We've already written a `responseData` interface that will take an array of restaurants for you. Here's the code to get you started:

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service.ts
@highlight 4,6-8, 18

__src/app/restaurant/restaurant.ts__

@sourceref ./restaurant-starter.ts

### To Verify Your Solution is Correct

Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@sourceref ./restaurant.service-with-interface.spec.ts
@highlight 3,4,79,93-122

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass! If you haven't written the interfaces correctly, you'll see a compile error before the tests runs

## Solution

__src/app/restaurant/restaurant.ts__

@sourceref ./restaurant.ts

In the next step we'll call the `getRestaurants` method in our component to get the list of restaurants.
