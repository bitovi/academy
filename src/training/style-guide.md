@page training/style-guide Style Guide
@parent training 10
@description A document of all the styles. This is the description.

@body

## Headings

## H2

Paragraph

## H2 with `code`

### H3

Paragraph

#### H4

Paragraph

##### H5

Paragraph

###### H6

Paragraph

## Block elements

A paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Another paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

- List element
- Another item
- Another item

Another paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

- List element
  - nested
  - next
    ```
    code
    ```
    - deep
      ```
      foo
      ```

- Another item

- Another item

  multiple paragraphs

Another paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

1. Order lists
2. Number two
3. Number three

> Blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.


<details>
<summary>This is a summary element that shows a paragraph</summary>

Another paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

</details>

<details>
<summary>This is a summary element that shows a pre</summary>

```js
foo();
```

</details>

HTML code example:

```html
<hello-world></hello-world>
```

JS code example:

```js
console.log("Hello There")
```

CodePen example:

```js
console.log("Hello There")
```
@codepen

Highlight only example:

```js
function  myFunction(){


  var message = "Hello There";
  console.log( message );


}

myFunction();


function  myFunction(){


  var message = "Hello There";
  console.log( message );


}

myFunction();

```
@highlight 5,17,only


## Text elements

The following is a very long sentence that will hopefully go across many lines because it
is so long and filled with `code elements`, __bold elements__, _italic elements_, [link elements](#).
