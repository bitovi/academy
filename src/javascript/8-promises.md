@page learn-advanced-javascript/promises Promises
@parent learn-advanced-javascript 8
@description Learn about JavaScript promises

@body

> __NOTE:__ This section is currently under development.  There are no exercises yet.


## What is a promise

A promise represents the completion or failure of some
operation.  Promises have methods (`.then`)
that let you listen for when the operation completes:

```js
const myPromise = operationThatCompletesInTheFuture();

myPromise.then( function success(){
  console.log( "operation completed 😄" );
} );
```

You can also listen to when an operation fails:

```js
const myPromise = operationThatCompletesInTheFuture();

myPromise.catch( function failure(){
  console.log( "operation failed 😟" );
} )
```

For example, you might use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make a request and
want to know if a connection was established:

```js
const request = fetch("https://dog.ceo/api/breeds/list/all");

request.then( function fulfilled(){
  console.log( "connection established" );
});

request.catch( function rejected(){
  console.log( "connection failed" );
} )
```
@codepen

## Success values

If the operation is successful, the operation can return
a value.  For example, if `fetch` establishes a value,
a `response` object is provided.


```js
const request = fetch("https://dog.ceo/api/breeds/list/all");

request.then( function(response){
  console.log(response.status) //logs 200
});
```
@codepen


Setting a promise's returning value is actually called _resolving_ the
promise's value. This is because a promise's value can
only be set once.

## Failure reasons

If the operation fails, a reason for the failure can be returned.
For example, if `fetch` makes a request to a URL that doesn't exist,
the `reason` will be an TypeError object.

```js
const request = fetch("http://foo.bar");

request.catch( function(reason){
  console.log(reason) /// TypeError: Failed to Fetch
});
```
@codepen

When a promise fails, it is called _rejecting_ the promise.


## Creating promises

You can create your own promises with `new Promise()`!
The following example creates a promise whose value is
resolved to a random number after one second.  We also listen to when
the value is resolved with `then` and log a message.


```js
const numberPromise = new Promise( function( resolve ){
  setTimeout( function(){
    resolve( Math.random() );    // Sets the value of the promise
  },  1000 );
})

numberPromise.then( function( number ){
  console.log("number "+ number); //logs "number 0.###"
} );
```
@codepen

Notice:

- `new Promise( executor )` takes an `executor` function that is called with a `resolve` callback. `resolve` is used to set the value of the  
  promise.
- `.then( onFulfilled )` takes an `onFulfilled` function that is called
  when the promise is resolved. `onFulfilled` is called with
  the promise's resolved value.

<details>

<summary>Example Implementation</summary>

The following implements a simplified version of
promises. It does not handle errors, or calling
handlers at the end of the current run loop.

```js
class MyPromise {
  constructor( executor ) {
    this._fulfilledHandlers = [];
    this._state = "pending";

    const resolve = (value) => {
      this._value = value;
      this._fulfill();
    }

    executor( resolve );
  }
  then(onFulfilled) {
    this._fulfilledHandlers.push(onFulfilled);

    if(this._state === "resolved") {
      this._fulfill();
    }
  }
  _fulfill(){
    this._state = "resolved";

    const handlers = this._fulfilledHandlers;
    this._fulfilledHandlers = [];
    handlers.forEach( handler => handler(this._value) );
  }
}

const groupNamePromise = new MyPromise( function( resolve ){
  setTimeout( function(){
    resolve("Bitovi");    // Sets the value of the promise
  },  1000 );
})

groupNamePromise.then( function( groupName ){
  console.log("groupName", groupName); //logs "groupName Bitovi"
} );
```
@codepen

</details>

You can also create promises that can be rejected.

The following
creates a random number every 100ms. If a number is greater than `0.9`, it will
resolve with that number. If 10 numbers are created that are all less than `0.9`,
the promise will be rejected.

```js
const numberPromise = new Promise( function( resolve, reject ){
  let count = 0;

  const interval = setInterval( ()=> {
    count++;
    let number = Math.random();
    if( number > 0.9 ) {
      clearInterval( interval );
      resolve( number );
    }
    if( count >= 10) {
      clearInterval( interval );
      reject( new Error("Unable to find a number greater than 0.9") );
    }
  },100);
})

numberPromise.then( function( number ){
  console.log("number"+ number);
} );

numberPromise.catch( function( error ){
  console.error(error);
} );
```
@codepen



## Creating promises from other promises

One of the most common uses of promises is to take a promise value and convert it to another
promise value.

A promise's `.then( onFulfilled )` method always returns another _outer_ promise.  That _outer_ promise
will take on the value of what the `onFulfilled` function returns.

In the following example, notice how `breedsPromise` resolves to an object of breeds. However,
the `toCount` function is returning the number of breeds. This return value is used to
make `countPromise`.  `countPromise` resolves to the total number of breeds.

```js
const request = fetch("https://dog.ceo/api/breeds/list/all");

const breedsPromise = request.then( function( response ){
  console.log( "response", response )      //-> Response{status, body}
  return response.json();
});

const countPromise = breedsPromise.then( function toCount(breeds) {
  console.log("breeds", breeds);           //-> {message: {beagle,chow}}
  return Object.keys( breeds.message ).length;
});

countPromise.then( (count) => {
  console.log("count", count);             //-> 91
})
```
@codepen
@highlight 9-10,14

### Flattening promises

If a `onFulfilled` function returns another promise, the _outer_ promise actually takes on
the behavior of the returned promise. This was used in the above example.  `response.json()`
returns a promise, so `breedsPromise` took on the behavior of the result of `response.json()`.

> NOTE: The process of reducing nested observables into a single observable is often called flattening.
> This is what it's called in RxJS's [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll).

The following shows using a `delay()` function to delay when `countPromise` completes by 3 seconds. `delay`
returns a promise that resolves after 3 seconds.

```js
function delay(value){
  return new Promise( (resolve) => {
    setTimeout( function(){
      resolve(value);
    }, 3000);
  });
}

const request = fetch("https://dog.ceo/api/breeds/list/all");

const breedsPromise = request.then( response => response.json() );

let startTime;

const countPromise = breedsPromise.then( function toCount(breeds) {
  startTime = new Date();
  return delay( Object.keys( breeds.message ).length );
});

countPromise.then( (count) => {
  console.log("delay", new Date() - startTime ); //logs 3000
  console.log("count", count);             
})
```
@codepen
@highlight 1-7,17,21

### Throwing exceptions

If an `onFulfilled` function throws an exception, this will reject the _outer_
promise returned by `.then`.

For example, if `toCount` mistakenly read `breeds.data` instead of `breeds.message`,
`countPromise` would be rejected:

```js
const request = fetch("https://dog.ceo/api/breeds/list/all");

const breedsPromise = request.then( function( response ){
  console.log( "response", response )      //-> Response{status, body}
  return response.json();
});

const countPromise = breedsPromise.then( function toCount(breeds) {
  console.log("breeds", breeds);           //-> {message: {beagle,chow}}
  return Object.keys( breeds.data ).length;
});

countPromise.then( (count) => {
  console.log("count", count);
})
countPromise.catch( (reason) => {
  console.error(reason) //-> TypeError[Cannot convert undefined or null to object]
})
```
@codepen
@highlight 10,17


## Promise providers

Promises are returned by many APIs such as:

- The `fetch()` API return a promise when a connection is
  established.  You can also easily get a promise when the
  JSON response is complete:

  ```js
  const myJSON = fetch("/my-data.json")
    .then( (response) => response.toJSON() )
  ```

- [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [ServiceWorkerContainer.register(...)](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)

## Promise syntax

JavaScript even has __special syntax__ for using promises:

- [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) / [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) let you read the value of promises without
  calling `.then`.  


  ```js
  async function getBreedsCount(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all");

    const breeds = await response.json();

    return Object.keys( breeds.message ).length;
  }

  const countPromise = getBreedsCount();

  countPromise.then( (count) => {
    console.log("count", count);             //-> 91
  });
  ```
  @codepen


- [for await(of)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) allows you to
  loop through an iterator that emits promises:

  ```js
  const response = await fetch(url);
  for await (const chunk of response.body.getReader() ) {

    responseSize += chunk.length;
  }
  ```



## Handing Errors

Promises

## Timing


## Use Cases



## Converting callbacks into promises

- timing
- multiple callbacks (1 to many)
- callback pyramid of doom (flattening)
- nice language utils
- utilities (Promise.all), queue



## Getting Async Data

## Sequential tasks (chaining)

## Parallel tasks



## Racing

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

## Nesting (side branches)


## Canceling

https://github.com/zenparsing/es-cancel-token

## Compared to other things

- callbacks

- streams

- events

## Handling errors
