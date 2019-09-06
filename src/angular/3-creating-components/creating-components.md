@page learn-angular/creating-components Creating Components
@parent learn-angular 3

@description Learn how to create basic components in Angular and iterate through data using an Angular for loop.

@body

## Overview

In this part, we will:

- Install already created assets
- Learn about components
- Learn about displaying data in component templates
- Create a home component
- Use interpolation binding in our home component view
- Learn about directives
- Create a restaurant component that shows a list of restaurants

## Problem 1: Creating a Home Component With a Dynamic Title Member

Let's begin to build out the main views of our app. We'll create a home view now,
and restaurant list view in the next exercise.

## P1: What You Need to Know

- How to generate a new Angular component
- How to bind data in a component to it's template

## Generate Components

In Angular, Components are the basic building blocks that help us craft the UI. They are classes that handle views, allow management of user interaction, and displaying information via data binding. Data binding is the term for connecting data or information to the UI. An example would be an input field that a user enters a value into.

Recommended reading: <a href="https://angular.io/guide/lifecycle-hooks" target="\_blank" >Angular Lifecyle Hooks</a>

The best way to create a new component is by using the Angular CLI:

```shell
ng g component new-component-name
```

This will create a new component for us and import it in our root module.

```code
├── src/
|   ├── app/
|   |   ├── new-component-name/
|   |       |── new-component-name.component.ts
|   |       |── new-component-name.component.spec.ts
|   |       |── new-component-name.component.less
|   |       |── new-component-name.component.html
```

Generated components have the same structure - a name.component.ts file that will contain the boilerplate code for the Angular component class. This class will also have a component decorator pointing to the name.component.less file for styles, and the name.component.html file for it's template. Styles and templates can also be written inline in the decorator with backticks to escape the code using the keys `style` and `template`. 

## Bind Data to Components

Like most modern JS frameworks, Angular provides us a way of displaying data dynamically in the DOM. Properties declared in a component can be used in the component template with double curly brace syntax: `{{myTitle}}`

@sourceref ./template.html
@codepen
@highlight 17,21,only

Data can also be passed to child components. Data can be passed with expression context to determine if passed data is just a string for example, or a property on the component class. This example shows passing data as a string as well as a component member using the `[ ]` syntax.

@sourceref ./child-data.html
@codepen
@highlight 30-32,only

## P1: Setup

To get this application up and running quicker so we can focus on the architecture, we'll import some pre-created styles and assets to save us time.

✏️ Run:

```shell
npm install place-my-order-assets --save
```

Open the ``angular.json`` file, and make the following changes to include these files in our build process. This will copy the images into our assets directory for when we serve our application.

> Pay close attention that you're making these changes under the "build" key and not the "test" key, as the code looks very similar. The build key should be close to line 17.

✏️ Update __angular.json__:

@sourceref ./angular.json
@highlight 25-39,only

__Any time changes are made to the `angular.json` file, we need to restart our server to catch the new changes.__

✏️ __Restart your server.__

While we are building the component, it will be nice to see it in the
application. One of the ways components can be rendered is by putting them in markup. We'll do this by putting our `<pmo-home></pmo-home>` tag in our base app component markup.  To see the
`<pmo-home>` component, do the following.

✏️ Run:

```shell
ng g component home
```

✏️ Update __src/app/app.component.html__ to be:

```html
<h1>Place My Order App: Coming Soon!</h1>
<router-outlet></router-outlet>

<pmo-home></pmo-home>
```
@highlight 4

✏️ Update __src/app/home/home.component.html__ to be:

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1><!-- TITLE GOES HERE --></h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

Run `npm run start`, and your app should compile with no errors, and you'll be able to see the home component. Later we'll move the home component to it's own page with a unique route.

## P1: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/home/home.component.spec.ts__ to be:

@sourceref ./home.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P1: Technical Requirements

Create a component that displays a title read from a component's `title` member.

<img src="../static/img/angular/3-creating-components/home-component.png"
  style="border: solid 1px black; max-width: 640px;"/>

The component should provide the following HTML:

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1><!-- TITLE GOES HERE --></h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

> Notice the `TITLE GOES HERE` part of the HTML. `TITLE GOES HERE` should be replaced by
> something that reads the component's `title` property.

The component's `title` member should have a string value of
`"Ordering food has never been easier"`.

You'll be editing the following files:
- __src/app/home/home.component.html__
- __src/app/home/home.component.ts__

## P1: Solution

✏️ Update __src/app/home/home.component.html__

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1>{{title}}</h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

__src/app/home/home.component.ts__

@sourceref ./home.component.ts
@highlight 9

## Problem 2: Write Restaurant Component Markup that Displays a List of Restaurants

We want to display a list of restaurants in our UI once the data has been set on the restaurants member.  It will look like:

<img src="../static/img/angular/3-creating-components/restaurant-component.png"
  style="border: solid 1px black; max-width: 640px;"/>

> Note: We will fix the missing images in the next step.

## P2: What You Need to Know

To solve this exercise, you'll need to learn some of Angular's more common
template directives. Template directives in Angular help us iterate through and manipulate data we've bound to the DOM. You'll need some of the following:

- \*ngIf - conditionally show content.
- \*ngFor - iterate through a list and create content for each item in the list.
- ng-container - a container for content that is not rendered, but can be referenced by other directives.
- ng-class - set classes on elements.

## \*ngIf

<a href="https://angular.io/api/common/NgIf" target="\_blank">ngIf</a> is a structural directive that allows us to conditionally render content. It can be paired with <a href="https://angular.io/guide/structural-directives#the-ng-template" target="\_blank">ng-template</a> to render an `else` block.

This example shows content blocks based on the value of boolean `showMyContent`.

@sourceref ./ng-if.html
@codepen
@highlight 17-22, 26,only

## \*ngFor

<a href="https://angular.io/api/common/NgForOf" target="\_blank">ngFor</a> is a structural directive that allows to iteratively create content in our templates.

This example displays each name in the `myList` array in an `li` tag.

@sourceref ./ng-for.html
@codepen
@highlight 14-26,only

## ng-container

<a href="https://angular.io/guide/structural-directives#ngcontainer" target="\_blank">ng-container</a> is an element that allows us to create template bindings without creating a DOM element. Only one structural directive is allowed per host element (to avoid confusion around which directive would take precedence) making this directive handy for when we have several logic directives to apply to content.  

This example shows using logic directives to display data without creating additional DOM elements.

@sourceref ./ng-container.html
@codepen
@highlight 17-22,only

## ng-class

The <a href="https://angular.io/api/common/NgClass" target="\_blank">ng-class</a> directive is a way to set classes on elements based on boolean logic. ng-class can take a single class, an array of classes, key value pairs with boolean values, or regexes.

This example shows various ways classes can be added to elements. 

@sourceref ./ng-class.html
@codepen
@highlight 17, 19, 21, 23,25, 27-30, 34, only

Notice in the above example our `ng-class` is surrounded by `[ ]`. This signals that we're passing in an object, instead of just a string. When using <a href="https://angular.io/guide/template-syntax#property-binding--property-" target="\_blank">property binding</a>, `ngClass="value"` will evaluate the value as a string of _"value"_ and `[ngClass]="value"` as whatever the component property value is.

@sourceref ./ng-class-property.html
@codepen
@highlight 17,19,23,only

## P2: Setup

Let's create our restaurant component as well. This will be a component that displays a list of restaurants.

✏️ Run:

```shell
ng g component restaurant
```

For now, we'll use fake data for a list of restaurants in the component, and put the data in a setTimeout to simulate an api call.

✏️ Update __src/app/restaurant/restaurant.component.ts__ to be:

@sourceref ./restaurant.component.ts

✏️ Update __src/app/restaurant/restaurant.component.html__ to be:

```html
<div class="restaurants">
  <h2 class="page-header">Restaurants</h2>
  <!-- if restaurants has a length show the list -->

    <!-- inside this container, show the following markup for each restaurant -->
    <div class="restaurant">

    </div>
    <!-- end of restaurant markup -->
</div>
```

> Reminder: The markup that should be written out for each restaurant can be
  found in the [exercise description](#problem-2-write-restaurant-component-markup-that-displays-a-list-of-restaurants).

✏️ To see our component working, we can paste it into our __src/app/app.component.html__ file just like with the home component:

```html
<h1>Place My Order App: Coming Soon!</h1>
<router-outlet></router-outlet>

<pmo-restaurant></pmo-restaurant>
```
@highlight 4

## P2: How to Verify Your Solution is Correct

✏️ Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P2: Technical Requirements

Here is the markup to show for each restaurant:

```html
<img src="{{restaurant.images.thumbnail}}" width="100" height="100">
<h3>{{restaurant.name}}</h3>

<div class="address" *ngIf="restaurant.address">
  {{restaurant.address.street}}<br />{{restaurant.address.city}}, {{restaurant.address.state}} {{restaurant.address.zip}}
</div>

<div class="hours-price">
  $$$<br />
  Hours: M-F 10am-11pm
  <span class="open-now">Open Now</span>
</div>

<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
<br />
```

To solve this problem, use the Angular directives you learned about to iterate through data and display properties of restaurants.

You'll be editing the following files:
- __src/app/restaurant/restaurant.component.html__ 

## P2: Solution

✏️ Update __src/app/restaurant/restaurant.component.html__ to the following:

@sourceref ./restaurant.component.html
@highlight 3,4
