@page learn-to-debug-javascript/call-stack Call Stack
@parent learn-to-debug-javascript 2
@description Learn how to trace how functions are called.

@body


## The problem

What is the name of the function that calls the `end` function below?

```html
<script src="//bitovi.github.io/academy/static/scripts/debugging/variables.js"></script>
<script type="module">
function end() {
    console.log("What is the name of the function that calls end?");
    debugger;
}
start();
</script>
```
@codepen

## What you need to know

In the following code, `a()` calls `b()`, `b()` calls `c()`, and `c()` calls `d()`:

```js
function a(){
    var varA = "A";
    b();
}
function b(){
    var varB = "B";
    c();
}
function c(){
    var varC = "C";
    d();
}
function d(){
    var varD = "D";
}
a();
```
@codepen

By adding a breakpoint in `d()`, you will see the following in the __Call Stack__:

<img src="../static/img/debugging/stack.png" style="border: solid 1px black;" width="429px"/>


Chrome can also track asynchrounous function calls.  In the following code,
`setTimeout` is used to call the next function:

```js
function a(){
    setTimeout(b,10);
}
function b(){
    setTimeout(c,10);
}
function c(){
    setTimeout(d,10);
}
function d(){
    console.log("d");
}
a();
```
@codepen

By adding a breakpoint in `d()`, you will see the following in the __Call Stack__:

<img src="../static/img/debugging/async-stack.png" style="border: solid 1px black;" width="429px"/>


## The solution


<details>
<summary>Click to see the answer</summary>

The answer is `e`.

</details>
