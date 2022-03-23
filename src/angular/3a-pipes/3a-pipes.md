@page learn-angular/creating-pipes Creating Pipes
@parent learn-angular 3

@description Learn how to create a custom pipe in Angular that returns a modified version of a string.

@body

## Problem

You may have noticed an image error in our rendered html page. We're using an API in this demo that wasn't built for our exact purposes, and we need a different image path for our app to serve.

<img src="../static/img/angular/3-creating-components/restaurant-component.png"
  style="border: solid 1px black; max-width: 320px;"/>

In this exercise, we will fix the path of the thumbnail images in **src/app/restaurant/restaurant.component.html**.

<img src="../static/img/angular/3b-creating-pipes/restaurant-thumbnails.png"
  style="border: solid 1px black; max-width: 320px;"/>

Currently the path is written out like:

```html
<img src="{{ restaurant.images.thumbnail }}" width="100" height="100" />
```

`restaurant.images.thumbnail` will be a path like `node_modules/place-my-order-assets/image.png`. We need to change that path to be more like `./assets/image.png`. Once
the path rewriting is fixed, images will show up correctly.

## What You Need to Know

- How to generate a pipe
- How to use a pipe to transform data

## How to Generate a Pipe via the CLI

Generate a pipe with the following command:

```bash
ng g pipe imageUrl
```

This will generate a pipe file: `image-url.pipe.ts`

## How to Build a Pipe

<a href="https://angular.io/guide/pipes" target="\_blank">Angular Pipes</a> come in handy to transform content in our templates. Pipes allow us to transform data to display to the user in our HTML without modifying the original source.

Angular comes with several built-it pipes like DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. These pipes can be used in templates to modify the way data displays. We can build custom pipes as well. Pipes require one parameter - the value we want to change, but can take an additional parameters as well.

This example takes the value to be transformed and a parameter to use as an exponential multiplier.

@sourceref ./pipe.html
@codepen
@highlight 15-20, 26,only

## Technical Requirements

1. Use an `imageUrl` **pipe** in **src/app/restaurant/restaurant.component.html** to rewrite the path. Using a pipe looks like the following:

```html
<img src="{{ restaurant.images.thumbnail | imageUrl }}" />
```

2. Generate and implement the `imageUrl` **pipe**.

The pipe will take an image url and transform it to the path we actually want to serve the image from. For example, from `node_modules/place-my-order-assets` to `./assets`. This pipe will be used on our restaurant image thumbnail.

> Hint: Use String.prototype.replace to create the new path with image name.

## Setup

✏️ Update **src/app/restaurant/restaurant.component.html** file to use the pipe we will create:

@diff ../3-creating-components/restaurant.component.html ./restaurant.component.html

✏️ Run the following to generate the **pipe** and the pipe's tests:

```bash
ng g pipe imageUrl
```

## How to Verify Your Solution is Correct

✏️ Update the restaurant spec file **src/app/restaurant/restaurant.component.spec.ts** to include the new pipe:

@sourceref ./restaurant.component.spec-with-pipe.ts

@highlight 8,18, only

✏️ Update the spec file **src/app/image-url.pipe.spec.ts** to be:

@sourceref ./image-url.pipe.spec.ts

@highlight 8-14

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## Solution

✏️ Update **src/app/image-url.pipe.ts** to:

@sourceref ./image-url.pipe.ts

@highlight 7-9
