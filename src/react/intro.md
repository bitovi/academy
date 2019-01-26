@page react/intro Introduction to React
@parent react 1

@body

## Before you begin

### Who is this guide for?

* Know the basics of Javascript, including ES2016 (include brief review)
* Familiar with NPM (include brief review)
* Want to build amazing frontend apps!

## What is React

* a view framework
* an abstraction for the DOM (why?)

## What is React _Not_
* a comprehensive application framework
  * you *can* use it as one, but there are some additional libraries you should use for maximum effect
* What is it missing?
  * state management (not technically, but here's why)
  * model/api layer

## Create React App
* Why? What problem does it solve?
  * discuss build systems in general
* Philosophy
* Ejecting

## What is JSX
* How it differs from HTML
  * always close elements
  * a couple props different
* Do I have to? No, but you really should.

## The React Way
* "Everything is a Component"
* Progression from megalith to render components
* Suggested Pattern: Container Components and Presentational Components
  * https://medium.com/@learnreact/container-components-c0e67432e005

## Prop Types

### Simple types:

* string
* number
* bool
* function
* node

### Complex types:

* instanceOf
* objectOf
* arrayOf
* shape
* oneOf
* oneOfType
