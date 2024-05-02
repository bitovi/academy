@page learn-react-native/intro-to-jsx Introduction to JSX
@parent learn-react-native 4
@outline 2

@description TODO

@body

## Overview

In this section, you will:

- Learn the basics of JSX.
- Discover the differences between JSX and XML.
- Use JavaScript variables and expressions in JSX.
- Work with conditionals and loops in JSX.

## Objective 1: Create a UI with JSX

Now that we have our project set up, let’s update our page to look like the design below:

<img alt="Screenshot of a mobile application interface text “Place My Order: Coming Soon To...” and “Illinois“." src="../../static/img/react-native/04-intro-to-jsx/01-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### What is JSX?

In React Native development, JSX is utilized to define the user interface of mobile applications.

JSX stands for JavaScript XML, allowing you to write UI components that look similar to XML or HTML in their structure but work within the JavaScript environment. React Native transforms JSX into native components that are displayed on the mobile device. JSX can be combined seamlessly with JavaScript, which makes for a powerful programming environment.

#### Basic JSX looks like XML

```tsx
const greeting = <Text>Hello, world!</Text>
```

In this example, a <Text> component is used to render the text “Hello, world!”

While this appears similar to XML or HTML, it is JSX used in a React Native project within a JavaScript file.

### Embedding a JavaScript expression in JSX

```tsx
const name = "Alice"
const greeting = <Text>Hello, {name}!</Text>
```

Here, we embed a JavaScript expression `{name}` within JSX. The value of the name variable is displayed within the `<Text>` component.

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

This transformation is handled by tools like Metro during the build process, allowing us to write more readable and maintainable code using JSX.

### Differences between JSX and HTML

While JSX syntactically resembles XML or HTML, there are several key differences in how they are used and processed. Understanding these differences is crucial for developers transitioning from XML’s strict standards or HTML’s looser structure.

Here are some of the most noticeable differences between JSX and XML:

#### XML has attributes, JSX has props

In XML, attributes are used to provide additional information about elements, and they are always treated as strings. This makes XML straightforward but less flexible in terms of integrating dynamic content directly within the markup.

For example, consider an XML element representing a user:

```xml
<user age="37" isActive="true" name="Jane Doe"></user>
```

JSX allows props (short for properties) to be much more than just strings. Props in JSX can be any JavaScript expression, including any other JavaScript primitive, object, function, etc.

```jsx
const userElement = (
  <User age={37} isActive={true} name={"Mary Jackson"} />
);
```

In the code above, the `age`, `isActive`, and `name` props are all passed into the `User` component.

#### Writing comments

In XML, comments are written using the `<!-- -->` syntax, seen below. Anything inside these comment components is ignored by the browser and is not rendered or executed.

```xml
<p>
  <!-- This is an XML comment -->
  Visible content
</p>
```

In JSX, comments follow the JavaScript comment syntax. Since JSX is transpiled into JavaScript, you must use JavaScript’s {/\* \*/} syntax for comments within the JSX part of your code.

```tsx
const content = (
  <Text>
    {/* This is a JSX comment */}
    Visible content
  </Text>
)
```

#### Style prop

In XML, the appearance of most elements can be altered using the `style` attribute. React supports a `style` prop, but it accepts an object, not a string. The style object has properties whose names are camel-case versions of their CSS counterparts. IE: "font-style" becomes `fontStyle`.

```tsx
const content = <Text style={{ fontStyle: "italic" }}>Restaurants</Text>
```

As we go through this training, you’ll learn additional differences.

#### Convention: Parenthesis

When dealing with JSX that needs multiple lines, the convention is to wrap it in parentheses. This helps keep your JSX clean and clear, rather than mixing it with the Javascript around it.

```tsx
function Form() {
  return (
    <View>
      <Text>
        Name:
      </Text>
      <TextInput placeholder="Enter your name" />
    </View>
  )
}
```

#### Convention: Implicit Returns

When creating functions that have no logic and just return JSX, especially when they're an argument to a function, the convention is to use an arrow function with an implicit return. This is nearly always coupled with the parenthesis convention, too. (Don’t worry: you’ll learn about `.map` in the next objective.)

```tsx
const data = ["one", "two"]

function List() {
  return (
    <View>
      {data.map((name) => (
        <View key={name}>
          {name}
        </View>
      ))}
    </View>
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
