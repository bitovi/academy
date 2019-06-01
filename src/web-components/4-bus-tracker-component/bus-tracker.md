@page learn-web-components/bus-tracker-component bus-tracker component
@parent learn-web-components 5
@description Build a more complex component that combines the usage of `<template>` and `customElements`, and sets up event listeners.

@body

## Overview

In this part we will:

- Create another component named `bus-tracker`.
- Display the `google-map-view` component within this new component.

## Problem

We want to build a component that displays the CTA bus tracker routes and displays a map. This part builds the *shell* of the component and includes:

- A header with a title
- A *placeholder* for where the list of routes will go.
- The `google-map-view` component we created in the previous section.

<img src="../static/img/web-components/bus-tracker-shell.png"
  style="border: solid 1px black; max-width: 100%;"
  title="The shell of our bus-tracker component showing a header and a Google map"/>

## Technical Requirements

The styles for our `bus-tracker` component should be contained within Shadow DOM. The CSS needed for the rest of the guide is:

```css
:host {
  display: flex;
  flex-direction: column;
}

.top {
  flex-grow: 1;
  overflow-y: auto;
  height: 10%;
  display: flex;
  flex-direction: column;
}

footer {
  height: 250px;
  position: relative;
}
.gmap {
  width: 100%;
  height: 250px;
  background-color: grey;
}

header {
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: #313131;
  color: white;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;
}

header h1 {
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}
#selected-route:not(.route-selected) {
  display: none;
}
.route-selected {
  line-height: 1;
  position: absolute;
  z-index: 1;
  text-align: right;
  background: rgba(6, 6, 6, 0.6);
  top: 10px;
  right: 10px;
  padding: 6px 10px;
  color: white;
  border-radius: 2px;
  cursor: pointer;
}
.route-selected small {
  display: block;
  font-size: 14px;
  color: #ddd;
}
.route-selected .error-message {
  font-size: 14px;
  background-color: #ff5722;
  border-radius: 10px;
  padding: 4px 8px 1px;
  margin-top: 5px;
}
.routes-list {
  padding: 20px 0;
  margin: 0;
  overflow-y: auto;
}
.routes-list li {
  list-style: none;
  cursor: pointer;
  background: white;
  border: 1px solid #dedede;
  margin: 1% 2%;
  border-radius: 25px;
  color: #2196f3;
  width: 41%;
  display: inline-flex;
  font-size: 14px;
  line-height: 1.2;
}
.routes-list li:hover {
  border-color: transparent;
  background-color: #008eff;
  color: white;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
}
.routes-list li .check {
  display: none;
}
.routes-list li.active {
  color: #666;
  background-color: #e8e8e8;
}
.routes-list li.active .check {
  display: inline-block;
  margin-left: 5px;
  color: #2cc532;
}
.routes-list li.active:hover {
  border-color: #dedede;
  box-shadow: none;
}
.routes-list button {
  width: 100%;
  padding: 8px 8px 6px;
  border: none;
  border-radius: 25px;
  background: transparent;
  text-align: left;
  font: inherit;
  color: inherit;
}
.route-number {
  display: inline-block;
  border-right: 1px solid #dedede;
  padding-right: 5px;
  margin-right: 5px;
  min-width: 18px;
  text-align: right;
}
p {
  text-align: center;
  margin: 0;
  color: #ccc;
  font-size: 14px;
}
```

The minimal markup needed for this component is:

```html
<div class="top">
  <header>
    <h1>Chicago CTA Bus Tracker</h1>
    <p id="loading-routes">Loading routes…</p>
  </header>

  <ul class="routes-list"></ul>
</div>
<footer>
  <button id="selected-route" type="button"></button>
</footer>
```

The `google-map-view` component should be displayed in the `<footer>` section of the component.

## What You Need to Know

To solve this problem you'll need to:

* Know how to use CSS in a component that uses Shadow DOM.
* Use a component within another component.

### Using styles within a component

Styles added to a page via `<link rel=stylesheet>` cannot be used within a shadowRoot. Services like [CodePen](https://codepen.io/) that allow you to add CSS will add them this way. Instead place your styles within a `<style>` tag inside of the shadowRoot.

```html
<style>
  .foo { display: block; }
</style>
```

The `:host` selector is a way to style the host of a `shadowRoot`. A common use-case is to change the display. By default custom elements have a display of `inline` which is like a `<span>`. Often authors prefer to have a `block` display, they can change this in their shadowRoot with this CSS:

```html
<style>
  :host {
    display: block;
  }
</style>
```

In our component we are using `display: flex` to give space to the header, route list, and Google map.

### Nesting components

Any component defined using `customElements.define()` can be used within another element's `shadowRoot` just as they can inside of the page's HTML. To add the `google-map-view` to this new component, place the tag within the footer.

## Solution

✏️ Create a new component called `bus-tracker`. Use the CSS and markup provided and place them in a `<template>` with the id of `#bt-template`. Create a shadowRoot for this element and append a clone of the template.

@sourceref ./index.html
@highlight 16,18-168,205-217,only
@codepen
