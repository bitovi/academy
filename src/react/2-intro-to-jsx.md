@page learn-react/intro-to-jsx Introduction to JSX
@parent learn-react 2

@description Learn how to use React's preferred markup syntax JSX, and combine HTML with JavaScript.

@body

## Creating Views in React

Before we talk about JSX, let's discuss how user interfaces are created in React.

At its core, React is a JavaScript library used for creating reusable front-end components. One of the features of React is that it allows you to describe the way your components look using only JavaScript, there's no HTML or templating languages to keep track of.

This is all done through the React element API.

But this "all JS" approach comes with some downsides, namely it becomes very difficult to describe complex page hierarchies using only pure JavaScript. When first learning React, it's good to be exposed to the element API, but keep in mind that most React developers will forego this for an alternative syntactic sugar called JSX.

### React's Element API

React exposes an API for creating HTML elements using JavaScript. For example to create an `h1` we could write the following:

```jsx
React.createElement('h1', null, 'Hello World');
```

The code above will create an `h1` with the text "Hello World" inside of it (`<h1>Hello World</h1>`). This is pure, vanilla JavaScript using a function `createElement` exposed by React.

`createElement` can be used to model just about any HTML structure:

```jsx
React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Hello World'),
  React.createElement('p', null, 'This is HTML'),
);
```

The code above replicates the following HTML:

```html
<div>
  <h1>Hello World</h1>
  <p>This is HTML</p>
</div>
```

As you can see, the more complex the HTML we're trying to model, the more complex the `React.createElement` code becomes. 

While it is possible to build entire apps using just the `createElement` function, this is rarely used due to it's un-intuitive and messy nature.

Instead, React supports an HTML in JavaScript syntax called JSX.

## JSX

JSX is a special syntax [transpile-able](https://stackoverflow.com/questions/44931479/compiling-vs-transpiling) by [babel](https://babeljs.io/), which looks almost identical to HTML. 

Instead of having to use the cumbersome `React.createElement` syntax, views can be defined and maintained in JSX and will automatically be transpiled into the equivalent `React.createElement` syntax at build-time.

JSX can be written alongside your other JavaScript, which makes for a powerful programming environment.

## Differences With HTML

For the most part, JSX can be written exactly like the HTML you're most likely used to. There are a few difference to keep in mind however.

### Inline Styling

In a normal HTML document, inline styles can be attached directly to an element using the `style` attribute. CSS styles are placed inside a string and separated by a semi-colon.

```html
<div style="color: red; background-color: blue">
  Inline styles are different
</div>
```

The equivalent JSX looks very similar, but the styles are stored in an object:

```jsx
<div style={ { color: 'red', backgroundColor: 'blue' } }>
  Inline styles are different
</div>
```

First, notice that instead of using a string to store the styles `style=""` we use curly brackets `style={}`. In JSX, we can interpolate JavaScript code into our attributes, and when doing so we use the curly bracket notation instead of quotes (quotes can be used only for string values).

Inside of `style={  }` we have an object of styles whose keys are css attributes and values are the value of the css. This structure closely resembles the [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) object used by the browser to store element styles (To see this run `document.body.style` in your browser console)

### Classes

In JSX, classes are defined using the `className=""` property:

```jsx
<div className="button primary">So are classes</div>
```

### Siblings

JSX requires that any sibling elements are wrapped inside of a parent. This is one of the most common errors encountered by beginners.

The following JSX would throw an error:

```jsx
<div>Sibling 1</div>
<div>Sibling 2</div>
```

To fix it, we'd need to wrap them both in a parent:

```jsx
<div>
    <div>Sibling 1</div>
    <div>Sibling 2</div>
</div>
```

Now they're both wrapped in a parent `div` and the error will go away!

## JavaScript Interpolation

JSX isn't static, in fact, you can easily insert values from variables and objects into your JSX:

```jsx
const name = "Bitovi"
<div className="button primary">
  Welcome to {name}!
</div>
```

In the code above, we've used the `{name}` syntax to tell JSX that we want to use the value stored in the `name` variable `"Bitovi"` into our view.

You can take this a step further by interpolating multiple values, and using JavaScript functions to transform data on the fly. Anything that goes inside `{}` is executed as normal JavaScript.

```jsx
const person = {
  name: "mike",
  profession: "programmer"
}
<div className="button primary">
  <h1>Hi I'm {person.name.toUpperCase()}!</h1>
  <p>I'm a {person.profession} living in Philadelphia</p>
</div>
```

## Event Handling

One of the most powerful aspects of JavaScript is that it enables developers to respond to events on the browser. With JSX it's really easy to listen for and respond to these events.


```jsx 1:3 title="JSX handles user event with ease" subtitle=""
<div className="button primary">
  <button 
    onClick={(event) => console.log('Clicked')}
  >
    click me
  </button>
</div>
```

In the code above, we've attached an `onClick` listener to the `<button>` element. Whenever this button gets clicked now, the code inside the `onClick={...}` will get executed. This always need to be a function, and that function will get called with an `event` object.

All [events](https://developer.mozilla.org/en-US/docs/Web/Events) supported in vanilla JavaScript are also supported in JSX.

## Components

In React we can store our JSX inside of components. Components are like small containers which can be re-used in your application. For example, you might build a `Button` component which renders our all the JSX required for a button. 

```html
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<MyButton />,document.getElementById('root'));

function MyButton(){
  return (
    <div className="button primary">
        <button>click me</button>
    </div>
  )
}

</script>
```
@codepen

In the code above, we're defining a functional components (basically a function which returns JSX) called `MyButton`.

This component returns JSX and could then be rendered and re-used by another component like `App` below.

```jsx
function App(){
    return (
      <div>
        <MyButton />
        <MyButton />
        <MyButton />
      </div>
    )
}
```

Here the `App` component is rendering out the `MyButton` component 3 times. Note that when you render out custom components like this they don't need closing tags, instead they can be self-closing with a `/` tacked onto the end. You can also design them to have closing tags with extra elements rendered inside (see an explanation on JSX children [here](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)). 
