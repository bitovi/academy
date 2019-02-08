@page angular/building-order-form Building the Order Form
@parent angular 13

@description Building the Order Form

@body

## Overview

In this part, we will:

- Create a new order component
- Get the restaurant from route params
- Add new route for ordering from a restaurant
- Import a 3rd party lib
- Create a custom component to handle item selection

## Creating a New Order Form Component

Our order form is how we can create new orders. We'll use a reactive form to get data from the users, use a custom validation function to make sure at least once item has been selected, and calculate the order total every time a new item is selected or unselected.

```bash
ng g component order
```

## Create New Route for Ordering

### The Problem

Now, create a route for our new component! The path should be `/restaurants/{{slug}}/order`.


### What you need to know

You've created routes before! You got this!


---

### Solution

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 7, 22-25


Now when we navigate to the `/order` path from a restaurant detail page you should see where the order form will go.

In your new order component, edit the __src/order/order.component.html__ file to be:

__src/app/order/order.component.html__

@sourceref ./order-0.component.html

We've covered a few concepts, like how to get the slug from the route, how to get a restaurant, how to create a form and subscribe to its changes. Let's practice those concepts.

### The problem

The order form component needs to get the restaurant from the route slug, and needs a reactive form to collect `restaurant`, `name`, `address`, `phone`, and `items`, and a way to update the order total when the items form control changes.

### What you need to know

- How to get the restaurant from the route slug
- Create a reactive form
- Listen to form value changes
- Add validation:

  This time, our form will require <a href="https://angular.io/guide/form-validation#reactive-form-validation" target="\_blank">validation</a>. Here's an example of a form with form controls with different validation, and one thats value is set to an array.

  ```typescript
  function coolKidsChecker(isACoolKid: string) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value === isACoolKid)
            return null;
        return { 'coolKidsChecker': {valid: false }};
    }
  }

  this.myValidatingForm = this.formBuilder.group({
    aRequiredField: [null, Validators.required]
    aCustomRequiredField: [null, coolKidsChecker('yes')],
    anArrayField: [[]]
  });
  ```


__src/app/order/order.component.ts__

@sourceref ./order.component.ts





---

### The solution

__src/app/order/order.component.ts__

@sourceref ./order.component-solution.ts


## Importing 3rd Party Plugins

In our markup we would like to display our lunch and dinner menus in tabs. Instead of creating our own library, let's import a well supported one, <a href="https://valor-software.com/ngx-bootstrap/#/documentation#getting-started" target="\_blank">ngx-bootstrap</a>:

```bash
ng add ngx-bootstrap  --component tabs
```

Ng add is a convenient way to import 3rd party libs that will update `angular.json` and `package.json` with any changes we need. Don't forget to restart the client server!

Next we need to import the plugin into our root app module.

__src/app/order/app.module.ts__

@sourceref ./app.module.ts
@highlight 5, 29

Now let's add the markup to our order component implementing the tabs widget.

__src/app/order/order.component.html__

@sourceref ./order-1.component.html
@highlight 7-18

Now when we view the order form of our route, we'll see a nice form and tabs for lunch and dinner menu options.

## Create Custom Checkbox Component

We're going to build another component to use in our form to handle selecting order items. We use data-binding to pass data between components. We'll use the `@Input()` to get our list of items from the restaurant to display in our child component, and hook it into our Reactive Form using the `formControlName` attribute as shown below.

```html
<pmo-menu-items [data]="restaurant.menu.lunch" formControlName="items"></pmo-menu-items>
```

```bash
ng g component order/menu-items
```

Go ahead and put your new component in the order history component. 

__src/app/order/order-starter.component.html__

@sourceref ./child-component/order-0.component.html
@highlight 9, 12

## Exercise: Passing properties to child components

### The Problem 

We want the menu-items component take an array of menu items and iterate through them in the template.

Each menu item should have this markup:

```html
 <label>
    <input type="checkbox">
    ITEM_NAME <span class="badge">$ ITEM_PRICE</span>
</label>
```

### What you need to know

- How to use *ngFor
- How to use <a href="https://angular.io/api/core/Input" target="_blank">Input</a> to pass properties:


    @sourceref ./input-example.ts

### The solution

__src/app/order/menu-items.component.html__

@sourceref ./child-component/menu-items-0.component.html

__src/app/order/menu-items.component.ts__

@sourceref ./child-component/menu-items-0.component.ts

__src/app/order/order.component.html__

@sourceref ./child-component/order-0.component.html
@highlight 9, 12

## Exercise: Attaching event handlers


### The Problem

Next, we want to know when a checkbox has been checked or unchecked, and update an array called `selectedItems` containing all checked items.

### What you need to know

- How to attach a click event and call a method:

    @sourceref ./click-example.ts

- Use `array.splice(index,1)` to remove an item from an array.
- Listen to `change` to know when an checkbox has changed its value.

### The Solution

__src/app/order/menu-items.component.html__

@sourceref ./child-component/menu-items-1.component.html

__src/app/order/menu-items.component.ts__

@sourceref ./child-component/menu-items-1.component.ts

## Exercise: Emitting data to parent components


### The Problem

Now we want to let the form know what the selected items are.

### What you need to know

- How to emit a value to a parent component (presumably to update our form value)

    @sourceref ./event-emitter-example.ts

### The Solution

__src/app/order/menu-items.component.ts__

@sourceref ./child-component/menu-items-2.component.ts

__src/app/order/order.component.html__

@sourceref ./child-component/order-2.component.html
@highlight 9, 12

__src/app/order/order.component.ts__

@sourceref ./child-component/order-2.component.ts
@highlight 67-79

Using inputs and event emitters is a great way to pass data between components in a general sense. However this can be a very messy way to approach handling custom form situations. Some times a better approach can be to write a custom component that implements the  <a href="https://angular.io/api/forms/ControlValueAccessor" target="_blank">Control Value Accessor</a> interface to just write the value straight to the form. Classes implementing the CVA must have 3 methods - onChange, onTouched, setValue. We call these methods when the user interacts with our checkboxes to let the parent form know that values have been touched, when they change, and what the value is.

__src/app/order/menu-items.component.ts__

@sourceref ./menu-items.component.ts
@highlight 1, 2, 8-14, 16

__src/app/order/menu-items.component.html__

@sourceref ./menu-items.component.html

Other concepts used here:

### forwardRef

<a href="https://angular.io/api/core/forwardRef" target="\_blank">https://angular.io/api/core/forwardRef</a> Used to reference a token that may not be defined when we need it.

### NG_VALUE_ACCESSOR

<a href="https://angular.io/api/forms/NG_VALUE_ACCESSOR" target="\_blank">https://angular.io/api/forms/NG_VALUE_ACCESSOR</a> Used to provide the control value accessor for a form control.

### Use new menu items component in order form

__src/app/order/order.component.html__

@sourceref ./order-2.component.html
@highlight 10, 15

We now have a form that updates the items formcontrol when items are selected and shows the user an updated total!
