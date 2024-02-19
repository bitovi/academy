@page learn-react/styling-in-react Styling in React
@parent learn-react 7
@outline 3

@description Learn about different ways to apply CSS styles in React applications.

@body

## Overview

In this section, we will:

- Review how plain CSS works in React applications
- Set up CSS Modules
- Create a component-specific stylesheet
- Apply styles to a component

## Objective: Applying style with CSS Modules

Now that we've learned to apply styling in React with CSS Modules, it’s time to practice by styling a link in the Home component. You’ll bring in a `Link` component from React Router. 

### Styling options in React applications

There is no prescribed approach for styling React apps. It’s entirely possible to
style components using regular CSS. This approach works fine for many applications,
especially smaller ones.

However, as your application grows in complexity, you might encounter challenges with
style management. For instance, CSS written for one component can unintentionally
affect other parts of your application.

The community has built several styling options. We will be using CSS Modules as it is
one of the most popular styling libraries and is very approachable for anyone that is
used to styling in plain CSS. CSS Modules offer a way to write CSS that’s scoped to
individual components, thus preventing style clashes and maintaining a cleaner codebase.

### Reviewing how plain CSS works

In a standard React application using regular CSS, styles are global.
This means that any style you define can potentially affect any element
in your application that matches the style’s selector.

Let’s imagine that we have two components in our application:
`<BlogPost>` and `<UserProfile>`. Both of them feature an avatar image,
one for the author of a post and the other for the signed-in user.

Here’s what the `BlogPost.css` file might look like:

```css
.avatar {
  float: left;
  margin-right: 10px;
}
```

And the `BlogPost.tsx` component:

```tsx
import React from 'react';
import './BlogPost.css';

const BlogPost: React.FC = ({ authorAvatar, content }) => {
  return (
    <article>
      <img
        alt="Headshot showing…"
        className="avatar"
        src={authorAvatar}
      />
      <p>{content}</p>
    </article>
  );
}
```

Here’s what the `UserProfile.css` file might look like:

```css
.avatar {
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
```

And the `UserProfile.tsx` component:

```tsx
import React from 'react';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  return (
    <img
      alt="User avatar showing…"
      className="avatar"
      src="user-profile.jpg"
    />
  );
}
```

What will the final CSS be?

In this case, the two style declarations combined will be applied to both images:

```css
.avatar {
  border-radius: 50%;
  float: left;
  height: 100px;
  margin-right: 10px;
  width: 100px;
}
```

This is no good! When someone edits one component, it looks like they’re only changing
the styles for that single component, but in fact they are changing any instance where
that `class` name is used globally throughout the entire application.

Let’s solve this!

### Scoped stylesheet

CSS Modules works like regular CSS, but the class names are randomized to prevent
conflicts between components. When using CSS Modules, if multiple components
implement a `.avatar` class, those classes will be unique and conflict-free because
CSS Modules will rename each class with a unique random string like `.avatar_R8f2`. 

For example, these styles in a CSS module:

```css
/* BlogPost.css */
.avatar {
  float: left;
  margin-right: 10px;
}
```

Will be converted into the following:

```css
/* BlogPost.module.css */
.avatar_R8f2 {
  float: left;
  margin-right: 10px;
}
```

The standard procedure with CSS Modules is to create a stylesheet for each component.
That stylesheet is placed in the same folder as the component. In order to identify
the file as a CSS Module, the filename should end with `.module.css`. The file
structure for a BlogPost component will look like the following:

- BlogPost
  - BlogPost.module.css
  - BlogPost.test.tsx
  - BlogPost.tsx
  - index.ts

Note that CSS Modules cannot rename HTML tags, so all of your styling should use
classes to avoid unexpected styling bugs. The following will apply to all `img`
elements in the project and should be avoided.

```CSS
/* Don’t do this with CSS Modules as tag names can not be randomized */
img {
  float: right;
}
```

### Importing and applying styles

During the build process, the CSS classes will be randomized and added to a global stylesheet. The randomized class names are imported into components as an object where the key is the original class and the value is the new, randomized string. 

Here’s an example of what the JS object imported from `BlogPost.module.css` might look like:

```tsx
{ avatar: "avatar_R8f2" }
```

In order to add the `.avatar` class to a component, import the CSS Modules
styling object and apply the class using the original class name as the key. Note
the HTML `class` attribute is renamed to `className` in JSX because `class` is a
reserved word in JavaScript.

```tsx
import React from 'react';
import styles from './BlogPost.module.css`

const BlogPost: React.FC = ({ authorAvatar, content }) => {
  return (
    <article>
      <img
        alt="Headshot showing…"
        className={styles['avatar']}
        src={authorAvatar}
      />
      <p>{content}</p>
    </article>
  );
}
```
@highlight 2, 9

### Install CSS Modules

Already done! Vite, our build tool, ships with first-class CSS Modules support.
Vite also supports a few [other styling options](https://vitejs.dev/guide/features#css)
out of the box.

### Setup

We've created some CSS for this exercise. Create a CSS Modules file and copy the following styles into it.

✏️ Create **src/pages/Home/Home.module.css** and update it to be:

@sourceref ../../../exercises/react-vite/07-styling-in-react/01-problem/src/pages/Home/Home.module.css

TODO: Clean up the extraneous styles in the code above. [Chasen can handle this.]

### Verify

✏️ Update **src/pages/Home/Home.test.tsx** to be:

@diff ../../../exercises/react-vite/06-routing/02-solution/src/pages/Home/Home.test.tsx ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/Home/Home.test.tsx only

### Exercise

- Update the styles in `Home.module.css` to be usable as a CSS Module.
- Update the `<Home>` component to include a styled link:
  - Use `<Link>` (from the previous section!) to create a link to the `/restaurants` page.
  - Import the `styles` from `Home.module.css` and apply them to the new link.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/Home/Home.module.css** to be:

@diff ../../../exercises/react-vite/07-styling-in-react/01-problem/src/pages/Home/Home.module.css ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/Home/Home.module.css only

✏️ Update **src/pages/Home/Home.tsx** to be:

@diff ../../../exercises/react-vite/07-styling-in-react/01-problem/src/pages/Home/Home.tsx ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/Home/Home.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/07-styling-in-react/01-solution?file=src/pages/Home/Home.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/07-styling-in-react/01-solution?file=src/pages/Home/Home.tsx).

</details>

## Next steps

In the next section, we’ll learn to manage state.