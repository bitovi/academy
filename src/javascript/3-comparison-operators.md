@page learn-advanced-javascript/js-comparison Comparison Operators
@parent learn-advanced-javascript 3
@description This week we covered comparisons in JavaScript! The showdown between == and === is on!

@body

## Overview

- Byte comparisons
- Memory address comparisons
- `==` state machine
- `===` state machine
- Live examples!

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/qJupPEXzVT8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSmb0SuI1bKUiQUxGJoDcIzxhlJSKyet-aIhFXWjoV14uqddSXIaAtZcV6vTh8UgKD4b4JHSJXEmWT9/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


## Exercise

Implement the `eqeq` function. Click `Run in your browser` after the following example:

```html
<p>Welcome to the <code>==</code> exercise! Open the JavaScript panel
    to implement the <code>eqeq()</code> function. </p>

<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>

<script type="module">
// Start by filling this function out!
// eqeq(null, undefined) //-> true
var eqeq = function(value1, value2){

};


// The following functions might be useful to
// eqeq().  You'll have to implement them yourself.

// Returns true if the value is `null` or `undefined`
var isNullOrUndefined = function(value) {

};

// Given a value, returns the primitive version of it,
// either a number or string.
var toPrimitive = function(value) {

};

// Given an object and a property on the object, this
// will return the property value as long as the property
// is not on `Object.prototype`. If you don't know what
// this means, copy it from the answer key :-).
var getDefinedPropertyNotOnObjectPrototype = function(obj, prop) {

}


// Test code.  There's no need to edit the following:
QUnit.module("Double Equal", {});

QUnit.test("Types the same", function(){
  QUnit.equal( eqeq(1,1), 1 == 1 , "1==1");
  QUnit.equal( eqeq('1','1'), '1' == '1' , "'1'=='1'")
  QUnit.equal( eqeq({},{}), {} == {} , "{}=={}")
  QUnit.equal( eqeq(NaN,NaN), NaN == NaN , "NaN==NaN")
});

QUnit.test("Both null or undefined", function(){
  QUnit.equal( eqeq(null,undefined), null == undefined , "null==undefined");
  QUnit.equal( eqeq(undefined,null), undefined ==  null, "undefined==null");
});

QUnit.test("String == Number", function(){
  QUnit.equal( eqeq(1,'1'), 1=='1' , "1=='1'");
  QUnit.equal( eqeq(1,'2'), 1=='2', "1=='2'");
  QUnit.equal( eqeq(1,'a'), 1=='a', "1=='a'");

  QUnit.equal( eqeq('1',1), '1'==1 , "'1'==1");
  QUnit.equal( eqeq('a',1), 'a'==1, "'a'==1");
});

QUnit.test("Boolean == Anything", function(){
  QUnit.equal( eqeq(true,1), true==1 , "true==1");
  QUnit.equal( eqeq(true,2), true==2 , "true==2");
  QUnit.equal( eqeq(true,'true'), true=='true' , "true=='true'");
  QUnit.equal( eqeq(true,'1'), true=='1' , "true=='1'");

  QUnit.equal( eqeq(false,0), false==0 , "false==0");
  QUnit.equal( eqeq(false,'false'), false=='false' , "false=='false'");
  QUnit.equal( eqeq(false,'0'), false=='0' , "false=='0'");


  QUnit.equal( eqeq(1,true), 1==true , "1==true");
  QUnit.equal( eqeq(2,true), 2==true , "2==true");
  QUnit.equal( eqeq('true',true), 'true'==true , "'true'==true");
  QUnit.equal( eqeq('1',true), '1'==true , "'1'==true");

});

QUnit.test("Object == (String || Number)", function(){
  QUnit.equal( eqeq(({toString: function(){return 1}}),1),   ({toString: function(){return 1}})==1 , "({toString: function(){return 1}})==1");
  QUnit.equal( eqeq(({toString: function(){return '1'}}),1), ({toString: function(){return '1'}})==1 , "({toString: function(){return '1'}})==1");
  QUnit.equal( eqeq(({toString: function(){return true}}),1), ({toString: function(){return true}})==1 , "({toString: function(){return true}})==1");

  QUnit.equal( eqeq(({valueOf: function(){return 1}}),1), ({valueOf: function(){return 1}})==1 , "({valueOf: function(){return 1}})==1");
  QUnit.equal( eqeq(({valueOf: function(){return '1'}}),1), ({valueOf: function(){return '1'}})==1 , "({valueOf: function(){return '1'}})==1");
  QUnit.equal( eqeq(({valueOf: function(){return true}}),1), ({valueOf: function(){return true}})==1 , "({valueOf: function(){return true}})==1");

  QUnit.equal( eqeq(({toString: function(){return 1}}),true), ({toString: function(){return 1}})==true , "({toString: function(){return 1}})==true");
  QUnit.equal( eqeq(({toString: function(){return '1'}}),true), ({toString: function(){return '1'}})==true , "({toString: function(){return '1'}})==true");
  QUnit.equal( eqeq(({toString: function(){return true}}),true), ({toString: function(){return true}})==true , "({toString: function(){return true}})==true");

  QUnit.equal( eqeq(({valueOf: function(){return 0}}),false), ({valueOf: function(){return 0}})==false , "({valueOf: function(){return 0}})==false");
  QUnit.equal( eqeq(({valueOf: function(){return null}}),false), ({valueOf: function(){return null}})==false , "({valueOf: function(){return null}})==false");
  QUnit.equal( eqeq(({valueOf: function(){return undefined}}),false), ({valueOf: function(){return undefined}})==false , "({valueOf: function(){return undefined}})==false");

  // odd one
  QUnit.equal( eqeq('a', ({valueOf: function(){return true}, toString: function(){ return 'a' }})), 'a' == ({valueOf: function(){return true}, toString: function(){ return 'a' }}) , "'a' == ({valueOf: function(){return true}, toString: function(){ return 'a' }})");
  QUnit.equal( eqeq(1, [1]), 1 == [1] , "1 == [1]");

  // Hard one
  QUnit.equal( eqeq( "abc" , Object.create({valueOf: function(){return "abc"}}, {toString: {value: function(){ return "ABC" }}}) ), "abc" == Object.create({valueOf: function(){return "abc"}}, {toString: {value: function(){ return "ABC" }}}) , '"abc" == Object.create({valueOf: function(){return "abc"}}, {toString: {value: function(){ return "ABC" }}})');
});
</script>
```
@codepen


## Solution

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script type="module">
var eqeq = function(value1, value2){
  var type1 = typeof value1,
      type2 = typeof value2;

  if(type1 === type2) {
    return value1 === value2
  }
  if(isNullOrUndefined(value1) && isNullOrUndefined(value2)) {
    return true;
  }

  if(type1 === "string" && type2 === "number") {
    return eqeq( toPrimitive(value1), value2 );
  }
  if(type2 === "string" && type1 === "number") {
    return eqeq( value1, toPrimitive(value2) );
  }
  if(type1 === "boolean") {
    return eqeq(toPrimitive(value1), value2);
  }
  if(type2 === "boolean") {
    return eqeq(value1, toPrimitive(value2));
  }
  if(value1 && type1 === "object") {
    return eqeq(toPrimitive(value1), value2);
  }
  if(value2 && type2 === "object") {
    return eqeq(value1, toPrimitive(value2));
  }
  return false;
};

var isNullOrUndefined = function(value) {
  return value === null || value === undefined;
};

var toPrimitive = function(value) {
  if(typeof value === "string") {
    return +value;
  }
  if(typeof value === "boolean") {
    return value ? 1 : 0;
  }
  if(typeof value === "object") {
    if(getDefinedPropertyNotOnObjectPrototype(value, "valueOf")) {
      return value.valueOf();
    }
    if(getDefinedPropertyNotOnObjectPrototype(value, "toString")) {
      return value.toString();
    }
    return value.valueOf();
  }
};

var getDefinedPropertyNotOnObjectPrototype = function(obj, prop) {
  if( obj.hasOwnProperty(prop) ) {
    return obj[prop]
  }
  if(Object.getPrototypeOf(obj) !== Object.prototype) {
    return getDefinedPropertyNotOnObjectPrototype(Object.getPrototypeOf(obj), prop);
  }
}

QUnit.module("Double Equal", {});

QUnit.test("Types the same", function(){
  QUnit.equal( eqeq(1,1), 1 == 1 , "1==1");
  QUnit.equal( eqeq('1','1'), '1' == '1' , "'1'=='1'")
  QUnit.equal( eqeq({},{}), {} == {} , "{}=={}")
  QUnit.equal( eqeq(NaN,NaN), NaN == NaN , "NaN==NaN")
});

QUnit.test("Both null or undefined", function(){
  QUnit.equal( eqeq(null,undefined), null == undefined , "null==undefined");
  QUnit.equal( eqeq(undefined,null), undefined ==  null, "undefined==null");
});

QUnit.test("String == Number", function(){
  QUnit.equal( eqeq(1,'1'), 1=='1' , "1=='1'");
  QUnit.equal( eqeq(1,'2'), 1=='2', "1=='2'");
  QUnit.equal( eqeq(1,'a'), 1=='a', "1=='a'");

  QUnit.equal( eqeq('1',1), '1'==1 , "'1'==1");
  QUnit.equal( eqeq('a',1), 'a'==1, "'a'==1");
});

QUnit.test("Boolean == Anything", function(){
  QUnit.equal( eqeq(true,1), true==1 , "true==1");
  QUnit.equal( eqeq(true,2), true==2 , "true==2");
  QUnit.equal( eqeq(true,'true'), true=='true' , "true=='true'");
  QUnit.equal( eqeq(true,'1'), true=='1' , "true=='1'");

  QUnit.equal( eqeq(false,0), false==0 , "false==0");
  QUnit.equal( eqeq(false,'false'), false=='false' , "false=='false'");
  QUnit.equal( eqeq(false,'0'), false=='0' , "false=='0'");


  QUnit.equal( eqeq(1,true), 1==true , "1==true");
  QUnit.equal( eqeq(2,true), 2==true , "2==true");
  QUnit.equal( eqeq('true',true), 'true'==true , "'true'==true");
  QUnit.equal( eqeq('1',true), '1'==true , "'1'==true");

});

QUnit.test("Object == (String || Number)", function(){
  QUnit.equal( eqeq(({toString: function(){return 1}}),1),   ({toString: function(){return 1}})==1 , "({toString: function(){return 1}})==1");
  QUnit.equal( eqeq(({toString: function(){return '1'}}),1), ({toString: function(){return '1'}})==1 , "({toString: function(){return '1'}})==1");
  QUnit.equal( eqeq(({toString: function(){return true}}),1), ({toString: function(){return true}})==1 , "({toString: function(){return true}})==1");

  QUnit.equal( eqeq(({valueOf: function(){return 1}}),1), ({valueOf: function(){return 1}})==1 , "({valueOf: function(){return 1}})==1");
  QUnit.equal( eqeq(({valueOf: function(){return '1'}}),1), ({valueOf: function(){return '1'}})==1 , "({valueOf: function(){return '1'}})==1");
  QUnit.equal( eqeq(({valueOf: function(){return true}}),1), ({valueOf: function(){return true}})==1 , "({valueOf: function(){return true}})==1");

  QUnit.equal( eqeq(({toString: function(){return 1}}),true), ({toString: function(){return 1}})==true , "({toString: function(){return 1}})==true");
  QUnit.equal( eqeq(({toString: function(){return '1'}}),true), ({toString: function(){return '1'}})==true , "({toString: function(){return '1'}})==true");
  QUnit.equal( eqeq(({toString: function(){return true}}),true), ({toString: function(){return true}})==true , "({toString: function(){return true}})==true");

  QUnit.equal( eqeq(({valueOf: function(){return 0}}),false), ({valueOf: function(){return 0}})==false , "({valueOf: function(){return 0}})==false");
  QUnit.equal( eqeq(({valueOf: function(){return null}}),false), ({valueOf: function(){return null}})==false , "({valueOf: function(){return null}})==false");
  QUnit.equal( eqeq(({valueOf: function(){return undefined}}),false), ({valueOf: function(){return undefined}})==false , "({valueOf: function(){return undefined}})==false");

  // odd one
  QUnit.equal( eqeq('a', ({valueOf: function(){return true}, toString: function(){ return 'a' }})), 'a' == ({valueOf: function(){return true}, toString: function(){ return 'a' }}) , "'a' == ({valueOf: function(){return true}, toString: function(){ return 'a' }})");
  QUnit.equal( eqeq(1, [1]), 1 == [1] , "1 == [1]");

  // Hard one
  QUnit.equal( eqeq( "abc" , Object.create({valueOf: function(){return "abc"}}, {toString: {value: function(){ return "ABC" }}}) ), "abc" == Object.create({valueOf: function(){return "abc"}}, {toString: {value: function(){ return "ABC" }}}) , '"abc" == Object.create({valueOf: function(){return "abc"}}, {toString: {value: function(){ return "ABC" }}})');
});
</script>
```
@codepen
