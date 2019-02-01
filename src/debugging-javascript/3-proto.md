@page debugging-javascript-training/prototypes Prototypes
@parent debugging-javascript-training 3
@description Learn how to explore an object's proto chain.

@body


## The problem


What is the value of `frozen`'s `rated` property that it inherited from the `Entertainment`
prototype?

```html
<script src="//bitovi.github.io/university/static/scripts/debugging/variables.js"></script>
<script type="module">
var Movie = function(){};
Movie.prototype = new Entertainment();
Movie.prototype.play = function(){};

var AnimatedMovie = function(){};
AnimatedMovie.prototype = new Movie();
AnimatedMovie.prototype.isAnime = function(){};

var frozen = new AnimatedMovie();
console.log("frozen has a `rated` property, inherited from Entertainment. What is its value?")
console.log(frozen);
</script>
```
@codepen

## What you need to know


The following sets up the same `Animal`, `Chordate`, and `Mammal`
inheritance chain from the [advanced-javascript-training/prototypes] JavaScript course.

```js
Animal = function(name) { this.name = name; };
Animal.prototype.eats = function(){ return this.name+" eats."; };

function Chordate(name){ this.name = name; };
Chordate.prototype = new Animal();
Chordate.prototype.hasSpine = true;

function Mammal(name){  this.name = name; };
Mammal.prototype = new Chordate();
Mammal.prototype.hasHair = true;

var m = new Mammal('dog');
console.log(m);
```

You can inspect the Mammal instance `m` and see its `__proto__` property:

<img src="../static/img/debugging/prototype.png"/>


## The solution

<details>
<summary>Click to see the answer</summary>

The answer is `b`.

</details>
