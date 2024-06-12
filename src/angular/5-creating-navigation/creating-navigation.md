@page learn-angular/creating-navigation Creating Navigation
@parent learn-angular 5

@description Learn how to create dynamic links with Angular that navigate to different parts of an application.

@body

## Overview

In this part, we will:

- Use `routerLink` to create navigation links
- Use `routerLinkActive` to highlight current navigation

## Problem

We want to create _Home_ and _Restaurant_ links in our app navigation that can
be used to navigate between pages. We also want those links to change color
if they are for the current page or not.

<img src="../static/img/angular/pmo-working-nav.gif"
  style="border: solid 1px black; "
  alt="Place My Order App working nav"/>

## What you need to know

To solve this, you will need to know how to:

- How to use the `routerLink` directive
- How to use the `routerLinkActive` directive

## RouterLink

You may have noticed the links in the routing examples to switch between views. They use the <a href="https://angular.io/api/router/RouterLink">routerLink</a> directive. The `routerLink` takes a property of a path that can be static or built dynamically based on properties on the component.

### Static routerLink Segments

The following is an example of a hard coded path:

@sourceref ./static-path.html
@codepen
@highlight 25, only

### Dynamic routerLink Segments

The following is an example of a path being built from different pieces of data. In reusable components we’ll often want to dynamically create paths based on a piece of data’s unique property values.

@sourceref ./dynamic-path.html
@codepen
@highlight 28,35, only

## RouterLinkActive

The <a href="https://angular.io/api/router/RouterLinkActive">routerLinkActive</a> directive lets you add a CSS class to an element when the link's route becomes active. Angular looks at the path to determine if the route is active and will return true if any of the path matches, meaning when a path contains a "child" segment the route active status will still return true. If exact specificity is needed, `[routerLinkActiveOptions]="{exact: true}"` can be used.

### Adding a Basic Active Class

@sourceref ./router-link-active-basic.html
@codepen
@highlight 25, only

### Adding an Active Class with Options

Using `{exact: true}` will only set the class if the path match is exactly equal. `{exact: true}` can also be applied to parents of `routerLink`s.

@sourceref ./router-link-active-options.html
@codepen
@highlight 24-25,27-28,30, only

### Adding an Active Class with Template Variable

`RouterLinkActive` can also be used to set <a href="https://angular.io/api/router/RouterLinkActive#template-variable-references">template variables</a> to check the active status of the route. In this example, we’re creating a template variable `userLink` to represent our route and its active state for logic in our template.

@sourceref ./router-link-active-template.html
@codepen
@highlight 27-28, 32, only

## Technical requirements

Create a navigation menu that will route to our home and restaurant components when clicked, as well as show an `active` class on the `li` element when the route is active.

## Setup

Make your changes in the **src/app/app.component.html** file. The markup structure should look like this:

@diff ../4-adding-routing/app.component.html ./app.component.problem.html

## How to verify your solution is correct

You will know you’ve completed the exercise correctly when you can click the nav items to
see the UI change and see the active class on the current nav item.

![Place My Order App working nav](../static/img/angular/pmo-working-nav.gif 'Place My Order App working nav')

✏️ Update the spec file **src/app/app.component.spec.ts** to be:

@diff ../4-adding-routing/app.component.spec.ts ./app.component.spec.ts only

## Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/app.component.html** to:

@diff ./app.component.problem.html ./app.component.solution.html

</details>
