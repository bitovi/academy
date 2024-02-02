@page learn-angular/form-value-changes Listening to Form Changes
@parent learn-angular 9

@description Learn how to listen to form value changes with Angular.

@body

## Overview

In this part, we will:

- Learn about Observables and Subscriptions
- Learn about listening to form value changes
- Learn about AbstractControl properties and methods
- Create Subscription to form changes
- Use onDestroy to unsubscribe from form changes
- Learn about `HttpParams`
- Create new methods on our `RestaurantService`
- Learn about Generics
- Get state and city data in the Restaurant Component

## Problem 1: Listen to changes on the state and city formControls and log their value to the console

Our end goal is to be able to show restaurants based on state, then city. As we move through getting each piece of information from the user we want to be able to update the next step - like getting a list of cities based on the state selected. We’ll implement this form functionality in a few small steps.

## P1: What you need to know

- How Observables and Subscriptions work
- How to subscribe to the `valueChanges` method on a `FormGroup` (or `FormControl`)
- How to unsubscribe from Subscriptions

## Observables and Subscriptions

For a more robust understanding of Observables, Subscriptions, and other RxJS core tenants check out our [RxJS guide](../learn-rxjs.html). For the following exercises, Observables are lazy collections of multiple values over time. We can subscribe to Observables to get any new data, or create and add to Subscriptions of Observables.

This example shows creating a Subscription to an Observable, saving it’s value to a member on the component and displaying it in the template. This is useful for when we want to capture an Observable’s values and make changes based on them, but Subscriptions do need to be cleaned up to avoid memory leaks.

Whenever a component is destroyed an <a href="https://angular.io/api/core/OnDestroy">ngOnDestroy</a> method is called. This is a good place to put our cleanup code, like unsubscribing from Observables.

In this example, click the button to start subscribing to the Observables - you’ll see two variables logged: the new `Observable` value and the Subscription value. Then click the "remove component" button to see what happens when a component is destroyed. Next delete lines 92 and 93, follow the same process and see what happens!

@sourceref ./observables-subscriptions.html
@codepen
@highlight 48,49-51,56,60-62,69,75,80-88,92-93,only

This example shows creating a Subscription to an `Observable`, and using an <a href="https://angular.io/api/common/AsyncPipe">async pipe</a> to display the value. This is useful for displaying `Observable` values in templates without the need to unsubscribe as that’s handled by the pipe when the component is destroyed .

@sourceref ./observables-subscriptions-async.html
@codepen
@highlight 50-52,56,61-73,only

This example shows how to unsubscribe from multiple Observables.

@sourceref ./multiple-subscriptions.html
@codepen
@highlight 58,95-99,101-105,109-110,only

### Handling errors

When an `Observable` encounters an error, it emits an error notification and terminates the stream. Proper error handling ensures your application can manage and respond to errors gracefully.

You can handle errors directly in the subscription by providing an error handling function. This function is called if the `Observable` emits an error.

Here’s an example:

```js
of([1, 2, 3]).subscribe({
  next: (v) => console.info(v),
  error: (e) => console.error(e),
  complete: () => console.info('complete')
});
```
@highlight 3

In this pattern, the subscription object includes next for handling emitted values, error for handling errors, and complete for handling the completion of the `Observable` stream.

The `catchError` operator is a more versatile tool for error handling. It allows you to intercept an error and return a new `Observable` or rethrow an error. This can be useful for implementing fallback values or more complex error handling strategies.

```js
of([1, 2, 31]).pipe(
  catchError(() => {
    return of([]);
  })
).subscribe({
  next: returnedObservable => {
    console.info(returnedObservable);
  },
  error: console.error
});
```
@highlight 2-3, 6-7

In the case above, catchError is used to intercept an error and return an empty array as a fallback, ensuring that the `Observable` stream does not terminate on error.

Sometimes, you might want to perform some operation on the error and then rethrow it. This can be done within `catchError`.

```js
of([1, 2, 31]).pipe(
  catchError(error => {
    throw `Caught error: ${error}`;
  })
).subscribe({
  next: console.info,
  error: thrownError => {
    console.error(thrownError);
  }
});
```
@highlight 2-3, 7-8

Here, `catchError` catches the error, modifies it, and then rethrows it. The rethrown error is then handled in the error callback of the subscription.

## Listening to form changes

We can listen to changes to values on `FormControl`s and `FormGroup` using the `valueChanges` method, which emits an Observable. The following example subscribes to any changes to the `FormGroup` (which must be unsubscribed on destroy to avoid memory leaks).

@sourceref ./form-listeners.html
@codepen
@highlight 51-53,only

## P1: Technical requirements

1. Subscribe to the `state` and `city` formControl value changes and log the resulting value to the console.
2. Unsubscribe from Subscriptions within `restaurant.component` in the `ngOnDestroy` function

## P1: Setup

✏️ Update **src/app/restaurant/restaurant.component.ts** to be:

@diff ../8-state-city-options/restaurant.component.ts ./restaurant.component.problem.ts only

## P1: How to verify your solution is correct

When you interact with the dropdown menus, you should see their values logged to the console as you change them.

## P1: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.component.ts**

@diff ./restaurant.component.problem.ts ./restaurant.component.ts only

</details>

Now that we know how to get values from our dropdowns, let’s populate them with real data. We can get our list of states immediately, but to get our cities, we’ll want to make a GET request based on the state the user selected.

## Problem 2: Write service methods to get states and cities from API

We want to be able to get lists of cities and states from our API to populate the dropdown options.

## P2: What you need to know

## How to use HttpParams

<a href="https://angular.io/api/common/http/HttpParams">HttpParams</a> are part of Angular’s HttpClient API and help us create parameters for our requests.

@sourceref ./http-params.html
@codepen
@highlight 33-35,only

## P2: Technical requirements

Write two new methods in the `RestaurantsService` to get state and city lists.

Method 1 - `getStates` takes no params and makes a request to `'/states'`

Method 2 - `getCities`, takes a string param called `state` and makes a request to `'/cities?state="{state abbreviation here}"'`

## P2: Setup

✏️ Update **src/app/restaurant/restaurant.service.ts**

@diff ../6-restaurant-service/restaurant.service.ts ./restaurant.service-citystate.problem.ts only

## P2: How to verify your solution is correct

✏️ Update the spec file **src/app/restaurant/restaurant.service.spec.ts** to be:

@diff ../6-restaurant-service/restaurant.service-with-interface.spec.ts ./restaurant.service-citystate.spec.ts only

## P2: Solution

> If you’ve implemented the solution correctly, when you run `npm run test` all tests will pass!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.service.ts**

@diff ./restaurant.service-citystate.problem.ts ./restaurant.service-citystate.ts only

</details>

## Problem 3: Use generics to modify ResponseData interface to work with states and cities data

We would like to use the `ResponseData` interface we wrote to describe the response for the state and city requests, but it only works with an array of type `Restaurant`.

## P3: What you need to know

## How to write a generic

For an in-depth understanding of generics in TypeScript, check out our [learn-typescript/generics TypeScript guide]. For now, generics are a way to abstract functions, interfaces, etc to use different types in different situations.

This example shows creating a generic for a list that can be used to create arrays of various types, including Dinosaurs. Codepen doesn’t have a TypeScript compiler that will throw errors, but if you paste the code into your IDE you’ll be able to see the TypeScript errors thrown.

@sourceref ./generics.html
@codepen
@highlight 18-23,25-29,36-38,43-45,50,51,56-60,62-66,68-77,only

## P3: Technical requirements

Convert the `ResponseData` interface to use generics so it can take a type of `Restaurant`, `State`, or `City`. We’ve written the state & city interfaces for you. Make sure to update the `getRestaurants` method in the `RestaurantComponent` as well.

## P3: Setup

✏️ Update your **src/app/restaurant/restaurant.service.ts** file to be:

@diff ./restaurant.service-citystate.ts ./restaurant.service-setup-generics.ts only

## P3: How to verify your solution is correct

✏️ Update the spec file **src/app/restaurant/restaurant.service.spec.ts** to be:

@diff ./restaurant.service-citystate.spec.ts ./restaurant.service-generics.spec.ts only

## P3: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.service.ts**

@diff ./restaurant.service-setup-generics.ts ./restaurant.service-generics.ts only

✏️ Update **src/app/restaurant/restaurant.component.ts**

@diff restaurant.component.ts ./restaurant-generics.component.ts only

</details>

## Problem 4: Get cities and states based on dropdown values

Now that our service is in working order, let’s populate our dropdowns with state and city data. We will want our list of states to be available right away, but we will want to fetch our list of cities only after we have the state value selected by the user.

## P4: What you need to know

- How to call service methods in a component
- How to write generics

## Call methods on FormControls

The ReactiveForms API makes it easy for us to change our `FormControl`s as needed. As a reminder, the `FormControl` class extends the <a href="https://angular.io/api/forms/AbstractControl">AbstractControl</a> class which has a lot of helpful properties and methods on it. The following example shows enabling and disabling controls via the `enable` and `disable` methods, and displaying the `enabled` FormControl property.

@sourceref ./form-control.html
@codepen
@highlight 27-33, 39-45, 51-57, 80-88, only

## P4: Technical requirements

1. Rewrite the `Data` interface to be a generic to work with State and City types as well
2. Mark state and city dropdowns as disabled until they are populated with data
3. Fetch the states list when the component first loads (`ngOnInit`) and populate the dropdown options with the values
4. When the State `FormControl` value changes, fetch the list of cities for the newly selected state and reset the list of restaurants to an empty array
5. When a City is selected, fetch the list of restaurants

> Hint: You’ll want to clear the fake data from the state and city value props, and move the call to get restaurants out of the `ngOnInit` function.

## P4: How to verify your solution is correct

✏️ Update the spec file **src/app/restaurant/restaurant.component.spec.ts** to be:

@diff ../8-state-city-options/restaurant.component.spec.ts ./restaurant.component-citystate.spec.ts only

## P4: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.component.ts**

@diff ./restaurant-generics.component.ts ./restaurant.component-citystate.ts only

</details>
