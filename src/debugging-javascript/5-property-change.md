@page learn-to-debug-javascript/property-changes Property Changes
@parent learn-to-debug-javascript 5
@description Learn how to debug property changes.

@body

## The problem

The following example creates an object `obj` whose `subject` property is changed
by something called within `somethingWillMutate`.  What is the name of the
function that changed `obj.subject`?

```html
<script src="//bitovi.github.io/academy/static/scripts/debugging/variables.js"></script>
<script type="module">
function propertyChange(){

    var obj = {subject: "JavaScript"};

    somethingWillMutate(obj);

    console.log("what is the name of the function that changed obj.subject?");
    debugger;
}
propertyChange();
</script>
```
@codepen

## What you need to know

You can capture when a property is set using a [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set).  A _setter_ can be created with [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) like:

```js
var propertyValue = object.property;
Object.defineProperty(person,"property",{
    get: function(){
        return propertyValue;
    },
    set: function(newValue){
        debugger;  
        propertyValue = newValue;
    }
});
```

This is used in the following example to discover where `person.name` is changed:

```html
<script>
function checkIt(obj){ return checkName(obj.name); }
function checkName(obj){ return true; }
function addLastName(obj){ obj.name = "Justin Meyer"; }

function wrapWithAddress(obj){
    return {person: obj, address: "Chicago, IL"};
}

function doSomethingWithPerson(obj){
    checkIt(obj);
    addLastName(obj);
    wrapWithAddress(obj);
}
</script>
<script type="module">
var person = {name: "Justin"};

var name = person.name;
Object.defineProperty(person,"name",{
    get: function(){ return name; },
    set: function(newValue){ debugger;  name = newValue; }
});

doSomethingWithPerson(person);
console.log(person);
</script>
```
@codepen
@highlight 19-23

## The solution

```html
<script src="//bitovi.github.io/academy/static/scripts/debugging/variables.js"></script>
<script type="module">
function propertyChange(){

    var obj = {subject: "JavaScript"};

    var subject = obj.subject;
    Object.defineProperty(obj,"subject",{
        get: function(){ return subject; },
        set: function(newValue){ debugger;  subject = newValue; }
    });

    somethingWillMutate(obj);

    console.log("what is the name of the function that changed obj.subject?");
}
propertyChange();
</script>
```
@codepen
@highlight 7-11

<details>
<summary>Click to see the answer</summary>

The answer is `g`.

</details>
