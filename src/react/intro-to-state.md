## How does React work?

React is all about components. In fact the whole point of the library is to help developers easily create reusable components.

But what is a component?

In a nutshell, a component is function which takes in props and returns an element.

- **Values** - The values of a component are all of the values the component is keeping track of. They include _component state_, which are the values the component controls itself, and _props_, which are supplied to the component.
- **Side Effects** - The side effects of a component are the results of the operations which touch things outside of the component. This includes async operations, registering DOM event-handling and interaction with the browser. An easy way of knowing if something is a side-effect, try to think if it would work without accessing anything except the **values**.

Often times the values and the side effects of a component are used together. Let's take a simple counter component to explain:

```jsx
function Counter() {
  // a piece of state called `clickCount` is initialized to 0
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setClickCount(clickCount + 1)}>+1</button>
      Clicked {clickCount} times
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```
@highlight 5,9-10,only
@codepen react

We'll cover more of the specifics about how this works later on, but for now let's just go over what's happening at a high level.

The `Counter` component has a button which, when clicked, will increment a count value and display it to the user. This means that the user will always know how many times they've clicked the button.

The number of times the button has been clicked is a piece of component state. In other words, it is one of the **values** the component keeps track of. The `clickCount` value is independent of any other instance of the Counter.

What happens when the button gets clicked is part of the **side effects** of our component. In this case, when the **+1** button gets clicked we update the `clickCount` state, adding 1 to it (`setClickCount(clickCount + 1)`).

This pattern is very common in React components. We have a value (`clickCount`) which gets updated in response to some event.

Whenever the state gets updated, because that state is being rendered out in the JSX, the component needs to get updated on the browser, the component's HTML needs to get re-rendered.

React will handle the process of re-rendering and updating the component in the background, but it's our job as developers to specify the values and side effects so React knows _when_ the component should be updated.
