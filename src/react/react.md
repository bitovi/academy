@page learn-react Learn React by Building a Tic-Tac-Toe Game
@parent bit-academy 5

@description This hands-on course will introduce both fundamental and advanced React concepts, all while building out a feature-rich Tic-Tac-Toe game! By the end of this course, you will master Hooks, Unit Testing, Optimization and Routing.

@body

## Before You Begin

Before beginning this tutorial, you will want to have some familiarity with HTML and [JavaScript](https://www.bitovi.com/academy/learn-advanced-javascript.html). Specifically, you will need to understand [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), and [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Additionally, you should be familiar with some of the more recent [ECMAScript](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f) features, such as [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). It is also beneficial to have some familiarity with [NPM](https://docs.npmjs.com/about-npm/), though it is not strictly necessary to begin.

✏️ You'll also want to fork/clone down a copy of the exercise repository used in this course, a Tic-Tac-Toe game:

- [https://github.com/bitovi/react-exercises]()

This is the codebase you'll be using throughout the series of the lessons to improve your React skills.

```bash
git clone https://github.com/bitovi/react-exercises
cd react-exercises
npm install
```

## What is React?

In a nutshell, React is a [front-end](https://www.coursereport.com/blog/front-end-development-vs-back-end-development-where-to-start) JavaScript library which makes it very easy to build scalable apps.

While it's most commonly used for building web apps, React can also be used to create mobile & desktop apps through [React Native](https://reactnative.dev/) and [Electron](https://www.electronjs.org/). Although this course will not explicitly cover them, the theory contained herein will still fully apply to other environments.

React's goal is to enable developers to break down the view layer of their apps into small, reusable chunks called [components](https://reactjs.org/docs/components-and-props.html). In turn, the components are rendered as plain HTML and will automatically update whenever the data in your app changes. We refer to the data driving the application as _state_.

One of the best things about React is that it can be used in any website, even one that is already built with another framework. This makes it easy to convert an existing project to React, or just use it for one part of a site.

## Course Outline

This guide begins with by walking you through how to [set up an environment](/learn-react/setting-up-environment.html), providing an introduction into [JSX](/learn-react/intro-to-jsx.html) (JavaScript flavour of XML) and some basic [react theory](/learn-react/react-theory.html).

Once you're all setup and orientated into the framework, you'll learn how to build re-usable web components using [props](/learn-react/props.html), and discover the difference between [controlled & uncontrolled](/learn-react/controlled-vs-uncontrolled-components.html) components. You'll also learn the various ways of doing [styling](/learn-react/styling-in-react.html), and how CSS can be integrated into JSX.

The second half of the guide will cover more intermediate topics like state management using [hooks](/learn-react/intro-to-hooks.html) and making components as [optimized](/learn-react/optimization-hooks.html) as possible.

All throughout, we'll be building out a simple Tic-Tac-Toe game, gradually applying all of these concepts to produce a clean and optimized solution!

## Next Steps

✏️ Head over to the [first lesson](/learn-react/setting-up-environment.html) and get your environment setup.
