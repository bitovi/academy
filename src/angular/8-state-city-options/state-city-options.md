@page angular/state-city-options City & State Options
@parent angular 8

@description Creating city & state options for filtering restaurants

@body

## Overview

In this part, we will:

- Learn About Reactive Forms
- Import `ReactiveFormsModule` into our root app
- Create a reactive form in our Restaurant Component
- Create a form in our markup and connect inputs to reactive form

## Reactive Forms

We're going to use select boxes to handle our user's input. Angular's <a href="https://angular.io/guide/reactive-forms" target="\_blank">Reactive Forms</a> API provides a clean way to get data from user input and do work based on it.

> From the docs: Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around observable streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

### ReactiveFormsModule

To use reactive forms we must import our `ReactiveFormsModule` into the root app.

@sourceref ./reactive-module.html
@codepen
@highlight 79,only

### FormControl

The basic element of a reactive form is the <a href="https://angular.io/api/forms/FormControl" target="\_blank">FormControl</a>. This class manages the form input model and connection to it's input element in the dom and inherits from the <a href="https://angular.io/api/forms/AbstractControl" target="\_blank">AbstractControl</a>
class. 

It's worth getting familiar with the methods available in this class (like `setValidators` and `patchValue`), as they're used quite often in reactive form development.

@sourceref ./form-control.html
@codepen
@highlight 53-56,61,only

### FormGroup

A `FormGroup` is a way of grouping `FormControl`s and tracking the state of the entire form. Notice the way we connect our input in the markup is slightly different - we use `formControlName` to bind to the name value in our `FormGroup`. Groups can be nested within other groups or arrays.  

@sourceref ./form-group.html
@codepen
@highlight 50-63,67-71,only

### FormArray

`FormArray` aggregates `FormControl`s into an array. It's different than `FormGroup` in that the controls inside are serialized as an array. `FormArray`s are very useful when dealing with repeated `FormControl`s or dynamic forms that allow users to create additional inputs. Arrays can be nested in groups or other arrays.

@sourceref ./form-array.html
@codepen
@highlight 50-63,67-71,only

### FormBuilder

<a href="https://angular.io/api/forms/FormBuilder" target="\_blank">FormBuilder</a> is a shorthand way to quickly write forms by reducing boilerplate code of manually having to write `new FormControl`, `new FormGroup`, `new FormArray` repeatedly.

@sourceref ./form-builder.html
@codepen
@highlight 53, 57, 61, 67,74-78,only

## Exercise: Creating a Reactive Form in the Restaurant component with city and state dropdown inputs

### The problem

We would like our user to be able to filter restaurants based on city and state. Implement a reactive form with two controls, `state` and `city`, that are dropdowns displaying a list of cities and states.

### What you need to know

- How to create a `FormControl` (you learned this in the section above! ✔️)
- How to create a `FormGroup` (you learned this in the section above! ✔️)
- How to use `FormBuilder` (you learned this in the section above! ✔️)
- How to use `ngFor` (you learned this in the Creating Components section! ✔️)

Here's some code to get you started:

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component-starter.ts
@highlight 2,18,25-28,30-33,41,51-53 only

Don't forget to import reactiveForms in the root app module.

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 5,24

### To Verify Your Solution is Correct

When you visit <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>, there will now be state and city dropdown options populated with fake data.

![Place My Order App city and state dropdowns](../static/img/pmo-dropdowns.gif "Place My Order App city and state dropdowns")

Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts
@highlight 274-295, only

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 2,18,25-39,42,50-55

__src/app/restaurant/restaurant.component.html__

@sourceref ./restaurant.component.html
@highlight 3-24
