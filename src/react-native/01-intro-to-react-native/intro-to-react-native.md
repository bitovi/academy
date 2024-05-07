@page learn-react-native/intro-to-react-native Introduction to React Native
@parent learn-react-native 1
@outline 3

@description Discover why React Native is a great choice for modern mobile application development.

@body

## What is React Native?

React Native is an open-source framework that allows you to build cross-platform mobile, desktop, and web applications using React, a JavaScript-based UI library.
By leveraging JavaScript and React’s component-based architecture, React Native enables the development of applications that run on many platforms from a single codebase.
While this course focuses on mobile development, the concepts apply across these different environments.

## Cross-platform apps

One of the key features of React Native is its ability to run on both Android and iOS platforms with a single codebase.
You can write the source code once and compile it into native apps that run smoothly on both operating systems.
This significantly reduces the development time and effort compared to writing separate codebases for each platform.

While React Native’s core development team focuses on Android and iOS, other partner companies provide support for macOS, Windows, and more.

### React is the UI Library

React Native leverages React, which is a popular JavaScript library developed by Facebook for building user interfaces.
React’s main strength is its [component-based architecture](./building-custom-components.html), which allows you to build encapsulated components that manage their state, then compose them to make complex UIs.
In React Native, these components translate not to DOM elements, but to native mobile components, allowing for the creation of rich mobile UIs using declarative React principles.

### Written in JavaScript

React Native uses JavaScript, one of the most widely used programming languages in the world.
This choice opens mobile development to web developers who are already familiar with JavaScript and its ecosystem.
JavaScript’s flexibility and the vast amount of resources and libraries available make it a prime choice for cross-platform mobile development.

### A bridge to native views

React Native operates by using a JavaScript runtime to interpret JavaScript code, which then communicates with native platform components via a bridge.
This bridge is responsible for sending messages between the native code and the JavaScript environment.
This setup allows you to write in JavaScript while still having their applications render with native platform widgets, thus providing a native user experience.

## Why use React Native?

### Versatility across platforms

React Native dramatically reduces complexity and redundancy by enabling you to maintain a single codebase for both Android and iOS applications.
This not only simplifies the development process but also minimizes the scope for bugs, as the same code is used across platforms, making maintenance and updates easier.

### Master one language (JavaScript)

By using JavaScript, teams can concentrate on mastering one language across their development efforts, encompassing both mobile and web applications.
This streamlined approach eliminates the need to switch contexts or learn multiple programming languages, thereby improving productivity and collaboration within development teams.

### Reuse JavaScript across mobile, web, and more

JavaScript code written for React Native apps can often be reused for web applications, particularly when using React.
This reuse enhances consistency across platforms and can significantly speed up development cycles, as components and business logic can be shared between mobile apps and web pages.

### Performant native views

Unlike other hybrid frameworks that render code inside a webview, React Native uses real native components.
This means that apps built with React Native are indistinguishable from those built using native SDKs in terms of performance and look and feel.
The use of native components ensures that the user experience is as smooth as that of native apps, with access to the full capabilities of the underlying platform.

### A mature declarative UI framework

React Native has been around since 2015 and has matured significantly, with a robust ecosystem and a large community.
In contrast, Jetpack Compose and SwiftUI, which are newer native declarative frameworks for Android and iOS respectively, are still evolving.
The maturity of React Native means it comes with extensive libraries, tools, and community support, which can accelerate development and offer solutions to a wide range of problems.
This maturity also brings reliability and stability to development projects, making React Native a safer choice for businesses.

## Next steps

Next, let’s [set up your system](./setting-up-your-environment.html) to develop and run a React Native app.
