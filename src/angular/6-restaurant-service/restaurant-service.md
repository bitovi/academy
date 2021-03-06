@page learn-angular/restaurant-service Writing a Restaurant Service
@parent learn-angular 6

@description Learn how to write an Angular service that gets data from the server.

@body

## Overview

In this part, we will:

- Install the place-my-order API
- Update `npm start` script
- Create an environment variable for API URL
- Generate a new service via the CLI
- Write a method to make an http request
- Write interfaces to describe response object and restaurant object


## Problem 1: Write a Restaurant Service to Fetch a List of Restaurants

We want to create an Angular service with a method that will get a list of restaurants from our Place My Order API.

## P1: What You Need to Know

To complete this problem, you'll need to know:

- The basics of Angular Services.
- How to generate a service.
- How to inject `HttpClientModule` into your app.
- How to use `HTTPClient` to make a request in a service.

## Angular Service Basics

Angular <a href="https://angular.io/guide/architecture-services" target="\_blank">Services</a> are pieces of functionality that may not need to be tied to a view like components. A common example of a service is making an HTTP request to get data. Many components may require functionality to fetch data, and a Service can help abstract that logic into one place to be used across components.

The following example shows a `UsersService` with methods on it that return a list of users and get a user by ID, and shows how the UsersService is injected into the `AppComponent` and calls the `getUsers` to get the list of users to display in the template.

@sourceref ./service.html
@codepen
@highlight 18-48,81-83,90,95, only

## Generating a service

To generate a `UsersService`, you run:

```shell
ng g service users
```

This will create a `src/app/users.service.ts` file and associated `spec`
test file.

> HINT: You can generate a service in a folder `ng g service folder/users`

## Injectable

<a href="https://angular.io/api/core/Injectable" target="_blank">`Injectable`</a> is an Angular decorator that makes the class it's decorating available to Angular's <a href="https://angular.io/api/core/Injector" target="_blank">Injector</a> for creation. In the case of creating service to get data to use in our application, we want those services to be able to be injected into the app components we need the services in.

Angular uses the injector to create dependencies using providers - which know how to create said dependencies. We can then inject our service into our components constructor to take advantage of Angular's dependency injection pattern.

## Importing `HttpClientModule` into _app.module.ts_

For making HTTP requests to interact with an API, Angular provides <a href="https://angular.io/api/common/http/HttpClientModule" target="\_blank">HttpClient Module</a>. To use it we'll need to import it in the root module of our app and include it the imports array.

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 3,21

## Using HTTPClient to Make a Request

<a href="https://angular.io/api/common/http/HttpClient" target="\_blank">HTTPClient</a> is a class with methods for making HTTP requests. Methods will return <a href="https://angular.io/guide/observables" target="\_blank">RxJS Observables</a>.

@sourceref ./http.html
@codepen
@highlight 23,25-27,29-31, only

This tutorial won't cover RxJS in depth, but it's worth being aware of Angulars
heavy use of it. Checkout our [learn-rxjs] tutorial for more information.

## P1: Technical Requirements

Write a `RestaurantService` with a method `getRestaurants` that uses `httpClient` to get a list of restaurants from an environment variable\ + `/restaurants`. For example, we could get restaurants like:

```typescript
const httpClient = new HttpClient();
const restaurantService = new RestaurantService( httpClient );

restaurantService.getRestaurants() //-> Observable<Array<Object>>
```
@highlight 4

Note:

- `getRestaurants` will return an RxJS observable that emits an array of
  restaurants.  
- Typically, services and `HttpClient` are injected into components and not created
  as shown above.
- We want to create `RestaurantService` in `src/app/restaurant/restaurant.service.ts`.

## P1: Setup

Before we begin making services, we must:

- Install the place-my-order API
- Create an environment variable to point to the API

### Installing the Place My Order API

We've done some work to create a Place My Order API for use in this app by creating an NPM package that will generate fake restaurant data and serve it from port 7070.

✏️ Run:

```bash
npm install place-my-order-api --save
```

✏️ Next make add an api script to your `package.json`

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

✏️ In __new__ terminal window, start the API server by running:

```bash
npm run api
```

Double check the api by navigating to <a href="http://localhost:7070/restaurants" target="\_blank">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data. It will be helpful to have a second terminal tab to run the api command from.

### Create an Environment Variable

The way we're accessing our locally run API during development may be different than how we access it in production. To prepare for this, we'll set an environment variable to do what we need. Angular already generated an `environments` folder for us with two files: 

`src/environments/environment.ts`

```typescript
 // This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

```

`src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true
};
```

When developing locally Angular will use the `environment.ts` file, but when we create a production build the `environment.prod.ts` file will be used. We'll update the production file when we get ready to deploy, but for now, update the `environment.ts` file to include an `apiUrl` key with the value of where our API is being served from: `http://localhost:7070`.

✏️  Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:7070'
};
```

Now generate the restaurant service:

✏️ Run

```shell
ng g service restaurant/restaurant
```

## P1: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@sourceref ./restaurant.service.spec.ts

✏️ Quit the previous tests running and restart them:

```shell
npm run test
```

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P1: Solution

✏️ Update __src/app/app.module.ts__ to inject the `HttpClientModule`:

@sourceref ./app.module.ts
@highlight 3,21

✏️ Update __src/app/restaurant/restaurant.service.ts__ to make a request to the API server `/restaurants`:

@sourceref ./restaurant.service-1.ts

## Problem 2: Write an Interface to Describe the Restaurant Object and Data Response

Currently, from TypeScript's perspective, `getRestaurants()` can return anything. This
means if we use the data from `getRestaurants()`, TypeScript will not be able to notice
any mistakes.  This undermines the whole point of TypeScript!

## P2: What You Need to Know

To solve this problem, you'll need to:

- Understand interfaces in TypeScript
- How to generate an interface with Angular's CLI.

## Interfaces in TypeScript

Thanks to TypeScript we can write interfaces to describe what we expect objects to look like. Consider the user service below returning an array of users. This interface describes what a user (and array of users) should look like:

@sourceref ./service-interface.html
@codepen
@highlight 18-22,28, only

Arrays can also be written as:

```javascript
users: Array<User>
```

To learn more about interfaces in TypeScript, check out our [learn-typescript/interfaces TypeScript guide].

## Generate an Interface

Use the following to generate an interface with the CLI:

```bash
ng g interface user
```

This will generate:

```typescript
export interface User {
}
```

## P2: Technical Requirements

Write interfaces to tell TypeScript what we expect restaurant and other related objects to look like and use them in our restaurant service. A `Restaurant` interface should represent an object like this:

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

This interface should be written in the __src/app/restaurant/restaurant.service.ts__ file.

## P2: Setup

We've already written a `ResponseData` interface that will take an array of restaurants for you. Here's the code to get you started:

✏️ Update __src/app/restaurant/restaurant.service.ts__ to import the `Restaurant` interface, use
it within the `ResponseData` interface which is used by `httpClient.get`:

@diff ./restaurant.service-1.ts ./restaurant.service.ts


✏️ Generate the restaurant interface:

```bash
ng g interface restaurant/restaurant
```

✏️ Update __src/app/restaurant/restaurant.ts__ with some starter code that includes
some scaffolding for some of the sub-interfaces within the `Restaurant` interfaces:

@sourceref ./restaurant-starter.ts

## P2: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@diff ./restaurant.service.spec.ts ./restaurant.service-with-interface.spec.ts


> If you've implemented the solution correctly, when you run `npm run test` all tests will pass! If you haven't written the interfaces correctly, you'll see a compile error before the tests runs. You might need to restart the test script to see the compile error.

## P2: Solution

✏️  Update __src/app/restaurant/restaurant.ts__ to:

@diff ./restaurant-starter.ts ./restaurant.ts


In the next step we'll call the `getRestaurants` method in our component to get the list of restaurants.