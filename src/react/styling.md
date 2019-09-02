@page learn-react/styling Styling
@parent learn-react 5

@description Learn several methods for styling your React application.

@body

Like most of this guide, we will discuss the three primary methods to style your React application. Unlike most of this guide, these are not categorized as by simple/medium/advanced, but rather are just three different methods; you should use the one that is best for your team and project.

* **Global CSS**: In other words, the same way you style a non-javascript side.
* **CSS Modules**: Similar to the above, but with sandboxed css.
* *CSS in JS**: Define your CSS in Javascript files.

## Global CSS

You can just create your CSS entirely separate from your React application and put the link tag in your HTML. Most build system (include create-react-app) also allow you to keep the CSS files in your application tree and `import` them in the code. This method is particularly useful if you are porting an existing application to React, as you can leave you styling system as-is.

You are also free too use any number of CSS preprocessors, such as [Sass](https://sass-lang.com) (which s included with create-react-app just by using the `.scss` extension on your files).

_Note_: This method does not fit well within [learn-react/guidelines#fractal-architecture Fractal Architecture], and will most likely require that you adopt a CSS methodology, such as [BEM](http://getbem.com/introduction/).

```css
/* styles.css */
.title {
  text-align: center;
}
```

```jsx
function App() {
  return (
    <div className="app">
      <h1 className="title">React Application</h1>
    </div>
  );
}
```

## CSS Modules

The CSS Modules approach is very similar to the Global CSS approach, except that each component gets its own CSS file and every CSS file is interpreted independently of the rest. In create-react-app (and many other build system), you activate this functionality with the extension `.module.css` (or `.module.scss` if you prefer).

_What this means_: Because each file is interpreted independently, if you reference the selector `.title` in three different CSS modules, they will each refer to different things.

_How this works_: In order to distinguish between different references with the same name, those class names (and all other identifiers) need to be changed. Rather than just importing the file, as you do with global CSS, the file exports an object which maps the original class to the new class.

jsx```
/* styles.module.css */
.title {
  text-align: center;
}
```

```jsx
import styles from './styles.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>React Application</h1>
    </div>
  );
}
```

### But how does it work?

In one of my projects, I have a css module (called `button.module.scss`) which looks like the following (CSS details removed for brevity).

```css
.button {
  &.alt { /* ... */ }
  &.small { /* ... */ }
  &.large { /* ... */ }
  &.xlarge { /* ... */ }
}
```

When I import this file with `import styles from './button.module.scss';`, I get a result similar to the following in development:

```js
const styles = {
  alt: 'button_alt__1uWVP',
  button: 'button_button__H5057',
  large: 'button_large__4qzEW',
  small: 'button_small__3FT5d',
  xlarge: 'button_xlarge__3tiak',
};
```

When I build for production, In simplifies to:

```js
const styles = {
  alt: '1uWVP',
  button: 'H5057',
  large: '4qzEW',
  small: '3FT5d',
  xlarge: '3tiak',
};
```

## CSS in JS

- style components / emotion
