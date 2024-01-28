@page learn-web-components/slotted-content Slotted content
@parent learn-web-components 9
@description Use slot elements to allow more control over non-critical parts of your component.

@body

## Overview

In this part we will:

- Use `slot` elements to allow customization.

## Problem

In the previous section we allowed the header to be styled with a few CSS properties. We could continue to add more custom properties so even more of the header could be customized. For example, we could allow the user of our component to change the heading text by providing an attribute like `title="My Bus Tracker"`.

An easier way to allow consumers of your component to have *complete* control is to use slots. In this part we want to allow the header to be replaced with a custom header. In the end it should look like:

<img src="../static/img/web-components/bt-slotted.jpg"
  style="border: solid 1px black; max-width: 100%;"
  title="Header customized using slots." />

## How to Solve This Problem

1. Provide a slot for the custom header passed to `bus-tracker`.
1. Use named slots to allow the `header` slot to be provided by the user.
1. Add custom styles to style the new header.

## Technical Requirements

Use this markup as the header that is passed into the component:

```html
<header>
  <h1>My Bus Tracker!</h1>
</header>
```

And use this CSS to style the header:

```
background: crimson;
color: wheat;
text-align: center;
```

## What You Need to Know

- How the slot element works.
- How to give slots names to allow multiple slotted content.

### Slots

The [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) has a curious effect when used within shadow DOM. It will take DOM within the custom element’s children and *inject* (but not move) those nodes as children of itself.

Default content can be specified by nesting DOM inside of the `<slot>` element.

```html
<template>
  <slot>This is using <strong>default</strong> content.</slot>
</template>

<div id="one"></div>
<div id="two">
  This is using slotted content.
</div>

<script type="module">
let template = document.querySelector('template');

let one = document.querySelector('#one');
one.attachShadow({ mode: 'open' });
one.shadowRoot.append(document.importNode(template.content, true));

let two = document.querySelector('#two');
two.attachShadow({ mode: 'open' });
two.shadowRoot.append(document.importNode(template.content, true));

document.body.append(one, two);
</script>
```
@codepen

### Named slots

__Named__ slots are used when you want to take *some* of the children content, but not all of it. This is useful when you have multiple things to be customized. It works like `<slot name="header">`, with the children needing to add a `slot` attribute.  `<header slot="header">`.

```html
<div class="my-thing">
  <header slot="header">
    <h1>My Header</h1>
  </header>
</div>

<template>
  <slot name="header">
    <header>Default Header</header>
  </slot>
</template>

<script type="module">
let el = document.querySelector('.my-thing');
el.attachShadow({ mode: 'open' });

let template = document.querySelector('template');
let frag = document.importNode(template.content, true);

el.shadowRoot.append(frag);
</script>
```
@codepen

## Solution

✏️ Wrap the `<header>` within the bus-tracker component with a `<slot name="header">`. This will completely replace the header if a child element provides the `slot="header"` attribute value.

<details>
<summary>Click to see the solution</summary>

@sourceref ./index.html
@highlight 17-21,26-28,168-173,only
@codepen

</details>