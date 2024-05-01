@page learn-react-native/intro-to-jsx Introduction to JSX
@parent learn-react-native 4
@outline 2

@description TODO

@body

## Overview

In this section, you will:

- Learn the basics of JSX
- Discover the differences between JSX and HTML
- Use JavaScript variables and expressions in JSX
- Work with conditionals and loops in JSX

## Objective 1: Create a UI with JSX

Now that we have our project set up, let’s update our page to look like the design below:

<img alt="Screenshot of a mobile application interface text “Place My Order: Coming Soon To...” and “Illinois“." src="../../static/img/react-native/04-intro-to-jsx/01-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### What is JSX?

JSX is used by React Native developers to define the user interface.

JSX is a special syntax designed to look almost identical to HTML. Developers define the UI using JSX. React transforms that JSX into the HTML the browser displays. JSX can be written alongside standard JavaScript, which makes for a powerful programming environment.

#### Basic JSX looks like HTML

```tsx
const greeting = <Text>Hello, world!</Text>
```

This code snippet creates a simple JSX element: a `<Text>` header with the text “Hello, world!” This is similar to writing HTML, but it’s JSX inside a JavaScript file.

### Embedding a JavaScript expression in JSX

```tsx
const name = "Alice"
const greeting = <Text>Hello, {name}!</Text>
```

Here, we embed a JavaScript expression `{name}` within JSX. The value of the name variable is displayed within the `<Text>` tag.

### Combining JSX with standard JavaScript

```tsx
function welcome(name) {
  return <Text>Hello, {name}</Text>
}

const welcomeMessage = welcome("Alice")
```

This example illustrates a regular JavaScript function being called with a single argument. The `welcome` function returns JSX, showing how JSX can be seamlessly integrated within standard JavaScript functions.

### JSX transpiled

React Native has a procedural `React.createElement` syntax, but most applications do not use it directly. Instead, views are defined and maintained in JSX and will automatically be transpiled into the equivalent `React.createElement` calls at build-time.

```tsx
function welcome(name) {
  return React.createElement("Text", null, `Hello, ${name}!`)
}

const welcomeMessage = welcome("Alice")
```

This transformation is handled by tools like Vite during the build process, allowing us to write more readable and maintainable code using JSX.

### Differences between JSX and HTML

JSX looks a lot like HTML, and that’s intentional. Browsers understand HTML, JavaScript, and CSS. Eventually, anything we build has to be converted into one of those 3 syntaxes. Since our UI code will eventually end up as HTML, using JSX means it will be easier to understand and debug the end result in the browser.

However, JSX is converted into JavaScript and therefore is not an exact mirror of HTML. Some of the most noticeable differences include:

#### HTML has attributes, JSX has props

This nomenclature difference is because they are technically different, though they might appear to be the same visually.

When talking about the HTML below, you might say that the `href` attribute is a URL:

```html
<a href="https://www.bitovi.com/academy/">Bitovi Academy</a>
```

The above is valid JSX too, but we would say that the `href` _prop_ is being passed into the anchor element.

#### Tags must close

In HTML, some elements are self-closing and don’t need a closing tag.

For example: the `img` element is a self-closing element: 

```html
<img alt="" src="image.png" />
```

In JSX, no elements are self-closing, which means that _all_ elements must have a closing tag, like the `img` below:

```html
<img alt="" src="image.png" />
```

#### Writing comments

In HTML, comments are written using the `<!-- -->` syntax, seen below. Anything inside these comment tags is ignored by the browser and is not rendered or executed.

```html
<p>
  <!-- This is an HTML comment -->
  Visible content
</p>
```

In JSX, comments follow the JavaScript comment syntax. Since JSX is transpiled into JavaScript, you must use JavaScript’s {/\* \*/} syntax for comments within the JSX part of your code.

```tsx
const content = (
  <p>
    {/* This is a JSX comment */}
    Visible content
  </p>
)
```

#### Reserved words are renamed

The HTML attributes `class` and `for` are reserved words in JavaScript. In JSX, these are renamed to `className` and `htmlFor`, respectively.

```tsx
const content = (
  <p className="form-field">
    <label htmlFor="name-input">Name:</label>
    <input id="name-input" />
  </p>
)
```

#### Style prop

In HTML, the appearance of most elements can be altered using the `style` attribute. React supports a `style` prop, but it accepts an object, not a string. The style object has properties whose names are camel-case versions of their CSS counterparts. IE: "font-style" becomes `fontStyle`.

```tsx
const content = <p style={{ fontStyle: "italic" }}>Restaurants</p>
```

As we go through this training, you’ll learn additional differences.

#### Convention: Parenthesis

When dealing with JSX that needs multiple lines, the convention is to wrap it in parethesis. This helps keep your JSX clean and clear, rather than mixing it with the javascript around it.

```tsx
function Form() {
  return (
    <p className="form-field">
      <label htmlFor="name-input">Name:</label>
      <input id="name-input" />
    </p>
  )
}
```

#### Convention: Implicit Returns

When creating functions that have no logic and just return JSX, especially when they're an argument to a function, the convention is to use an arrow function with an implicit return. This is nearly always coupled with the parenthesis convention, too. (Don’t worry: you’ll learn about `.map` in the next objective.)

```tsx
const data = ["one", "two"]

function List() {
  return (
    <div>
      {data.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </div>
  )
}
```

### Verify 1

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/04-solution/App.test.tsx ../../../exercises/react-native/04-intro-to-jsx/01-problem/App.test.tsx only

### Exercise 1

- Use JSX to dynamically display the state name from the object variable.

Hint: the state object will look like this:

```typescript
const state = { name: "Illinois", short: "IL" }
```

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:
@diff ../../../exercises/react-native/03-creating-a-new-app/04-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx only

</details>

## Objective 2: Expressions and loops in JSX

Next, we want to render a list of states name in our application:

<img alt="Screenshot of a mobile application interface text “Place My Order: Coming Soon To...”, “Illinois“, and “Wisconsin“." src="../../static/img/react-native/04-intro-to-jsx/02-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### Concept TODO

TODO

### Verify 2

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.test.tsx ../../../exercises/react-native/04-intro-to-jsx/02-problem/App.test.tsx only

### Exercise 2

- Update the existing JSX to render the list of state names.
- Use `Array.map()` to iterate over the `states`.
- Make sure to use `key` inside the `.map()`.
- Render `<Text>No states found</Text>` if, hypothetically, there weren’t any states.

Hint: the states array will look like this:

```typescript
const states = [
  {
    name: "Illinois",
    short: "IL",
  },
  {
    name: "Wisconsin",
    short: "WI",
  },
]
```

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:
@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.tsx only

</details>

## Next steps

Next, we will learn the [learn-react-native/intro-to-testing] React Native applications.
