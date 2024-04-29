@page learn-angular/creating-pipes Creating Pipes
@parent learn-angular 3

@description Learn how to create a custom pipe in Angular that returns a modified version of a string.

@body

## Problem

You may have noticed an image error in our rendered html page. We’re using an API in this demo that wasn’t built for our exact purposes, and we need a different image path for our app to serve.

<img src="../static/img/angular/3-creating-components/restaurant-component.png"
  style="border: solid 1px black; max-width: 320px;"/>

In this exercise, we will fix the path of the thumbnail images in **src/app/restaurant/restaurant.component.html**.

<img src="../static/img/angular/3b-creating-pipes/restaurant-thumbnails.png"
  style="border: solid 1px black; max-width: 320px;"/>

Currently the path is written out like:

```html
<img
  alt=""
  src="{{ restaurant.images.thumbnail }}"
  width="100"
  height="100"
/>
```
@highlight 3

`restaurant.images.thumbnail` will be a path like `node_modules/place-my-order-assets/image.png`. We need to change that path to be more like `./assets/image.png`. Once
the path rewriting is fixed, images will show up correctly.

## What you need to know

- How to generate a pipe
- How to use a pipe to transform data

## How to Generate a Pipe via the CLI

Generate a pipe with the following command:

```bash
ng g pipe imageUrl
```

This will generate a pipe file: `image-url.pipe.ts`

## How to Build a Pipe

<a href="https://angular.io/guide/pipes">Angular Pipes</a> come in handy to transform content in our templates. Pipes allow us to transform data to display to the user in our HTML without modifying the original source.

Angular comes with several built-it pipes like DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. These pipes can be used in templates to modify the way data displays. We can build custom pipes as well. Pipes require one parameter - the value we want to change, but can take an additional parameters as well.

This example takes a price to be transformed and a parameter to use as the currency symbol.

@sourceref ./pipe.html
@codepen
@highlight 15-20, 26,only

## Technical requirements

1. Use an `imageUrl` **pipe** in **src/app/restaurant/restaurant.component.html** to rewrite the path. Using a pipe looks like the following:

```html
<img
  alt=""
  src="{{ restaurant.images.thumbnail }}"
  width="100"
  height="100"
/>
```
@highlight 3

2. Generate and implement the `imageUrl` **pipe**.

The pipe will take an image url and transform it to the path we actually want to serve the image from. For example, from `node_modules/place-my-order-assets` to `./assets`. This pipe will be used on our restaurant image thumbnail.

> Hint: Use String.prototype.replace to create the new path with image name.

## Setup

✏️ Run the following to generate the **pipe** and the pipe’s tests:

```bash
ng g pipe imageUrl
```

✏️ Update **src/app/restaurant/restaurant.component.html** file to use the pipe we will create:

@diff ../3-creating-components/restaurant.component.solution.html ./restaurant.component.html only

### Having issues with your local setup?

You can get through most of this tutorial by using an online code editor. You won’t be able to run our tests to verify your solution, but you will be able to make changes to your app and see them live.

You can use one of these two online editors:

- [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/angular/3a-pipes/problem?file=src/app/image-url.pipe.ts)

- [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/angular/3a-pipes/problem?file=src/app/image-url.pipe.ts)

## How to verify your solution is correct

✏️ Update the restaurant spec file **src/app/restaurant/restaurant.component.spec.ts** to include the new pipe:

@diff ../3-creating-components/restaurant.component.spec.ts ../../../exercises/angular/3a-pipes/problem/src/app/restaurant/restaurant.component.spec.ts only

✏️ Update the spec file **src/app/image-url.pipe.spec.ts** to be:

@sourceref ../../../exercises/angular/3a-pipes/problem/src/app/image-url.pipe.spec.ts
@highlight 8-14

## Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/image-url.pipe.ts** to:

@diff ../../../exercises/angular/3a-pipes/problem/src/app/image-url.pipe.ts ./image-url.pipe.ts only

</details>
