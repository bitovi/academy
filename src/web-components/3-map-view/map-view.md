@page learn-web-components/map-view Map View
@parent learn-web-components 4
@description Create a component to hold our Google map view. This lesson carries over from the last and will use the same CodePen.

@body

## Overview

In this part we will:

- Create a custom element named `google-map-view`.
- Initialize the [Google maps API](https://developers.google.com/maps/documentation/).
- Learn about Shadow DOM and `connectedCallback`.

## Problem

Create a component where we can display a Google map. Google maps need to be attached to a DOM element, so use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate the HTML and CSS that Google maps builds.

<img src="../static/img/web-components/gmap-slippy.gif"
  style="border: solid 1px black; max-width: 100%;"
  title="google-map-view component with a useable slippy map."/>

## How to Solve This Problem

1. Add the `script` element for the Google map API.
2. Create a custom element that contains a Shadow DOM with the contents from the `template` in the previous exercise.
3. Set up the Google map *only* when the custom element is connected to the DOM.

## Technical Requirements

Use the existing `#gmap-template` template, and append it to the host component's Shadow DOM. Use this script tag to enable the Google maps API:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7POAQA-i16Vws48h4yRFVGBZzIExOAJI"></script>
```

This snippet will create a Map centered on Chicago:

```js
new google.maps.Map(element, {
  zoom: 10,
  center: {
    lat: 41.881,
    lng: -87.623
  }
});
```

Where `element` is the element the Google map will mount to.

## What You Need to Know

- How to create Shadow DOM for an element.
- Which callback to use to instantiate a new `Map` for the Google map.

### Shadow DOM

(Most) elements can have a `shadowRoot` property. This is a special version of a [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) that is completely encapsulated. You cannot query the nodes within it from the outside (like `document.querySelector('.gmap')`). Styles within will not affect DOM outside.

You can create a `shadowRoot` for your element by calling [attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow).

```html
<template>
  <p>Hello there</p>
</template>
<script type="module">
let template = document.querySelector('template');
let fragment = document.importNode(template.content, true);

let el = document.createElement('div');
el.attachShadow({ mode: 'open' });
el.shadowRoot.append(fragment);

document.body.append(el);
</script>
```
@codepen


You can create __closed__ shadowRoots by using `{ mode: 'closed' }`. When you do this, the `shadowRoot` property will not be added to the element. To be able to append items to the shadowRoot, keep a reference to it from the return value of `attachShadow()`.

```html
<template>
  <p>Hello from a closed shadow</p>
</template>
<script type="module">
let template = document.querySelector('template');
let fragment = document.importNode(template.content, true);

let el = document.createElement('div');
let shadow = el.attachShadow({ mode: 'closed' });

console.log(el.shadowRoot); // -> null

shadow.append(fragment);
document.body.append(el);
</script>
```
@codepen

### connectedCallback

For elements with side-effects (such as those that make network requests), it's best to do those side effects in the __connectedCallback__.

`connectedCallback` is a lifecycle method for custom elements. It is called when the element is __connected__, which can occur in one of these scenarios:
  - The HTML parser sees the element within the page.
  - An element node is inserted into the page like `document.body.append(node)`.

The `connectedCallback` method will be called *each time* the element is inserted. If an element is inserted, removed, and reinserted, the `connectedCallback` will be called twice.

```html
<my-element></my-element>

<script type="module">
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.timesConnected = 0;
  }

  connectedCallback() {
    this.timesConnected++;
    console.log('Connected', this.timesConnected, 'times');
  }
}

customElements.define('my-element', MyElement);

let el = document.querySelector('my-element');

el.remove();
document.body.append(el);
el.remove();
document.body.append(el);
</script>
```
@codepen

## Solution

✏️ Building off of the template we created in the previous section, now extend `HTMLElement` to create a custom element.

<details>
<summary>Click to see the solution</summary>

@sourceref ./index.html
@highlight 14-16,31-52,only
@codepen

</details>