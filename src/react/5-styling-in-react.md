@page learn-react/styling-in-react Styling in React
@parent learn-react 5

@description Learn the different ways to style React components.

@body

## Different ways of styling components

Styling in React is a diverse and opinionated topic. React does a great job of combining HTML & JavaScript together, but it is ultimately agnostic when it comes to working with CSS and styling.

The good news is that all of the same styling techniques you're used to will still work in React. You can use stylesheets, inline styling, and even extension languages like SASS or LESS.

Let's take a look at some of the ways we can go about styling React components and walk through some of the pros and cons of each.

## Inline styling

The simplest way to style a component is with inline styling. All core JSX tags accept a `style` prop, essentially an object with css styles in it. As you can see below, we're able to construct style objects directly inside the JSX, and even interpolate JavaScript values into them.

The object passed into `style={}` should map css attributes to css values. This structure closely resembles the [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) object used by the browser to store element styles.

```jsx
import { imageUrl } from './data';

function Thing({ isActive }) {
  return (
    <div
      style={{
        color: isActive ? 'black' : 'white',
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      Hello World!
    </div>
  );
}
```

@highlight 6-9

In the example above we're specifying that the top-level div should have a color of either black or white depending on the `isActive` prop, and it's background image URL is imported from an external file.

Although this is the simplest way to add styles, it shouldn't be counted out. Using inline styles like this is a great way of combining your HTML, CSS & JavaScript all into one neat package. It's especially useful when your styles will depend on component state or props.

One of the downsides of this approach is the performance cost associated with making and interpolating these style objects. Though, for many common layouts you will likely never run into performance concerns. In the off-chance that you are rendering hundreds / thousands of components (nested tables, etc...), it would be faster to use a stylesheet.

That being said there are libraries that mitigate this speed concern while still using inline styling (namely `emotion`). They perform a build step conversion that takes your inline styles and generates stylesheets for them.

## External Styles

Like normal HTML, JSX elements can accept a class attribute (called `className`). Classes can either be located in a global style sheet linked in the index.html file, or be directly imported into a component (see below).

This import syntax can be used in any modern web-loader. Create React App uses `webpack` to accomplish this.

```jsx
import './thing.css';

function Thing({ isActive }) {
  return <div className="thing">Hello World!</div>;
}
```

@highlight 4

The component above uses a `thing` class that is imported from `thing.css`. This is a common way of including classes in a component, but keep in mind that due to its cascading nature, it's possible to encounter clashing names with a large component tree.

`className`'s can also be dynamically generated in response to props or component state. In the component below, the `thing-active` class is only added to the class name if the `isActive` prop is truthy.

```jsx
function Thing({ isActive }) {
  let className = 'thing';
  if (isActive) {
    className += ' thing-active';
  }

  return <div className={className}>Hello World!</div>;
}
```

@highlight 2-5

### Classnames (the npm package)

[Classnames](https://www.npmjs.com/package/classnames), is a small library that is widely used in the industry. It makes the process of creating dynamic classnames easier by providing a simple interface for constructing them. Note that this process is similar to the one described above, just made easier with the classnames library.

```jsx
import cx from 'classnames';
import './thing.css';

function Thing({ isActive }) {
  return (
    <div className={cx('thing', isActive && 'thing-active')}>Hello World!</div>
  );
}
```

@highlight 6

## CSS Modules

[A CSS Module](https://css-tricks.com/css-modules-part-1-need/) is a CSS file in which all class names and animation names are scoped locally by default. This means that if you've imported a . This prevents a common problem with importing css into components, name clashing.

When you define styles for a specific component, you want to be able to use descriptive names without having to worry about the other class names in the app. When you structure your css as a module, unique names are automatically generated. This solves the clashing issue.

This is also compatible with SASS/LESS making it a good option if you want to use a class-based styling approach.

Below is the CSS you would write inside of a .css file. You can see that it looks normal, and we don't need to worry about conflicts.

```css
.border {
  border: 1em solid black;
}

.border.active {
  border-color: red;
}
```

@highlight 1,5

This css will then get transformed into the following. Notice the names change, while still maintaining the selector structure.

```css
.HelloWorld_border_1FUOu {
  border: 1em solid black;
}

.HelloWorld_border_1FUOu.HelloWorld_active_wBa2p {
  border-color: red;
}
```

@highlight 1,5

This would then be imported into your React component as a JavaScript module containing the mapped class names:

```js
module.exports = {
  helloWorld: 'HelloWorld_border_1FUOu',
  active: 'HelloWorld_active_wBa2p',
};
```

@highlight 2,3

And the component could be styled like so:

```jsx
import styles from './hello-world.module.css';

function HelloWorld({ isActive }) {
  return <div className={styles.helloWorld}>Hello World!</div>;
}
```

@highlight 4

Note that the `classnames` library can be used in conjunction with CSS modules as well.

Find a way to create an example of this, and link it.

## Styled Components

The styled components philosophy is that everything is a component. Instead of separating your CSS and your JS, they become integrated into one single entity. So instead of loading styles into a component from some external source, the styles are actually built into the component itself, and can be configured using props/state.

In a styled components implementation, a `Button` component for example, might take a `color` prop, or a `fontSize` prop to determine its style. This approach is closely integrated with React, and utilizes the built-in React features (props/state) more than any other.

In the code below, we're using the [emotion](https://emotion.sh/docs/introduction) library to create a styled `Button` component. The syntax is a bit foreign, but this is essentially creating a `<button>` component which maps its props to styles. For example, the button below accepts a `color` and an `outline` prop, which are used to generate the styling.

```js
import styled from '@emotion/styled';

export const Button = styled.button`
  border: 1px solid darkblue;
  background: ${(props) => props.color || 'blue'};

  ${(props) =>
    props.outline &&
    css`
      border-color: ${(props) => props.color || 'blue'};
      background-color: darkblue;
    `}
`;
```

@highlight 5,7,8,10

This `Button` could then be imported into another component file and rendered with specific styles.

```jsx
import Button from './Button';

function Thing() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button color="green">Green Button</Button>
      <Button outline>Outlined Button</Button>
    </div>
  );
}
```

@highlight 6-8

Remember that if you just supply a `prop` with no value (ie... the `outline` in `<Button outline>`), then React supplies the value of `true`. It assumes it is a boolean prop.

The styled components approach is definitely a departure from traditional styling methodologies, however it makes up for it by integrating so nicely with the React paradigm.

It's important to note that in many production codebases, some combination of the above styling techniques are utilized. Oftentimes some static css files will be necessary, and used alongside something like styled components. At the end of the day the right solution is the one that works for your team!

## Exercise

Let's use our styling knowledge to make our Tic-Tac-Toe game look amazing!

### The problem

✏️ Below, you'll find a link that says "starter code". It will take you to a Create-React-App conveniently setup in `codesandbox`. You have been provided a basic set of global styles in App.css. Your task is to convert these initial styles into each of the other styling types.

1.  Inline Styles
2.  Modular CSS
3.  Styled Components

### [starter code](https://codesandbox.io/s/ecstatic-easley-ipt6o?fontsize=14&hidenavigation=1&theme=dark)

### The solution

#### Inline Styles

`App.js`

```jsx
import React from 'react';

const boardStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '600px',
  height: '600px',
  boxShadow: '0px 3px 8px 0 rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
};

const squareStyles = {
  width: '200px',
  height: '200px',
  border: '1px solid black',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '6em',
};

const hintStyles = {
  background: '#9AE6B4',
};

function App() {
  return (
    <div style={boardStyles}>
      <div style={squareStyles}>O</div>
      <div style={squareStyles}>X</div>
      <div style={squareStyles}>O</div>
      <div style={{ ...squareStyles, ...hintStyles }}></div>
      <div style={squareStyles}>X</div>
      <div style={squareStyles}>X</div>
      <div style={squareStyles}></div>
      <div style={squareStyles}>O</div>
      <div style={squareStyles}>X</div>
    </div>
  );
}

export default App;
```

@highlight 3,14,25,31-40,only

#### Modular CSS

`App.js`

```jsx
import React from 'react';
import cx from 'classnames';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.board}>
      <div className={styles.square}>O</div>
      <div className={styles.square}>X</div>
      <div className={styles.square}>O</div>
      <div className={cx(styles.square, styles.hint)}></div>
      <div className={styles.square}>X</div>
      <div className={styles.square}>X</div>
      <div className={styles.square}></div>
      <div className={styles.square}>O</div>
      <div className={styles.square}>X</div>
    </div>
  );
}

export default App;
```

@highlight 2,4,8-17,only

`App.module.css`

```css
.board {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 600px;
  height: 600px;
  box-shadow: 0px 3px 8px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.square {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6em;
}

.square:hover {
  cursor: pointer;
  background: #bbdefb !important;
}

.square.hint {
  background: #9ae6b4;
}
```

@highlight 1,12,23,28,only

#### Styled Components

`App.js`

```jsx
import React from 'react';
import styled from '@emotion/styled';

export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 600px;
  height: 600px;
  box-shadow: 0px 3px 8px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

export const Square = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6em;

  :hover {
    cursor: pointer;
    background: #bbdefb !important;
  }

  ${(props) =>
    props.hint &&
    css`
      background: #9ae6b4;
    `}
`;

function App() {
  return (
    <Board>
      <Square>O</Square>
      <Square>X</Square>
      <Square>O</Square>
      <Square hint></Square>
      <Square>X</Square>
      <Square>X</Square>
      <Square></Square>
      <Square>O</Square>
      <Square>X</Square>
    </Board>
  );
}

export default App;
```

@highlight 4,15,39-49,only

## Next Steps

✏️ Head over to the [next lesson](stateful-hooks.html) to get a deeper appreciation for how hooks can simplify your life.
