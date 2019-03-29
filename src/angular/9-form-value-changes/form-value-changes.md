@page angular/form-value-changes Listening to Form Value Changes
@parent angular 9

@description Listening to Form Value Changes

@body

## Overview

In this part, we will:

- Learn about Observables and Subscriptions
- Create subscription to form changes
- Use onDestroy to unsubscribe from form changes
- Learn about HttpParams
- Create new methods on our RestaurantService
- Learn about Generics
- Get state and city data in the Restaurant Component

## Observables and Subscriptions

For a more robust understanding of Observables, Subscriptions, and other RxJS core tenants check out our [RxJS RxJS guide]. For the following exercises, Observables are lazy collections of multiple values over time. We can subscribe to observables to get any new data, or create and add to Subscriptions of observables.

This example shows creating a subscription to an observable, saving it's value to a member on the component and displaying it in the template. This is useful for when we want to capture and observables values and make changes based on them, but subscriptions do need to be cleaned up to avoid memory leaks. Whenever a component is destroyed an <a href="https://angular.io/api/core/OnDestroy" target="\_blank">ngOnDestroy</a> method is called. This is a good place to put our cleanup code, like unsubscribing from observables.

@sourceref ./observables-subscriptions.html
@codepen
@highlight 53,56,57,58,59,66-78,80-82,85-88,only

This example shows creating a subscription to an observable, and using an <a href="https://angular.io/api/common/AsyncPipe" target="\_blank">async pipe</a> to display the value. This is useful for displaying observable values in templates without the need to unsubscribe as that's handled by the pipe.

@sourceref ./observables-subscriptions-async.html
@codepen
@highlight 53,57,58,65-76,79,only

This example creates a subscription, then adds to it.

@sourceref ./multiple-subscriptions.html
@codepen
@highlight 102-104,108-110,only

## Listening to Form Changes

We can listen to changes to values on FormControls and FormGroup using the valueChanges method, which emits an observable. The following example subscribes to any changes to the FormGroup (which must be unsubscribed on destroy to avoid memory leaks) and also subscribes to a single FormControl and displays the value using an async pipe.

@sourceref ./form-listeners.html
@codepen
@highlight 82-84,only

## Exercise: Listen to Changes on the State and City formControls and log their value to the console

### The problem

Our end goal is to be able to show restaurants based on state, then city. As we move through getting each piece of information from the user we want to be able to update the next step - like getting a list of cities based on the state selected. To start doing this, subscribe to the value changes of the two controls `state` and `city` and log their values to the console.

### What you need to know

- how observables and subscriptions work (you learned this in the section above! ✔️)
- how to subscribe to the valueChanges method on a FormGroup (or FormControl) (you learned this in the section above! ✔️)
- how to unsubscribe (you learned this in the section above! ✔️)

### To Verify Your Solution is Correct

When you interact with the dropdown menus, you should see their values logged to the console as you change them.

### The Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref restaurant.component.ts
@highlight 1,3,18,36,53-57,65,67-78

Now that we know how to get values from our dropdowns, let's populate them with real data. We can get our list of states immediately, but to get our cities, we'll want to make an get request based on the state the user selected.

## Exercise: Write service methods to get states and cities

### The Problem

Write two new methods in the `RestaurantsService` to get state and city lists.

Method 1 - `getStates` takes no params and makes a request to `'/api/states'`

Method 2 - `getCities`, takes a string param called 'state' a makes a request to `'/api/cities?state="{state abbreviation here}"'`

### What You Need to Know

- how to use HttpParams:

  <a href="https://angular.io/api/common/http/HttpParams" target="\_blank">HttpParams</a> are part of Angulars HTTPClient API and help us create parameters for our requests.

  @sourceref ./http-params.html
  @codepen
  @highlight 28,only

### To Verify Your Solution is Correct

Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@sourceref ./restaurant.service-citystate.spec.ts
@highlight 124-161

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The Solution

@sourceref ./restaurant.service-citystate.ts
@highlight 2,20-22,24-27

## Exercise: Use Generics to modify ResponseData interface to work with states and cities

### The Problem

We would like to use the `ResponseData` interface we wrote to describe the response for the state and city requests, but it only works with and array of type `Restaurant`. Convert the `ResponseData` interface use generics so it can take a type of `Restaurant`, `State`, or `City`. We've written the state & city interfaces for you.

Update your __src/app/restaurant/restaurant.service.ts__ file to be:

@sourceref ./restaurant.service-setup-generics.ts
@highlight 9-12, 14-17

### What You Need to Know

- How to write a generic

  For an in-depth understanding of generics in TypeScript, check out our [RxJS RxJS guide]. For now, generics are a way to abstract functions, interfaces, etc to use different types in different situations.

  @sourceref ./generics.html
  @codepen
  @highlight 47-52,54-58,68-71,73-81, only

### The Solution

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service-generics.ts
@highlight 5-7,27,31,36

## Exercise: Get cities and states based on dropdown values.

### The Problem

Now that our service is in working order, let's populate our dropdowns with state and city data. We will want our list of states to be available right away, but we will want to fetch our list of cities only after we have the state value selected by the user.

Requirements

1. Mark state and city dropdowns as disabled until they are populated with data
2. Fetch the states list when the component first loads (`ngOnInit`) and populate the dropdown options with the values
3. When the State FormControl value changes, fetch the list of cities with the selected state as the parameter
4. If the state value changes, fetch the new list of cities, and reset the list of restaurants to an empty array
5. When a City is selected, fetch the list of restaurants

> Hint: You'll want to clear the fake data from the state and city value props, and move the call to get restaurants out of the ngOnInit function.

### What You Need to Know

- How to call service methods in a component

### To Verify Your Solution is Correct

We need to remove a few tests that are no longer relevant to our app's current state. Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts

### The Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component-citystate.ts
@highlight 5,28,33,44-48,65-101, 103-109, 111-121,123-128
