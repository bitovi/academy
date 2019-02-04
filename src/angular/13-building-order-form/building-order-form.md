@page angular/building-order-form Building the Order Form
@parent angular 13

@description Building the Order Form

@body

## Overview

In this part, we will:

- Create a new order component
- Import a 3rd party lib
- Create a custom component to handle item selection
- Add new route for ordering from a restaurant
- Get the restaurant from route params

## Creating a New Order Form Component

Our order form is how we can create new orders. We'll use a reactive form to get data from the users, use a custom validation function to make sure at least once item has been selected, and calculate the order total every time a new item is selected or unselected.

```bash
ng g component order
```

__src/app/order/order.component.ts__

@sourceref ./order.component.ts


## Importing 3rd Party Plugins

In our markup we would like to display our lunch and dinner menus in tabs. Instead of creating our own library, let's import a well supported one, <a href="https://valor-software.com/ngx-bootstrap/#/documentation#getting-started" target="_blank>ngx-bootstrap</a>:

```bash
ng add ngx-bootstrap  --component tabs
```

Ng add is a convenient way to import 3rd party libs that will update `angular.json` and `package.json` with any changes we need. Don't forget to restart the client server!

Next we need to import the plugin into our root app module. 

__src/app/order/app.module.ts__

@sourceref ./app.module.ts
@highlight 5, 31

__src/app/order/order.component.html__

@sourceref ./order-1.component.html
@highlight 13, 18

We're going to build another component to use in our form to handle selecting order items. We use data-binding to pass data between components. We'll use the `@Input()` to get our list of items from the restaurant to display in our child component, and hook it into our Reactive Form using the `formControlName` attribute as shown below.

```html
<pmo-menu-items [data]="restaurant.menu.lunch" formControlName="items"></pmo-menu-items>
```

__src/app/order/order.component.html__

@sourceref ./order-2.component.html
@highlight 7-18


## Create Custom Checkbox Component

```bash
ng g component order/menu-items
```

We want to give an array of item objects to our parent form based on which checkboxes are selected. We can do this by using Angulars <a href="https://angular.io/api/forms/ControlValueAccessor" target="_blank">Control Value Accessor</a> to act as a bridge between our form and the UI we build. Classes implementing the CVA must have 3 methods - onChange, onTouched, setValue. We call these methods when the user interacts with our checkboxes to let the parent form know that values have been touched, when they change, and what the value is.

__src/app/order/menu-items.component.ts__

@sourceref ./menu-items.component.ts
@highlight 1, 2, 8-14, 16

__src/app/order/menu-items.component.html__

@sourceref ./menu-items.component.html

Other concepts used here:

### forwardRef

<a href="https://angular.io/api/core/forwardRef" target="_bank">https://angular.io/api/core/forwardRef</a> Used to reference a token that may not be defined when we need it. 

### NG_VALUE_ACCESSOR

<a href="https://angular.io/api/forms/NG_VALUE_ACCESSOR" target="_blank">https://angular.io/api/forms/NG_VALUE_ACCESSOR</a> Used to provide the control value accessor for a form control.

## Create New Route for Ordering

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 7, 22-25

Now when we navigate to <a href="http://localhost:4200/restaurants/crab-place/order" target="_blank">http://localhost:4200/restaurants/crab-place/order</a> you should see the order form with options for the restaurant items shown. Next we'll create the order service that will allow us to create a new order from data submitted from this form. 
