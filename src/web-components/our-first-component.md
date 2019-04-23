@page learn-web-components/first-component Our first component
@parent learn-web-components 2
@description Build a `<my-greeting>` component to learn the APIs. It will be able to display a greeting, and receive a `name` parameter either from an attribute or a JavaScript property.

@body

## Overview

In this part, we will:

- Learn how to use a web component in HTML.
- Write the JavaScript necessary for registering a custom element.
- Accept arguments, in the form of HTML attributes and JavaScript properties, to our component and respond when they change.

## Using custom elements

Custom elements can be used the same way that regular elements can; with one bonus included. You can:

* Include them directly in HTML like so:

    ```html
    <my-greeting></my-greeting>
    ```
* Build them using the JavaScript DOM APIs such as:

    ```js
    let element = document.createElement('my-greeting');

    // OR provide HTML like this
    otherElement.innerHTML = `<my-greeting></my-greeting>`;
    ```
* And the __bonus__, call their constructors (you can't do this with normal elements):

    ```js
    let element = new MyGreeting();

    // This is a DOM node now, do the usual things with it:
    document.body.appendChild(element);
    ```

Let's create our first element by adding it to the HTML.

```html
<my-greeting></my-greeting>
```
@codepen

Click the "Run in your browser" button above and notice that... nothing happens. In order to do anything useful, we have to register our element.

## Registering our tag

The [custom elements API](https://html.spec.whatwg.org/multipage/custom-elements.html) provides a way to hook into the browser's HTML parser and receive callbacks whenever a certain tag is encountered. Think about that; your code can run before the page has even finished loading (provided your script has run). That's a lot of power.

Custom elements are classes that extend [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html). This is the base class from which all elements, both built-in and custom, derive. For example the `<progress>` element is an instance of `HTMLProgressElement`.

To register our own tag we first extend HTMLElement like so:

```js
class MyGreeting extends HTMLElement {

}
```

Once you've extended HTMLElement you then need to give it a tag name and pass that, along with the class into `customElements.define()`. Since we want to print __Hello world__ we can do that in the constructor:

```html
<my-greeting></my-greeting>
<script type="module">
class MyGreeting extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `Hello world`;
  }
}

customElements.define('my-greeting', MyGreeting);
</script>
```
@codepen

## Responding to attribute changes

A component is only useful if it can receive parameters just like functions do through function arguments. There are two primary ways for a web component to receive arguments:

* Through attributes like `foo="bar"`.
* Through properties in JavaScript like `element.foo = 'bar';`

In this example we'll do both.

### attributeChangeCallback

In order to understand attributes in custom elements we'll learn about our first lifecycle callback. `attributeChangedCallback` is a method you define on your element class. It will be called back with the name of the attribute, as well as the new and old value.

```js
class MyGreeting extends HTMLElement {
  attributeChangedCallback(attributeName, oldValue, newValue) {
    // Do whatever you want here
  }
}
```

*However*, in order to get attribute change notification you __must__ define which attributes should be observed. This means that you aren't notified when any arbitrary attribute is added; only those you predefine. This is a performance optimization tradeoff that was made when designing the API.

To define which attributes should be added you add a static getter `observedAttributes` on the class.

The following will observe changes the `name` attribute and update the innerHTML when it changes.

```html
<my-greeting name="world"></my-greeting>
<script type="module">
class MyGreeting extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    let name = this.getAttribute('name');
    this.innerHTML = `Hello ${name}`;
  }
}

customElements.define('my-greeting', MyGreeting);

// Let's modify the element
let element = document.querySelector('my-greeting');

setTimeout(() => {
  element.setAttribute('name', 'Matthew');
}, 3000);
</script>
```
@codepen
@highlight 1,4-6,10,13-15,17-20,25-30

Running the above you should see `Hello world` for a few seconds and then change to `Hello Matthew`.

Here we are:

* Defining `name` as an observed attribute with `static get observedAttributes()`.
* Calling `this.render()` when the element is constructed.
* Calling `this.render()` again whenever the attribute changes.
* Using the `name` attribute to set the element's text.

## Responding to property changes

This one is a bit easier if you are already familiar with JavaScript classes. Since an element is a JavaScript object it can receive properties the same way any JavaScript class can.

We can add a [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) to be notified when the `name` property is changed.

Below we refactor the code so that it treats attributes and properties the same way.

```html
<my-greeting name="world"></my-greeting>
<script type="module">
class MyGreeting extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this._name = this.getAttribute('name');
    this.render();
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    this[attributeName] = newValue;
  }

  render() {
    let name = this.name;
    this.innerHTML = `Hello ${name}`;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this.render();
  }
}

customElements.define('my-greeting', MyGreeting);

// Let's modify the element
let element = document.querySelector('my-greeting');

setTimeout(() => {
  element.setAttribute('name', 'Matthew');
}, 3000);

setTimeout(() => {
  element.name = 'Wilbur';
}, 6000);
</script>
```
@codepen
@highlight 10,15,19,23-25,27-30,42-44,only

In the above we change it so that if an attribute change it just calls the property setter. The property then saves its value in a "private" variable `this._name`.

This works the way most built-in elements work; changing a property does __not__ reflect in the attribute; but changing an attribute does change the value of the property.

In either case, the text changes when we change the value.
