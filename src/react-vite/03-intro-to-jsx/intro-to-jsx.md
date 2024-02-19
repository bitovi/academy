@page learn-react/intro-to-jsx Introduction to JSX
@parent learn-react 3
@outline 3

@description Learn how to use JSX to define your UI in React.

@body

## Overview

In this section, we will:

- Learn to use JSX to define our UI
- Install project assets
- Create our first component
- Add variables to JSX
- Work with loops in JSX

## Objective 1: Creating a UI with JSX

- Create the homepage using JSX
- Match the design below

<img src="../static/img/react-vite/03-intro-to-jsx/mock-homepage.jpg" alt="mockup" style="border: solid 1px black; max-width: 640px;"/>

### What is JSX?

JSX is used by React developers to define the user interface.

JSX is a special syntax designed to look almost identical to HTML. Developers define the UI using JSX. React transforms that JSX into the HTML the browser displays. JSX can be written alongside standard JavaScript, which makes for a powerful programming environment.

React has a procedural `React.createElement` syntax, but most applications do not use it directly. Instead, views are defined and maintained in JSX and will automatically be transpiled into the equivalent `React.createElement` calls at build-time.

### HTML differences

JSX looks a lot like HTML, and that's intentional. Browsers understand HTML, JavaScript, and CSS. Eventually, anything we build has to be converted into one of those 3 syntaxes. Since our UI code will eventually end up as HTML, using JSX means it will be easier to understand and debug the end result in the browser.

However, JSX is converted into JavaScript and therefore is not an exact mirror of HTML. Some of the most noticeable differences include:

__Say "props" instead of "attributes."__ This nomenclature difference is because they are technically different, though visually they appear the same. When the following image tag appears in HTML, the "src" is called an _attribute_. In JSX, the "src" is a _prop_ or _property_.

```jsx
<img src="image.png">
```

__Tags must close__

In HTML, you _should_ close your tags, but its not mandatory. JSX requires that tags close. This means that an opening tag `<div>` should have a corresponding closing tag `</div>`. Some elements use self-closing tags using an ending slash like `<img />` and `<br />`.

__Reserved words are renamed.__ The HTML attributes "class" and "for" are reserved words in JavaScript. These had to be renamed to "className" and "htmlFor" respectively.

```jsx
<label className="label" htmlFor="name-input">Name:</input>
<input className="input" id="name-input" />
```

As we go through this training, you'll learn additional differences.

### Setup 1

We've created an assets package with images and CSS you'll need to build the application. Install the `place-my-order-assets` package.

✏️ Run:

```shell
npm install place-my-order-assets
```

✏️ Remove the contents of the **src/App.css** file so it’s completely blank.

✏️ Update **src/index.css** to be:

@diff ../../../exercises/react-vite/02-setting-up-your-environment/solution/src/index.css ../../../exercises/react-vite/03-intro-to-jsx/01-problem/src/index.css only

### Verify 1

You should have already installed Vitest in the previous section. If you haven't done so already, create a test file at `src/App.test.tsx` and copy the following tests into your test file.

✏️ Copy: 

@diff ../../../exercises/react-vite/02-setting-up-your-environment/solution/src/App.test.tsx ../../../exercises/react-vite/03-intro-to-jsx/01-problem/src/App.test.tsx only

✏️ Run: 

```shell
npm run test
```

Note that we won't be able to write an automated test that verifies the styles and images appear as desired, so you will have to test those manually.

### Exercise 1

Take the below HTML and convert it to JSX:

@sourceref ./template.html

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/01-problem?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/01-problem?file=src/App.tsx) to do this exercise in an online code editor.

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx**

@diff ../../../exercises/react-vite/03-intro-to-jsx/01-problem/src/App.tsx ../../../exercises/react-vite/03-intro-to-jsx/01-solution/src/App.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/01-solution?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/01-solution?file=src/App.tsx).

</details>

## Objective 2: Loops in JSX

- JSX Interpolation
- Loops in JSX

### JSX Interpolation

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

### Using Conditions

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

### Using Loops

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

### Setup 2

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/03-intro-to-jsx/01-solution/src/App.tsx ../../../exercises/react-vite/03-intro-to-jsx/02-problem/src/App.tsx only

### Verify 2

Add these tests into your application to verify you have met the acceptance criteria. Note how React Testing Library allows our tests to specify exact elements.

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-vite/03-intro-to-jsx/01-solution/src/App.test.tsx ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.test.tsx only

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/02-problem?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/02-problem?file=src/App.tsx) to do this exercise in an online code editor.

### Exercise 2

- Set the H1 tag to "Ordering food has never been easier"
- Display a list of restaurants: 'Cheese Curd City' & 'Poutine Palace'

- Use the proper `ul` and `li` tags to create the list
- List items should have a unique key

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx**

@diff ../../../exercises/react-vite/03-intro-to-jsx/02-problem/src/App.tsx ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/02-solution?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/03-intro-to-jsx/02-solution?file=src/App.tsx).

</details>

## Next steps

Next we will learn about building out a React application with components.
