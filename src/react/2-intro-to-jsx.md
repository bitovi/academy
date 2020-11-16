@page learn-react/intro-to-jsx Introduction to JSX
@parent learn-react 2

@description Learn how to use React's preferred markup syntax JSX, and combine HTML with JavaScript.

@body

## Creating HTML with React

Before we talk about how React creates HTML, let's discuss how user interfaces are created in React.

At its core, React is a JavaScript library that helps create reusable front-end components. One of the unique features of React is that it allows you to describe the way your components look using only JavaScript.

But this "all JS" approach comes with some downsides, namely it becomes arduous to describe complex page hierarchies using only pure JavaScript. When first learning React, it's good to be aware of the [element API](https://reactjs.org/docs/react-api.html), but keep in mind that most React developers will forego this for an alternative syntactic sugar called JSX.

### React's Element API

React exposes an [API](https://reactjs.org/docs/react-api.html) for creating DOM-like elements that are then rendered into the DOM using JavaScript. For example to create an `h1` we could write the following:

```js
React.createElement('h1', null, 'Hello World');
```

The code above will create an `h1` with the text "Hello World" inside of it (`<h1>Hello World</h1>`). This is pure, vanilla JavaScript using a function `createElement` exposed by React. `createElement` can be used to model just about any HTML structure:

```js
React.createElement(
  'div', // Tag name
  { id: 'greeting' }, // Props, referred to as "attributes" in HTML
  [
    React.createElement('h1', null, 'Hello World'),
    React.createElement('p', null, 'This is HTML'),
  ], // Children
);
```

The code above produces something similar to the following HTML:

```html
<div id="greeting">
  <h1>Hello World</h1>
  <p>This is HTML</p>
</div>
```

As you can see, the XML-like nature of HTML allows us to model anything using a combination of a tag name, a set of attributes and children. Note how the more complex the HTML we're trying to model, the more complex the `React.createElement` code becomes.

While it is possible to build entire apps using the `createElement` function, this is rarely done due to how complicated it becomes. Instead, React supports a JavaScript syntax extension called JSX which allows us to describe our application declaratively.

## JSX

JSX is a special syntax that is [transpiled](https://stackoverflow.com/questions/44931479/compiling-vs-transpiling) by [babel](https://babeljs.io/), which looks almost identical to HTML.

Instead of having to use the procedural `React.createElement` syntax, views can be defined and maintained in JSX and will automatically be transpiled into the equivalent `React.createElement` calls at build-time.

JSX can be written alongside standard JavaScript, which makes for a powerful programming environment.

## Differences With HTML

For the most part, JSX can be written exactly like the HTML you're most likely used to. There are a few differences to keep in mind however.

### Inline Styling

In a normal HTML document, inline styles can be attached directly to an element using the `style` attribute. CSS styles are placed inside a string and separated by semi-colons.

```html
<div style="color: red; background-color: blue;">
  Inline styles are different
</div>
```

@highlight 1

The equivalent JSX looks very similar, but the styles are stored in an object:

```jsx
<div style={{ color: 'red', backgroundColor: 'blue' }}>
  Inline styles are different
</div>
```

@highlight 1

First, notice how instead of using a string to store the styles (like `style=""`) we use curly brackets (like `style={}`). In JSX, we can interpolate JavaScript code into our attributes, and when doing so we use the curly bracket notation instead of quotes (quotes can be used only for string values).

> This is how JSX works. Quotes always denote a string. Using curly brackets allows other kinds of values like arrays, numbers, booleans and objects (as we used above for `style`). You can even put functions or other JSX elements inside brackets! Any JavaScript expression is valid inside the curly brackets.
>
> ```jsx
> <MyComponent
>   numberArg={10}
>   isFun={true}
>   onClick={() => console.log('hey')}
>   userName="Dan"
> />
> ```

The object passed into `style={}` should map css attributes to css values. This structure closely resembles the [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) object used by the browser to store element styles.

✏️ To see an example of this style object, run `document.body.style` in your browser console.

### Classes

In JSX, classes are specified using the `className=""` property:

```jsx
<div className="button primary">So are classes</div>
```

The reason for the discrepancy is that the React API is mirrored after the JavaScript DOM API and not after HTML itself. A lengthier description of the reasons is available on [GitHub](https://github.com/facebook/react/issues/13525#issuecomment-417818906).

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

### Fragments

Sometimes, you may encounter situations where wrapping your elements in an extra element is undesirable (`tr`, `td` for example). Fragments can either be written using the long-form `<React.Fragment></React.Fragment>` syntax or the shorthand `<></>`.

This JSX:

```jsx
<>
  <div>Sibling 1</div>
  <div>Sibling 2</div>
</>
```

Will output the following HTML:

```html
<div>Sibling 1</div>
<div>Sibling 2</div>
```

Note how the fragment components don't have any corresponding DOM output. This would also be true if `<React.Fragment>` was used instead; they are the same.

## JavaScript's JSX Interpolation

JSX is dynamic. You can easily insert values from variables and objects into your JSX:

```jsx
const name = 'Bitovi';

<div className="button primary">Welcome to {name}!</div>;
```

In the code above, use the `{name}` syntax to tell JSX that to render the value stored in the `name` variable (ie. `"Bitovi"`) into our view.

You can take this a step further by interpolating multiple values, and using JavaScript functions to transform data on the fly. Anything that goes inside `{}` is executed as normal JavaScript. These are the same rules as the brackets on a prop: any JavaScript expression is valid inside the curly brackets.

```jsx
const person = {
  name: 'mike',
  profession: 'programmer',
};

<div className="button primary">
  <h1>Hi I'm {person.name.toUpperCase()}!</h1>
  <p>I'm a {person.profession} living in Philadelphia</p>
</div>;
```

@highlight 7,8

### JSX Is JavaScript

Remember, JSX is simply an alternative syntax for normal JavaScript&mdash;it is not magic. This means that you can use JSX as a normal value.

```jsx
const header = <h1>Hello World</h1>;
const body = <p>My name is {'Mike'}</p>;

const page = (
  <div>
    {header}
    {body}
  </div>
);
```

If rendered, `page` will output:

```html
<div>
  <h1>Hello World</h1>
  <p>My name is Mike</p>
</div>
```

If this surprises you, remember that underneath the syntactic sugar, JSX is nothing more than `React.createElement` calls:

```js
const header = React.createElement('h1', null, 'Hello World');
const body = React.createElement('p', null, `Hello ${'Mike'}`);

const page = React.createElement('div', null, [header, body]);
```

### Common Pitfalls

Only expressions which return a value may be interpolated. This includes static values, variables and calls to functions. It does not include control-flow statements such as `if`, `case`, `for`, `while`. These can either be abstracted behind a function, which is then called within the JSX or be re-written in a JSX-friendly way.

To put it simply: only things that you could pass into a function can be used inside the brackets.

#### Using Conditions

Conditions can be re-written using the ternary operator.

```jsx
// This does not work
<div>
  {
    if (a === b) { // Control flow does not belong in JSX
      "a and b are equal"
    } else {
      "a and b are different"
    }
  }
</div>
```

```jsx
// But the same can be accomplished with ternaries
<div>
  {a === b // Ternaries are expressions. They return a value.
    ? 'a and b are equal'
    : 'a and b are different'}
</div>
```

If ternaries seem excessive for any particular case, you can write all your logic in a separate function and invoke it from within JSX.

```jsx
<div>{outputResult()}</div>
```

#### Using Loops

```jsx
// This does not work
<div>
  {
    for (let n of [1, 2, 3, 4]) { // Control flow does not belong in JSX
      <span>n</span>
    }
  }
</div>
```

If you want to iterate within JSX, use methods such as `Array.map`, `Array.filter` and `Array.reduce`:

```jsx
// Mapping values to JSX elements
<div>
  {[1, 2, 3, 4].map((n) => (
    <span>n</span>
  ))}
</div>
```

@highlight 3

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
</div>
```

## Event Handling

One of the most powerful aspects of JavaScript is that it enables developers to respond to events in the browser. With JSX it's easy to listen for and respond to these events.

```jsx
<div className="button primary">
  <button onClick={(event) => console.log('Clicked')}>click me</button>
</div>
```

@highlight 2

Note to things above, all event names are camelcased (onClick, onMouseEnter, etc...).

In the code above, we've attached an `onClick` listener to the `<button>` element. Whenever this button gets clicked, the code inside the `onClick={...}` will get executed. The value always needs to be a function, and that function will get called with an `event` object.

All [events](https://reactjs.org/docs/events.html) supported in vanilla JavaScript are also supported in JSX.

## Components

In React JSX is almost always the return value of our components. Components are like small containers which can be reused throughout your application. For example, you might build a `Button` component which renders all the JSX required for a button.

```jsx
function Button() {
  return (
    <div className="button primary">
      <button>click me</button>
    </div>
  );
}

ReactDOM.render(<Button />, document.getElementById('root'));
```

@codepen react

In the code above, we're defining a functional component (a function which returns JSX) called `Button`.

This component returns JSX and could then be rendered and reused by another component like `App` below.

```jsx
function App() {
  return (
    <div>
      <Button />
      <Button />
      <Button />
    </div>
  );
}
```

Here the `App` component is rendering the `Button` component 3 times. Note that when you render custom components like this they don't need closing tags, instead they can be self-closing with a `/` tacked onto the end. You can also design them to have closing tags with extra elements rendered inside (see an explanation on JSX children [here](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)).
