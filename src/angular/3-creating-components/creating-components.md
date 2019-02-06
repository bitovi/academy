@page angular/creating-components Creating Components
@parent angular 3

@description Creating Our First Components

@body

## Overview

In this part, we will:

- Install precreated assets
- Generate home and restaurant components
- Use pipes for image paths
- Write an interface to describe our restaurant data

### Adding Assets

To get our app up and running quicker so we can focus on the architecture, we'll import some pre-created styles and assets to save us time.

```shell
npm install place-my-order-assets@0.1 --save
```

Open the ``angular.json`` file, and make the following changes to include these files in our build process. This will copy the images into our assets directory for when we serve our application.

@sourceref ./angular-json-assets.ts
@highlight 25-39,only

__Any time changes are made to the `angular.json` file, we need to restart our server to catch the new changes.__ 

## Creating components

Let's begin to build out the main views of our app. We'll need a home view, and restaurant list page to show all the restaurants we can order from. In Angular, Components are the basic building blocks that help us craft the UI. They are classes that handle views, allow management of user interaction, and displaying information via data binding. Data binding is the term for connecting data or information to the UI. An example would be an input field that a user enters a value into.

Recommended reading: <a href="https://angular.io/guide/lifecycle-hooks" target="_blank" >Angular Lifecyle Hooks</a>

```shell
ng g component home
ng g component restaurant
```

This will create two new components for us and import them in our root module.

```code
├── src/
|   ├── app/
|   |   ├── home/
|   |       |── home.component.ts
|   |       |── home.component.spec.ts
|   |       |── home.component.less
|   |       |── home.component.html
|   |   ├── restaurant/
|   |       |── restaurant.component.ts
|   |       |── restaurant.component.spec.ts
|   |       |── restaurant.component.less
|   |       |── restaurant.component.html
```

Update the `home.component.html` file to be:

__src/app/home/home.component.html__

```html
<div class="homepage">
  <img src="./assets/images/homepage-hero.jpg" alt="Restaurant table with glasses." width="250" height="380" />
  <h1>Ordering food has never been easier</h1>
  <p>
    We make it easier than ever to order gourmet food
    from your favorite local restaurants.
  </p>
  <p>
     <a class="btn" routerLink="/restaurants" role="button">Choose a Restaurant</a>
  </p>
</div>
```

We're going to add a lot of content to this template initially that we'll hook into later in this training. For the present it is okay to copy and past this code without completely understanding what each concept does. Update the `restaurant.component.html` file to be:

__src/app/restaurant/restaurant.component.html__

```html
<div class="restaurants">
  <h2 class="page-header">Restaurants</h2>
  <ng-container *ngIf="restaurants.length">
    <div class="restaurant" *ngFor="let restaurant of restaurants.value">

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

### ng-container

<a href="https://angular.io/guide/structural-directives#ngcontainer" target="_blank">ng-container</a> is an element that allows us to create template bindings without creating a dom element.

### *ngIf

<a href="https://angular.io/api/common/NgIf" target="_blank">ngIf</a> is a structural directive that allows us to conditionally render content. It can be paired with ng-template to render an `else` block. 

```html
<div *ngIf="myValIsTrue; else notTrue">
</div>
<ng-template #notTrue>
  I render if myValIsTrue is not true
</ng-template>
```

### *ngFor

<a href="https://angular.io/api/common/NgForOf" target="_blank">ngFor</a> is a structural directive that allows to iteratively create content in our templates. 

#### > DETOUR! Pipes in Angular

We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve. <a href="https://angular.io/guide/pipes" target="\_blank">Angular Pipes</a> come in handy to transform content in our templates. We'll create a pipe to help handle our image pathing:

```bash
ng g pipe imageUrl
```

Angular CLI will generate the basics needed for a pipe component, but we're not going to pass any arguments to our pipe, so we can remove that param. In our newly created `image-url.pipe.ts` update the code to be:

__src/app/image-url.pipe.ts__

@sourceref ./image-url.pipe.ts

This pipe is called in the markup we added to our html page as:

```html
  <img src="{{restaurant.images.thumbnail | imageUrl}}" width="100" height="100">
  ```

#### END DETOUR

Back to our main restaurant component, in the ``restaurant.component.ts`` file:

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 9

We'll come back to this view to feed in data, but for now you'll notice we're setting a restaurants property to an empty array. Run `npm run start`, and your app should compile with no errors!