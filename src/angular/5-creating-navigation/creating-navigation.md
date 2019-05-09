@page learn-angular/creating-navigation Creating Navigation
@parent learn-angular 5

@description Learn how to create dynamic links with Angular that navigate to different parts of an application.

@body

## Overview

In this part, we will:

- Use routerLink to create navigation links
- Use routerLinkActive to highlight current navigation

## Problem

We want to create _Home_ and _Restaurant_ links in our app navigation that can
be used to navigate between pages.  We also want those links to change color
if they are for the current page or not.

<img src="../static/img/angular/pmo-working-nav.gif"
  style="border: solid 1px black; "
  title="Place My Order App working nav"/>

## Technical Requirements

Create a navigation menu that will route to our home and restaurant components when clicked, as well as show an `active` class on the `li` element when the route is active.

Make your changes in the __src/app/app.component.html__ file. The markup structure should look like this:

```html
<header>
    <nav>
     <h1>place-my-order.com</h1>
     <ul>
       <li>
         <a>Home</a>
       </li>
       <li>
         <a>Restaurants</a>
       </li>
     </ul>
    </nav>
  </header>
```

## How to Verify Your Solution is Correct

You will know you've completed the exercise correctly when you can click the nav items to
see the UI change and see the active class on the current nav item.

![Place My Order App working nav](../static/img/angular/pmo-working-nav.gif "Place My Order App working nav")


✏️ Update the spec file  __src/app/app.component.spec.ts__ to be:

@sourceref ./app.component.spec.ts
@highlight 33

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## What You Need to Know

To solve this, you will need to know how to:

- How to use the routerLink directive
- How to use the routerLinkActive directive

## RouterLink

You may have noticed the links in the routing examples to switch between views. They use the <a href="https://angular.io/api/router/RouterLink" target="\_blank">routerLink</a> directive. The routerLink takes a property of a path that can be static or built dynamically based on properties on the component.  

### Static routerLink Segments

The following is an example of a hard coded path:

@sourceref ./static-path.html
@codepen
@highlight 25, only

### Dynamic routerLink Segments

The following is an example of a path being built from different pieces of data. In reusable components we'll often want to dynamically create paths based on a piece of datas unique property values.

@sourceref ./dynamic-path.html
@codepen
@highlight 28,35, only

## RouterLinkActive

The <a href="https://angular.io/api/router/RouterLinkActive" target="\_blank">routerLinkActive</a> directive lets you add a CSS class to an element when the link's route becomes active. Angular looks at the path to determine if the route is active and will return true if any of the path matches, meaning when a path contains a "child" segment the route active status will still return true. If exact specificity is needed, `[routerLinkActiveOptions]="{exact: true}"` can be used.

### Adding a Basic Active Class

@sourceref ./router-link-active-basic.html
@codepen
@highlight 25, only

### Adding an Active Class with Options

Using `{exact: true}` will only set the class if the path match is exactly equal. `{exact: true}` can also be applied to parents of routerlinks

@sourceref ./router-link-active-options.html
@codepen
@highlight 24-25,27-30, only

### Adding an Active Class with Template Variable

RouterLinkActive can also be used to set <a href="https://angular.io/api/router/RouterLinkActive#template-variable-references" target="\_blank">template variables</a> to check the active status of the route. In this example we're creating a template variable `myroutervariable` to represent our route and it's active state for logic in our template.

@sourceref ./router-link-active-template.html
@codepen
@highlight 27-31, only

## Solution

✏️ Update __src/app/app.component.html__ to:

@sourceref ./app.component.html
@highlight 1-14
