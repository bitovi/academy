@page learn-angular/form-value-changes Filter Cities by State
@parent learn-angular 9

@description Learn how to listen to form value changes with Angular.

@body

## Overview

In this part, we will:

- Learn about Observables and Subscriptions
- Learn about listening to form value changes
- Learn about AbstractControl properties and methods
- Create subscription to form changes
- Use onDestroy to unsubscribe from form changes
- Learn about HttpParams
- Create new methods on our RestaurantService
- Learn about Generics
- Get state and city data in the Restaurant Component

## Problem 1: Listen to Changes on the State and City formControls and log their value to the console

Our end goal is to be able to show restaurants based on state, then city. As we move through getting each piece of information from the user we want to be able to update the next step - like getting a list of cities based on the state selected. We'll implement this form functionality in a few small steps.

## P1: What You Need to Know

- How observables and subscriptions work
- How to subscribe to the valueChanges method on a FormGroup (or FormControl)
- How to unsubscribe from subscriptions

## Observables and Subscriptions

For a more robust understanding of Observables, Subscriptions, and other RxJS core tenants check out our  <a href="/academy/academy/learn-rxjs.html">RxJS RxJS guide</a>. For the following exercises, Observables are lazy collections of multiple values over time. We can subscribe to observables to get any new data, or create and add to Subscriptions of observables.

This example shows creating a subscription to an observable, saving it's value to a member on the component and displaying it in the template. This is useful for when we want to capture and observables values and make changes based on them, but subscriptions do need to be cleaned up to avoid memory leaks. Whenever a component is destroyed an <a href="https://angular.io/api/core/OnDestroy" target="\_blank">ngOnDestroy</a> method is called. This is a good place to put our cleanup code, like unsubscribing from observables.

In this example, click the button to start subscribing to the observables - you'll see two variables logged: the new observable value and the subscription value. Then click the "remove component" button to see what happens when a component is destroyed. Next delete line 95, follow the same process and see what happens!

@sourceref ./observables-subscriptions.html
@codepen
@highlight 14,17,49,50,62-64,71,73,77-78,80,84-90,92-97,only

This example shows creating a subscription to an observable, and using an <a href="https://angular.io/api/common/AsyncPipe" target="\_blank">async pipe</a> to display the value. This is useful for displaying observable values in templates without the need to unsubscribe as that's handled by the pipe when the component is destroyed .

@sourceref ./observables-subscriptions-async.html
@codepen
@highlight 53,57,58,65-76,79,only

This example shows how to unsubscribe from observable multiple.

@sourceref ./multiple-subscriptions.html
@codepen
@highlight 100-102,105-107,115-116,only

## Listening to Form Changes

We can listen to changes to values on FormControls and FormGroup using the valueChanges method, which emits an observable. The following example subscribes to any changes to the FormGroup (which must be unsubscribed on destroy to avoid memory leaks) and also subscribes to a single FormControl and displays the value using an async pipe.

@sourceref ./form-listeners.html
@codepen
@highlight 53-55,only

## Call Methods on FormControls

The ReactiveForms API makes it easy for us to change our FormControls as needed. As a reminder, the FormControl class extends the <a href="https://angular.io/api/forms/AbstractControl">AbstractControl</a> class which has a lot of helpful properties and methods on it. The following example shows enabling and disabling controls via the `enable` and `disable` methods, and displaying the `enabled` FormControl property.

@sourceref ./form-control.html
@codepen
@highlight 27-28,33-34,39-40,63-71,only

## P1: Technical Requirements

1. Subscribe to the `state` and `city` formControl value changes and log the resulting value to the console.
2. Unsubscribe from subscription created in step 1 in the `ngOnDestroy` function

## P1: To Verify Your Solution is Correct

When you interact with the dropdown menus, you should see their values logged to the console as you change them.

## P1: Solution

✏️ Update __src/app/restaurant/restaurant.component.ts__

@sourceref restaurant.component.ts
@highlight 1,3-4,19,37,53-57,65,67-78

Now that we know how to get values from our dropdowns, let's populate them with real data. We can get our list of states immediately, but to get our cities, we'll want to make an get request based on the state the user selected.

## Problem 2: Write Service Methods to Get States and Cities from API

We want to be able to get lists of cities and states from our API to populate the dropdown options.

## P2: What You Need to Know

## How to use HttpParams

<a href="https://angular.io/api/common/http/HttpParams" target="\_blank">HttpParams</a> are part of Angulars HTTPClient API and help us create parameters for our requests.

@sourceref ./http-params.html
@codepen
@highlight 33-34,only

## P2: Technical Requirements

Write two new methods in the `RestaurantsService` to get state and city lists.

Method 1 - `getStates` takes no params and makes a request to `'/api/states'`

Method 2 - `getCities`, takes a string param called 'state' a makes a request to `'/api/cities?state="{state abbreviation here}"'`

## P2: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@diff ../6-restaurant-service/restaurant.service-with-interface.spec.ts ./restaurant.service-citystate.spec.ts


> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P2: Solution

✏️ Update __src/app/restaurant/restaurant.service.ts__

@diff ../6-restaurant-service/restaurant.service.ts ./restaurant.service-citystate.ts


## Problem 3: Use Generics to Modify ResponseData interface to Work with States and Cities Data

We would like to use the `ResponseData` interface we wrote to describe the response for the state and city requests, but it only works with and array of type `Restaurant`.

## P3: What You Need to Know

## How to write a generic

For an in-depth understanding of generics in TypeScript, check out our [learn-typescript/generics TypeScript guide]. For now, generics are a way to abstract functions, interfaces, etc to use different types in different situations.

This example shows creating a generic for a list that can be used to create arrays of various types, including Dinosaurs. Codepen doesn't have a typescript compiler that will throw errors, but if you paste the code into your IDE you'll be able to see the TypeScript errors thrown.

@sourceref ./generics.html
@codepen
@highlight 18-23,25-29,36,41,46,47,51-55,57-61,63-67,68-71,only

## P3: Technical Requirements

Convert the `ResponseData` interface use generics so it can take a type of `Restaurant`, `State`, or `City`. We've written the state & city interfaces for you. Make sure to update the getRestaurants method in the RestaurantComponent as well.

## P3: Setup

✏️ Update your __src/app/restaurant/restaurant.service.ts__ file to be:

@diff ./restaurant.service-citystate.ts ./restaurant.service-setup-generics.ts

## P3: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@diff ./restaurant.service-citystate.spec.ts ./restaurant.service-generics.spec.ts


## P3: Solution

✏️ Update __src/app/restaurant/restaurant.service.ts__

@diff ./restaurant.service-setup-generics.ts ./restaurant.service-generics.ts


✏️ Update __src/app/restaurant/restaurant.component.ts__

@diff restaurant.component.ts ./restaurant-generics.component.ts only


## Problem 4: Get Cities and States Based on Dropdown Values

Now that our service is in working order, let's populate our dropdowns with state and city data. We will want our list of states to be available right away, but we will want to fetch our list of cities only after we have the state value selected by the user.

## P4: Technical Requirements

1. Rewrite the `Data` interface to be a generic to work with State and City types as well
2. Mark state and city dropdowns as disabled until they are populated with data
3. Fetch the states list when the component first loads (`ngOnInit`) and populate the dropdown options with the values
4. When the State FormControl value changes, fetch the list of cities with the selected state as the parameter
5. If the state value changes, fetch the new list of cities, and reset the list of restaurants to an empty array
6. When a City is selected, fetch the list of restaurants

> Hint: You'll want to clear the fake data from the state and city value props, and move the call to get restaurants out of the ngOnInit function.

## P4: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@diff ../8-state-city-options/restaurant.component.spec.ts ./restaurant.component-citystate.spec.ts

## P4: What You Need to Know

- How to call service methods in a component
- How to write generics

## P4: Solution

✏️ Update __src/app/restaurant/restaurant.component.ts__

@diff ./restaurant-generics.component.ts ./restaurant.component-citystate.ts only
