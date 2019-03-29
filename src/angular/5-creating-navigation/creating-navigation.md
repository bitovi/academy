@page angular/creating-navigation Creating Navigation
@parent angular 5

@description Creating Navigation

@body

## Overview

In this part, we will:

- Use `routerLink` to create navigation links
- Use `routerLinkActive` to highlight current navigation

## RouterLink

You may have noticed the links in the routing examples to switch between views. They use the <a href="https://angular.io/api/router/RouterLink" target="\_blank">routerLink</a> directive. The `routerLink` takes a property of a path that can be static or built dynamically based on properties on the component.  

### Static Segment

The following is an example of a hard coded path:

@sourceref ./static-path.html
@codepen
@highlight 25, only

### Dynamic Segment

The following is an example of a path being built from different pieces of data. In reusable components we'll often want to dynamically create paths based on a piece of data's unique property values. 

@sourceref ./dynamic-path.html
@codepen
@highlight 28,35, only

## RouterLinkActive

The <a href="https://angular.io/api/router/RouterLinkActive" target="\_blank">routerLinkActive</a> directive lets you add a CSS class to an element when the link's route becomes active.

### Adding a basic active class

@sourceref ./router-link-active-basic.html
@codepen
@highlight 25, only

### Adding an active class with options

Using `{exact: true}` will only set the class if the path match is exactly equal. `{exact: true}` can also be applied to parents of `routerLink`s.

@sourceref ./router-link-active-options.html
@codepen
@highlight 24-25,27-30, only

### Adding an active class with template variable

`RouterLinkActive` can also be used to set <a href="https://angular.io/api/router/RouterLinkActive#template-variable-references" target="\_blank">template variables</a> to check the active status of the route. In this example we're creating a template variable `myroutervariable` to represent our route and it's active state for logic in our template.

@sourceref ./router-link-active-template.html
@codepen
@highlight 27-31, only

## Exercise: Building Navigation for Our App

### The problem

We want navigation in our __src/app/app.component.html__ file that will route to our home and restaurant components when clicked, as well as show an `active` class on the `li` element when the route is active.

The markup structure should look like this:

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

### What You Need to Know

- How to use the `routerLink` directive
- How to use the `routerLinkActive` directive

### To Verify Your Solution is Correct

You will know you've completed the exercise correctly when you can click the nav items to see the UI change and see the active class on the current nav item.

![Place My Order App working nav](../static/img/pmo-working-nav.gif "Place My Order App working nav")


Update the spec file  __src/app/app.component.spec.ts__ to be:

@sourceref ./app.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### Solution

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 1-14
