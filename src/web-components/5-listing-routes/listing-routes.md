@page learn-web-components/listing-routes Listing routes
@parent learn-web-components 5
@description Fetch a list of bus routes from the CTA bus tracker API and add them to the `.routes-list` element.

@body

## Overview

In this part we will:

- Fetch the list of routes from the API.
- Display the route name and number in the list.

## Problem

Our bus-tracker component currently only includes a header and a map. We want to add a routes list so that eventually the user can select a route which will display within the map. At the end of this exercise we want a scrollable list of routes to be displayed.

<img src="../static/img/web-components/bt-list-routes.gif"
  style="border: solid 1px black; max-width: 100%;"
  title="A scrollable list of bus routes on top, a map on the bottom." />

Additionally we have text within the header that says __Loading routes…__ statically. We want to remove this text after the routes have been rendered.

## How to Solve This Problem

1. Create a template using an `li` for each route.
1. Write a function that fetches the list of routes from the CTA bus tracker API.
1. Loop over the routes and activate a template for each. Add the route number to the `.route-number` element, and the route name to the `.route-name` element.
1. Append the DOM to the `.routes-list` list.
1. Remove the `#loading-routes` element since the routes are now loaded.


## Technical Requirements

The following snippet of JavaScript will be useful for fetching data from the bus tracker API. Use the `getRoutesEndpoint` string to fetch the list of routes.

```js
const proxyUrl = "https://can-cors.herokuapp.com/";
const token = "?key=piRYHjJ5D2Am39C9MxduHgRZc&format=json";
const apiRoot = "http://www.ctabustracker.com/bustime/api/v2/";
const getRoutesEndpoint = apiRoot + "getroutes" + token;
const getVehiclesEndpoint = apiRoot + "getvehicles" + token;
```

To display the routes we want to create an `<li>` for each route and attach it to the `.routes-list` element. Use this markup to create that li. Inspect the results of the API request to figure out how to display the `.route-number` and `.route-name` appropriately.

```html
<li>
  <button type="button">
    <span class="route-number"></span>
    <span class="route-name"></span>
    <span class="check">✔</span>
  </button>
</li>
```

## What You Need to Know

- How to use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make API requests.
- Setting an element's text.

### Fetch

`fetch` is a function on the `window` object that is used to make network requests. In its simplest form it only needs a string URL, which will be used to make a [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request.

fetch differs slightly from the older [XMLHttpRequest](XMLHttpRequest) in a variety of ways; for example fetch does not include cookies by default. It's easier to use, however, because it uses [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). If you don't need to support Internet Explorer you'll probably want to use fetch in your applications.

```js
async function listFoods() {
  let response = await fetch('/api/food');
  let foods = await response.json();

  let foodList = document.querySelector('.foods');

  for(let food of foods) {
    let li = document.createElement('li');
    li.textContent = food;
    foodList.append(li);
  }
}

listFoods();
```

### textContent

Every element has a `.textContent` property. Setting this property to a string will render the text as children.

```js
let el = document.createElement('h1');
document.body.append(el);

el.textContent = 'Hello from .textContent';
```
@codepen

This is equivalent to creating [Text](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode) nodes:

```js
let el = document.createElement('h1');
document.body.append(el);

let text = document.createTextNode('Hello from a text node');
el.append(text);

setTimeout(() => {
  text.data = 'This text node was modified';
}, 3000);
```
@codepen

Usually you will use `.textContent` unless building a library where performance is critical. textContent is the most convenient way to change an element's text.

## Solution

✏️ Use the markup provided above and create another template with the id of `route-template`. Keep a reference to that in your JavaScript along with the other template. Copy the URL snippet from above and paste that so that it can be used within the component.

Create a method on the component, we're calling it `getRoutes` here that is called in the `connectedCallback` method. It's an async method that uses [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to retrieve the list of routes which we can get with `data["bustime-response"].routes`.

Loop over the routes and clone an instance of the template filling in the route number with `route.rt` and the route name with `route.rtnm`.

At the end of the `getRoutes` method remove the `#loading-routes` element.

@sourceref ./index.html
@highlight 179-187,214-218,221,231,234-253,only
@codepen
