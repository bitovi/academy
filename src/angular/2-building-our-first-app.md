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
3
### Serving our app

```shell
ng serve
```

This will compile our code (any typescript errors will throw here), and once ready we can view our app at <a href="http://localhost:4200" target="_blank">localhost:4200</a>

### adding assets

To get our app up and running quicker so we can focus on the architecture, we'll import some precreated styles and assets to save us time. 

```shell
npm install place-my-order-assets@0.1 --save
```

Open the ``angular.json`` file, and make the following changes to include these files in our build process. 

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

### creating components

Let's begin to build out the main views of our app. We'll need a home view, and restaurant list page to show all the restaurants we can order from. 

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

### adding routing

To be able to navigate to our restaurant compoent, we'll need routing. We already told Angular we'd like to set up routing, so it generated ``src/app/app-routing.module.ts`` for us. 

To create a route to our restaurants component, we'll need to import our restaraunts component and update our routes variable to include the new path. 


```typescript
// src/app/app-routing.module.ts
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
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

We now have a nice navigation for our users to change between views. 