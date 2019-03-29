@page angular/creating-components Creating Components
@parent angular 3

@description Creating our first components

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
- Learn about pipes
- Create a pipe to create an image path

## Adding Assets

To get our app up and running quicker so we can focus on the architecture, we'll import some pre-created styles and assets to save us time.

```shell
npm install place-my-order-assets@0.1 --save
```

Open the ``angular.json`` file, and make the following changes to include these files in our build process. This will copy the images into our assets directory for when we serve our application.

> Pay close attention that you're making these changes under the `"build":` key and not the `"test":` key, as the code looks very similar. The build key should be close to line 17.

@sourceref ./angular.json
@highlight 25-39,only

__Any time changes are made to the `angular.json` file, we need to restart our server to catch the new changes.__

## Creating Components

Let's begin to build out the main views of our app. We'll need a home view, and restaurant list page to show all the restaurants we can order from. 

In Angular, Components are the basic building blocks that help us craft the UI. They are classes that handle views, allow management of user interaction, and displaying information via data binding. Data binding is the term for connecting data or information to the UI. An example would be an input field that a user enters a value into.

Recommended reading: <a href="https://angular.io/guide/lifecycle-hooks" target="\_blank" >Angular Lifecyle Hooks</a>

## Binding Data to Components

Like all modern JS frameworks, Angular provides us a way of displaying data dynamically in the DOM. Properties declared in a component can be used in the component template with double curly brace syntax: `{{myTitle}}`

  @sourceref ./template.html
  @codepen
  @highlight 17,21,only

## Exercise: Creating a Home Component With a Dynamic Title Member

### The problem

We want to create a component that displays a title read from a component's `title` property.
The component should provide the following HTML:

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1>TITLE_GOES_HERE</h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

> Notice the `TITLE_GOES_HERE` part of the HTML. `TITLE_GOES_HERE` should be replaced by
> something that reads the component's `title` property.

The component's `title` property should have a string value of
`"Ordering food has never been easier"`.

### What you need to know

- How to generate a component:

  ```shell
  ng g component home
  ```

  This will create a new component for us and import it in our root module.

  ```code
  ├── src/
  |   ├── app/
  |   |   ├── home/
  |   |       |── home.component.ts
  |   |       |── home.component.spec.ts
  |   |       |── home.component.less
  |   |       |── home.component.html
  ```

- How to bind data to the DOM (you learned this in the Binding Data to Components section above! ✔️)
- How to view your new component:

  One of the ways components can be rendered is by putting them in markup. We'll do this by putting our `<pmo-home></pmo-home>` tag in our base app component markup. 
  
  Open your __src/app/app.component.html__ file and update it to be:

  ```html
  <h1>Place My Order App: Coming Soon!</h1>
  <router-outlet></router-outlet>

  <pmo-home></pmo-home>
  ```
  @highlight 4

  Run `npm run start`, and your app should compile with no errors, and you'll be able to see the home component. Later we'll move the home component to it's own page with a unique route.


Update the `home.component.html` file to be:

__src/app/home/home.component.html__

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1>place a dynamic title here</h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

### To Verify Your Solution is Correct

Update the spec file  __src/app/home/home.component.spec.ts__ to be:

@sourceref ./home.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The solution

__src/app/home/home.component.html__

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

## Template Directives

Template directives in Angular help us iterate through and manipulate data we've bound to the DOM. Here are a few more common ones:

### \*ngIf

<a href="https://angular.io/api/common/NgIf" target="\_blank">ngIf</a> is a structural directive that allows us to conditionally render content. It can be paired with <a href="https://angular.io/guide/structural-directives#the-ng-template" target="\_blank">ng-template</a> to render an `else` block.

@sourceref ./ng-if.html
@codepen
@highlight 17-22, 26,only

### \*ngFor

<a href="https://angular.io/api/common/NgForOf" target="\_blank">ngFor</a> is a structural directive that allows to iteratively create content in our templates.

@sourceref ./ng-for.html
@codepen
@highlight 14-26,only

### ng-container

<a href="https://angular.io/guide/structural-directives#ngcontainer" target="\_blank">ng-container</a> is an element that allows us to create template bindings without creating a DOM element. Only one structural directive is allowed per host element (to avoid confusion around which directive would take precedence) making this directive handy for when we have several logic directives to apply to content.  

@sourceref ./ng-container.html
@codepen
@highlight 17-22,only

### ng-class

The <a href="https://angular.io/api/common/NgClass" target="_blank">ng-class</a> directive is a way to set classes on elements based on boolean logic. ng-class can take a single class, an array of classes, key value pairs with boolean values, or regexes.

@sourceref ./ng-class.html
@codepen
@highlight 17, 19, 21, 23,25, 27-30, 34, only

Notice in the above example our `ng-class` is surrounded by `[ ]`. This signals that we're passing in an object, instead of just a string. 

When using <a href="https://angular.io/guide/template-syntax#property-binding--property-" target="_blank">property binding</a>, `ngClass="value"` will evaluate the value as a string of _"value"_ and `[ngClass]="value"` as whatever the component property value is.

@sourceref ./ng-class-property.html
@codepen
@highlight 17,19,23,only

## Generating A Restaurant Component

Let's create our restaurant component as well. This will be a component that displays a list of restaurants.

```shell
ng g component restaurant
```

For now, we'll use fake data for a list of restaurants in the component, and put the data in a setTimeout to simulate an api call. Update the __src/app/restaurant/restaurant.component.ts__ to be:

@sourceref ./restaurant.component.ts

Update the `restaurant.component.html` file to be:

__src/app/restaurant/restaurant.component.html__

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

To see our view working, we can paste it into our __src/app/app.component.html__ file just like with the home component:

```html
<h1>Place My Order App: Coming Soon!</h1>
<router-outlet></router-outlet>

<pmo-restaurant></pmo-restaurant>
```

## Exercise: Write Restaurant Component Markup that Displays a List of Restaurants

### The problem

We want to display a list of restaurants in our UI once the data has been set on the restaurants member.  

### What you need to know

- We covered the directives you'll need to use above!

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

### To Verify Your Solution is Correct

Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The solution

@sourceref ./restaurant.component.html
@highlight 3,4


### DETOUR! Pipes in Angular

You may have noticed an image error in our rendered html page. We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve. <a href="https://angular.io/guide/pipes" target="\_blank">Angular Pipes</a> come in handy to transform content in our templates. Pipes allow us to transform data to display to the user in our HTML without modifying the original source.  

Angular comes with several built-in pipes like `DatePipe`, `UpperCasePipe`, `LowerCasePipe`, `CurrencyPipe`, and `PercentPipe`. These pipes can be used in templates to modify the way data displays. 

We can also build custom pipes as well. Pipes require one parameter - the value we want to change, but can take additional parameters as well.

This example takes the value to be transformed and a parameter to use as an exponential multiplier.

@sourceref ./pipe.html
@codepen
@highlight 15-20, 26,only

## Exercise: Create a pipe that returns the correct image path for files

### The problem

We want to write a pipe that takes an image url and transforms it to the path we actually want to serve the image from. `node_modules/place-my-order-assets` -> `./assets`.  This pipe will be used on our restaurant image thumbnail. Update your __src/app/restaurant/restaurant.component.html__ file to be:

```html
<div class="restaurants">
  <h2 class="page-header">Restaurants</h2>
  <ng-container *ngIf="restaurants.length">
    <div class="restaurant" *ngFor="let restaurant of restaurants">

      <img src="{{restaurant.images.thumbnail | imageUrl}}" width="100" height="100">
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
    </div>
  </ng-container>
</div>
```
@highlight 6

### What You Need to know

- How to create a pipe

  ```bash
  ng g pipe imageUrl
  ```

  This will generate a pipe file: `image-url.pipe.ts`

- How pipes are used (you learned this in section above! ✔️)

> Hint: Use String.prototype.replace to create the new path with image name.

### To Verify Your Solution is Correct

Update the restaurant spec file __src/app/restaurant/restaurant.component.spec.ts__ to include the new pipe:

@sourceref ./restaurant.component.spec-with-pipe.ts
@highlight 3,16, only

Update the spec file  __src/app/image-url.pipe.spec.ts__ to be:

@sourceref ./image-url.pipe.spec.ts


> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The Solution

__src/app/image-url.pipe.ts__

@sourceref ./image-url.pipe.ts
