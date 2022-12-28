@page learn-web-components Learn Web Components
@parent bit-academy 6

@body

This course covers the essentials for building [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Before You Begin

<a href="https://www.bitovi.com/community/slack">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi University courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to Web Components in the [JS and DOM chat room](https://bitovi-community.slack.com/messages/CFMMNSV5X).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

This guide begins with [Why Web Components](learn-web-components/why-wc.html) might be a good choice for building your next widget. Following lessons will cover:
- Building [our first component](learn-web-components/first-component.html) to learn the APIs & display a greeting.
- [Writing a template](learn-web-components/templates.html) to create reusable DOM for use within your components.
- Creating a component to hold our Google [Map View](learn-web-components/map-view.html).
- Building a more complex [bus-tracker component](learn-web-components/bus-tracker-component.html) that combines the usage of `<template>` and customElements, and sets up event listeners.
- Fetching and [listing routes](learn-web-components/listing-routes.html) from the CTA bus tracker API.
- Using event listeners with a custom element to handle a user [selecting a route](learn-web-components/select-a-route.html).
- Listen to changes in properties on custom elements and properly reflect back property values to [display markers for vehicles](learn-web-components/display-markers.html).
- Use CSS properties to [customize header styles](learn-web-components/customize-header.html) within Shadow DOM.
- Use [slotted content](learn-web-components/slotted-content.html) to allow more control over non-critical parts of your component.
- And finally, [dispatching events](learn-web-components/dispatching-events.html) to provide information on the state of your component to parent elements.



The end result of this training will be a [CTA Bus tracker](http://www.ctabustracker.com) widget that can be embedded in any website with just a script tag and an element like so:

```html
<cta-bus-tracker></cta-bus-tracker>
```

<img width="746" alt="CTA bus tracker web component" src="https://user-images.githubusercontent.com/361671/58019488-a36c9080-7ad3-11e9-84cc-e60cced008af.png">

## Next Steps

✏️ Head over to the [first lesson](learn-web-components/why-wc.html) and learn more about Web Components.
