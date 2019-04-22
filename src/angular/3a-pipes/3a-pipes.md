@page learn-angular/creating-pipes Creating Pipes
@parent learn-angular 3

@description Learn how to create a custom pipe in Angular.

@body

## The problem

You may have noticed an image error in our rendered html page. We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve.

<img src="../static/img/angular/3-creating-components/restaurant-component.png"
  style="border: solid 1px black; max-width: 320px;"/>

In this exercise, we will fix the path of the thumbnail images in __src/app/restaurant/restaurant.component.html__.

<img src="../static/img/angular/3b-creating-pipes/restaurant-thumbnails.png"
  style="border: solid 1px black; max-width: 320px;"/>

Currently the path is written out like:

```html
<img src="{{restaurant.images.thumbnail}}" width="100" height="100">
```

`restaurant.images.thumbnail` will be a path like `node_modules/place-my-order-assets/image.png`.  We need to change that path to be more like `./assets/image.png`. Once
the path rewriting is fixed, images will show up correctly.

## How to solve the problem

To solve this problem, we will:

- Use an `imageUrl` __pipe__ in __src/app/restaurant/restaurant.component.html__ to rewrite the path.  Using a pipe looks like the following:
  ```html
  <img src="{{restaurant.images.thumbnail | imageUrl}}"/>
  ```
- Generate and implement the `imageUrl` __pipe__.

  The pipe will take an image url and transform it to the path we actually want to serve the image from. For eaxmple, from `node_modules/place-my-order-assets` to `./assets`.  This pipe will be used on our restaurant image thumbnail.

## Setup

Update __src/app/restaurant/restaurant.component.html__ file to use the pipe we will create:

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

Run the following to generate the __pipe__ and the pipe's tests:

```bash
ng g pipe imageUrl
```

## Verifying the solution

Update the restaurant spec file __src/app/restaurant/restaurant.component.spec.ts__ to include the new pipe:

@sourceref ./restaurant.component.spec-with-pipe.ts
@highlight 3,16, only

Update the spec file  __src/app/image-url.pipe.spec.ts__ to be:

@sourceref ./image-url.pipe.spec.ts


> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!


## What you need to know

#### How to create a pipe

Generate a pipe with the following command:

```bash
ng g pipe imageUrl
```

This will generate a pipe file: `image-url.pipe.ts`

#### How to build a pipe.

<a href="https://angular.io/guide/pipes" target="\_blank">Angular Pipes</a> come in handy to transform content in our templates. Pipes allow us to transform data to display to the user in our HTML without modifying the original source.  

Angular comes with several built-it pipes like DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. These pipes can be used in templates to modify the way data displays. We can build custom pipes as well. Pipes require one parameter - the value we can to change, but can take an additional parameters as well.

This example takes the value to be transformed and a parameter to use as an exponential multiplier.

@sourceref ./pipe.html
@codepen
@highlight 15-20, 26,only

> Hint: Use String.prototype.replace to create the new path with image name.


## The solution

Update __src/app/image-url.pipe.ts__ to:

@sourceref ./image-url.pipe.ts
