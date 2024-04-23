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


Setting a promise’s returning value is actually called _resolving_ the
promise’s value. This is because a promise’s value can
only be set once.

## Failure reasons

If the operation fails, a reason for the failure can be returned.
For example, if `fetch` makes a request to a URL that doesn’t exist,
the `reason` will be an TypeError object.

```js
const request = fetch("http://foo.bar");

request.catch( function(reason){
  console.log(`The request failed with message: ${reason.message}`) /// TypeError: Failed to Fetch
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
  the promise’s resolved value.

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

### Shorthands

You can also create resolved and rejected promises with shorthands:

```js
const numberPromise = Promise.resolve(123);

numberPromise.then(console.log) //-> 123
```
@codepen

```js
const numberPromise = Promise.reject( new Error("Borked") );

numberPromise.catch(console.log) //-> Error[Borked]
```
@codepen


## Creating promises from other promises

One of the most common uses of promises is to take a promise value and convert it to another
promise value.

A promise’s `.then( onFulfilled )` method always returns another _outer_ promise.  That _outer_ promise
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
> This is what it’s called in RxJS's [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll).

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

- The `fetch()` API returns a promise when a connection is
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


## Timing


Promises' callback handlers are run in the
`microtask queue` which is called at the end of the JavaScript
event loop. This means a few things.

First, callbacks of resolved promises are _not_ called
immediately. Instead they are called at the end of the
current event loop.

The following:

- sets a timeout callback for `1ms`
- runs code that should last longer than `20ms`
- sets a fulfilled promise callback



```js
const promise = Promise.resolve();

setTimeout( ()=> {
  console.log("timeout callback");
},1);

var total = 0
for(var i = 0; i < 100000; i++) {
  total +=  Math.sqrt(i) * (i % 2 === 0 ? 1 : -1)
}

promise.then( ()=> {
  console.log("promise fulfilled");
});

// Logs:
// "promise fulfilled"
// "timeout callback"
```
@codepen

Second, this also means that `resolving` a promise
does not call all callbacks immediately as shown
in the following example:

```js
let resolve;
const promise = new Promise( (pResolve)=> {
  resolve = pResolve;
} )


promise.then(()=> {
  console.log("promise fulfilled")
});

console.log("before resolve");
resolve();
console.log("after resolve");

// Logs:
// "before resolve"
// "after resolve"
// "promise fulfilled"
```
@codepen

Why was this done? Consistency. As developers, you
know that your callbacks will always be called sometime in the
future. If callbacks were called immediately, this would
have to be handled.

## Chaining vs callbacks

Without Promises, the common way of handling asynchronous behavior was
to pass a success and failure callback to functions as follows.

```js
doSomething( (filesData) => {
  processFiles(filesData.files, function(processedFilesData) => {
    writeHTML(processedFilesData.writableFiles, function() {
      console.log("completed!");
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

This is hard to read and results in the classic callback pyramid of doom 🔥🔥🔥!

Fortunately, promises make this better, by making a much more
linear process:


```js
getFiles()
  .then( (filesData) => {
    return processFiles(filesData.files);
  })
  .then( (processedFilesData) => {
    return writeHTML(processedFilesData.writableFiles);
  }).
  then( ()=> {
    console.log("completed!")
  })
  .catch( failureCallback );
```

## Promise queues

Often, you want to run a series of tasks, but those
tasks might be optional. Making this work with
promises can be tricky.

```js
let promise = getFiles();

if(options.debug) {
  promise = promise.then(printFiles)
}

promise = processFiles();

if(options.debug) {
  promise = promise.then(printProcessWarnings)
}

promise = promise.then(writeHTML);
```

One way to simplify this is to use a promiseQueue
that wires up functions to be called one after another.


```js
function promiseQueue(functions){
  var promise = functions.shift()();

  var func;
  while( functions.length ) {
    func = functions.shift();
    if(func) {
      promise = promise.then(func);
    }
  }
  return promise;
};

const promise = promiseQueue([
  getFiles,
  options.debug && printFiles,
  processFiles,
  options.debug && printProcessWarnings,
  writeHTML
]);
```

## Waiting for multiple async tasks to complete

Often, you might want to do two or more parallel tasks and
then do something with the result.  [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) takes
multiple promises and returns another promise when they all complete.

For example, you might want to compare the number of `hound` to `dingo` breed images.

One way of doing that would be to get hounds and get dings and compare:

```js
const time = new Date();

fetch("https://dog.ceo/api/breed/hound/images")

  .then( response=> response.json() )

  .then( (hounds) => {
    return fetch("https://dog.ceo/api/breed/dingo/images")
      .then( response => response.json() )
      .then( dingos => { return {hounds, dingos} })
  } )

  .then( ({hounds, dingos}) => {
    return {houndsCount: hounds.message.length, dingosCount: dingos.message.length}
  })

  .then( ({houndsCount, dingosCount}) => {
    console.log(`${houndsCount} hounds, ${dingosCount} dingos,
      time ${new Date() - time}`);
  } );
```
@codepen

But this would create one request after another.  Slow.

Instead, use `Promise.all()` to make both requests at the same time:

```js
const time = new Date();

const houndsPromise = fetch("https://dog.ceo/api/breed/hound/images")
  .then( response=> response.json() );

const dingosPromise = fetch("https://dog.ceo/api/breed/dingo/images")
  .then( response => response.json() )

Promise.all([houndsPromise, dingosPromise])
  .then( ([hounds, dingos])=> {
    return {houndsCount: hounds.message.length, dingosCount: dingos.message.length}
  })
  .then( ({houndsCount, dingosCount}) => {
    console.log(`${houndsCount} hounds, ${dingosCount} dingos,
      time ${new Date() - time}`);
  } );
```
@codepen


## Promises compared to alternatives

### Promises compared to callbacks

Callback functions can be passed to a function. In the following example,
`doSomething()` takes a completion callback:

```js
doSomething(someArg, function onComplete(err, data) {
  if(err) {
    // handle error case
  } else {
    // handle success
  }
});
```

This form of continuation passing is very common in Node.js.

__Callback positives:__

- Callbacks are lighter than promises - a function just needs to be created. Dispatching
  is also faster - a function just needs to be called.

__Callback negatives:__

- Callbacks only allow a single listener.
- Callbacks might be called immediately, which
  can create timing issues.
- Callbacks can create the _pyramid of doom_.

__When to use callbacks instead of promises__

If you are making something that needs to run extremely quickly and doesn’t need to
be user friendly, callbacks might be a good solution. After all, it’s not difficult to
"promisify" callback-based APIs.  Many libraries do exactly this.

### Promises compared to event streams

Event streams are any technology that might produce values
overtime.  For example, listening to a `click` event on the DOM
is a form of event stream:

```js
document.body.addEventListener("click", (event) => {
  console.log("Got a click event", event);
})
```

[learn-rxjs RxJS] is a functional-reactive event stream library. The following
uses RxJS to create an event stream (`subject`) that emits two random numbers:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Subject} = rxjs;

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(Math.random());
subject.next(Math.random());
subject.complete();
</script>
```
@codepen

Modern browsers even provide their own stream primitive - `ReadableStream`.
This lets you create a stream of events.

__Event stream positives:__

- Event streams can emit values over time.  Promise can not do this.
- Event streams can be cancelled. There’s no way to do this through the promise API.
- Event streams often have utility libraries, making deriving new event streams
  from other event streams easy.

__Event stream negatives:__

- You must stop listening to an event stream or end the stream to avoid memory leaks.
- Event streams are often heavier than Promises.
- With the exception of `ReadableStream` (which isn’t in every environment yet),
  streams are not part of the JavaScript specification and are not present in
  every environment. Promises come for free for almost every user.

__When to use streams instead of promises__

If your system produces a single "event", returning a promise is generally better than
returning an event stream.  Most event stream libraries have ways of converting a
promise to an event stream.

However, if your system produces multiple events, you have no choice but to
use some form of event stream.
