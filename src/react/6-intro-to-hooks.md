@page learn-react/intro-to-hooks Hooks
@parent learn-react 6

@description Learn how to use React hooks to make functional components more powerful.

@body

## What are hooks?

* _Short answer:_ They let you use state and other React features with a function.
* _Long answer:_ They provide a new paradigm to approach stateful ideas in an otherwise stateless function.

Hooks are not just a new tool, they're a whole new toolbox!

**Most Popular Hooks**
* **useState:** Returns a stateful value, and a function to update it.
* **useEffect:** Accepts a function that contains imperative, possibly effectful code.
* **useContext:** Accepts a context object and returns the current context value for that context.

**Additional Hooks***

* **useRef:** Returns a mutable ref object that will persist for the full lifetime of the component.
* **useMemo:** Returns a memoized value.
* **useCallback:** Returns a memoized callback function. Special case of useMemo.
* **useReducer:** An alternative to useState. Returns the current state paired with a dispatch method.


They allow you to co-locate all logic relating to a specific feature. No more splitting it between multiple lifecycle methods or duplicating logic.

Simpler, cleaner, and more easily sharable. Creating _custom hooks_ is just a matter of moving your code to a new function.

Get the benefits of higher order components but with simple functions and without clogging up your React tree.




## Class Components 

With class components the relevant code is spread out over multiple places.

```jsx title="Class Component with Lifecycle Callbacks"
class Timer extends React.Component {
  state = {
    value: false,
  }

  componentWillMount() {
    this._timer = setTimeout(() =>
      this.setState({ value: true }), 2500)
  }

  componentWillUnmount() {
    this._timer = clearTimeout(this._timer)
  }

  render() {
    const { value } = this.state;

    return (
      <div>{value ? 'Done!' : 'Waiting...'}</div>
    )
  }
}
```

Multiple states make even more mess.

```jsx title="Class Component with Lifecycle Callbacks" subtitle="Multiple states make even more mess."
class Timer extends React.Component {
  state = {
    value1: false,
    value2: false,
  }

  componentWillMount() {
    this._timer1 = setTimeout(() =>
      this.setState({ value1: true }), 1500)
    this._timer2 = setTimeout(() =>
      this.setState({ value2: true }), 2500)
  }

  componentWillUnmount() {
    this._timer1 = clearTimeout(this._timer1)
    this._timer2 = clearTimeout(this._timer2)
  }

  render() {
    const { value1, value2 } = this.state;

    return (
      <>
        <div>{value1 ? 'Done!' : 'Waiting...'}</div>
        <div>{value2 ? 'Done!' : 'Waiting...'}</div>
      </>
    )
  }
}
```

## Functional Component with Hooks

```jsx title="Functional Component with Hooks"
function Timer(props) {
  const [ value, setValue ] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setValue(true), 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>{value ? 'Done!' : 'Waiting...'}</div>
  )
}
```

```jsx 1:11,14 title="Functional Component with Hooks" subtitle="easy to make reusable..."
function useTimer(delay) {
  const [ value, setValue ] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setValue(true), delay)

    return () => clearTimeout(timer)
  }, [])

  return value
}

function Timer(props) {
  const value = useTimer(2500)

  return (
    <div>{value ? 'Done!' : 'Waiting...'}</div>
  )
}
```

```jsx title="Functional Component with Hooks" subtitle="and to use again..."
function useTimer(delay) {
  const [ value, setValue ] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setValue(true), delay)

    return () => clearTimeout(timer)
  }, [])

  return value
}

function Timer(props) {
  const value1 = useTimer(1500)
  const value2 = useTimer(2500)

  return (
    <>
      <div>{value1 ? 'Done!' : 'Waiting...'}</div>
      <div>{value2 ? 'Done!' : 'Waiting...'}</div>
    </>
  )
}
```
