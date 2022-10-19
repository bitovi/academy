@page learn-web-components/customize-header Customize header styles
@parent learn-web-components 8
@description Learn how to use CSS properties to customize the appearance within Shadow DOM.

@body

## Overview

In this part we will:

- Use CSS custom properties to allow users of our component to modify the component's encapsulated styles.

## Problem

We want the users of our component to be able to customize the styling. For example we think they should be able to change the header's `background-color` and the heading's `text-transform`.

Open up the styling for this component by providing supported CSS custom properties. In the end a custom header should look something like this:

<img src="../static/img/web-components/bt-header-styles.jpg"
  style="border: solid 1px black; max-width: 100%;"
  title="Custom header styles applied to our element." />

## How to Solve This Problem

1. Style the `bus-tracker` using custom properties in the global CSS.
1. Change the `bus-tracker` component's own CSS to use those properties in the `header` and `header h1` elements.

## Technical Requirements

Use the following CSS property names and values:

- `--header-background` - Pick any color you want. I'll use `salmon`.
- `--header-text-transform` - Use `capitalize`.

## What You Need to Know

- How to define CSS custom properties.
- How to use CSS custom properties to set the value of styles.
- How to pass CSS custom properties into custom elements.

### Defining custom properties

Custom properties start with two hyphens `--`. Otherwise they can have any name, but usually use hyphens to separate each word, ex: `--this-class-name`. Defining custom properties works the same way as other style properties, use a colon to delimit the name and the value.

This example sets a default border style on the root (html) element:

```css
:root {
  --border: 1px solid DarkBlue;
}
```

### Using var()

The `var()` syntax is a way to get a value from a variable (custom property). Using `var(--color, blue)` says: Use the `--color` variable if it is defined, otherwise fallback to `blue`. This gives us what we need to both have a custom background-color / text-transform, and also allow the consumer to override these styles.

```css
:root {
  --theme-alt: MidnightBlue;
}

.button {
  color: var(--theme-alt, DarkBlue);
}
```

### Passing custom properties

You can pass custom properties to custom elements by defining the property on a CSS selector matching the element.

```css
bus-tracker {
  --header-background: salmon;
}
```

## Solution

✏️ Add a `bus-tracker { }` section to the CSS and set `--header-background` and `--header-text-transform` CSS properties. Using `var()`, apply these styles in the appropriate place within the Shadow DOM CSS.

<details>
<summary>Click to see the solution</summary>

@sourceref ./index.html
@highlight 13-16,49,61,only
@codepen

</details>