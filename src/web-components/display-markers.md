@page learn-web-components/display-markers Display markers for vehicles
@parent learn-web-components 7
@description Learn how to listen to changes in __properties__ on your custom elements and how to properly reflect back the property values to the outside world.

@body

## The problem

In this section we will:

- Update the `<google-map-view>` component to display markers.
- Receive an array of vehicles as a property from the `<bus-tracker>` parent component.
- Add a marker for each vehicle using the embedded Googles Maps widget.
- Reflect back the array of vehicles and array of markers as properties on the `<google-map-view>`.

## How to solve this problem

- Use JavaScript set syntax to define a function (called a setter) that is run when a change in a property occurs (`person.name = "Wilbur"`).
- Define default values for properties in the constructor.
- Create a `google.maps.Marker` for the latitude and longitude values of each of the vehicles.

## What you need to know

- JavaScript [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) allow observation of property changes. Adding a setter for `vehicles` provides a hook for when the `<bus-tracker>` component passes the array of vehicles for the selected route.
- In order to reflect back the list of vehicles in a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) you can save the vehicle list to another property on the element (like an underscore property). It's common when a setter exists that a getter does as well.
    ```js
    class Person {
      set age(val) {
        this._age = val;
      }

      get age() {
        return this._age;
      }
    }
    ```
- Most properties supported by builtin elements have some sort of default value. For example the [\<progress\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) element has a `max` property that defaults to `1`: `document.createElement('progress').max; // 1`. __All__ elements have an `onclick` property whose default value is `null`. It's good practice to provide default values for your supported public properties, and these can be set in the [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor). Combining getters, setters and default values for properties makes your component more robust.
    ```js
    class DogElement extends HTMLElement {
      constructor() {
        super();
        this._breed = null;
      }
      get breed() {
        return this._breed;
      }
      set breed(val) {
        this._breed = val;
      }
    }
    ```


## The solution

Add default values for `markers` and `vehicles` in the constructor (use an underscore property for vehicles). Add a getter/setter pair for `vehicles`, where the setter creates new markers on the map with `new google.maps.Marker`.

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
@highlight 180-181,197-220,only
@codepen
