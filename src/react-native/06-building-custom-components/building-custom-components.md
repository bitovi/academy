@page learn-react-native/building-custom-components Building Custom Components
@parent learn-react-native 6
@outline 3

@description Learn about components, the core building blocks of every React application.

@body

## Overview

In this section, you will:

- Create components in React and structuring them properly.
- Review how React components are (fundamentally) functions.
- Use component props in React using TypeScript interfaces.
- Structure code in the Modlets pattern.

## Objective 1: Creating a custom component

Our `App` component currently shows our state list, but eventually we’ll want to show other page content. Let’s prepare now by moving all of the JSX from `App` to a new component called `StateList`.

### What are components?

So far, we have placed all of our JSX inside the `App` function. Notice two things about the `App` function:

1. The name starts with a capital letter.

2. It returns something renderable (JSX).

@sourceref ./app-function.tsx

In React, we call this a component. When you create a component in React, you are creating building blocks that can be composed, reordered, and reused much like HTML elements.

React makes it relatively straightforward to create new components. Let’s learn to build our own.

### Component structure

Let’s start by creating a component from a commonly reused element, the button.

First, React component names must start with a capital letter, so we can call this `Button`. By convention component names use PascalCase when naming components, so longer component names will look like `IconButton`. Avoid hyphens and underscores.

Second, our component must return either `null` or something renderable, like JSX. The return value of our components is almost always JSX, though JavaScript primitives like `string` and `number` are also valid. Components cannot return complex types like arrays or objects.

@sourceref ./button-function.tsx

Components are like small containers which can be reused throughout your application. The `Button` component above returns JSX and could then be rendered and reused by another component like `App` below.

@sourceref ./reused-button-in-app.tsx

### React Native components are functions

The JSX syntax allows function components to look like XML, but underneath they are still functions. The return of each component is unique and you can use the same component multiple times.

You can think of components as fancy functions.

While you can’t actually do the following, this is functionally similar to what React is doing for you.

@sourceref ./the-work-react-does.tsx

Did you notice the `FC` that was used in the previous example to type the `App` const? Because we're using TypeScript with our project, we can apply types to help make sure the function component is properly formed. React provides the type `FC` (Function component) that can be applied to a function component. This type defines the arguments and return value that a function component must implement.

### Setup 1

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.tsx ../../../exercises/react-native/06-custom-components/01-problem/App.tsx only

### Verify 1

✏️ Update **App.test.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.test.tsx ../../../exercises/react-native/06-custom-components/01-problem/App.test.tsx only

### Exercise 1

- Update the `StateList` component to contain the logic that iterates over the `states` list.
- Use the new `StateList` component inside of the `App` component.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/01-problem/App.tsx ../../../exercises/react-native/06-custom-components/01-solution/App.tsx only

</details>

## Objective 2: Passing props

We’ve taken a great step to make our code more readable and our app more maintainable by creating the `StateList` component.

Let’s keep the good refactoring rolling by creating a `ListItem` component to house the JSX used to render each state in the list.

### Using component props

In React, props (short for “properties”) are how we pass data from a parent component to a child component. Since function React components are fundamentally JavaScript functions, you can think of props like the arguments you pass to a function.

To clarify, props in React Native should not be confused with the properties on HTML elements in web development, even though they sound similar.

To receive props, function components must implement a React API that allows an optional object argument, usually referred to as `props`.

The properties on the props object—individually called a “prop”—can include whatever data the child component needs to make the component work. The property values can be any type, including functions and other React components.

We’re using TypeScript in our project, so we can create an `interface` for `props` and use it in the definition of a function component.

Let’s create a `SubmitButton` component to see `props` in action:

@sourceref ./submit-button-and-props.tsx
@highlight 4, 9-10

In this example, `SubmitButtonProps` is an interface that defines the types for `label` (a string) and `onPress` (a function). Our `SubmitButton` component then uses these props to display a button with a label and a click action.

The example above illustrates how props are passed to component as an argument.

However, more commonly (and for the rest of this course) you will see props destructured in the function parameters:

@sourceref ./submit-button-and-props-destructured.tsx
@highlight 9

### Passing component props

Now, how do we use this `SubmitButton`? In JSX syntax a component’s props look like an HTML tag’s "attributes" and accept a value.

- If a prop’s value type is a string, then the prop value is set using quotes.
- Any other type of prop value is set using braces with the value inside.

In the example below, the `label` prop accepts a string. so the value is surrounded by double quotes. The `onPress` prop accepts a function, so the function value is surrounded by braces.

Here’s how to use our `SubmitButton`:

@sourceref ./submit-button-use.tsx

In the example above, we’re setting the `label` prop to the string “Activate” and the `onPress` prop to a function that displays an alert.

### Reserved prop names

There are two prop names that you cannot use and are reserved by React:

- `children`: this prop is automatically provided by React to every component. We will see this prop in later examples.

- `key`: this prop is one you’ve seen before in the [Introduction to JSX module](intro-to-jsx.html#the-key-prop)! It’s not actually part of the component’s props in a traditional sense. Instead, it’s used by React itself to manage lists of elements and identify which items have changed, been added, or been removed.

### Setup 2

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/01-solution/App.tsx ../../../exercises/react-native/06-custom-components/02-problem/App.tsx only

### Verify 2

✏️ Update **App.test.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/01-solution/App.test.tsx ../../../exercises/react-native/06-custom-components/02-problem/App.test.tsx only

### Exercise 2

- Update the `ListItemProps` type to enforce a `name` prop of the appropriate primitive type.
- Update the `ListItem` component to use the `ListItemProps` and returns the `<Text>` element.
- Update the `StateList` component to use the `ListItem` component to handle each state item.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/02-problem/App.tsx ../../../exercises/react-native/06-custom-components/02-solution/App.tsx only

</details>

## Objective 3: Organize code with the Modlet pattern

Our efforts to refactor have been going swimmingly; however, the `App.tsx` file is getting a bit crowded. It’s about time we take the time to organize our code, while doing so we’ll also introduce a useful pattern to follow.

### Modlets

Modlets are a folder/file structure that place a heavy emphasis on the idea of abstraction.

They are completely self contained; each modlet is basically its own application. It has everything it needs inside of it.

Each modlet is treated as a black box that can only be accessed through a single point: its index file.

Modlets follow these three rules:

1. Only import folders not specific files.
2. Do not reach “up” into parent directories or “sideways” into sibling directories to import things. Only “down” to child modlets, or to designated shared modlets in a parent.
3. Each modlet is a “black box” that controls what it exports through its index file. Anything exported in the index should be stable: Don’t change those api’s unless you have to!

These will make sense as we go along.

### Modlets example

We’re building a simple product page for an e-commerce site. It has three components:

- Product Details.
- Image Carousel.
- Add To Cart Button.

Without a plan of how to organize our files, we might end up with something like this:

<div class="directory-list">

- src/
  - ProductPage/
    - CartButton.tsx
    - CartButton.test.tsx
    - ImageCarousel.tsx
    - ImageCarousel.test.tsx
    - placeholderImage.png
    - ProductPage.tsx
    - ProductDetails.tsx
    - ProductDetails.test.ts

</div>

The same page, refactored into a modlet architecture would look like this:

<div class="directory-list">

- src/
  - ProductPage/
    - ProductPage.tsx
    - index.ts
    - components/
      - assets/
        - placeholderImage.png
      - ProductDetails/
        - index.ts
        - ProductDetails.tsx
        - ProductDetails.test.ts
      - ImageCarousel/
        - index.ts
        - ImageCarousel.tsx
        - ImageCarousel.test.ts
      - CartButton/
        - index.ts
        - CartButton.tsx
        - CartButton.test.ts

</div>

Compared to the former structure, the modlet structure is:

- Clearly organized.
- Location of relevant code is clear.
- Related functionality bundled in same folder.

#### Writing Modlet components

For more clarity, the `ProductDetails` component has a default export.

@sourceref ./ProductDetails-implementation.tsx

Then, we have the index file for this modlet. It re-exports the default from the key implementation file form that modlet, in this case `ProductDetails`.

@sourceref ./sample-index.ts

#### Importing Modlets

With the Modlet structure, the top-level component’s imports statements look as follows:

@sourceref ./modlet-usage.tsx

- Importing folders, not specific files.
- Modlet remains a black box.
- Every import is from a child of the top level modlet. Only reaching "down" for imports!

Notice that we don’t import specific files, but rather the modlet we want to use.

This allows the modlet to maintain control over what it exposes.

Also, every import is from a child of that top level modlet. We are only reaching down to grab imports!

### Setup 3

It’s best practice to create a new folder that will contain all of the related files for each component, including test files.

✏️ Create **src/** (folder)

✏️ Move **App.tsx** to **src/App.tsx**

✏️ Update **index.js** to be:

@diff ../../../exercises/react-native/06-custom-components/02-solution/index.js ../../../exercises/react-native/06-custom-components/03-problem/index.js only

✏️ Create **src/screens/StateList/** (folder)

✏️ Create **src/screens/StateList/StateList.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/StateList.tsx

✏️ Create **src/screens/StateList/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/index.ts

✏️ Create **src/screens/StateList/components/** (folder)

✏️ Create **src/screens/StateList/components/ListItem/** (folder)

✏️ Create **src/screens/StateList/components/ListItem/ListItem.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/ListItem.tsx

✏️ Create **src/screens/StateList/components/ListItem/index.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/index.ts

### Verify 3

✏️ Move **App.test.tsx** to **src/App.test.tsx** and update it to be:

@diff ../../../exercises/react-native/06-custom-components/02-solution/App.test.tsx ../../../exercises/react-native/06-custom-components/03-problem/src/App.test.tsx only

✏️ Create **src/screens/StateList/StateList.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/StateList.test.tsx

✏️ Create **src/screens/StateList/components/ListItem/ListItem.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/ListItem.test.tsx

### Exercise 3

- Move the `StateList` and `ListItem` component logic into the correct file.
- Make sure to properly update each `import` and to reference every component’s essential files.

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/03-problem/src/App.tsx ../../../exercises/react-native/06-custom-components/03-solution/src/App.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/06-custom-components/03-solution/src/screens/StateList/StateList.tsx only

✏️ Update **src/screens/StateList/components/ListItem/ListItem.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/ListItem.tsx ../../../exercises/react-native/06-custom-components/03-solution/src/screens/StateList/components/ListItem/ListItem.tsx only

</details>

## Next steps

Next we will learn about debugging by using [React Devtools](./debugging-devtools.html).
