@page learn-web-components/select-a-route Selecting a route
@parent learn-web-components 6
@description Learn how to use event listeners with a custom element to handle user interaction and update the DOM.

@body

## Overview

In this part we will:

- Handle selecting of routes.
- Fetch a list of vehicles for a selected route.
- Show the selected route name and number overlaying the map.

## Problem

We have a list of routes and a map. We want to handle events when the button for a given route is clicked. It should fetch the vehicles for that route and log those to the console. In the next section we will use the vehicle list to display markers.

Additionally the route name and number should be shown overlaying the map. There is a button where this information can be added.

When a route is selected it should become active and show a checkmark by the name.

<img src="../static/img/web-components/bt-selecting-route.gif"
  style="border: solid 1px black; max-width: 100%;"
  title="Selecting a route from the list and noticing that the item is highlighted as active and the route number and name is shown in an overlay on top of the map." />

## How to Solve This Problem

1. Add a `click` event listener on the `button` within each route `li`.
1. Create a method that will be called within the listener that receives the `route` object and the `li`.
1. Create another method, this time an async method, that fetches the vehicles for the given `route`.
    1. Add the route name and number to the `#selected-route` button.
    1. If there is an error also append the error message snippet to that same button.
    1. `console.log` the list of vehicles. We will use them in the next section.
    1. Add the `route-selected` class to the `#selected-route` button once you have the vehicles.
1. Add the `active` class to the route’s `li`. If there is already an active route, remove the `active` class from that `li`.

## Technical Requirements

### Selected route button

This HTML can be used to display the route name and number. It should be a child of the `#selected-route` button.

```html
<small>Route NUMBER:</small> NAME
```

Inspect the `route` object to see what the values for __NUMBER__ and __NAME__ should be.

Some routes may contain errors. When this happens use this markup *in addition to* showing the route number and name as described above:

```html
<div class="error-message">
  No vehicles available for this route
</div>
```

To make the `#selected-route` button visible, add the `route-selected` class.

### Calling the API

To get the URL for this API request use:

```js
getVehiclesEndpoint + '?rt=' + NUMBER
```

Where `NUMBER` is the route number, which again can be gotten from the route object.

### Marking the route active

Set the `active` class on the `li` element associated with the route to mark it as active.

## What You Need to Know

This part doesn’t have any new web component APIs to learn, but builds off what we’ve already done. You will need to know a few basic DOM APIs however:

* How to add event listeners to elements.
* How to add classes to elements.

### Event listeners

[addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) is a method on elements that takes an __event name__, and a __callback function__. When the event occurs the callback function will be called.

Each route in our list contains a `button` element. Set the event listener on this element.

```js
element.addEventListener('click', ev => {
  // Do whatever you need.
});
```

### Adding classes

Each element contains a `classList` object which is a little like a JavaScript `Set` (but is subtley different). To add classes to an element use `classList.add()`.

```js
element.classList.add('some-new-class');
```

## Solution

✏️ In the `getRoutes` method inside of the `routes` loop, get a reference to the `button` for the route and add an event listener for __click__ events. When that event occurs call a method that will call the API for vehicles and add the `active` class to the associated `li`.

Add a reference to the `#selected-route` element in the constructor. When the API call completes update this element as needed and add the `route-selected` class so that it will be highlighted.

<details>
<summary>Click to see the solution</summary>

@sourceref ./index.html
@highlight 169-173,225,236,254-256,264-292,only
@codepen

</details>