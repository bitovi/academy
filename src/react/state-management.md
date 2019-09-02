@page learn-react/state-management State Management
@parent learn-react 2

@description Learn several different react  state management techniques and when to use them.

@body

React has several approaches to state management:

- **Simple Apps**: hooks in the component
- **Medium Apps**: hook / provider pairs in a separate file
- **Advanced Apps**: a distinct state management library

## Managing state via hooks directly in the component

The simplest solution for state management is the `useState` hook. This allows you to create and manage state directly in your component, without needing to worry about external files or predefined data structures. In some cases, it may be helpful to upgrade this to a `useReducer`, though this may be a sign that you should be using a more complex state management option.

> If this does not look familiar, we recommend you checkout our [learn-react/overview/hooks] guide.

```jsx
function Hello() {
  const [ count, setCount ] = useState(0);

  return (
    <button onClick={() => setCount(1)}>{count}</button>
  );
}
```

## Custom Hooks and Hook / Provider Pairs

### Simple Hooks

The next step up, and what most applications should probably use, is custom hooks with provider pairs. (This pairs very well with the Models option in our [learn-react/data-modeling] guide.) The code itself is very similar the simple solution, but it should be placed in a custom hook in a separate file rather than directly in the component. The primary impetus for doing this is due to the complexity of the logic.

```jsx
function useValue() {
  const [ key, setKey ] = useState();
  const [ value, setValue ] = useState();

  useEffect(() => {
    fetch(`/value/${key}`).then(setValue);
  }, [ key ]);

  return [ { key, value }, setKey ];
}
```

### Adding a Provider

The above hook will create a new instance of your data for each component that uses the hook. Often times, however, you will want to expose the same data to a variety of places in your application. This can be accomplished via `createContext` and `useContext`.

When using a context, we usually recommend using a custom provider and hook, rather than using `Context.Provider` calling `useContext` directly in your component. This keeps your implementation details confined to the file, so that if you need to change anything about the data structure, you only need to update the hook rather than every place it is utilized.

```jsx
const Context = React.createContext();

export default function DataProvider({ children }) {
  const [ data, setData ] = useState({ count: 0 });

  return (
    <Context.Provider value={{ ...data, setData }}>{children}</Context.Provider>
  );
}

export function useCount() {
  const { count, setData } = useContext(Context);

  const increment = () => setData(({ count, ...rest }) => ({ ...rest, count: count + 1 }));
  const decrement = () => setData(({ count, ...rest }) => ({ ...rest, count: count - 1 }));

  return {
    count,
    increment,
    decrement,
  };
}
```

### Taking Advantage of the Benefits

Since you have already isolated your state management logic to an independent file, you can afford to add some extras to it without worrying about over-complicating your component. The primary gain there is via the use of `useMemo` and `useCallback`. These allow you to create methods and data with stable identities, preventing extra renders. The specific details of their usage is also covered in our [learn-react/overview/hooks] guide.

Since You have a custom provider component, it also allows you to add custom logic to your data initialization, such as specifying an initial value or fetching it from a server.

```jsx
import React, { useCallback, useContext, useMemo, useState } from 'react';

const Context = React.createContext();

export default function DataProvider({ initialCount, children }) {
  const [ data, setData ] = useState({ count: initialCount });

  // a shorthand for merging new data with old data
  const updateData = useCallback((data) =>
    setData((current) => {
      // this allows us to create identity-stable functions later, mimicking `setData`
      if (typeof data === 'function') {
        data = data(current);
      }

      return { ...current, ...data };
    }), []);

  // combine data with functions that can be used to set/update the data
  // note that setData and updateData have stable identities
  const state = useMemo(() => ({ ...data, setData, updateData }), [ data ]);

  return (
    <Context.Provider value={state}>{children}</Context.Provider>
  );
}

function useDataContext() {
  const context = useContext(Context);
  if (!context) {
    throw Error('DataProvider hooks may only be used inside a <DataProvider />');
  }

  return context;
}

export function useCount() {
  const { count, updateData } = useDataContext();

  // identity-stable increment and decrement functions
  const increment = useCallback(() =>
    updateData(({ count }) => ({ count: count + 1 })), [ updateData ]);
  const decrement = useCallback(() =>
    updateData(({ count }) => ({ count: count - 1 })), [ updateData ]);

  return {
    count,
    increment,
    decrement,
  };
}
```

## Redux and Other Libraries

Sometimes your project has special considerations: Perhaps you have a particularly large team or rapidly changing codebase and want to enforce an extremely strict model. Perhaps your team is coming from or porting code from another framework and you would like to stick with a familiar data structure.

These are the perfect opportunities to use an external state management library. The main player this field in Redux. The usage details of Redux are outside the bounds of this guide, but we recommend their [Quick Start Guide](https://react-redux.js.org/introduction/quick-start) for further reading.
