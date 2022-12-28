@page learn-angular/creating-directive Creating Directive
@parent learn-angular 15

@description Learn how to create Directives in Angular that can change the appearance or behavior of DOM Elements.

@body

## Problem

While filling out the `phone number` field, you might have noticed that users can type in both letters and numbers. This is a problem because we do not want users entering letters in the `phone number` field.

<img src="../static/img/angular/15-directives/order-form-thumbnails.png"
style="border: solid 1px black; max-width: 420px;"/>

In order to fix this, we will create an Attribute Directive that will change the behavior of the Phone Input Field, and will ensure that only numbers can be entered in the field.

```html
<input
  name="phone"
  type="text"
  pmoOnlyNumbers
  formControlName="phone"
/>
```

@highlight 4

## What You Need to Know

- What Directives are
- What ElementRef is
- What HostListeners are
- How to create a Directive

## What are Directives

Directives are classes that tell Angular to change the appearance or behavior of DOM Elements. Angular comes with a set of <a href="https://angular.io/guide/built-in-directives"  >Built-in</a> Directives,
and they consist of three types:

- Components Directives
- Attribute Directives
- Structural Directives

# Components Directives

In this training, we previously talked about [learn-angular/creating-components Components].
Components are a type of Directive. Components use the `@Component` decorator function along with a template, style, and other logic needed for the view.
This was previously discussed in detail [learn-angular/creating-components#p2-what-you-need-to-know here]. The official <a href="https://angular.io/guide/built-in-directives#:~:text=Components%E2%80%94-,directives,-with%20a%20template" >Angular documentation</a> has more information on this as well.

# Attribute Directives

Attribute Directives are a type of directive that are mainly used to listen or change the behavior or appearance of DOM Elements,
Attributes and Components.
<a href="https://angular.io/guide/attribute-directives" >Read more</a>.

# Structural Directives

Structural Directives are types of Directives that are used to change HTML DOM layout by adding, removing or manipulating Elements.
<a href="https://angular.io/guide/structural-directives"  >Read more</a>

## ElementRef

ElementRef (Element Reference) is a wrapper around a native DOM Element inside of a View.
The ElementRef class contains a property `nativeElement`, which references the underlying DOM object that we can use to manipulate the DOM.
<a href="https://angular.io/api/core/ElementRef">Read more</a>.

When creating a Directive, we use ElementRef to gain reference to the native HTML Element, which the Directive will be used on, and perform any manipulation we need to.

## HostListener

HostListener is a function decorator that allows you to listen and handle DOM events from the host element.
Some examples of events include `keyboard` and `mouse` events.
<a href="https://angular.io/api/core/HostListener">Read more</a>.

When creating a Directive, we use the @HostListener decorator in the Directive Class to listen for host events. Based on the event, we can perform any action needed.

## How to Generate a Directive via the CLI

```bash
ng generate directive onlyNumbers
```

This will generate the directive file: `only-numbers.directive.ts` and the spec file: `only-numbers.directive.spec.ts`

## How to Build a Directive

As we have discussed above, Directives are very useful tools in Angular that can help improve your web application. The example below shows an Attribute Directive that would allow a user to enter only `letters` in an input field.

@sourceref ./directive.html
@codepen
@highlight 14-34, 40,only

## Technical Requirements

1. Use an `onlyNumber` **Directive** in **src/app/order/order.component.html** in the phone number input field. Using the Directive should look like this:

```html
<input
  name="phone"
  type="text"
  pmoOnlyNumbers
  formControlName="phone"
/>
```

@highlight 4

2. Generate and implement the `onlyNumber` **Directive**.

The Directive will be used to listen for the event on the input field. This Directive will be used in our order form phone number field.

> Hint: Use regex `regExp: RegExp = new RegExp(/^[0-9]*$/g)` to test if the input value contains any letters.

## Setup

✏️ Update **src/app/order/order.component.html** file to use the Directive we will create:

@diff ../14-building-order-form/order.component-final.html ./order.component.directive.html only

✏️ Run the following to generate the **Directive** and the directive's tests:

```bash
ng g directive onlyNumbers
```

## How to Verify Your Solution is Correct

✏️ Update the spec file **src/app/only-numbers.directive.spec.ts** to be:

@sourceref ./only-numbers.directive.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/only-numbers.directive.ts** to:

@sourceref ./only-numbers.directive.ts

</details>
