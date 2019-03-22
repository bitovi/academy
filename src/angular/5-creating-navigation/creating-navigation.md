@page angular/creating-navigation Creating Navigation
@parent angular 5

@description Creating Navigation

@body

## Overview

In this part, we will:

- Use routerLink to create navigation links
- Use routerLinkActive to highlight current navigation

## RouterLink

You may have noticed the links in the routing examples to switch between views. They used the <a href="https://angular.io/api/router/RouterLink" target="\_blank">routerLink</a> directive. The routerLink takes a property of a path that can be static or built dynamically based on properties on the component.  

### Static Segment

@sourceref ./static-path.html
@codepen
@highlight 23, only

### Dynamic Segment

@sourceref ./dynamic-path.html
@codepen
@highlight 26,33, only

## RouterLinkActive

The <a href="https://angular.io/api/router/RouterLinkActive" target="\_blank">routerLinkActive</a> directive lets you add a CSS class to an element when the link's route becomes active.

### Adding a basic active class

@sourceref ./router-link-active-basic.html
@codepen
@highlight 23, only

### Adding an active class with options

Using `{exact: true}` will only set the class if the path match is exactly equal. `{exact: true}` can also be applied to parents of routerlinks

@sourceref ./router-link-active-options.html
@codepen
@highlight 25-26,28-31, only

### Adding an active class with template variable

RouterLinkActive can also be used to set <a href="https://angular.io/api/router/RouterLinkActive#template-variable-references" target="\_blank">template variables</a> to check the active status of the route. In this example we're creating a template variable `myroutervariable` to represent our route and it's active state for logic in our template.

@sourceref ./router-link-active-template.html
@codepen
@highlight 25-29, only

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

- How to use the routerLink directive
- How to use the routerLinkActive directive

You will know you've completed the exercise correctly when you can click the nav items to see the UI change.

### Solution

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 4-11
