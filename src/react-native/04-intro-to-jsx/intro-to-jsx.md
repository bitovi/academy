@page learn-react-native/intro-to-jsx Introduction to JSX
@parent learn-react-native 4
@outline 2

@description Learn how to use JSX to define your UI in React Native.

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

### Differences between JSX and XML

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

If you’re familiar with front-end web development, you might know that the appearance of most HTML elements can be altered using the `style` attribute.

React Native supports a `style` prop, but it accepts an object, not a string.
The style object has properties whose names are camel-case versions of their CSS counterparts, e.g. `font-style` becomes `fontStyle`.

```tsx
const content = (
  <Text style={{ fontStyle: "italic" }}>
    Restaurants
  </Text>
)
```

As we go through this training, you’ll learn additional differences.

#### Parenthesis (convention)

When dealing with JSX that needs multiple lines, the convention is to wrap it in parentheses. This helps keep your JSX clean and clear, rather than mixing it with the Javascript around it.

```tsx
function Form() {
  return (
    <View>
      <Text>
        Name:
      </Text>
      <TextInput value="Molly Holzschlag" />
    </View>
  )
}
```

#### Implicit returns (convention)

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

#### Using `View`

TODO: Introduce this core component.

#### Using `ScrollView`

TODO: Introduce this core component.

#### Using `SafeAreaView`

TODO: Introduce this core component.

### Setup 1

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/03-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/01-problem/App.tsx only

### Verify 1

✏️ Update **App.test.tsx** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/03-solution/App.test.tsx ../../../exercises/react-native/04-intro-to-jsx/01-problem/App.test.tsx only

### Exercise 1

Use JSX to dynamically display a state name from a variable that’s an object.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **App.tsx** to be:
@diff ../../../exercises/react-native/04-intro-to-jsx/01-problem/App.tsx ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx only

</details>

## Objective 2: Expressions and loops in JSX

Next, we want to render a list of states name in our application:

<img alt="Screenshot of a mobile application interface text “Place My Order: Coming Soon To...”, “Illinois“, and “Wisconsin“." src="../../static/img/react-native/04-intro-to-jsx/02-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

To do so, we’ll learn about:

- Using JavaScript variables and expressions in JSX.
- Working with conditionals and loops in JSX.

### Using JavaScript variables and expressions in JSX

JSX is dynamic. You can insert values from variables and objects into your JSX as we did with the state name in the previous section.

```tsx
const name = "Bitovi"

const content = <Text>Welcome to {name}!</Text>
```

In the code above, use the `{name}` syntax to tell JSX to render the value stored in the `name` variable (i.e. `"Bitovi"`) into our view.

You can take this a step further by interpolating multiple values and using JavaScript functions to transform data on the fly. Anything that goes inside `{}` is executed as normal JavaScript. These are the same rules as the brackets on a prop: any JavaScript expression is valid inside the curly brackets.

```tsx
const person = {
  name: "mike",
  profession: "programmer",
}

const content = (
  <View>
    <Text>Hi I’m {person.name.toUpperCase()}!</Text>
    <Text>I’m a {person.profession} living in Philadelphia.</Text>
  </View>
)
```
@highlight 8,9

### JSX is a syntax extension for JavaScript

Remember, JSX is an alternative syntax for normal JavaScript—it is not magic. This means that you can use JSX as a normal value, too.

```tsx
const header = <Text>Hello World</Text>
const body = <Text>My name is {"Mike"}</Text>

function MyPage() {
  return (
    <View>
      {header}
      {body}
    </View>
  )
}
```

If rendered, the `screen` will output:

```jsx
<View>
  <Text>Hello World</Text>
  <Text>My name is Mike</Text>
</View>
```

If this surprises you, remember that underneath the syntactic sugar, JSX is nothing more than `React.createElement` calls:

```tsx
const header = React.createElement("Text", null, "Hello World")
const body = React.createElement("Text", null, `My name is ${"Mike"}`)

const page = React.createElement("View", null, [header, body])
```

### Working with conditionals and loops in JSX

Only expressions that return a value may be interpolated. This includes static values, variables and calls to functions. It does not include control-flow statements such as `if`, `case`, `for`, `while`. These can either be abstracted behind a function, which is then called within the JSX or be re-written in a JSX-friendly way.

To put it simply: only things that you could pass into a function can be used inside the brackets.

#### Using conditionals

Conditions can be rewritten using the ternary operator.

The example below will **not** work:

```tsx
const content = (
  <Text>
    {
      if (a === b) { // Control flow does not belong in JSX
        "a and b are equal"
      } else {
        "a and b are different"
      }
    }
  </Text>
)
```

But the same can be accomplished with ternaries in the following example:

```tsx
const content = (
  <Text>
    {a === b // Ternaries are expressions.
      ? "a and b are equal"
      : "a and b are different"}
  </Text>
)
```

If ternaries seem excessive for any particular case, you can write all your logic in a separate function and invoke it from within JSX.

```tsx
function makeResult() {
  return a === b ? "a and b are equal" : "a and b are different"
}

const content = <Text>{makeResult()}</Text>
```

#### Using loops

JSX does not support traditional loop statements like `for`, `while`, or `do...while` directly within JSX.

The example below will **not** work:

```tsx
const names = ['Alfa', 'Bravo', 'Charlie'];

const content = (
  <View>
    {
      // Control flow does not belong in JSX
      for (let name of names) {
        <Text>name</Text>
      }
    }
  </View>
)
```

The `Array.map()` function is the most common and idiomatic way to render lists in JSX.
It’s especially useful for rendering arrays of data as components.

```tsx
const names = ["Alfa", "Bravo", "Charlie"]

const content = (
  <View>
    {names.map((name) => {
      return <Text key={name}>{name}</Text>
    })}
  </View>
)
```

That will produce the following React Native views:

```jsx
<View>
  <Text>Alfa</Text>
  <Text>Bravo</Text>
  <Text>Charlie</Text>
</View>
```

There are lots of ways to iterate over arrays in JavaScript with functions like `Array.map`, `Array.filter`, and `Array.reduce`. These all work in JSX!

##### <Text id="the-key-prop">The `key` prop</Text>

Did you notice the `key` prop in the example above?

When rendering a list of elements, React Native needs a way to uniquely identify each element. This helps React Native understand which items have changed, been added, or removed, which is crucial for efficient re-rendering.

Each key should be a unique identifier among siblings. Keys should be stable (not change over time), predictable (generated in a predictable manner), and unique (no two elements in the list should have the same key).

It’s often convenient to use IDs from your data as keys. For example, if our data had `id` properties for each name, then we could use those as the `key` prop, even if there were duplicate names in the array:

```tsx
const names = [
  { id: "550e8400", name: "Alfa" },
  { id: "f47ac10b", name: "Bravo" },
  { id: "5a3c9dd9", name: "Alfa" },
  { id: "3d3f6f4d", name: "Charlie" },
  { id: "aab3fcba", name: "Delta" },
]

const content = (
  <View>
    {names.map(({ id, name }) => {
      return <Text key={id}>{name}</Text>
    })}
  </View>
)
```

That will produce the following React Native views:

```jsx
<View>
  <Text>Alfa</Text>
  <Text>Bravo</Text>
  <Text>Alfa</Text>
  <Text>Charlie</Text>
  <Text>Delta</Text>
</View>
```

During development, if you forget to provide a `key` prop for items in an array, React Native will log the following error to the console:

```zsh
ERROR Warning: Each child in a list should have a unique "key" prop.

Check the render method of 'App'. See https://reactjs.org/link/warning-keys for more information.
  at Text (http://10.0.2.2:8081/index.bundle//&platform=android&dev=true&lazy=true&minify=false&app=com.solution&modulesOnly=false&runModule=true:66390:27)
  in App
  in RCTView (created by View)
  in View (created by AppContainer)
  in RCTView (created by View) in View (created by AppContainer)
  in AppContainer in solution
```

### Setup 2

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/02-problem/App.tsx only

### Verify 2

✏️ Update **App.test.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.test.tsx ../../../exercises/react-native/04-intro-to-jsx/02-problem/App.test.tsx only

### Exercise 2

- Update the existing JSX to render the list of state names.
- Use `Array.map()` to iterate over the `states`.
- Make sure to use `key` inside the `.map()`.
- Render `<Text>No states found</Text>` if, hypothetically, there weren’t any states.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **App.tsx** to be:
@diff ../../../exercises/react-native/04-intro-to-jsx/02-problem/App.tsx ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.tsx only

</details>

## Next steps

Next, we will learn the [learn-react-native/intro-to-testing] React Native applications.
