@page learn-react-vite/styling-in-react Styling in React
@parent learn-react-vite 7
@outline 3

@description TODO

@body

## Overview

There is no prescribed approach for styling React apps. The community has built several styling options. We will be using CSS Modules as it is one of the most popular styling libraries and is very approachable for anyone that is used to styling in plain CSS.

## Objective 1: Applying style with CSS Modules

In this section we will:

- Setup CSS Modules
- Create a component-specific stylesheet
- Apply styles to a component

### Installing CSS Modules

Already done. Vite, our build tool, ships with first-class CSS Modules support. Vite also supports a few [other styling options](https://vitejs.dev/guide/features#css) to of the box.

### Scoped stylesheet

CSS classes are global; there is not a feature to scope a class to a specific component other than by using unique names. If two React components implement a `.wrapper` class, those styles will merge and create styling conflicts.

CSS Modules works like regular CSS or Sass, but the class names are randomized to prevent conflicts between components. When using CSS Modules, if multiple components implement a `.wrapper` class those classes will be unique and conflict-free because CSS Modules will rename each class with a unique random string like `.wrapper_R8f2`. 

```CSS
/* CSS Modules will randomize this class name, preventing style conflicts */
.wrapper {
  display: flex;
}
```

The standard procedure with CSS Modules is to create a stylesheet for each component. That stylesheet is placed in the same folder as the component. In order to identify the file as a CSS Module, the filename should end with `.module.css` or `.module.scss`. The file structure for a Button component will look like the following:

- Button
  - Button.tsx
  - Button.module.css
  - Button.test.tsx
  - index.ts

Note that CSS Modules cannot rename HTML tags, so all of your styling should use classes to avoid unexpected styling bugs. The following will apply to all `div` elements in the project and should be avoided.

```CSS
/* Don't do this with CSS Modules as tag names can not be randomized */
div { 
  display: flex;
}
```

### Importing and applying styles

During the build process, the CSS classes will be randomized and added to a global stylesheet. The randomized class names are imported into components as an object where the key is the original class and the value is the new, randomized string. 

```js
{ wrapper: "wrapper_R8f2" }
```

In order to add the `.wrapper` class to a button components, import the CSS Modules styling object and apply the class using the original class name as the key. Note the HTML "class" attribute is renamed to "className" in JSX because "class" is a reserved word in JavaScript.

```tsx
import styles from './Button.module.css`

const Button: FC<ComponentPropsWithoutRef<"button">> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <button {...props} />
    </div>
  )
}
```

### Exercise 1

Now that we've learned to apply styling in React with CSS Modules, it's time to practice by styling a link in the Home component. You'll bring in a `Link` component from React Router. 

#### Setup

We've created some CSS for this exercise. Create a CSS Modules file and copy the following styles into it.

✏️ Create **src/pages/Home/Home.module.css** and update it to be:

@sourceref ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/Home/Home.module.css


#### Verify

✏️ Create **src/pages/Home/Home.test.tsx** and update it to be:

@diff ../../../exercises/react-vite/06-routing/02-solution/src/pages/Home/Home.test.tsx ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/Home/Home.test.tsx only

#### Exercise

In the `Home` component, `import { Link } from "react-router-dom"` and add the following near the end of the JSX:

```jsx
<p>
  <Link to="/restaurants">
    Choose a Restaurant
  </Link>
</p>
```

Use what you've learned to import styles and apply the `chooseButton` class to the `Link`.

#### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/Home.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/02-solution/src/pages/Home/Home.tsx ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/Home/Home.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/07-styling-in-react/01-solution?file=src/pages/Home/Home.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/07-styling-in-react/01-solution?file=src/pages/Home/Home.tsx).

</details>

## Next steps

In the next section, we'll learn to manage state.