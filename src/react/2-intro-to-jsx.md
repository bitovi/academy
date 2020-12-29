@page learn-react/intro-to-jsx Introduction to JSX
@parent learn-react 2

@description Learn how to use React's preferred markup syntax JSX, and combine HTML with JavaScript.

@body

## What are Components?

In React, a `Component` is the encapsulation of an element's look and behavior. Here is an example "Hello World" component, that also prints my name. It is being used inside of another component named "App".

```jsx
function HelloWorld(props) {
  return <div>Hello World, my name is {props.name}</div>;
}

function App(props) {
  return (
    <div>
      <HelloWorld name="Dan" />
      <HelloWorld name="Kelsey" />
      <HelloWorld name="Mitchell" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

@codepen react

Don't worry if some of this syntax is new to you, we will be going into more detail about components, and how they are constructed. Even if you don't understand every detail of what's happening above, we can see 3 big takeaways.

### 1. The `HelloWorld` component is simply a function and the first letter is capitalized.

This is not an accident. It's mandatory. Consider how the component is being used directly inside the `App` component, right next to normal HTML. If a component name is all lowercase, React assumes that it is a normal HTML tag (like `span`, or `div`). So the first letter must be capital so that it can be differentiated from a normal HTML element.

By and large, the React community has centered around the convention of using [PascalCase](https://techterms.com/definition/pascalcase) to name `components`. As far as React is concerned though, your component simply needs to begin with a capital letter to be treated as a custom component.

> To drive the point home further, Imagine we created a component named lowercase `div`. In this case, React wouldn't be able to tell the difference between a normal div and our component `div` since we use them identically. Hence the capitalization.

### 2. We can pass attribute-like values to our components. These are called `props` which is short for properties.

```jsx
function App(props) {
  return (
    <div>
      <HelloWorld name="Dan" />
      <HelloWorld name="Kelsey" />
      <HelloWorld name="Mitchell" />
    </div>
  );
}
```

@highlight 4

In the example above we pass 'name' to our `HelloWorld` component. These HTML attribute-like descriptors are called `props`, and React does the work of wrapping them in an object, and supplying them as the first argument to the `HelloWorld` component for us. The argument `props` is simply an object containing all of the attribute-like things we passed in.

> In the example above, we only passed in a single attribute so the `props` object would just be `{ name: 'Dan' }` for the first `HelloWorld` component. Also these `props` make the component more reusable, as the above component is used with 3 names without duplication of code.

### 3. React allows us to embed HTML into our components. This is called `JSX` which stands for `JavaScript XML`.

Technically this stuff isn't exactly HTML, it's a representation of what HTML should render when the component is evaluated.

Before discussing how React performs this magic, let's discuss how user interfaces are created in React.

At its core, React is a JavaScript library that allows you to describe the way your components look using only JavaScript. But this "all JS" approach comes with some downsides, namely it becomes arduous to describe complex page hierarchies using only pure JavaScript. When first learning React, it's good to be aware of the [element API](https://reactjs.org/docs/react-api.html), but keep in mind that most React developers will forego this for an alternative syntactic sugar called JSX.

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

The code above will produce the following HTML once rendered:

```html
<div id="greeting">
  <h1>Hello World</h1>
  <p>This is HTML</p>
</div>
```

As you can see, the XML-like nature of HTML allows us to model anything using a combination of a tag name, a set of attributes and children. Note how the more complex the HTML we're trying to model, the more complex the `React.createElement` code becomes.

While it is possible to build entire apps using the `createElement` function, this is rarely done due to how complicated it becomes. Instead, React supports a JavaScript syntax extension called JSX which allows us to describe our application declaratively.

You might be wondering, "What does it mean to render this HTML?". It simply means that we use `ReactDOM.render` to convert the HTML-like components into actual DOM element. Here's an example.

```jsx
function HelloWorld() {
  return (
    <div id="greeting">
      <h1>Hello World</h1>
      <p>This is HTML</p>
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
```

@codepen react

React splits apart the steps where you "define" the HTML from the part where you "render" it, and will "re-render" components when the data going into them changes. We'll discuss some of the benefits that offers us in the section below.

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

Note how the fragment components don't have any corresponding DOM output. This would also be true if `<React.Fragment>` was used instead. They're identical.

## JSX Interpolation

JSX is dynamic. You can easily insert values from variables and objects into your JSX:

```jsx
const name = 'Bitovi';

<div className="button primary">Welcome to {name}!</div>;
```

In the code above, use the `{name}` syntax to tell JSX that to render the value stored in the `name` variable (i.e. `"Bitovi"`) into our view.

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

### JSX is JavaScript

Remember, JSX is simply an alternative syntax for normal JavaScript&mdash;it is not magic. This means that you can use JSX as a normal value.

```jsx
const header = <h1>Hello World</h1>;
const body = <p>My name is {'Mike'}</p>;

function MyPage() {
  return (
    <div>
      {header}
      {body}
    </div>
  );
}

ReactDOM.render(<MyPage />, document.getElementById('root'));
```

@codepen react

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

One of the most powerful aspects of JavaScript is that it enables developers to respond to events in the browser. With JSX it's easy to listen for and respond to these events. In React, all event names are camelcased (onClick, onMouseEnter, etc...).

```jsx
<div className="button primary">
  <button onClick={(event) => console.log('Clicked')}>click me</button>
</div>
```

@highlight 2

In the code above, we've attached an `onClick` listener to the `<button>` element. Whenever this button gets clicked, the code inside the `onClick={...}` will get executed. The value always needs to be a function, and that function will get called with an `event` object.

All [events](https://reactjs.org/docs/events.html) supported in vanilla JavaScript are also supported in JSX.

## Exercise

In this exercise you will be creating a component that is a single square with width, and height set to 100px. This component will be able to take in two props, the first of which is a `backgroundColor`, which will set the background color of the square, and the second `singleLetter`, which is a single character that will be displayed in the center of the square.

```jsx
<Square backgroundColor="red" singleLetter="Q" />
```

So if a person rendered that component, they would see

<img src="../static/img/react/redQ.png" >

Here's an empty codepen with React preloaded to get you started.

#### Hover over the code below and select the run button in the upper right hand corner.

```jsx
function Square() {
  return <div>Placeholder for your code</div>;
}

ReactDOM.render(
  <Square backgroundColor="red" singleLetter="Q" />,
  document.getElementById('root'),
);
```

@codepen react

## Solution

```jsx
function Square(props) {
  return (
    <div
      style={{
        height: '100px',
        width: '100px',
        backgroundColor: props.backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.singleLetter}
    </div>
  );
}

ReactDOM.render(
  <Square backgroundColor="red" singleLetter="Q" />,
  document.getElementById('root'),
);
```

@codepen react

> Note: You'll see `ReactDOM.render` in all of the code samples in this tutorial. `ReactDOM.render` injects a component (first argument) into a DOM element (second argument).

## Next Steps

✏️ Head over to the [next lesson](components.html) to get the inside scoop on how components are made.
