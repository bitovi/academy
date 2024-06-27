@page learn-web-components/display-markers Display markers for vehicles
@parent learn-web-components 7
@description Learn how to listen to changes in __properties__ on your custom elements and how to properly reflect back the property values to the outside world.

@body

## Overview

In this part we will:

- Update the `<google-map-view>` component to display markers.
- Receive an array of vehicles as a property from the `<bus-tracker>` parent component.
- Add a marker for each vehicle using the embedded Googles Maps widget.
- Reflect back the array of vehicles and array of markers as properties on the `<google-map-view>`.

## Problem

In the previous exercise we fetched a list of vehicles when a route is selected and logged them to the console. Now we want to instead pass those to the `google-map-view` element. The `google-map-view` element should add a marker for each vehicle.

When an error occurs in the API it should wipe away any existing markers.

<img src="../static/img/web-components/bt-display-markers.gif"
  style="border: solid 1px black;"
  alt="Markers being displayed when a route is selected." />

## How to Solve This Problem

1. Update the `bus-tracker` component to pass the vehicles list to the `google-map-view` via the `vehicles` property.
1. Add a getter/setter pair on the `google-map-view` to handle `.vehicles`. When set it should use the Marker snippet (below) to create a new marker for *each* vehicle.
1. When a route is selected and markers are already displayed for a previous route, remove the previous markers.

## Technical requirements

To create a new marker use `new google.maps.Marker`. This takes an object with some options that look like this:

```js
new google.maps.Marker({
  position: {
    lat: latitude,
    lng: longitude
  },
  map: googleMapObject
});
```

In this case `map` is the thing we created in a previous exercise by calling `new google.maps.Map`.

Additionally this snippet can be used to remove a marker:

```js
marker.setMap(null);
```

## What you need to know

- How to use JavaScript getters and setters to handle dynamic property values.
- How to use default values in custom elements.

### getters/setters

JavaScript [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) allow observation of property changes. Adding a setter for `vehicles` provides a hook for when the `<bus-tracker>` component passes the array of vehicles for the selected route.

In order to reflect back the list of vehicles in a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) you can save the vehicle list to another property on the element (like an underscore property). It’s common when a setter exists that a getter does as well.

This is an example of a getter/setter pair in a JavaScript class.

```js
class Person {
  set age(val) {
    console.log('Setting age');
    this._age = val;
  }

  get age() {
    console.log('Getting age');
    return this._age;
  }
}

let kid = new Person();
kid.age = 4;

console.log(kid.age);
```
@codepen
@highlight 2-10

We can use getters/setters within custom element classes as well.

```html
<my-counter></my-counter>

<script type="module">
class CounterElement extends HTMLElement {
  constructor() {
    super();
    this._count = 0;
    this.render();
  }

  render() {
    this.innerHTML = `Count: ${this.count}`;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
    this.render();
  }
}

customElements.define('my-counter', CounterElement);

let counter = document.querySelector('my-counter');

setTimeout(() => counter.count++, 5000);
setTimeout(() => counter.count = 15, 10000);
setTimeout(() => counter.count--, 15000);
</script>
```
@codepen
@highlight 15-22

### Default values

Most properties supported by built-in elements have some sort of default value. For example the [\<progress\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) element has a `max` property that defaults to `1`: `document.createElement('progress').max; // 1`. __All__ elements have an `onclick` property whose default value is `null`. It’s good practice to provide default values for your supported public properties, and these can be set in the [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor). Combining getters, setters and default values for properties makes your component more robust.

```js
class DogElement extends HTMLElement {
  constructor() {
    super();
    this._breed = null;
  }
  get breed() {
    return this._breed;
  }
  set breed(val) {
    this._breed = val;
  }
}
```

## Solution

✏️ Add default values for `markers` and `vehicles` in the constructor (use an underscore property for vehicles). Add a getter/setter pair for `vehicles`, where the setter creates new markers on the map with `new google.maps.Marker`.

<details>
<summary>Click to see the solution</summary>

@sourceref ./index.html
@highlight 204-205,219-242,265,304,307,only
@codepen

</details>