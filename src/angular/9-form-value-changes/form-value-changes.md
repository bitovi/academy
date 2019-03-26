@page angular/form-value-changes Listening to Form Value Changes
@parent angular 9

@description Listening to Form Value Changes

@body

## Overview

In this part, we will:

- Learn about Observables and Subscriptions
- Create subscription to form changes
- Use onDestroy to unsubscribe from form changes

## Observables and Subscriptions

For a more robust understanding of Observables, Subscriptions, and other RxJS core tenants check out our [RxJS RxJS guide]. For the following exercises, Observables are lazy collections of multiple values over time. We can subscribe to observables to get any new data, or create and add to Subscriptions of observables.

This example shows creating a subscription to an observable, saving it's value to a member on the component and displaying it in the template. This is useful for when we want to capture and observables values and make changes based on them, but subscriptions do need to be cleaned up to avoid memory leaks. Whenever a component is destroyed an <a href="https://angular.io/api/core/OnDestroy" target="_blank">ngOnDestroy</a> method is called. This is a good place to put our cleanup code, like unsubscribing from observables.

@sourceref ./observables-subscriptions.html
@codepen
@highlight 53,56,57,58,59,66-78,80-82,85-88,only

This example shows creating a subscription to an observable, and using an <a href="https://angular.io/api/common/AsyncPipe" target="_blank">async pipe</a> to display the value. This is useful for displaying observable values in templates without the need to unsubscribe as that's handled by the pipe. 

@sourceref ./observables-subscriptions-async.html
@codepen
@highlight 53,57,58,65-76,79,only

This example creates a subscription, then adds to it.

@sourceref ./multiple-subscriptions.html
@codepen
@highlight 102-104,108-110,only

## Listening to Form Changes

We can listen to changes to values on FormControls and FormGroup using the valueChanges method, which emits an observable. The following example subscribes to any changes to the FormGroup(which must be unsubscribed on destroy to avoid memory leaks) and also subscribes to a single FormControl and displays the value using an async pipe.

@sourceref ./form-listeners.html
@codepen
@highlight 66,71,84-86,88,only

## Exercise: Listen to Changes on the State and City formControls and console log their value

### The problem

Our end goal is to be able to show restaurants based on state, then city. As we move through getting each piece of information from the user we want to be able to update the next step - like getting a list of cities based on the state selected. To start doing this, subscribe to the value changes of the two controls `state` and `city` and log their values to the console.

### What you need to know

- how observables and subscriptions work (you learned this in the section above! ✔️)
- how to subscribe to the valueChanges method on a FormGroup(or FormControl) (you learned this in the section above! ✔️)
- how to unsubscribe (you learned this in the section above! ✔️)

### To Verify Your Solution is Correct

When you interact with the dropdown menus, you should see their values logged to the console as you change them.

### The Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref restaurant.component.ts
@highlight 1,3,18,36,53-55,63,65-76

