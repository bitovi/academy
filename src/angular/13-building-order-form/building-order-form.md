@page angular-training/building-order-form Building the Order Form
@parent angular-training 13

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

## Exercise: Create New Route for Ordering

### The Problem

Create a new `order` component, and create a route for our new component! The path should be `/restaurants/{{slug}}/order`.

### What you need to know

- How to create new components
    ```bash
    ng g component order
    ```
- You've created routes before! You got this!

### To Verify Your Solution is Correct

When you navigate to the `/order` path from a restaurant detail page you should see your new order component.

### Solution

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 7, 22-25

## Exercise: Build out the Order Component

We've covered a few concepts, like how to get the slug from the route, how to get a restaurant, how to create a form and subscribe to its changes. Let's practice those concepts.

We've provided some starting code to get through this section to help you get the restaurant based on the route slug, create a new reactive form to collect order information, and update the order total whenever the `items` FormControl value changes.

In your new order component, edit the __src/order/order.component.html__ file to be:

__src/app/order/order.component.html__

@sourceref ./order.component-starter.html

Update your __src/app/order/order.component.ts__ file to be:

@sourceref ./order.component-starter.ts

### The problem

The order form component needs to get the restaurant from the route slug, and needs a reactive form to collect `restaurant`, `name`, `address`, `phone`, and `items`, and a way to update the order total when the items form control changes.

### What you need to know

- How to get the restaurant from the route slug (you learned this in previous sections! ✔️)
- Create a reactive form (you learned this in previous sections! ✔️)
- Listen to form value changes (you learned this in previous sections! ✔️)
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

### To Verify Your Solution is Correct

Update the order spec file  __src/app/order/order.component.spec.ts__ to be:

@sourceref ./order.component.spec-starter.ts

### The solution

__src/app/order/order.component.ts__

@sourceref ./order.component-solution.ts
@highlight 43,45-49,59-66,72-83

## Importing 3rd Party Plugins

In our markup we would like to display our lunch and dinner menus in tabs. Instead of creating our own library, let's import a well supported one, <a href="https://valor-software.com/ngx-bootstrap/#/documentation#getting-started" target="\_blank">ngx-bootstrap</a>:

```bash
ng add ngx-bootstrap  --component tabs
```

Ng add is a convenient way to import 3rd party libs that will update `angular.json` and `package.json` with any changes we need, as well as automatically import the 3rd party module into our root app module. Don't forget to restart the client server!

Your root app module should now look like this:

__src/app/order/app.module.ts__

@sourceref ./app.module.ts
@highlight 5, 29

Now let's add the markup to our order component implementing the tabs widget.

__src/app/order/order.component.html__

@sourceref ./order.component-withtabs.html
@highlight 7-26

Now when we view the order form of our route, we'll see a nice form and tabs for lunch and dinner menu options.

## Component Interaction

Components in Angular can pass data back and forth to eachother through the use of <a href="https://angular.io/api/core/Input" target="_blank">@Input</a> and <a href="https://angular.io/api/core/Output" target="_blank">@Output</a> decorations.

@sourceref ./component-interaction.html
@codepen
@highlight 17,21,29,31,35,only

## Create Custom Checkbox Component

We're going to build another component to use in our form to handle selecting order items. We use data-binding to pass data between components. We'll use the `@Input()` to get our list of items from the restaurant to display in our child component, and eventually hook it into our Reactive Form using the `formControlName` attribute as shown below.

```html
<pmo-menu-items [data]="restaurant.menu.lunch" formControlName="items"></pmo-menu-items>
```

### Create the new menu-items component inside the order component folder

```bash
ng g component order/menu-items
```

Go ahead and put your new component in the order history component.

__src/app/order/order.component.html__

@sourceref ./child-component/order.component-childcomponent.html
@highlight 9, 12

## Exercise: Passing properties to child components

### The Problem

We want the menu-items component take an array of menu items and iterate through them in the template.

Each menu item should have this markup:

```html
<li class="list-group-item" >
    <label>
        <input type="checkbox">
        ITEM_NAME <span class="badge">$ ITEM_PRICE</span>
    </label>
</li>
```

### What you need to know

- How to use \*ngFor (you learned this in previous sections! ✔️)
- How to use @Input to pass properties (you learned this in the section above! ✔️)

### To Verify Your Solution is Correct

Update the order spec file  __src/app/order/order.component.spec.ts__ to be:

@sourceref ./order.component.spec-childcomponent.ts

Update the menu-items spec file  __src/app/order/menu-items/menu-items.component.spec.ts__ to be:

@sourceref ./child-component/menu-items.component.spec-props.ts

### The solution

__src/app/order/menu-items.component.html__

@sourceref ./child-component/menu-items.component-props.html

__src/app/order/menu-items.component.ts__

@sourceref ./child-component/menu-items.component-props.ts

__src/app/order/order.component.html__

@sourceref ./child-component/order.component-props.html
@highlight 9, 12

## Event Handlers in Angular

Event binding in Angular follows a simple pattern - the event name in parenthesis and a function to call in quotes on the other side of an equal sign. `(event)="functionToCall()"`. Any parameter(s) can be passed to the event function, but to capture the event itself use the parameter `$event`

@sourceref ./form-change.html
@codepen
@highlight 24,26,32,41-31,45-47,49-51,only

## Exercise: Attaching event handlers to item checkboxes

### The Problem

Next, we want to know when a checkbox has been checked or unchecked, and update an array called `selectedItems` containing all checked items.

### What you need to know

- How to attach a change event and call a method
- Use `array.splice(index,1)` to remove an item from an array.
- Listen to `change` to know when an checkbox has changed its value.

### The Solution

__src/app/order/menu-items.component.html__

@sourceref ./child-component/menu-items-1.component.html
@highlight 3

__src/app/order/menu-items.component.ts__

@sourceref ./child-component/menu-items-1.component.ts
@highlight 15, 22-30

## Exercise: Emitting data to parent components

### The Problem

Now we want to let the form know what the selected items are.

### What you need to know

- How to emit a value to a parent component (presumably to update our form value)

    @sourceref ./event-emitter-example.ts

### The Solution

__src/app/order/menu-items.component.ts__

@sourceref ./child-component/menu-items-2.component.ts
@highlight 1,16,31

__src/app/order/order.component.html__

@sourceref ./child-component/order-2.component.html
@highlight 9, 12

__src/app/order/order.component.ts__

@sourceref ./child-component/order-2.component.ts
@highlight 67-79

## Control Value Accessor

Using inputs and event emitters is a great way to pass data between components in a general sense. However this can be a very messy way to approach handling custom form situations. Some times a better approach can be to write a custom component that implements the  <a href="https://angular.io/api/forms/ControlValueAccessor" target="_blank">Control Value Accessor</a> interface to just write the value straight to the form. Classes implementing the CVA must have 3 methods - onChange, onTouched, setValue. We call these methods when the user interacts with our checkboxes to let the parent form know that values have been touched, when they change, and what the value is.

__src/app/order/menu-items.component.ts__

@sourceref ./menu-items.component.ts
@highlight 1, 2, 8-14, 16

Other concepts used here:

### forwardRef

<a href="https://angular.io/api/core/forwardRef" target="\_blank">https://angular.io/api/core/forwardRef</a> Used to reference a token that may not be defined when we need it.

### NG_VALUE_ACCESSOR

<a href="https://angular.io/api/forms/NG_VALUE_ACCESSOR" target="\_blank">https://angular.io/api/forms/NG_VALUE_ACCESSOR</a> Used to provide the control value accessor for a form control.

### Use new menu items component in order form

__src/app/order/order.component.html__

@sourceref ./order.component-final.html
@highlight 10, 15

We now have a form that updates the `items` formControl when items are selected and shows the user an updated total!

### Update Order Component Tests

Update the order spec file  __src/app/order/order.component.spec.ts__ to be:

@sourceref ./order.component.spec-final.ts
