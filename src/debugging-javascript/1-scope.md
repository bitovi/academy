@page learn-to-debug-javascript/scope Scope
@parent learn-to-debug-javascript 1
@description Learn how to see the variables available in the scope.

@body


## The problem

What is the value of `VARIABLE_IN_SCOPE` in the following code?

```html
<script src="//bitovi.github.io/academy/static/scripts/debugging/variables.js"></script>
<script type="module">
// What is the value of VARIABLE_IN_SCOPE?
function a(){
    var a = makeAVariables;
    return function b(){
        var VARIABLE_IN_SCOPE = makeBVariables;
        return function c(){
            var c = makeCVariables;
            return function d(){
                var d = makeDVariables;
                console.log("What is the value of VARIABLE_IN_SCOPE?");
                debugger;
                eval("");
            };
        };
    };
}
a()()()();
</script>
```
@codepen

## What you need to know

Chrome’s developer tools allow you to inspect variables in the scope. For example,
consider the following code from the [learn-advanced-javascript/closures] training:



```js
function counter(){

  var count = 0;

  return function(){
    debugger;
    return ++count;
  };

};

var c1 = counter();

c1();

c1();

var c2 = counter();

c2();
```
@codepen

Chrome’s developers tools allows you to inspect variables in the scope as follows:

<img src="../static/img/debugging/full-closure.png" style="border: solid 1px black"/>


## The solution


<details>
<summary>Click to see the answer</summary>

The answer is `d`.

</details>
