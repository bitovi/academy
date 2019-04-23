@page learn-web-components/templates Writing a template
@parent learn-web-components 3
@description Learn how `<template>` can be used to create reusable DOM that can be cloned and used within your components.

@body

## The problem

In this section, we will:

- Create a template that includes the HTML we need for our [Google map](https://www.google.com/maps) component.

## How to solve this problem

- Add a `<template>` element that includes an element where our Google map will be initialized.
- Include styles within the template.
- Append the template to the body to see how template cloning works.

## What you need to know

- `<template>` is an element whose children are __inert__. This means that the browser doesn't render them, like it will for nodes outside of templates. Images will not load, scripts will not execute, styles are not applied.
    ```html
    <template>
      <h1>Cats</h1>

      <!-- This will not load yet -->
      <img src="/images/purfect.png" />
    </template>
    ```
    @codepen
- You can't grab content inside of a template using the normal DOM APIs like [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById). They only exist within the template's `content` fragment.
    ```js
    let h1 = document.querySelector('h1');
    console.log(h1); // null

    let template = document.querySelector('template');
    h1 = template.content.querySelector('h1');
    console.log(h1); // <h1>Cats</h1>
    ```
- Templates can be cloned using `template.content.cloneNode(true)` or `document.importNode(template.content, true)`. The latter is useful if you ever need to clone a template contained within another document, but otherwise they are equivalent.
- Cloning a template returns a [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment), a collection of DOM nodes that can be quickly inserted into an element.
    ```js
    let template = document.querySelector('template');
    let fragment = document.importNode(template.content, true);

    document.body.append(fragment);
    // Our cat picture is now loading!
    ```

## The solution

Start by creating the template. Give it an `id` so that we can more easily query it to use it in our component.

```html
<template id="gmap-template">
  <style>
    .gmap {
      width: 100%;
      height: 250px;
      background-color: grey;
    }
  </style>
  <div class="gmap"></div>
</template>
<script type="module">
const template = document.querySelector('#gmap-template');

let nodes = document.importNode(template.content, true);
document.body.append(nodes);
</script>
```
@codepen

Running this code should show you a 250px tall grey square.
