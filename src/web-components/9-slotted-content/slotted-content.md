@page learn-web-components/slotted-content Slotted content
@parent learn-web-components 9
@description Use slot elements to allow more control over non-critical parts of your component.

@body

## Overview

In this part we will:

- Use `slot` elements to allow customization.

## Problem

In the previous section we allowed the header to be styled with a few CSS properties. We could continue to add more custom properties so even more of the header could be customized. We could allow the user of our component to change the heading text by providing an attribute like `title="My Bus Tracker"`.

An easier way to allow consumers of your component to have *complete* control is to use slots. In this part we want to allow the header to be replaced with a custom header. In the end it should look like:

<picture>
  <source srcset="../static/img/web-components/bt-slotted.webp" type="image/webp">
  <source srcset="../static/img/web-components/bt-slotted.jpg" type="image/jpg">
  <img src="../static/img/web-components/bt-slotted.jpg"
    style="border: solid 1px black; max-width: 100%;"
    title="Header customized using slots." />
</picture>

## Technical Requirements

Use this markup as the header that is passed into the component:

```html
<header>
  <h1>My Bus Tracker!</h1>
</header>
```

## What You Need to Know

- How the slot element works.
- How to give slots names to allow multiple slotted content.

### Slots

The [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) has a curious effect when used within shadow DOM. It will take DOM within the custom element's children and *inject* (but not move) those nodes as children of itself.

Default content can be specified by nesting DOM inside of the `<slot>` element.

```js
let el1 = document.createElement('div');
el1.attachShadow({ mode: 'open' });
el1.shadowRoot.innerHTML = `<slot>This is using <strong>default</strong> content.</slot>`;

let el2 = document.createElement('div');
el2.attachShadow({ mode: 'open' });

el2.shadowRoot.innerHTML = `<slot>This is using <strong>default</strong> content.</slot>`;
el2.innerHTML = `This is using slotted content.`;

document.body.append(el1, el2);
```
@codepen

### Named slots

__Named__ slots are used when you want to take *some* of the children content, but not all of it. This is useful when you have multiple things to be customized. It works like `<slot name="header">`, with the children needing to add a `slot` attribute.  `<header slot="header">`.

## Solution

✏️ Wrap the `<header>` within the bus-tracker component with a `<slot name="header">`. This will completely replace the header if a child element provides the `slot="header"` attribute value.

@sourceref ./index.html
@highlight 17-21,26-28,168-173,only
@codepen
