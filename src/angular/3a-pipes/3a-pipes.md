@page angular-training/creating-pipes Creating Pipes
@parent angular-training 3

@description Learn how to create a custom pipe in Angular.

@body

## Exercise Overview

You may have noticed an image error in our rendered html page. We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve. <a href="https://angular.io/guide/pipes" target="\_blank">Angular Pipes</a> come in handy to transform content in our templates. Pipes allow us to transform data to display to the user in our HTML without modifying the original source.  

Angular comes with several built-it pipes like DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. These pipes can be used in templates to modify the way data displays. We can build custom pipes as well. Pipes require one parameter - the value we can to change, but can take an additional parameters as well.

This example takes the value to be transformed and a parameter to use as an exponential multiplier.

@sourceref ./pipe.html
@codepen
@highlight 15-20, 26,only

## The problem

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

## What You Need to know

- How to create a pipe

  ```bash
  ng g pipe imageUrl
  ```

  This will generate a pipe file: `image-url.pipe.ts`

- How pipes are used (you learned this in section above! ✔️)

> Hint: Use String.prototype.replace to create the new path with image name.

## Verify Your Solution

Update the restaurant spec file __src/app/restaurant/restaurant.component.spec.ts__ to include the new pipe:

@sourceref ./restaurant.component.spec-with-pipe.ts
@highlight 3,16, only

Update the spec file  __src/app/image-url.pipe.spec.ts__ to be:

@sourceref ./image-url.pipe.spec.ts


> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## The Solution

__src/app/image-url.pipe.ts__

@sourceref ./image-url.pipe.ts
