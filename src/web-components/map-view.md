@page learn-web-components/map-view Map View
@parent learn-web-components 4
@description Create a component to hold our Google map view.

@body

## The problem

In this section we will:

- Create a component named `google-map-view`.
- Use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate styles.
- Initialize the [Google maps API](https://developers.google.com/maps/documentation/).

## How to solve this problem

- Create a custom element class called `GoogleMapView`.
- Attach a ShadowRoot and clone our template into it.
- Initialize the Google Maps API in `connectedCallback` and attach it to the root element within the Shadow DOM.

## What you need to know

- (Most) elements can have a `shadowRoot` property. This is a special version of a [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) that is completely encapsulated. You cannot query the nodes within it from the outside (like `document.querySelector('.gmap')`). Styles within will not affect DOM outside.
- Create a shadowRoot for your element by calling `this.attachShadow({ mode: 'open' })`.
    ```js
    let el = document.createElement('div');
    el.attachShadow({ mode: 'open' });
    el.shadowRoot.innerHTML = 'Hello there';
    document.body.append(el);
    ```
    @codepen
- You can create __closed__ shadowRoots by using `{ mode: 'closed' }`. When you do this, the `shadowRoot` property will not be added to the element. To be able to append items to the shadowRoot, keep a reference to it from the return value of `attachShadow()`.
    ```js
    let el = document.createElement('div');
    let shadow = el.attachShadow({ mode: 'closed' });

    el.shadowRoot; // null
    shadow.innerHTML = 'Hello from a closed shadow';
    document.body.append(el);
    ```
    @codepen
- `connectedCallback` is a lifecycle method for custom elements. It is called when the element is __connected__, which can occur in one of these scenarios:
  - The HTML parser sees the element within the page.
  - An element node is inserted into the page like `document.body.append(node)`.
- The `connectedCallback` method will be called *each time* the element is inserted. If an element is inserted, removed, and reinserted, the `connectedCallback` will be called twice.

## The solution

Building off of the template we created in the previous section, now extend `HTMLElement` to create a custom element.

```html
<google-map-view></google-map-view>

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

const googleAPI = new Promise(resolve => {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7POAQA-i16Vws48h4yRFVGBZzIExOAJI";
  document.body.appendChild(script);
  script.onload = resolve;
});

class GoogleMapView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    let nodes = document.importNode(template.content, true);
    this.shadowRoot.append(nodes);
  }

  async connectedCallback() {
    await googleAPI;

    let gmap = this.shadowRoot.querySelector('.gmap');
    this.map = new google.maps.Map(gmap, {
      zoom: 10,
      center: {
        lat: 41.881,
        lng: -87.623
      }
    });
  }
}

customElements.define('google-map-view', GoogleMapView);
</script>
```
@highlight 1,14-47,only
@codepen
