@page learn-react Learn React by Building a Tic-Tac-Toe Game
@parent bit-academy 5

@description This hands-on course will introduce both fundamental and advanced React concepts, all while building out a feature-rich Tic-Tac-Toe game! By the end of this course, you will master Hooks, Unit Testing, Optimization and Routing.

@body

## Before You Begin

Before beginning this tutorial, you will want to have some familiarity with HTML and [JavaScript](https://www.bitovi.com/academy/learn-advanced-javascript.html). Specifically, you will need to understand [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), and [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Additionally, you should be familiar with some of the more recent [ECMAScript](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f) features, like [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). It is also good to have some familiarity with [NPM](https://docs.npmjs.com/about-npm/), though it is not strictly necessary to begin.

✏️ You'll also want to fork/clone down a copy of the exercise repository used in this course, a tic-tac-toe game:

- [https://github.com/bitovi/react-exercises]()

This is the codebase you'll be using throughout a number of the lessons to improve your React skills.

```bash
git clone https://github.com/bitovi/react-exercises
cd react-exercises
npm install
```

## What is React?

In a nutshell, React is a [frontend](https://www.coursereport.com/blog/front-end-development-vs-back-end-development-where-to-start) JavaScript library which makes it very easy to build scalable apps.

While it's most commonly used for building web apps, React can also be used to create mobile & desktop apps (this requires additional libraries).

React is concerned with allowing developers to break the view layer of their apps into small, reusable chunks called [components](https://reactjs.org/docs/components-and-props.html). These components can be rendered by React onto the browser and will automatically update whenever the data in your app changes (we call this data state).

One of the best things about React is that it can be used in any website, even one that is already built with another framework. This makes it easy to convert an existing app to React, or just use React for one part of a site.

## Course Outline

This guide begins with by walking you through how to [set up an environment](/learn-react/setting-up-environment.html) and providing an introduction into [JSX](/learn-react/intro-to-jsx.html) (JavaScript XML) and some basic [react theory](/learn-react/react-theory.html).

Once you're all setup and orientated into the framework, you'll learn how to build re-usable web components using [props](http://localhost:8080/learn-react/props.html), and discover the difference between [controlled & uncontrolled](/learn-react/controlled-vs-uncontrolled-components.html) components. You'll also learn the various ways of doing [styling](/learn-react/styling-in-react.html), and how CSS can be integrated into JSX.

The second half of the guide will cover more intermediate topics like state management using [hooks](/learn-react/intro-to-hooks.html) and making components as [optimized](/learn-react/optimization-hooks.html) as possible. 

All throughout, we'll be building out a simple tic-tac-toe game, slowly integrating all of these concepts to make it as re-usable, clean and optimized as possible! 

## Next Steps

✏️ Head over to the [first lesson](/learn-react/setting-up-environment.html) and get your environment setup.
