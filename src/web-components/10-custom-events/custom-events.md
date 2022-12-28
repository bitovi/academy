@page learn-web-components/dispatching-events Dispatching events
@parent learn-web-components 10
@description Learn how to use custom events to provide information on the *state* of your component to parent elements.

@body

## Overview

In this part we will:

- Handle click events on the map markers.
- Display the bus destination for selected markers.

## Problem

We want to display the bus destination for the selected marker. This should look similar to how the selected route is displayed as an overlay of the map, but float just below the route overlay. When no routes or markers are selected it should be invisible; when it is clicked it should say `Vehicle: DESTINATION`, where destination can be gotten from the vehicle object that is used to construct the marker.

<img src="../static/img/web-components/bt-display-vehicle.gif"
  style="border: solid 1px black; max-width: 100%;"
  title="Selecting a marker displays the vehicle associated with that marker." />

## How to Solve This Problem

1. Add the provided CSS to the `bus-tracker` template.
1. Add the `#selected-vehicle` element to the bus-tracker's `footer`.
1. Add an event listener for when a marker is selected which dispatches an event called `vehicle-selected`.
1. Add an event listener in `bus-tracker` for the `vehicle-selected` event on the `google-map-view`.
1. In the event listener set the `vehicle.des` in the `#selected-vehicle` element.

## Technical Requirements

* For displaying the selected vehicle use a `span` element and give it an `id` of `selected-vehicle`. It will have mostly the same styles as the selected route. You could use the same CSS but just modify it to work for both. For simplicity here's the full CSS needed:

  ```css
  #selected-vehicle:not(.vehicle-selected) {
    display: none;
  }
  .vehicle-selected {
    line-height: 1;
    position: absolute;
    z-index: 1;
    text-align: right;
    background: rgba(6, 6, 6, 0.6);
    top: 55px;
    font-size: 11px;
    right: 10px;
    padding: 6px 10px;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
  .vehicle-selected small {
    display: block;
    font-size: 14px;
    color: #ddd;
  }
  ```

* Markers are not DOM elements and therefore don't have all of the same methods. To listen to events you use a slightly different mechanism:

  ```js
  marker.addListener('event-name', () => {
    // Do whatever
  });
  ```

  Where `event-name` is the event you're interested in.

* Use this snippet for setting the the destination of the bus:

  ```html
  <small>Vehicle:</small> VEHICLE_DESTINATION
  ```

## What You Need to Know

- Using `CustomEvent` to create new event types.
- Using the `detail` property to pass information about an event.
- How to use `handleEvent` to listen to events in an easy way.
- Using `connectedCallback` and `disconnectedCallback` together.

### Custom events

Custom elements can have events associated with them just like any other element. You can listen to events the same way as well; in our case we'll use [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```js
el.addEventListener('any-event', () => {
  // Handle this event just like you would any built-in.
});
```

To dispatch a __custom event__ that contains data pertaining to the event, use the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) constructor. With `CustomEvent` you can include a `detail` property. This can contain any sort of data about the event you want to provide. In our case we'll use the __route__ object as the detail property.

Events are created using `let ev = new CustomEvent({ detail: {...} })`. This creates an event object. To dispatch it, the element (in our case a custom element) has a `dispatchEvent(ev)` function that takes the new event.

```js
let el = document.createElement('div');

el.addEventListener('favorite-food', ev => {
  console.log(ev.detail); // -> "pizza"
});

let ev = new CustomEvent('favorite-food', {
  detail: 'pizza'
});
el.dispatchEvent(ev);
```
@codepen

Events created this way do not [bubble](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles) by default. This means that if you want to listen to events you must place the listener directly on the element from which the event is dispatched. You can enable bubbling by providing `{ bubbles: true }` when creating the event.

```js
let ev = new CustomEvent('my-event', {
  bubbles: true
});
```

### Setting up and tearing down listeners

Most of the time you want to delay setting up event listeners until `connectedCallback` is called. This is for a few different reasons:

- Most events deal with user interaction and the user can only interact with elements in the page.
- Events can reference elements not contained within the element; for example an event might be placed on the `document`. This creates a memory leak where the element's memory can never be freed.

Use `connectedCallback` to add event listeners and `disconnectedCallback` to remove them. disconnectedCallback is called when the element is removed from the page.

```js
class MyElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(document.import(template.content), true);

    this.onButtonClick = () => {
      // Do something when buttons are clicked.
    };
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', this.onButtonClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.onButtonClick);
  }
}
```

### handleEvent

Most people are familiar with using `addEventListener` with a function like so:

```js
element.addEventListener('click', callback);
```

In a custom element class you'll often want to call some method on your class when an event occurs, but that might not do what you expect:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(document.import(template.content), true);

    this.button = this.shadowRoot.querySelector('button');
  }

  connectedCallback() {
    this.button.addEventListener('click', this.handleButtonClick);
  }

  handleButtonClick() {
    // Oh no! `this` is not what you expected.
  }
}
```

In the above example we are listening for when a button gets a `click` event and calling `this.handleButtonClick`. However this doesn't do what you expect; the `this` value when `handleButtonClick` is called will be the *button*, not your element.

You can fix this by using an arrow function instead (as shown in the previous section):

```js
this.button.addEventListener('click', ev => this.handleButtonClick(ev));
```

However this creates a *new function*. To tear this down in `disconnectedCallback` you'll have to keep a reference to it.

A way to avoid this is to use `handleEvent`. [handleEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback) is a special method you can add to any object (not just elements) that makes that object an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget). You use it like this:

```js
let eventTarget = {
  handleEvent(ev) {
    // My `this` is correct!
  }
};

window.addEventListener('scroll', eventTarget);
```

Instead of passing a __function__ to addEventListener you pass an object with a `handleEvent` method. This can work for custom elements too. Our previous example becomes:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(document.import(template.content), true);

    this.button = this.shadowRoot.querySelector('button');
  }

  connectedCallback() {
    this.button.addEventListener('click', this);
  }

  disconnectedCallback() {
    this.button.addEventListener('click', this);
  }

  handleEvent(ev) {
    // Our `this` is correct and we can do whatever we need.
  }
}
```

`handleEvent` is convenient when you only have a few events you're curious about, but when you have many events it can be difficult to differentiate between the events since they are all on the same method.

## Solution

✏️ Add `<span id="selected-vehicle"></span>` inside of the `footer` element below the button. In the `google-map-view` when creating markers add an event listeners to the markers click.

Using `CustomEvent`, display a `vehicle-selected` event with a `detail` of the vehicle. Now in the `bus-tracker` component, listen to event and set the vehicle destination on the `#selected-vehicle` element.

<details>
<summary>Click to see the solution</summary>

@sourceref ./index.html
@highlight 102-123,202,270,279-283,288-293,319,325,328-330,332-336,only
@codepen

</details>