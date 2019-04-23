@page learn-web-components/listing-routes Listing routes
@parent learn-web-components 5
@description Learn lit-html by creating a component that lists bus routes from the CTA bus tracker API.

@body

## The problem

In this section we will:

- Create another component named `bus-tracker`.
- Display a list of bus routes.

## How to solve this problem

- Use [lit-html](https://lit-html.polymer-project.org/) to define a template that can be updated.
- Render the lit-html template into the `shadowRoot` in the `connectedCallback`.
- Fetch a list of routes from the CTA bus tracker API.

## What you need to know
- [lit-html](https://lit-html.polymer-project.org/) is a library to make writing templates easier. Using the `<template>` element you can only define __static__ DOM. It doesn't provide a way to insert dynamic text or attributes. It also doesn't provide a way to declaratively update when data changes. lit-html gives us that with its `html` function.
    ```js
    import { html, render } from "https://unpkg.com/lit-html@1.0.0/lit-html.js";

    function app({ title }) {
      return html`<h1>${title} app</h1>`
    }

    render(app({ title: 'Matthew\'s' }), document.body)
    ```
    @codepen
- Defining an `update()` method gives us a way to update any time data changes. In this section the data changes when the routes [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolves.
- lit-html has a `render()` export. This takes a `TemplateResult`, which is returned by `html`, and a host element; in our case the element's `shadowRoot`.
- lit-html uses the JavaScript feature [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) to facilitate templating. You can nest calls to `html` inside of a template and stuff like `Array#map` works. These are all features of lit-html, not of the web component APIs.
  - Tagged templates are functions that can be called like ``fn`my name is ${name}`;``.
  - These functions have an unusual signature. The first argument is an Array of strings that is split on each usage of `${}`. The rest of the arguments are the values filled by `${}`. To implement a tagged template function it looks like:
    ```js
    function reverse(strings, ...args) {
      args.reverse();
      let out = '';
      for(let i = 0; i < strings.length; i++) {
        out += strings[i] + (args[i] || '');
      }
      return out;
    }

    let name = 'Jill';
    let age = 24;

    let result = reverse`Hello I am ${name} and I am ${age} years old`;
    console.log(result);
    ```
    @codepen

## The solution

Remove the `<google-map-view>` from the HTML and replace it with `<bus-tracker>`. Then add a template to hold the bus-tracker's styles. Then using lit-html loop over the routes (after the promise resolves) and display some information about then in a `<ul>`.

```html
<bus-tracker></bus-tracker>

<template id="bt-template">
  <style>
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
  </style>
</template>
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
import { html, render } from "https://unpkg.com/lit-html@1.0.0/lit-html.js";

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

const proxyUrl = "https://can-cors.herokuapp.com/";
const token = "?key=piRYHjJ5D2Am39C9MxduHgRZc&format=json";
const apiRoot = "http://www.ctabustracker.com/bustime/api/v2/";
const getRoutesEndpoint = apiRoot + "getroutes" + token;
const getVehiclesEndpoint = apiRoot + "getvehicles" + token;
const styles = document.querySelector('#bt-template').content.cloneNode(true).firstElementChild;

class StatefulPromise {
  constructor(promise, component) {
    this.promise = promise;
    this.component = component;

    this.state = "pending";
    this.value = null;
    this.listen();
  }

  listen() {
    let onSuccess = value => {
      this.value = value;
      this.state = "resolved";
      this.component.update();
    };

    let onFailure = error => {
      this.error = error;
      this.state = "rejected";
      this.component.update();
    };

    this.promise.then(onSuccess, onFailure);
  }

  isPending() {
    return this.state === "pending";
  }

  isResolved() {
    return this.state === "resolved";
  }

  isRejected() {
    return this.state === "rejected";
  }
}

class BusTracker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.title = "Chicago CTA Bus Tracker";
  }

  connectedCallback() {
    this._getRoutes();
    this.update();
  }

  update() {
    render(this.render(), this.shadowRoot);
  }

  _getRoutes() {
    let promise = fetch(proxyUrl + getRoutesEndpoint)
      .then(response => response.json())
      .then(data => data["bustime-response"].routes);

    this.routes = new StatefulPromise(promise, this);
  }

  render() {
    return html`
      ${styles}
      <div class="top">
        <header>
          <h1>${this.title}</h1>
          ${this.routes.isPending()
            ? html`
                <p>Loading routes…</p>
              `
            : ""}
        </header>

        <ul class="routes-list">
          ${this.routes.isResolved()
            ? this.routes.value.map(
                route => html`
                  <li
                    class=${this.route === route ? "active" : ""}
                  >
                    <button type="button">
                      <span class="route-number">${route.rt}</span>
                      <span class="route-name">${route.rtnm}</span>
                      <span class="check">✔</span>
                    </button>
                  </li>
                `
              )
            : ""}
        </ul>
      </div>
      <footer></footer>
    `;
  }
}

customElements.define("bus-tracker", BusTracker);
</script>
```
@highlight 1,3-136,148,185-290,only
@codepen
