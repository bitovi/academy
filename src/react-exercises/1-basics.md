@page react-exercises/basics Basics
@parent react-exercises 1

@description Learn how to create simple React components and pass props.

@body

## Basics

You should have completed (Intro to JSX)[learn-react/intro-to-jsx.html] before attempting these problems.

## Question 1

Let's begin at the beginning. Create a React component that simply displays "Let's go!" inside a div.

## Question 2

Create a React component that is styled inline such that the background color is blue, and the component has height and width 100 px.

## Question 3

I've supplied you with css classes, "grey", "green" and "default". Create a React component which takes in a string prop representing a possible background color choice ("grey", "green", or "default"), and uses that to attach the proper class. If someone passes a string that isn't one of those options simply apply the "default" styling.

## What you've just done

While these may be simple to some they lock in the values that are necessary.

1. React components start with a capital letter
2. Inlined styles are camelcased versions of styling in HTML. When applying a class in React, use "className".
3. When applying classes to elements, make sure to use `className=` instead of `class=`

## Next Steps

✏️ Head over to the [next lesson](intro-to-jsx.html) to learn more about JSX.
