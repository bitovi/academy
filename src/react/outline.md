@page react/outline React Content Outline
@parent react 1

@body

## Intro

* Before you begin
  * Who is this guide for?
    * Know the basics of Javascript, including ES2016 (include brief review)
    * Familiar with NPM (include brief review)
    * Want to build amazing frontend apps!
* Create React App
  * Why? What problem does it solve?
    * discuss build systems in general
  * Philosophy
  * Ejecting
* What is React
  * a view framework
  * an abstraction for the DOM (why?)
* What is React **Not**
  * a comprehensive application framework
    * you *can* use it as one, but there are some additional libraries you should use for maximum effect
  * What is it missing?
    * state management (not technically, but here's why)
    * model/api layer
* What is JSX
  * How it differs from HTML
    * always close elements
    * a couple props different
  * Do I have to? No, but you really should.
* The React Way
  * "Everything is a Component"
  * Progression from megalith to render components
* Prop Types
  * Simple types: `string`, `number`, `bool`, `function`, `node`
  * Complex types: `instanceOf`, `objectOf`, `arrayOf`, `shape`, `oneOf`, `oneOfType`
* Rendering in React
  * the `ref` prop
  * the `key` prop

## Styling

* Inline Styles
* External CSS (or Sass/Less)
  * IE: don't do anything differently
* CSS Modules
  * IE: barely do anything differently
* Styled Components

## State Management

* What is State Management?
* Why is it needed?
* The Problem: Contact Form
* Solving with setState
* Solving with Redux
* Solving with MobX
* Solving with Ylem

## Advanced Topics

* Context
  * The Problem - Prop Drilling
  * The Solution
* Portals
  * The Problem - Rendering Content Elsewhere
  * The Solution
* Error Boundaries
  * The Problem - Catching Render Errors
  * The Solution
