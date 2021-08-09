@page learn-angular/creating-directive Creating Directive
@parent learn-angular 14

@description Learn how to create Directives in Angular that can change the appearance or behavior of DOM Elements.

@body

## Problem
While filling out the  `phone number` field, you might have noticed that users can type in both letters and numbers. This is a problem because we do not want users entering letters in the `phone number` field.

<img src="../static/img/angular/14a-directives/order-form-thumbnails.png"
style="border: solid 1px black; max-width: 420px;"/>

In order to fix this, we will create an Attribute Directive that will change the behavior of the Phone Input Field, and will ensure that only numbers are allowed in the field.

```html
  <input name="phone" type="text" pmoOnlyNumbers class="form-control" formControlName="phone">
```

## What You Need to Know

- What Directives are in Angular
- What ElementRef are in Angular
- What HostListener are in Angular
- How to create a Directive


## What are Directives in angular

In Angular, Directives are classes that tell Angular to change the appearance or behavior of DOM Elements. Angular comes with a set of <a href="https://angular.io/guide/built-in-directives" target="\_blank" >Built-in</a> Directives,
and they consist of three types:
- Components Directives
- Attribute Directives
- Structural Directives

# Components Directives
In this training, we previously talked about <a href="/academy/academy/learn-angular/creating-components.html">Components</a>. 
Components are a type of Directive. It uses the `@Component` decorator function along with a template, style, and other logic needed for the view. 
<a href="https://angular.io/guide/built-in-directives#:~:text=Components%E2%80%94-,directives,-with%20a%20template" target="\_blank" >Read more</a>

# Attribute Directives
Attribute Directives are a type of directive that are mainly used to listen or change the behavior or appearance of DOM Elements,
Attributes and Component <a href="https://angular.io/guide/attribute-directives" target="\_blank">Read more</a>.

# Structural Directives
Structural Directives are types of Directives that are used to change HTML DOM layout, by adding, removing and manipulating Elements. 
<a href="https://angular.io/guide/structural-directives" target="\_blank" >Read more</a>

## What ElementRef are in Angular
In Angular, ElementRef (Element Reference) are a wrapper around a native DOM Element inside of a View. 
The ElementRef class contains a property `nativeElement`, which references the underlying DOM object that we can use to manipulate the DOM
<a href="https://angular.io/api/core/ElementRef" target="\_blank" >Read more</a>.
When creating a Directive, we use ElementRef to gain reference to the HtmlElement, which the Directive will be used on, and perform any manipulation we need to.

## What HostListener are in Angular
In Angular, @HostListeners() is a function decorator that allows you to listen and handle events from the host elements.
Some examples of host events include `Keyboard`, `Click`, `mousehover` etc <a href="https://angular.io/api/core/HostListener" target="\_blank" >Read more</a>.
When creating a Directive, we use the @HostListeners() decorator in the Directive Class to listen for host events. Based on the event, we can perform any action needed.

## How to Generate a Directive via the CLI

```bash
ng generate directive onlyNumbers
```
This will generate a directive file: `only-numbers.directive.ts`

## How to build a Directive
As we have discussed above, Directives are very useful tools in Angular that can help improve your web application. The example below shows an Attribute Directive that would allow a user to enter only `letters` in an input field.

@sourceref ./directive.html
@codepen
@highlight 14-32, 38,only

## Technical Requirements


1. Use an `onlyNumber` __Directive__ in __src/app/order/order.component.html__ in the phone number input field.  Using the Directive should look like this:
  ```html
  <input name="phone" type="text" pmoOnlyNumbers class="form-control" formControlName="phone">
  ```
2. Generate and implement the `onlyNumber` __Directive__.


The Directive will be used to listen for the event on the input field. This Directive will be used in our order form phone number field.

> Hint 1: Use regex  `regExp: RegExp =  new RegExp(/^[0-9]*$/g)` to test if the input value contains any letters.


## Setup

✏️ Update __src/app/order/order.component.html__ file to use the Directive we will create:

@sourceref ./order.component.directive.html
@highlight 31,only

✏️ Run the following to generate the __Directive__ and the directive's tests:

```bash
ng g directive onlyNumbers
```

## How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/only-numbers.directive.spec.ts__ to be:

@sourceref ./only-numbers.directive.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## Solution

✏️ Update __src/app/only-numbers.directive.ts__ to:

@sourceref ./only-numbers.directive.ts