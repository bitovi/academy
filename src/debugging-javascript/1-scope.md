@page debugging-javascript-training/scope Scope
@parent debugging-javascript-training 1
@description Closures

@body


## The problem

What is the value of `VARIABLE_IN_SCOPE` in the following code?

```html
<script src="//bitovi.github.io/university/static/scripts/debugging/variables.js"></script>
<script type="module">
// What is the value of b?
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

Chrome's developer tools allow you to inspect variables in the scope. For example,
consider the following code from the [advanced-javascript-training/closures] training:



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

Chrome's developers tools allows you to inspect variables in the scope as follows:

<img src="../static/img/debugging/full-closure.png" width="90%" style="border: solid 1px black"/>


## The solution


<details>
<summary>Click to see the answer</summary>

The answer is `d`.

</details>
