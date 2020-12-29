@page learn-react Learn React
@parent bit-academy 5

@description Learn React by building a feature-rich Tic-Tac-Toe game in this beginner React guide. This hands-on course will introduce both fundamental and more advanced React concepts! By the end of this course, you will have mastered functional components, hooks, and component optimization.

@body

## Before You Begin

Before beginning this tutorial, you will want to have some familiarity with HTML and [JavaScript](https://www.bitovi.com/academy/learn-advanced-javascript.html). Specifically, you will need to understand [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), and [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Additionally, you should be familiar with some of the more recent [ECMAScript](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f) features, such as [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) and the [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters). It is also beneficial to have some familiarity with [NPM](https://docs.npmjs.com/about-npm/), though it is not strictly necessary to begin.

## What is React?

In a nutshell, React is a [front-end](https://www.coursereport.com/blog/front-end-development-vs-back-end-development-where-to-start) JavaScript library which makes it very easy to build scalable apps.

While it's most commonly used for building web apps, React can also be used to create mobile & desktop apps through [React Native](https://reactnative.dev/) and [Electron](https://www.electronjs.org/). Although this course will not explicitly cover them, the theory contained here will still fully apply to other environments.

React's goal is to enable developers to break down the view layer of their apps into small, reusable chunks called [components](https://reactjs.org/docs/components-and-props.html). These components are rendered as plain HTML and tracked in memory as [Virtual DOM](https://reactjs.org/docs/faq-internals.html) objects. As data or _state_ in the application changes, the underlying Virtual DOM is updated and we see the coresponding markup change. This makes React very efficent at making updates as only components that have changed will be rendered again.

One of the best things about React is that it can be used in any website, even one that is already built with another framework. This makes it easy to convert an existing project to React, or just use it for one part of a site.

## Course Outline

This guide begins by walking you through how to [set up an environment](learn-react/setting-up-your-environment.html), providing an introduction into [JSX](learn-react/intro-to-jsx.html) (JavaScript flavor of XML) and some basic [react theory](learn-react/components.html).

Once you're all setup and oriented into the framework, you'll learn how to build reusable web components using [props](learn-react/props.html), and you will discover the difference between [controlled & uncontrolled](learn-react/controlled-vs-uncontrolled.html) components. You'll also learn the various ways of doing [styling](learn-react/styling-in-react.html), and how CSS can be integrated into JSX.

The second half of the guide will cover more intermediate topics like state management using [hooks](learn-react/managing-complex-state.html) and making components as [optimized](learn-react/optimization-hooks.html) as possible.

Throughout this guide, we'll be building out a simple Tic-Tac-Toe game, gradually applying all of these concepts to produce a clean and optimized solution!

## Next Steps

✏️ Head over to the [first lesson](learn-react/setting-up-your-environment.html) and get your environment setup.
