@page learn-modern-angular/creating-components Creating Components
@parent learn-modern-angular 2

@description Learn how to create basic components in Angular and iterate through data using an Angular for loop.

@body

## Overview

In this part, we will:

- Install already created assets
- Learn about components
- Learn about displaying data in component templates
- Create a home component
- Use interpolation binding in our home component view
- Learn about control flow blocks
- Create a restaurant component that shows a list of restaurants

## Problem 1: Creating a Home Component With a Dynamic Title Member

Let’s begin to build out the main views of our app. We’ll create a home view now,
and restaurant list view in the next exercise.

## P1: What you need to know

- How to generate a new Angular component
- How to bind data in a component to its template

## Generating components

In Angular, Components are the basic building blocks that help us craft the UI. They are classes that handle views, allow management of user interaction, and displaying information via data binding. Data binding is the term for connecting data or information to the UI. An example would be an input field that a user enters a value into.

Recommended reading: <a href="https://angular.dev/guide/components/lifecycle">Component Lifecycle</a>

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
|   |       |── new-component-name.component.css
|   |       |── new-component-name.component.html
```

Generated components have the same structure - a name.component.ts file that will contain the boilerplate code for the Angular component class. This class will also have a component decorator pointing to the name.component.css file for styles, and the name.component.html file for its template. Styles and templates can also be written inline in the decorator with backticks to escape the code using the keys `style` and `template`.

## Binding data to components

Like most modern JS frameworks, Angular provides us a way of displaying data dynamically in the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). Properties declared in a component can be used in the component template with double curly brace syntax: `{{ myTitle }}`

@sourceref ./files/p1.info.template.html
@codepen
@highlight 17,21,only

## Passing data to child components

Data can also be passed to child components. Data can be passed with expression context to determine if passed data is just a string for example, or a property on the component class. This example shows passing data as a string as well as a component member using the `[ ]` syntax.

@sourceref ./files/p1.info.child-data.html
@codepen
@highlight 30-32,only

## P1: Technical requirements

Create a component that displays a title read from a component’s `title` member.

<img src="../static/img/angular/3-creating-components/home-component.png"
  style="border: solid 1px black;" width="640"/>

The component should provide the following HTML:

@sourceref ./files/p1.setup.home.component.html

> Notice the `TITLE GOES HERE` part of the HTML. `TITLE GOES HERE` should be replaced by
> something that reads the component’s `title` property.

The component’s `title` member should have a string value of
`"Ordering food has never been easier"`.

## P1: Setup

To get this application up and running quicker so we can focus on the architecture, we’ll import some pre-created styles and assets to save us time.

✏️ Run:

```shell
npm install place-my-order-assets@0
```

Open the `angular.json` file, and make the following changes to include these files in our build process. This will copy the images into our `public` directory for when we serve our application.

> Pay close attention that you’re making these changes under the "build" key and not the "test" key, as the code looks very similar. The build key should be close to line 24.

<details open>
<summary>section copied - angular.json</summary>
✏️ Update __angular.json__:

@sourceref ./files/p1.setup.angular.json
@highlight 28-32,36,only

</details>

**Any time changes are made to the `angular.json` file, we need to restart our server to catch the new changes.**

✏️ **Quit process by running `Ctrl + C`.**

While we are building the component, it will be nice to see it in the
application. One of the ways components can be rendered is by putting them in markup. We’ll do this by putting our `<pmo-home />` tag in our base app component markup. To see the
`<pmo-home>` component, do the following.

✏️ Run:

```shell
ng g component home
```

✏️ Update **src/app/app.component.html** to be:

@diff ../01-building-first-app/app.component.html ./files/p1.setup.app.component.html only

✏️ To be able to use `HomeComponent` directly in `AppComponent`'s template, `AppComponent` needs to import `HomeComponent`. Update **src/app/app.component.ts** to be:

@sourceref ./files/p1.setup.app.component.ts
@highlight 3,7

✏️ Update **src/app/home/home.component.html** to be:

@sourceref ./files/p1.setup.home.component.html
@highlight 8

Run `npm run start`, and your app should compile with no errors, and you’ll be able to see the home component. Later we’ll move the home component to its own page with a unique route.

## P1: How to verify your solution is correct

✏️ Update the spec file **src/app/home/home.component.spec.ts** to be:

@sourceref ../../../exercises/angular/3-creating-components/problem/src/app/home/home.component.spec.ts
@highlight 23-39, only

## P1: Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/home/home.component.html**

@diff ./files/p1.setup.home.component.html ./files/p1.solution.home.component.html only

✏️ Update **src/app/home/home.component.ts**

@diff ./files/p1.setup.home.component.ts ./files/p1.solution.home.component.ts only

</details>

## Problem 2: Write Restaurant Component Markup that Displays a List of Restaurants

We want to display a list of restaurants in our UI once the data has been set on the restaurants member. It will look like:

<img src="../static/img/angular/3-creating-components/restaurant-component.png"
  style="border: solid 1px black;" width="640"/>

> Note: We will fix the missing images in the next step.

## P2: What you need to know

To solve this exercise, you’ll need to learn about Angular’s control flow blocks. Template directives in Angular help us iterate through and manipulate data we’ve bound to the DOM. You’ll need some of the following:

- @if — conditionally show content.
- @for — iterate through a list and create content for each item in the list.

## @if

<a href="https://angular.dev/guide/templates/control-flow#conditionally-display-content-with-if-else-if-and-else">@if</a> is a control flow block that allows us to conditionally render content. It can be paired with `@else if` and `@else` for additional logic.

This example shows content blocks based on the value of boolean `showMyContent`.

@sourceref ./files/p2.info.if-block.ts
@highlight 7-11,16,only

## @for

<a href="https://angular.dev/guide/templates/control-flow#repeat-content-with-the-for-block">@for</a> is a control flow block that allows to iteratively create content in our templates.

This example displays each name in the `names` array in an `li` tag.

@sourceref ./files/p2.info.for-block.ts
@highlight 7-9,14,only

## P2: Setup

Let’s create our restaurant component as well. This will be a component that displays a list of restaurants.

✏️ Run:

```shell
ng g component restaurant
```

For now, we’ll use fake data for a list of restaurants in the component, and put the data in a setTimeout to simulate an api call.

✏️ Update **src/app/restaurant/restaurant.component.ts** to be:

@diff ./files/p2.setup.restaurant.component.initial.ts ./files/p2.setup.restaurant.component.ts only

To solve this problem, use Angular directives to iterate through data and display properties of restaurants.

✏️ Update **src/app/restaurant/restaurant.component.html** to be:

@sourceref ./files/p2.setup.restaurant.component.html

✏️ To see our component working, we can paste it into our **src/app/app.component.html** file just like with the `HomeComponent`:

@diff ./files/p1.setup.app.component.html ./files/p2.setup.app.component.html only

✏️ Similar to `HomeComponent`, we need to import `RestaurantComponent` in **src/app/app.component.ts**:

@diff ./files/p1.setup.app.component.ts ./files/p2.setup.app.component.ts only

## P2: How to verify your solution is correct

✏️ Update the spec file **src/app/restaurant/restaurant.component.spec.ts** to be:

@sourceref ./files/p2.test.restaurant.component.spec.ts
@highlight 32-56, only

## P2: Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.component.html** to the following:

@diff ./files/p2.setup.restaurant.component.html ./files/p2.solution.restaurant.component.html only

</details>
