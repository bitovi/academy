@page learn-web-components/dispatching-events Dispatching events
@parent learn-web-components 10
@description Learn how to use custom events to provide information on the *state* of your component to parent elements.

@body

## The problem

In this section we will:

- Dispatch a `route` event when the `bus-tracker`'s route changes.
- Listen to the `route` event from the page and show the current route at the top of the page.

## How to solve this problem

- When the user pick's a route, dispatch a `route` event using `CustomEvent`.

## What you need to know

- Custom elements can have events just like any other element. You can listen to events the same way as well; in our case we'll use [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
    ```js
    el.addEventListener('any-event', () => {
      // Handle this event just like you would any built-in.
    });
    ```
- To dispatch a custom event that contains data pertaining to the event, use [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). With CustomEvent you can include a `detail` property. This can contain any sort of data about the event you want to provide. In our case we'll use the __route__ object as the detail property.
- Events are created using `let ev = new CustomEvent({ detail: {...} })`. This create an event object. To dispatch it, the element (in our case a custom element) has a `dispatchEvent(ev)` function that takes the new event.
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
- Events created this way do not [bubble](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles) by default. This means that if you want to listen to events you must place the listener directly on the element from which the event is dispatched. You can enable bubbling by providing `{ bubbles: true }` when creating the event.
    ```js
    let ev = new CustomEvent('my-event', {
      bubbles: true
    });
    ```

## The solution

Create an element that displays the current route. Using `addEventListener`, listen for the `route` event and set this element's text to be the `.rtnm` property from the event's detail.

In the component, when `_pickRoute` is called, use `CustomEvent` to dispatch that `route` event including the route object.

```html
<bus-tracker>
  <header slot="header">
    <h1>My Bus Tracker!</h1>
  </header>
</bus-tracker>

<div id="currentRoute"></div>

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
header[slot=header] {
  background: crimson;
  color: wheat;
  text-align: center;
}
#currentRoute {
  position: fixed;
  top: 20px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  padding: 0 1em;
  height: 40px;
  background: rgba(255,255,255,0.5);
}
#currentRoute:empty {
  display: none;
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
    this._dispatchRoute(route);
  }

  _dispatchRoute(route) {
    let ev = new CustomEvent('route', {
      detail: route
    });
    this.dispatchEvent(ev);
  }

  render() {
    return html`
      ${styles}
      <div class="top">
        <slot name="header">
          <header>
            <h1>${this.title}</h1>
            ${this.routes.isPending()
              ? html`
                  <p>Loading routes…</p>
                `
              : ""}
          </header>
        </slot>

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

document.querySelector('bus-tracker').addEventListener('route', ev => {
  let { detail: route } = ev;
  let currentRouteEl = document.querySelector('#currentRoute');
  currentRouteEl.textContent = route.rtnm;
});
</script>
```
@highlight 7,30-44,351,354-359,425-429,only
@codepen
