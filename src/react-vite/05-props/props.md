@page learn-react-vite/props Passing Props
@parent learn-react-vite 5
@outline 3

@description Learn how to provide information to a component through props.

@body

## Overview

What are props?
Passing data back from a component to its parent using a functional prop
Standard prop `children`
standard prop `key`

## Objective 1

In this section we will:

- pass props to a component

### Key concepts

TODO

#### Concept 1

Since functional components are just a JavaScript function we can pass arguments
to them. React has defined an API for functional components: they accept an
optional argument of type `object` or `string` that is named "props".

Let's talk about when props is a string. This occurs when the content of a
component's tags is a string, i.e. there are no tags. This situation is similar
to the `<span>` tag which contains only text. Receiving a string as props is not
common.

TODO: example

The property names on the props object are defined by the developer for use by
the component. The values of the properties can be any type including functions
or other React components.

TODO: example

### Setup

✏️ Create **src/pages/RestaurantList/ListItem.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/ListItem.tsx

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

✏️ Create **src/pages/RestaurantList/ListItem.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/ListItem.test.tsx

### Exercise

Update the `FormSelect` to accept (label, value, onChange)

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/ListItem.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/ListItem.tsx ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/ListItem.tsx only

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

TODO

</details>

## Objective 2

In this section we will:

Standard prop `children`
standard prop `key`

### Key concepts

#### Concept 1

There is one exception to the naming of properties on the props object, React
defines one optional property named "children" that contains either a single
component or a collection of components. The children property is set to the
contents between a component's opening and closing tags. For example if a
component displayed a table it might accept a collection of row components as
children to display as rows in the table.

TODO: replace with real sample code

```jsx
<MyTable>
  <tr>
    <td>row data</td>
  </tr>
</MyTable>
```

In the example above the `MyTable` component would receive a props object where
`children` was set to the `tr` component. It's up to the MyTable component to
determine where those children are rendered for display as shown below.

TODO: replace with real sample code

```jsx
const MyTable: React.FC = ({ children }) => {
  return <table>{ children }</table>;
}
```

#### Concept 2

TODO: the `key` prop

### Setup

Add remaining `FormSelect` boilerplate props (help, disabled) - maybe this is already done...

### Verify

TODO

### Exercise

Add options as children in `RestaurantList`
Update `FormSelect` to render children

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

</details>

## Next steps

TODO