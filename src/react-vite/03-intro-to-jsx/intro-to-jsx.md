@page learn-react-vite/intro-to-jsx Introduction to JSX
@parent learn-react-vite 3
@outline 3

@description Learn how to use JSX to define your UI in React.

@body

## Overview

In this section we will:

- Learn to use JSX to define our UI
- Install project assets
- Create our first component
- Add variables to JSX
- Work with loops in JSX

## Objective 1: Creating a UI with JSX

### Key concepts

- What is JSX
- Loops in JSX

## What is JSX?

JSX is used by React developers to define the user interface.

JSX is a special syntax designed to look almost identical to HTML. Developers define the UI using JSX and React transforms it into the HTML the browser displays. JSX can be written alongside standard JavaScript, which makes for a powerful programming environment.

React has a procedural `React.createElement` syntax, but most applications do not use it directly. Instead, views are defined and maintained in JSX and will automatically be transpiled into the equivalent `React.createElement` calls at build-time.

## Exercise 1

### Acceptance criteria

- Create the homepage using JSX
- Match the design below

<img src="../static/img/react-vite/mock-homepage.jpg" alt="mockup" style="border: solid 1px black; max-width: 640px;"/>

### Setup

We've created an assets package with images and CSS you'll need to build the application. Install the `place-my-order-assets` package.

✏️ Run:

```shell
npm install place-my-order-assets
```

✏️ Update **src/index.css** to be:

@diff ../../../exercises/react-vite/02-setting-up-your-environment/solution/src/index.css ../../../exercises/react-vite/03-intro-to-jsx/01-problem/src/index.css only

Next, you'll need to pull the image from the assets package by adding the following import into `src/App.tsx`.

```tsx
import HeroImage from 'place-my-order-assets/images/homepage-hero.jpg'
```

If you inspect the type on the import, you'll notice it is a string. It's actually just the URL for the image. You can use the image import by setting it as the `src` of an image element like `src={HeroImage}`

### Verify

You should have already installed Vitest in the previous section. If you haven't done so already, create a test file at `src/App.test.tsx` and copy the following tests into your test file.

✏️ Copy: 

@diff ../../../exercises/react-vite/02-setting-up-your-environment/solution/src/App.test.tsx ../../../exercises/react-vite/03-intro-to-jsx/01-problem/src/App.test.tsx only

✏️ Run: 

```shell
npm run test
```

Note that we won't be able to write an automated test that verifies the styles and images appear as desired, so you will have to test those manually.

### Exercise

Take the below HTML and convert it to JSX:

```html
<div class="homepage" style="margin: auto">
  <img
    alt="Restaurant table with glasses."
    src="./assets/images/homepage-hero.jpg"
    width="250"
    height="380"
  />
  <h1><!-- TITLE GOES HERE --></h1>
  <p>
    We make it easier than ever to order gourmet food from your favorite local
    restaurants.
  </p>
  <p>
    <a class="btn" href="/restaurants" role="button">
      Choose a Restaurant
    </a>
  </p>
</div>
```

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx**

@diff ../../../exercises/react-vite/03-intro-to-jsx/01-problem/src/App.tsx ../../../exercises/react-vite/03-intro-to-jsx/01-solution/src/App.tsx only

</details>

## Objective 2: Loops in JSX

### Key concepts

- JSX Interpolation
- Loops in JSX

## JSX Interpolation

JSX is dynamic. You can insert values from variables and objects into your JSX as we did with the image URL in the previous section.

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

Remember, JSX is simply an alternative syntax for normal JavaScript—it is not magic. This means that you can use JSX as a normal value.

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

### Conditions and loops

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

@highlight 3

_✏️ Note: Due to how React stores elements in memory, list items require a stable `key` to identify them in the Virtual DOM. You can learn more in the [React docs](https://react.dev/learn/rendering-lists#why-does-react-need-keys)_

```jsx
// Mapping values to JSX elements
<div>
  {[1, 2, 3, 4].map((n, index) => (
    <span key={index}>{n}</span>
  ))}
</div>
```

Mapping over the array above will render as the following HTML.

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
</div>
```

## Exercise 2

### Acceptance Criteria

- Set the H1 tag to "Ordering food has never been easier"
- Display a list of restaurants: 'Cheese Curd City' & 'Poutine Palace'

### Requirements

- Use the proper `ul` and `li` tags to create the list
- List items should have a unique key

### Verify

Add these tests into your application to verify you have met the acceptance criteria. Note how React Testing Library allows our tests to specify exact elements.

✏️ Update **src/App.test** to be:

@diff ../../../exercises/react-vite/03-intro-to-jsx/01-solution/src/App.test.tsx ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.test.tsx only

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx**

@diff ../../../exercises/react-vite/03-intro-to-jsx/01-solution/src/App.tsx ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.tsx only

</details>

## Next steps

Next we will learn about building out a React application with components.