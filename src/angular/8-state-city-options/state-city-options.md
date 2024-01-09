@page learn-angular/state-city-options City & State Options
@parent learn-angular 8

@description Learn how to create a Reactive Form with Angular. We will create a Reactive Form in the Restaurant component with city and state dropdown inputs.

@body

## Overview

In this part, we will:

- Learn About Reactive Forms
- Import ReactiveFormsModule into our root app
- Create a reactive form in our Restaurant Component
- Create a form in our markup and connect inputs to reactive form

## Problem

Currently, we are showing a list of all restaurants:

<img src="../static/img/angular/8-state-city-options/before.png"
  style="border: solid 1px black; max-width: 320px;"/>

We would like our user to be able to filter restaurants based on city and state. To accomplish this,
we will need to implement a reactive form with two controls, `state` and `city`, that are dropdowns displaying a list of cities and states. It will look like the following:

![Place My Order App city and state dropdowns](../static/img/angular/pmo-dropdowns.gif 'Place My Order App city and state dropdowns')

## Technical Requirements

Create a reactive form with two formControls, `state` and `city`, and use the `formControlName` directive to bind the formControls to their select elements in the template.

## Setup

Here's some code to get you started. Notice that:

- `cities` and `states` are hard coded (for this exercise).
- A `FormBuilder` instance is injected as the `fb` property.
- `createForm` is empty. Use it to initialize the form control.

✏️ Update **src/app/restaurant/restaurant.component.ts** to:

@diff ../7-pull-restaurant-data-into-view/restaurant.component.ts ./restaurant.component-starter.ts only

Make sure to use the `formControl` directive to tie the selects to
their FormControls in the component.

✏️ Update **src/app/restaurant/restaurant.component.html** to include
some boilerplate for the state and city `<select>` controls:

@diff ../7-pull-restaurant-data-into-view/restaurant.component.html ./restaurant.component-starter.html only

✏️ Update **src/app/app.module.ts** to import reactiveForms in the root app module:

@diff ../6-restaurant-service/app.module.ts ./app.module.ts only

## How to Verify Your Solution is Correct

When you visit <a href="http://localhost:4200/restaurants" >localhost:4200/restaurants</a>, there will now be state and city dropdown options populated with fake data.

![Place My Order App city and state dropdowns](../static/img/angular/pmo-dropdowns.gif 'Place My Order App city and state dropdowns')

✏️ Update the spec file **src/app/restaurant/restaurant.component.spec.ts** to be:

@sourceref ./restaurant.component.spec.ts
@highlight 7,122,293-297,299-306,308-313, only

✏️ Update the spec file **src/app/app.component.spec.ts** to be:

@diff ../7-pull-restaurant-data-into-view/app.component.spec.ts ./app.component.spec.ts only

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## What You Need to Know

To solve this, you will need to know:

- How to create a FormControl
- How to use `formControl` directive in the DOM
- How to create a FormGroup
- How to use FormBuilder
- How to use ngFor (you learned this in the Creating Components section! ✔️)

## Reactive Forms

We're eventually going to use select boxes to handle our user's input. Angular's <a href="https://angular.io/guide/reactive-forms" >Reactive Forms</a> API provides a clean way to get data from user input and do work based on it.

> From the docs: Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around observable streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

## ReactiveFormsModule

To use reactive forms we must import our ReactiveFormsModule into the root app.

@sourceref ./reactive-module.html
@codepen
@highlight 79,only

## FormControl

The basic element of a reactive form is the <a href="https://angular.io/api/forms/FormControl" >FormControl</a>. This class manages the form input model and connection to it's input element in the DOM and inherits from the <a href="https://angular.io/api/forms/AbstractControl" >AbstractControl</a>
class. It's worth getting familiar with the methods available in this class (like setValidators and setValue), as they're used quite often in reactive form development. The formControl is bound to it's element in the DOM using the `[formControl]` directive.

@sourceref ./form-control.html
@codepen
@highlight 17,23-29,33,only

## FormGroup

A <a href="https://angular.io/api/forms/FormGroup" >FormGroup</a> is a way of grouping FormControls and tracking the state of the entire group. For instance, if you want to get the values of all of your FormControls to submit as an object of those values, you'd use `formGroupName.value`. Notice the way we connect our input in the markup is slightly different - we can use the `formControlName` directive to bind to the name value of a FormControl in our FormGroup. Groups can be nested within other groups or arrays.

@sourceref ./form-group.html
@codepen
@highlight 17,23-37,39,43,45-49,53-55,only

## FormArray

A <a href="https://angular.io/api/forms/FormArray" >FormArray</a> aggregates FormControls into an array. It's different than FormGroup in that the controls inside are serialized as an array. FormArrays are very useful when dealing with repeated FormControls or dynamic forms that allow users to create additional inputs. Arrays can be nested in groups or other arrays.

This example shows the use of FormArray and using an `insert` method to dynamically add more FormGroups to the `users` FormArray.

@sourceref ./form-array.html
@codepen
@highlight 17,23-45,47,53-66,70-81,only

## FormBuilder

<a href="https://angular.io/api/forms/FormBuilder">FormBuilder</a> is a shorthand way to quickly write forms by reducing boilerplate code of manually having to write `new FormControl`, `new FormGroup`, `new FormArray` repeatedly.

@sourceref ./form-builder.html
@codepen
@highlight 17,40,42,45-49,only

## Form Nullability

Since Angular v14, Angular Forms are strictly typed by default.

By default, all controls include the type `null`. The reason for the `null` type is that when calling `reset` on the form or its controls, the values are updated to `null`.

To avoid the default behavior and having to handle possible `null` values, we can use the `NonNullableFormBuilder`, either via injecting it or accessing the FormBuilder's `nonNullable` property.

Using `NonNullableFormBuilder` will make `reset` method use the control's initial value instead of `null`.

```typescript
constructor(private fb: NonNullableFormBuilder) {}
```

```typescript
this.myQuickForm = this.fb.nonNullable.group({
  firstName: { value: '', disabled: false },
  lastName: { value: '', disabled: false },
  email: { value: '', disabled: false },
});
```

## The Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.component.ts** to:

@sourceref ./restaurant.component.ts
@highlight 53-62

✏️ Update **src/app/restaurant/restaurant.component.html** to:

@sourceref ./restaurant.component.html
@highlight 6,10-12,18,22-24,only

</details>
