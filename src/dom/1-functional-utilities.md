@page dom-jquery-training/functional-utilities Functional Utilities
@parent dom-jquery-training 1
@description

@body

## Overview

We will learn about:

- Extending objects by building `$.extend`
- Type checking by building `$.isArray` and `$.isArrayLike`
- Iterating objects and arrays by building `$.each`
- Binding functions to a particular context by building `$.proxy`

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZyItGFJivaQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQS1BOdGeK3-TEHbLt_mWjc7Z3TAd5dk6lFCDEvOy5cXLHzrYx7OsmVAP72vwDvTxJ_lLG0y5UqEUfc/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Exercise: `$.extend`

### The problem

[jQuery.extend](https://api.jquery.com/jquery.extend/) merge the contents of of an object
onto another object.

```js

```


## Exercise: `$.isArray`

## Exercise: `$.isArrayLike`

## Exercise: `$.each`

## Exercise: `$.makeArray`

## Exercise: `$.proxy`



## Solution

```html
<p>Welcome to the closures exercise! Open the JavaScript panel
    to implement the make functions. </p>
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>

<script type="module">
/* make util code here! */

const make = {};

[`a`, `div`, `span`, `form`, `h1`, `h2`, `h3`, `h4`].forEach(function(name){
    make[name] = function(){
        return document.createElement(name);
    }
});

/* end make util code */

// Test code. There's no need to edit the following:
QUnit.test('$.extend', function(){

    var target = {first: 'Justin'},
    object = {last: 'Meyer'};

    var result = $.extend(target,object);

    equal( result, target, 'target and result are equal');
    deepEqual(result, {first: 'Justin', last: 'Meyer'}, 'properties added correctly');
});

QUnit.test('$.isArray', function(){

    equal( $.isArray([]), true, 'An array is an array' );
    equal( $.isArray(arguments), false, 'Arguments are not an array' );

    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    var IframeArray = iframe.contentWindow.Array;

    equal( $.isArray( new IframeArray() ), true, 'Arrays from other iframes are Arrays' );

    document.body.removeChild(iframe);
});

QUnit.test('$.each', function(){
    expect(9);
    var collection = ['a','b'];
    var res = $.each(collection, function(index, value){
        if(index === 0 )	equal(value, 'a');
        else if(index === 1 ) equal(value, 'b');
        else ok(false,'called back with a bad index');
    });
    equal(collection, res);

    collection = {foo: 'bar', zed: 'ted'};
    res = $.each(collection, function(prop, value){
        if(prop === 'foo' )		 equal(value, 'bar');
        else if(prop === 'zed' ) equal(value, 'ted');
        else ok(false,'called back with a bad index');
    });
    equal(collection, res);

    var collection = {0:'a', 1:'b', length: 2};
    var res = $.each(collection, function(index, value){
        if(index === 0 )	equal(value, 'a');
        else if(index === 1 ) equal(value, 'b');
        else ok(false,'called back with a bad index');
    });
    equal(collection, res);
});

QUnit.test('$.makeArray', function(){

    var childNodes = document.body.childNodes;

    ok(! $.isArray(childNodes), 'node lists are not arrays' );

    var childArray = $.makeArray(childNodes);

    ok( $.isArray(childArray), 'made an array'	);

    equal(childArray.length, childNodes.length, 'lengths are the same');

    for(var i =0; i < childArray.length; i++){
        equal(childArray[i], childNodes[i], 'array index '+i+' is equal.');
    }
});

QUnit.test('$.proxy', function(){

    var dog = {
        name: 'fido',
        speak: function(words){
            return this.name + ' says '+words;
        }
    };

    var speakProxy = $.proxy(dog.speak, dog);

    equal( speakProxy('woof!'), 'fido says woof!' );
});
</script>
```
