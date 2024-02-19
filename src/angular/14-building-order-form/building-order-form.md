@page learn-angular/building-order-form Binding Component Data
@parent learn-angular 14

@description Building the Order Form

@body

## Overview

In this part, we will:

- Create a new order component
- Get the restaurant from route params
- Add new route for ordering from a restaurant
- Import a third-party lib
- Create a custom component to handle item selection

## Creating an order form component

Our order form is how we can create new orders. We’ll use a reactive form to get data from the users, use a custom validation function to make sure at least one item has been selected, and calculate the order total every time a new item is selected or unselected.

## Problem 1: Create a new route for ordering from a restaurant

## P1: What you need to know

- How to create new components
  ```bash
  ng g component order
  ```
- You’ve created routes before! You got this!

## P1: Technical requirements

Create a new `order` component, and create a route for our new component! The path should be `/restaurants/{{slug}}/order`.

## P1: How to verify your solution is correct

When you navigate to the `/order` path from a restaurant detail page you should see your new order component.

✏️ Update the spec file **src/app/app.component.spec.ts** to be:

@diff ../13-nested-routes/app.component.spec.ts ./app.component.spec.ts only

> If you’ve implemented the solution correctly, when you run `npm run test` all tests will pass!

## P1: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/app-routing.module.ts**

@diff ../13-nested-routes/app-routing.module.ts ./app-routing.module.ts only

</details>

## Problem 2: Build out the order component

We’ve covered a few concepts, like how to get the slug from the route, how to get a restaurant, how to create a form and subscribe to its changes. Let’s practice those concepts.

We’ve provided some starting code to get through this section to help you get the restaurant based on the route slug, create a new reactive form to collect order information, and update the order total whenever the `items` FormControl value changes.

## P2: What you need to know

- How to get the restaurant from the route slug (you learned this in previous sections! ✔️)
- Create a reactive form (you learned this in previous sections! ✔️)
- Listen to form value changes (you learned this in previous sections! ✔️)
- Add validation:

  This time, our form will require <a href="https://angular.io/guide/form-validation#reactive-form-validation">validation</a>. Here’s an example of a form with form controls with different validation, and one whose value is set to an array.

```typescript
function validateLessThan(maxValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value < maxValue) {
      return null;
    }
    return { belowMax: { valid: false } };
  };
}

this.myValidatingForm = this.formBuilder.group({
  name: [null, Validators.required],
  age: [null, validateLessThan(18)],
  hobbies: [[]]
});
```

## P2: Technical requirements

The order form component needs to get the restaurant from the route slug, and needs a reactive form to collect `restaurant`, `name`, `address`, `phone`, and `items`, and a way to update the order total when the items form control changes.

## P2: Setup

✏️ Update the **src/app/order/order.component.html** file to be:

@sourceref ./order.component-starter.html

✏️ Update the **src/app/order/order.component.ts** file to be:

@sourceref ./order.component-starter.ts

## P2: How to verify your solution is correct

✏️ Update the order spec file **src/app/order/order.component.spec.ts** to be:

@sourceref ./order.component.spec-starter.ts
@highlight 101-167, only

## P2: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/order.component.ts**

@diff ./order.component-starter.ts ./order.component-solution.ts only

</details>

## Importing third-party plugins

In our markup we would like to display our lunch and dinner menus in tabs. Instead of creating our own library, let’s import a well supported one, <a href="https://valor-software.com/ngx-bootstrap/#/documentation#getting-started">ngx-bootstrap</a>:

✏️ Run:

```bash
ng add ngx-bootstrap
```

The `ng add` command is a convenient way to import third-party libs that will update `angular.json` and `package.json` with any changes we need.

✏️ Update **src/app/app.module.ts**. Once you’re done, don’t forget to restart the server!

@sourceref ./app.module.ts
@highlight 5, 6, 29, 30, only

Now let’s add the markup to our order component implementing the tabs widget.

✏️ Update **src/app/order/order.component.html**

@diff ./order.component-starter.html ./order.component-withtabs.html only

Now when we view the order form of our route, we’ll see a nice form and tabs for lunch and dinner menu options.

![Place My Order App tabs](../static/img/angular/pmo-tabs-working.gif 'Place My Order App tabs')

## Problem 3: Create a `menu-items` component

We’re going to build another component to use in our form to handle selecting order items. We use data-binding to pass data between components. We’ll use the `@Input()` to get our list of items from the restaurant to display in our child component, and eventually hook it into our Reactive Form using the `formControlName` attribute as shown below.

```html
<pmo-menu-items
  [data]="restaurant.menu.lunch"
  formControlName="items"
></pmo-menu-items>
```

## P3: What you need to know

## Component interaction

Components in Angular can pass data back and forth to each other through the use of <a href="https://angular.io/api/core/Input">@Input</a> and <a href="https://angular.io/api/core/Output">@Output</a> decorations.

@sourceref ./component-interaction.html
@codepen
@highlight 17,21,29,31,35,only

- How to use \*ngFor (you learned this in previous sections! ✔️)
- How to use @Input to pass properties (you learned this in the section above! ✔️)

## P3: Setup

Create the new menu-items component inside the order component folder

✏️ Run:

```bash
ng g component order/menu-items
```

✏️ Update **src/app/order/menu-items/menu-items.component.html**

```html
<!--  Iterate over items and render the markup below for each item -->
<li class="list-group-item">
  <label>
    <input type="checkbox" />
    ITEM_NAME <span class="badge">$ ITEM_PRICE</span>
  </label>
</li>
```

Go ahead and put your new component in the order component.

✏️ Update **src/app/order/order.component.html**

@diff ./order.component-withtabs.html ./child-component/order.component-childcomponent.html only

## P3: How to verify your solution is correct

✏️ Update the order spec file **src/app/order/order.component.spec.ts** to be:

@diff ./order.component.spec-starter.ts ./order.component.spec-childcomponent.ts only

✏️ Update the menu-items spec file **src/app/order/menu-items/menu-items.component.spec.ts** to be:

@sourceref ./child-component/menu-items.component.spec-props.ts
@highlight 25-36, only

## P3: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/menu-items.component.html**

@sourceref ./child-component/menu-items.component-props.html
@highlight 1-7, only

✏️ Update **src/app/order/menu-items.component.ts**

@sourceref ./child-component/menu-items.component-props.ts

✏️ Update **src/app/order/order.component.html**

@diff ./child-component/order.component-childcomponent.html ./child-component/order.component-props.html only

</details>

## Problem 4: Attaching event handlers to item checkboxes

Next, we want to know when a checkbox has been checked or unchecked.

Before communicating between `MenuItemsComponent` and its parent `OrderComponent`, `MenuItemsComponent` will need to attach an event handler - a function - to the `change` event of the item checkboxes.

## P4: What you need to know

## Event handlers in Angular

Event binding in Angular follows a simple pattern - the event name in parenthesis and a function to call in quotes on the other side of an equal sign. `(event)="functionToCall()"`. Any parameter(s) can be passed to the event function, but to capture the event itself use the parameter `$event`

@sourceref ./form-change.html
@codepen
@highlight 24,26,32,41-43,45-47,49-51,only

## P4: Technical requirements

Create a function in the `MenuItemsComponent` called `updateItem` that fires whenever a checkbox is checked and takes a parameter of the item that has been checked.

## P4: How to verify your solution is correct

✏️ Update the menu-items spec file **src/app/order/menu-items/menu-items.component.spec.ts** to be:

@diff ./child-component/menu-items.component.spec-props.ts ./child-component/menu-items-1.component.spec.ts only

## P4: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/menu-items/menu-items.component.html**

@diff ./child-component/menu-items.component-props.html ./child-component/menu-items-1.component.html only

✏️ Update **src/app/order/menu-items/menu-items.component.ts**

@diff ./child-component/menu-items.component-props.ts ./child-component/menu-items-1.component.ts only

</details>

## Problem 5: Update `OrderFormComponent` with the emitted `Item` from `MenuItemsComponent`

Now we want to let the form know what the selected items are as they change so we can update the order total accordingly.

## P5: What you need to know

## Emitting Data to Parent Components

To pass data to parent components in Angular, the <a href="https://angular.io/api/core/EventEmitter">EventEmitter</a> class is used in combination with the <a href="https://angular.io/api/core/Output">Output decorator</a>. The Output decorator marks a property to be listened to during change detection, and we call the `emit` method to broadcast the property’s new value.

The parent component is listening for a change on the child component’s property and calls a function on that change that takes a parameter of the updated value.

@sourceref ./event-emitter.html
@codepen
@highlight 31-33,44-46,65,70,78-80,only

- How to emit a value to a parent component (you learned this in the section above! ✔️)
- How to programmatically update a `FormControl`’s value (you learned this in previous sections! ✔️)

## P5: Technical requirements

Create an `itemsChanged` EventEmitter property that emits the checked/unchecked `Item` value every time it changes, and in the parent OrderForm component update the `items` FormControl with the updated `Item`s array using the provided `getChange` function.

## P5: Setup

✏️ Update the **src/app/order/order.component.ts** file to be:

@diff ./order.component-solution.ts ./child-component/order.component-get-change.ts only

## P5: How to verify your solution is correct

✏️ Update the menu-items spec file **src/app/order/order.component.spec.ts** to be:

@diff ./order.component.spec-childcomponent.ts ./child-component/order.component.spec-menuitems.ts only

## P5: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/menu-items.component.ts**

@diff ./child-component/menu-items-1.component.ts ./child-component/menu-items-2.component.ts only

✏️ Update **src/app/order/order.component.html**

@diff ./child-component/order.component-props.html ./child-component/order-2.component.html only

✏️ Update **src/app/order/order.component.ts**

@diff ./child-component/order.component-get-change.ts ./child-component/order-2.component.ts only

</details>

## Control Value Accessor

Using inputs and event emitters is a great way to pass data between components in a general sense. However this can be a very messy way to approach handling custom form situations. Some times a better approach can be to write a custom component that implements the <a href="https://angular.io/api/forms/ControlValueAccessor">Control Value Accessor</a> interface to just write the value straight to the form. Classes implementing the CVA must have 3 methods - `onChange`, `onTouched`, `setValue`. We call these methods when the user interacts with our checkboxes to let the parent form know that values have been touched, when they change, and what the value is.

✏️ Update **src/app/order/menu-items.component.ts**

@diff ./child-component/menu-items-2.component.ts ./menu-items.component.ts only

Other concepts used here:

### forwardRef

<a href="https://angular.io/api/core/forwardRef">forwardRef</a> is used to reference a token that may not be defined when we need it.

### NG_VALUE_ACCESSOR

<a href="https://angular.io/api/forms/NG_VALUE_ACCESSOR">NG_VALUE_ACCESSOR</a> is used to provide the control value accessor for a form control.

### Use New Menu Items Component in Order Form

✏️ Update **src/app/order/order.component.html**

@diff ./child-component/order-2.component.html ./order.component-final.html only

We now have a form that updates the `items` formControl when items are selected and shows the user an updated total!

### Update order component Tests

✏️ Update the order spec file **src/app/order/order.component.spec.ts** to be:

@diff ./child-component/order.component.spec-menuitems.ts ./order.component.spec-final.ts only
