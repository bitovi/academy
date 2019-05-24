@page learn-web-components/customize-header Customize header styles
@parent learn-web-components 8
@description Learn how to use CSS properties to customize the appearance within Shadow DOM.

@body

## The problem

In this section we will:

- Allow the consumer of our component to change the header's `background-color`, and the heading's `text-transform`.

## How to solve this problem

- Use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) within our component's styles to allow overriding of default styles.
- Pass custom properties into the custom element from the outside (as the consumer of this component).

## What you need to know

- The `var()` syntax is a way to get a value from a variable (custom property). Using `var(--color, blue)` says: Use the `--color` variable if it is defined, otherwise fallback to `blue`. This gives us what we need to both have a custom background-color / text-transform, and also allow the consumer to override these styles.
    ```css
    :root {
      --theme-alt: MidnightBlue;
    }

    .button {
      color: var(--theme-alt, DarkBlue);
    }
    ```
- You can pass custom properties to custom elements by defining the property on a CSS selector matching the element.
    ```css
    bus-tracker {
      --header-background: salmon;
    }
    ```


## The solution

Add a `bus-tracker { }` section to the CSS and set `--header-background` and `--header-text-transform` CSS properties. Using `var()`, apply these styles in the appropriate place within the Shadow DOM CSS.

```html
<bus-tracker></bus-tracker>

<style>
html,
body {
  height: 100%;
}
body {
  font-family: "Catamaran", sans-serif;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  margin: 0;
}
bus-tracker {
  --header-background: salmon;
  --header-text-transform: capitalize;
}
</style>
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
      background-color: var(--header-background, #313131);
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
      text-transform: var(--header-text-transform, uppercase);
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
      border-radius: 2px; border: none;
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
    this.markers = null;
    this._vehicles = null;
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

  get vehicles() {
    return this._vehicles;
  }

  set vehicles(newVehicles) {
    this._vehicles = newVehicles;
    if (Array.isArray(this.markers)) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = null;
    }
    if (newVehicles) {
      this.markers = newVehicles.map(vehicle => {
        return new google.maps.Marker({
          position: {
            lat: parseFloat(vehicle.lat),
            lng: parseFloat(vehicle.lon)
          },
          map: this.map
        });
      });
    }
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
    this._getVehicles();
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

  _getVehicles(route) {
    let promise;

    if (route) {
      promise = fetch(proxyUrl + getVehiclesEndpoint + "&rt=" + route.rt)
        .then(response => response.json())
        .then(data => {
          if (data["bustime-response"].error) {
            return Promise.reject(data["bustime-response"].error[0]);
          } else {
            return data["bustime-response"].vehicle;
          }
        });
    } else {
      promise = Promise.resolve();
    }

    this.vehicles = new StatefulPromise(promise, this);
  }

  _pickRoute(route) {
    this.route = route;
    this._getVehicles(route);
    this.update();
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
                    <button type="button"
                      @@click=${() => this._pickRoute(route)}
                    >
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
      <footer>
      ${this.route
        ? html`
            <button
              class="route-selected"
              @@click="${() => this._pickRoute(this.route)}}"
            >
              <small>Route ${this.route.rt}:</small> ${this.route.rtnm}
              ${this.vehicles.isRejected()
                ? html`
                    <div class="error-message">
                      No vehicles available for this route
                    </div>
                  `
                : ""}
            </button>
          `
        : ""}

        <google-map-view
          .vehicles=${this.vehicles.value}
        ></google-map-view>
      </footer>
    `;
  }
}

customElements.define("bus-tracker", BusTracker);
</script>
```
@highlight 15-18,47,59,only
@codepen
