@page learn-react/intro-to-hooks Class components vs hooks
@parent learn-react 7

@description Learn how to use React hooks to make functional components more powerful.

@body

## What are hooks?

- _Short answer:_ They let you use state and other React features with a function.
- _Long answer:_ They provide a new paradigm to approach stateful ideas in an otherwise stateless function.

Hooks are not just a new tool, they're a whole new toolbox!

With the release of version 16, hooks were added to the React API. Now, developers can use state and respond to lifecycle events, all from functional components.

Many developers find this to be a huge improvement over using class components because hooks tend to be a lot cleaner, more discrete and ultimately more scalable.

Each hook exposed by the React API does something different, but there are a few which are used more than others. It's also important to keep in mind that it's possible to create your own custom hooks. This is why hooks are seen not just as an API improvement but a paradigm shift.

The "Hooks" way of doing things is slowly becoming adopted not just by React but by 3rd party component libraries as well.

**Most Common Hooks**

- **useState:** Returns a stateful value, and a function to update it.
- **useEffect:** Accepts a function that contains imperative, possibly effect-ful code.
- **useContext:** Accepts a context object and returns the current context value for that context.

**Additional Hooks\***

- **useRef:** Returns a mutable ref object that will persist for the full lifetime of the component.
- **useMemo:** Returns a memoized value.
- **useCallback:** Returns a memoized callback function. Special case of useMemo.
- **useReducer:** An alternative to useState. Returns the current state paired with a dispatch method.

Hooks allow you to colocate all logic relating to a specific feature. No more splitting it between multiple lifecycle methods or duplicating logic.

You also get the benefits of higher order components but with simple functions and without clogging up your component tree.

So let's take a look at some basic hooks and start to get a feel for this new paradigm.

## Class Components

To understand hooks, it will be useful to see what they're replacing in class components.

With class components the relevant code to manage everything is spread out over multiple places (lifecycle methods).

```jsx
class Timer extends React.Component {
  state = {
    value: false,
  };

  componentWillMount() {
    this._timer = setTimeout(() => this.setState({ value: true }), 2500);
  }

  componentWillUnmount() {
    this._timer = clearTimeout(this._timer);
  }

  render() {
    const { value } = this.state;

    return <div>{value ? 'Done!' : 'Waiting...'}</div>;
  }
}

ReactDOM.render(<Timer />, document.getElementById('root'));
```

@codepen react

In the example above we're implementing a `Timer` component which starts a timer when the component mounts. When the timer finishes the state is modified causing the component to re-render. Finally when the component un-mounts the time is cleared.

This implementation needs 3 functions and a state object, roughly 15 lines of code. Keep in mind also that we're only keeping track of 1 piece of state here.

Multiple state values make this even messier.

```jsx
class Timer extends React.Component {
  state = {
    value1: false,
    value2: false,
  };

  componentWillMount() {
    this._timer1 = setTimeout(() => this.setState({ value1: true }), 1500);
    this._timer2 = setTimeout(() => this.setState({ value2: true }), 2500);
  }

  componentWillUnmount() {
    this._timer1 = clearTimeout(this._timer1);
    this._timer2 = clearTimeout(this._timer2);
  }

  render() {
    const { value1, value2 } = this.state;

    return (
      <>
        <div>{value1 ? 'Done!' : 'Waiting...'}</div>
        <div>{value2 ? 'Done!' : 'Waiting...'}</div>
      </>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById('root'));
```

@codepen react

When we add the second timer value above, we double our lines of code.

Let's see how this would look with hooks...

## Functional Component with Hooks

Here's that same timer written using the `useState` and `useEffect` hooks:

```jsx
function Timer() {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return <div>{value ? 'Done!' : 'Waiting...'}</div>;
}

ReactDOM.render(<Timer />, document.getElementById('root'));
```

@codepen react

`useState` can define a single piece of state with both the state value and a function for updating the value. Instead of the component's state being stored in one monolith object, it's broken out into discrete, well named units.

In addition, instead of needing to define two lifecycle methods (`componentWillMount`, `componentWillUnmount`) we can utilize the `useEffect` hook which is able to simulate both in a single go.

This combination of `useState` and `useEffect` gives you the ability to manage state and respond to lifecycle events all from a functional component. And as you can see, it cuts down on the amount of boilerplate code we need to write.

### Custom Hooks

As was mentioned before however, hooks are not just a feature but a paradigm shift in the way we write and re-use React code.

We could take that timer component from the previous section and encapsulate it's logic (minus the JSX) into a custom hook.

```jsx
function useTimer(delay) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(true), delay);

    return () => clearTimeout(timer);
  }, []);

  return value;
}

function Timer() {
  const value = useTimer(2500);

  return <div>{value ? 'Done!' : 'Waiting...'}</div>;
}

ReactDOM.render(<Timer />, document.getElementById('root'));
```

@codepen react

Now, our `useTimer` hooks returns a value which, when modified will cause the `Timer` component to re-render. We've abstracted away the logic of updating the `value` into the `useValue` hook.
