@page learn-web-components/why-wc Why Web Components
@parent learn-web-components 1

@description Learn why web components might be a good choice for building your next widget.

@body

## What are Web Components

*Web Components* is an umbrella term that refers to a few browser APIs that have been developed in recent years. What these APIs have in common is that they provide building blocks for creating reusable components; or UI widgets that encapsulate some combination of style and behavior.

The APIs that make up web components include (but are not necessarily limited to):

* __[Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html)__ - Allows you to define an HTML tag, like __my-tabs__, and respond to lifecycle event for when that tag is used in a document. When distributing a web component you will *usually* be defining its external API as a series of properties, attributes, and events of a custom element.
* __[Templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)__ - Allows you to define HTML that is *inert*. This means that the HTML is not rendered by the browsers -- images are not loaded, scripts are not run, etc. To activate templates you use JavaScript to clone their content and insert it some where else. Such as...
* __[Shadow DOM](https://dom.spec.whatwg.org/#interface-shadowroot)__ - Provides encapsulation for web components. Any DOM defined within a shadowRoot is "hidden" to the outside world. Any `<style>`s defined do not affect nodes defined outside. Additionally shadow DOM allows you to define how a component’s children are distributed and used.
* __[Custom Events](https://dom.spec.whatwg.org/#interface-customevent)__ - Allows triggering events on an element while providing additional data about the event. An example would be a `tab-change` event which might also include the name of the tab that was changed to.

## Use cases

Web Components serve many purposes, including:

* Creating components to __share with other teams in your company__. Many times larger organizations have apps that run in different frameworks, or no framework. Web components allow you to create widgets that are more easily useable with any framework or with traditional server-rendering.
* Creating components for a __SaaS business__. If you operate a business where embedding widgets is part of your value, web components often make for a better alternative to iframes or script + DOM; web components provide true encapsulation so you do not have to worry about your CSS poisoning your users pages. And they are easier to use than the usual embed code. An example would be a mapping company that sells slippy maps.
* Branded __component libraries__. Especially within an organization, it’s nice to be able to distribute a `brand-button` component so that buttons look the same everywhere.
* __Progressive enhancement__. Components that *enhance* native built-in elements. An example would be a menu that is visible as a list in basic HTML, but is upgraded as a web component to be activated via a dropdown.
* Building a __single page app__. Web components can be used as a primitive in frameworks.
