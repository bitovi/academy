@page dom-jquery-training/layout Layout
@parent dom-jquery-training 5
@description Learn how the browser lays out elements in the page and how to
get an elements dimensions and location.

@body


## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTgZLYnFJSyxLhJ4k49f9zLRxBCi5LHUmQxxNL-4K1q6vNUojKCxxYte77y5QExxEP-np_rdS6HxmOO/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Slider Demo

Understanding how the DOM is positioned helps build dynamic
widgets. The following

@sourceref ./slider.html
@codepen
@highlight 100-107,only


## Setup

Run the following example in CodePen:

@sourceref ./5-layout-begin.html
@codepen
@highlight 158-161,only

Each exercise builds on the previous exercise. There is a completed solution at the end of this page.

## Exercise: `collection.width() -> number`

### The problem

[collection.width](http://api.jquery.com/width/) gets the current computed width for the first element in the set of matched elements.

```html
<div class="outer"><div class="inner">Hi</div></div>
<style>
.outer {width: 100px;}
.inner { border: solid 5px green; padding: 10px }
</style>
<script type="module">
import "https://unpkg.com/jquery@3/dist/jquery.js";

console.log( $(".inner").width() ) //logs 70
</script>
```
@codepen

<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.width', function(){
	// .big-width { width: 1000px; ... }
	// #qunit-fixture div { padding: 20px; border: solid 10px black; }
	$('#qunit-fixture')
		.html('<div class="big-width"><div>Element</div></div>');
	equal(
		$('#qunit-fixture .big-width div').width(),
		1000 - 60,
		'width is correct');
});
```
</details>

### What you need to know

- The [clientWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
  property returns the width of the element including the padding.
- You can read the computed `padding-left` and `padding-right` style properties.


### The solution

<details>
<summary>Click to see the solution</summary>
```js
    width: function() {
      var paddingLeft = parseInt(this.css("padding-left"), 10),
      paddingRight = parseInt(this.css("padding-right"), 10);
      return this[0].clientWidth - paddingLeft - paddingRight;
    },
```
</details>

## Exercise: `collection.show()` and `collection.hide()`

### The problem

[collection.show()](http://api.jquery.com/show/) and
[collection.hide()](http://api.jquery.com/hide/) show or hide the elements
in the collection.


<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.show and $.fn.hide', function(){
	$('#qunit-fixture').html('<div id="el">text</div>');

	equal( $('#el').hide()[0].style.display, 'none');
	equal( $('#el').show()[0].style.display, '');
});
```
</details>

### What you need to know

- To hide an element, set its display to `"none"`.
- To show an element, set its display to `""`.

### The solution

<details>
<summary>Click to see the solution</summary>
```js
    hide: function() {
      return this.css("display", "none");
    },
    show: function() {
      return this.css("display", "");
    },
```
</details>

## Bonus Exercise: `collection.offset()`


### The problem

[collection.offset()](http://api.jquery.com/offset/) returns the current coordinates of the first element relative to the document.


```html
<div class="outer"><div class="inner">Hi</div></div>
<style>
.outer {
	position: absolute;
	left: 20px; top: 30px;
}
.inner {
	border: solid 1px green; padding: 10px;
	position: relative;
	left: 10px; top: 10px;
}
</style>
<script type="module">
import "https://unpkg.com/jquery@3/dist/jquery.js";

console.log( $(".inner").offset() )
//logs { left: 30, top: 40 }
</script>
```
@codepen

<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.offset', function(){
	var bigWidth = document.createElement('div'),
	row1 = document.createElement('div'),
	row2 = document.createElement('div'),
	pos = document.createElement('div');

	bigWidth.className = 'big-width';
	row1.className = 'row';
	row2.className = 'row';
	pos.id = 'pos';

	bigWidth.appendChild(row1);
	bigWidth.appendChild(row2);
	row2.appendChild(pos);

	document.body.appendChild(bigWidth);

	var offset = $('#pos').offset();

	equal( offset.top, 120, 'top' );
	equal( offset.left, -990, 'left');

	//cleaning up after our test
	var node = $('.big-width')[0];
	node.parentNode.removeChild(node);
});
```
</details>

### What you need to know

- [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
  gives an element's position relative to the window.
- [pageXOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageXOffset) and
  [pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageXOffset) give how far
  the window has been scrolled.

### The solution

<details>
<summary>Click to see the solution</summary>
```js
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    }
```
</details>



## Complete solution

@sourceref ./5-layout-end.html
@codepen
@highlight 158-175,only
