@page learn-react/intro-to-react Introduction to React
@parent learn-react 1
@outline 3

@description Discover why React is a great choice for modern web application development.

@body

## Overview

React first appeared in 2013 with "components" as the basic building block for
constructing a user interface. Initially, components were created using
JavaScript classes, which implemented an interface that defined lifecycle
methods. One of React's notable characteristics has existed from the very
beginning: the use of [JSX syntax](intro-to-jsx.html) to define the structure of
a component.

## Key React Concepts

### Declarative Syntax

Through JSX, React "declares" how a UI looks based on the current state. This is
different from typical web application development where a UI is constructed
using imperative methods such as creating an element setting properties and then
attaching it to the DOM.

### Unidirectional data flow

Data in a React based application flows one way: into a component through
`props` or state then the user interface is rendered, user interactions cause
changes to state, changes to state cause props to be updated and passed to the
component again - restarting the cycle.

### Virtual DOM

React's Virtual DOM allows React to quickly determine when the user interface
needs to be updated; since updates to the browser's DOM are time-consuming only
making them when necessary is critical to React's rendering performance. When
the state provided to a React component changes the React framework will invoke
the component (or the render method of a class component) and compare the result
to the Virtual DOM. If the results are **the same** no action is taken, if the
results are **different** the browser's DOM is updated to reflect the new
Virtual DOM state.

### Functional components and Hooks

A major change occurred in 2019 with the introduction of functional components
and Hooks. A component can now be defined using a single function, the component
can manage its internal data and functionality through the use of
[hooks](stateful-hooks.html), which are functions that provide data to a
component or cause the component to render.

### Server and Client rendering

Since version 18 was released, the React team has responded to requests for
server-side rendering with [React Server
Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components).
In this new mode, components default to rendering on the server, improving
initial browser display performance. Any components that can not render on the
server or have been explicitly marked as requiring client-side rendering are
rendered on the client.

## Next steps

TODO
