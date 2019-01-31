@page angular/building-our-first-app Building Our First App
@parent angular 1

@description Building Our First App

@body


## Intro to the CLI

Angular has a CLI that does a lot of the initial legwork in setting up a minimal app, as well as letting you easy create and include new components on the fly. 

## Installation

We'll start by globally installing the Angular CLI. 

```shell
npm install -g @angular/cli
```

## Generating a new app

We're going to build a restaurant menu and ordering application. The final result will look like this:

![Place My Order App screenshot](../static/img/place-my-order.png "Place My Order App screenshot")


To create a new Angular Workspace, we run the 'ng new' command. 

```shell
ng new place-my-order  --prefix pmo
cd place-my-order
```

This will create a new Angular Workspace, generate an app module, needed config files, and test suite for your new Angular project. You'll be asked a series of set-up questions: 
1. Would you like to add Angular routing? (yes)
2. Which stylesheet format would you like to use?

Note that we used the prefix property to set our own default prefix. Angular's default is "app", but a good naming convention is to use a short prefix related to your company or application name to easlily differentiate from 3rd party utilities.

```html
//this looks like it's one of our own app components
<pmo-header></pmo-header>

//safe to assume this a 3rd party
<tabset>
    <tab heading="Basic title" id="tab1">Basic content</tab>
    <tab heading="Basic Title 1">Basic content 1</tab>
    <tab heading="Basic Title 2">Basic content 2</tab>
  </tabset>

```

There are several more helpful properities that customize how a project is set up:

### -root

Main directory for all project files. Default empty.

### -sourceRoot

Directory for all project source files.

### -projectType

Can specify application vs. library

### - targets

Used for customizing task commands(build, serve, test) from the default settings. 

## Looking at Our Generated Workspace

Let's walk through some of the files that were generated. 

```code
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tslint.json
├── e2e/
├── src/
|   ├── index.html
|   ├── karma.conf.js
|   ├── main.ts
|   ├── polyfills.ts
|   ├── styles.less
|   ├── test.ts
|   ├── tsconfig.app.json
|   ├── tsconfig.spec.json
|   ├── tslint.json
|   ├── assets/
|   ├── environments/
|   |   ├── environment.ts
|   |   ├── environment.prod.ts
|   ├── app/
|   |   ├── app.module.ts
|   |   ├── app.component.ts
|   |   ├── app.component.spec.ts
|   |   ├── app.component.less
|   |   ├── app.component.html
|   |   ├── app-routing.module.ts
├── node_modules/
```

### angular.json

This file is the config schema for an Angular Workspace. By default Angular configures Webpack for it's build process, and uses the angular.json file for the build information. 

(Note, prior to Angular v6, this file was .angular-cli.json. When migrating versions, having the wrong workspace config file name is a cause for problems.)

### tsconfig.json

This file contains our typescript compiling options. 

### src/main.ts

This is the entry point of our application, it compiles and bootstraps our app.  

### src/index.html

This should feel familiar - our main index page. 

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>SamplePmo</title>
        <base href="/">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>
        //our entry component
        <app-root></app-root>
    </body>
</html>
```

### src/app/app.module.ts

This file is the root module for our app. Every Angular app has at least one module that determines how to compile and launch and app. It uses the @ngModule decorator with four properties:

- declarations [array]: where we include components, directives, and pipes that will be used by this module. 
- imports [array]: where we include any other modules our app needs to use. This may include 3rd party modules like bootstrap datepickers, or modules we've created. 
- providers [array]: where we include services that we want used at the global app level
- bootstrap [array]: where we include the root AppModule - this is the main Application view that hosts all of our other app views. 

## src/app/app.component.ts

This is our root component, you saw it called in our index.html file as ``<app-root></app-root>``

Let's change the markup to look like the home page of our place my order app. 

```
<h1>Place My Order App: Coming Soon!</h1>
<router-outlet></router-outlet>

```

### Serving our app

```shell
ng serve
```

This will compile our code (any typescript errors will throw here), and once ready we can view our app at <a href="http://localhost:4200" target="_blank">localhost:4200</a>

### adding assets

To get our app up and running quicker so we can focus on the architecture, we'll import some pre-created styles and assets to save us time. 

```shell
npm install place-my-order-assets@0.1 --save
```

Open the ``angular.json`` file, and make the following changes to include these files in our build process. This will copy the images into our assets directory for when we serve our application.

```typescript
...
"assets": [
    "src/favicon.ico",
    "src/assets",
    {
        "glob": "**/*",
        "input": "./node_modules/place-my-order-assets/images/",
        "output": "./assets/images"
    }
],
"styles": [
    "src/styles.less",
    "./node_modules/place-my-order-assets/less/styles.less"
],
```

### Creating components

Let's begin to build out the main views of our app. We'll need a home view, and restaurant list page to show all the restaurants we can order from. In Angular, Components are the basic building blocks that help us craft the UI. They are classes that handle views, allow management of user interaction, and displaying information via data binding. Data binding is the term for connecting data or information to the UI. An example would be an input field that a user enters a value into.

Recommended reading: <a href="https://angular.io/guide/lifecycle-hooks" target="_blank" >Angular Lifecyle Hooks</a>

## Lifecycle information here

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

Update the ``home.component.html`` file to be:

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

Update the ``restauarant.component.html`` file to be:

```html
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
```

#### > DETOUR! Pipes in Angular

We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve. <a href="https://angular.io/guide/pipes" target="_blank">Angular Pipes</a> come in handy to transform content in our templates. We'll create a pipe to help handle our image pathing:

```bash
ng g pipe imageUrl
```

In our newly created `image-url.pipe.ts' update the code to be:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace('node_modules/place-my-order-assets', './assets');
  }
}
```

This pipe is called in the markup we added to our html page as:

```html
  <img src="{{restaurant.images.thumbnail | imageUrl}}" width="100" height="100">
  ```
#### END DETOUR

Back to our main restaurant component, in the ``restaurant.component.ts`` file:

```typescript
import { Component, OnInit } from '@angular/core';

interface Item {
    name: string;
    price: number;
}
interface Menu {
    lunch: Array<Item>;
    dinner: Array<Item>;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface Images {
    thumbnail: string;
    owner: string;
    banner: string;
}

export interface Restaurant {
    name: string;
    slug: string;
    images: Images;
    menu: Menu;
    address: Address;
    _id: string;
}
  
export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  constructor() { }

  ngOnInit() {
  }

}
```

We'll come back to this view to feed in data, but for now you'll notice we're using interfaces to help define what our data will look like.


### Routing

To be able to navigate to our restaurant component, we'll need routing. We already told Angular we'd like to set up routing, so it generated `src/app/app-routing.module.ts` for us and included it in our root module.

To create a route to our restaurants component, we'll need to import our restaurants component and update our routes variable to include the new path.


```typescript
// src/app/app-routing.module.ts
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'restaurants',
    component: RestaurantComponent,
  }
];
```

Our router was already added to our index file during our initial app creation.

```html
// src/index.html
<router-outlet></router-outlet>
```

Navigate to <a href="http://localhost:4200/restaurants" target="_blank">localhost:4200/restaurants</a> to see the new view. You may have noticed the ```routerLink``` attribute on the a tag in our home component markup. This one of the ways we link to specific routes in our app.

### Adding Navigation

Open the app.component.html and change it to:

```html
<header>
  <nav>
   <h1>place-my-order.com</h1>
   <ul>
        <li>
            <a routerLink="/home" routerLinkActive="active">Home</a>
        </li>
        <li>
            <a routerLink="/restaurants" routerLinkActive="active">Restaurants</a>
        </li>
   </ul>
  </nav>
</header>
<router-outlet></router-outlet>
```

We now have a nice navigation for our users to change between views!