@page learn-react-native/react-context Using React Context
@parent learn-react-native 9
@outline 3

@description Learn how to share a common theme by creating a Context.

@body

## Overview

In this section, you will:

- Create a theme with shared values
- Understand the what, why, and how of React Context
- Create a design system to unify the application

## Objective 1: Create a theme with shared values

Now that we understand how to style our components, let’s style everything! However, this very quickly becomes a maintenance nightmare. We want to use the color `#007980` for most of our highlights, but occasionally use `#ca2f35`. What if we decide to change `#007980` to `#00a5ad`?

We need a shared theme. Not only will this allow us to keep things in sync and stop repeating ourselves, it will allow us to use common language to describe our colors and other parameters of our styling.

Before we get too far into our style system though, we need to talk about how we will share it. While we could put it in a module that we import any time we need it, this would make it difficult to make dynamic changes to our styles, like dark mode. Instead, we can use **React Context**.

### What is Context?

React Context is a feature in React that allows you to share data between components without having to explicitly pass props through every level of the component tree. It’s particularly useful for passing down global data, such as themes, user authentication, or language preferences, to components deep in the tree.

### How do you use Context?

Context consists of three parts:

1. Context: Think of the context as a box of things. The box needs to be available to all who want to use it.
2. Provider: The provider puts things into the box. Whatever data it handles is only available to its children.
3. Consumer: The consumer takes things out of the box. It can only access the providers above it in the component hierarchy.

#### Context

First we create a definition of what information will be stored, then we get the object that we'll use to store it. The `createContext` function also accepts a default value, to be provided whenever we access the context without a provider. In this case, we've decided to not specify a default value.

@sourceref ./context-basic.tsx
@highlight 14-20, only

#### Provider

The Provider is how we actually tell React to store our data. We can render the provider anywhere in our tree, and the data will be accessible anywhere inside. To keep things performant, we will usually want to memoize these values. (Don’t worry if `useState` looks odd. We'll be covering this shortly.)

@sourceref ./context-basic.tsx
@highlight 33-42, only

#### Consumer

We can `useContext` to access the data from our closest Provider.

@sourceref ./context-basic.tsx
@highlight 46, only

### Future-proofing your Context

This simple approach poses a few problems, however.

- We can’t store private information in the context.
- Every time the provider is used, the component must be careful to create the memoized (and potentially very complicated) value.
- If the structure of the data changes, you will have to update the code every place you used the provide and every place you used the consumer.

To help keep things clean in the future, it is best practice to keep this Context object contained within this file, to avoid exporting it, and instead to export custom wrappers around each piece.

#### Provider

We can create a custom `AuthProvider` that hides all the complicated logic from other components. Sometimes a custom provider will even take props (such as an access token), though this one doesn’t require any.

@sourceref ./context-full.tsx
@highlight 22-45, only

#### Consumer

Instead of calling `useContext` everywhere and needing to understand the structure of the context, we can provide custom hooks that return the specific parts of the context that we need. If we change the context structure, all we have to do is update these hooks to return the same data as before and no other code has to change.

@sourceref ./context-full.tsx
@highlight 49-59, only

### Setup 1

✏️ Create **src/design/theme/theme.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/theme.ts

✏️ Create **src/design/theme/ThemeProvider.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/ThemeProvider.tsx

✏️ Create **src/design/theme/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/index.ts

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/08-styling/01-solution/src/App.tsx ../../../exercises/react-native/09-react-context/01-problem/src/App.tsx only

✏️ Update **src/screens/StateList/components/ListItem/ListItem.tsx** to be:

@diff ../../../exercises/react-native/08-styling/01-solution/src/screens/StateList/components/ListItem/ListItem.tsx ../../../exercises/react-native/09-react-context/01-problem/src/screens/StateList/components/ListItem/ListItem.tsx only

### Verify 1

✏️ Create **src/design/theme/ThemeProvider.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/ThemeProvider.test.tsx

### Exercise 1

- Update `ThemeProvider` to provide data according to the provided `ThemeContext`.
- Update `ListItem` to use the values from our context.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/design/theme/ThemeProvider.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/ThemeProvider.tsx ../../../exercises/react-native/09-react-context/01-solution/src/design/theme/ThemeProvider.tsx only

✏️ Update **src/screens/StateList/components/ListItem/ListItem.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/01-problem/src/screens/StateList/components/ListItem/ListItem.tsx ../../../exercises/react-native/09-react-context/01-solution/src/screens/StateList/components/ListItem/ListItem.tsx only

</details>

## Objective 2: Begin creating a design system to unify your application

If we continue down this path, our entire codebase will become littered with `theme.typography.*`, `theme.palette.*`, etc. What if we decide to change the color pattern of one of our components? We'd have to update every place we used that pattern. Instead, we'll create a design system.

### What is a design system?

A design system is a collection of reusable components, guidelines, and principles that together help ensure consistency, efficiency, and scalability in designing and building digital products. It serves as a single source of truth for design and development teams, providing them with a set of predefined rules and assets to create cohesive user experiences across different platforms and devices.

### Organizing a design system

If you ask 3 designers and 3 developers how best to organize a design system, you'll get 9 different answers...

#### Atomic Design Methodology

The most prolific organization method is Atomic Design. If you want to learn more about design systems, [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/) is the perfect place to start.

#### But... let’s keep things simple

Atomic Design is a great system, but it can be overkill for many projects. For this project, we're going to keep things much more simple: We'll have the shared theme we created in the previous objective, and we'll create a small collection of exported components.

### Setup 2

✏️ Create **src/design/Box/Box.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Box/Box.tsx

✏️ Create **src/design/Box/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Box/index.ts

✏️ Create **src/design/Typography/Typography.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/Typography.tsx

✏️ Create **src/design/Typography/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/index.ts

### Verify 2

✏️ Create **src/design/Box/Box.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Box/Box.test.tsx

✏️ Create **src/design/Typography/Typography.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/Typography.test.tsx

### Exercise 2

We've provided a basic `Box` component for you; because of the flexibility of the margin, padding, etc, a component like this can get complicated very quickly.

- Your first task is to finish the `Typography` component using the same patterns.
- Your second task is to update `StateList` to use `Box` and `Typography` instead of `View` and `Text`.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/design/Typography/Typography.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/Typography.tsx ../../../exercises/react-native/09-react-context/02-solution/src/design/Typography/Typography.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/02-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/09-react-context/02-solution/src/screens/StateList/StateList.tsx only

</details>

## Objective 3: Expand your design system

Now that we have the basics of a design system, we can expand it however we need. There are some basic components that most design systems will need:

1. Page/Screen/etc. A main view of the app, which will often have a prop like `title`.
2. Form components like TextInput, Select, Button. Almost every app will need forms of some kind.
3. Typography. The basic text component, to make it easier to standardize text size and color.
4. Grid. Most apps will need to control placement of elements on the screen.
5. Card. While this is a specific design pattern, it has become very ubiquitous lately.

Beyond these, you'll find all kinds of UI components like Tabs, Modal, Icon, Navigation, Badge, Progress, etc.

### Setup 3

✏️ Create **src/design/Button/Button.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Button/Button.tsx

✏️ Create **src/design/Button/Button.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Button/Button.test.tsx

✏️ Create **src/design/Button/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Button/index.ts

✏️ Create **src/design/Card/Card.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Card/Card.tsx

✏️ Create **src/design/Card/Card.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Card/Card.test.tsx

✏️ Create **src/design/Card/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Card/index.ts

✏️ Create **src/design/Screen/Screen.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Screen/Screen.tsx

✏️ Create **src/design/Screen/Screen.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Screen/Screen.test.tsx

✏️ Create **src/design/Screen/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Screen/index.ts

### Exercise 3

We've provided three new design components for you: `Button`, `Card`, and `Screen`.

- Update `StateList` to use our new `Screen` and `Card` components. (We'll use `Button` later.)

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/03-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/09-react-context/03-solution/src/screens/StateList/StateList.tsx only

</details>

## Next steps

Next, let’s learn about how we can add dark mode with [learn-react-native/managing-state useState].
