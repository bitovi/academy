@page learn-rxjs/basics Basics
@parent learn-rxjs 0

@description Learn the basics of RxJS.

@body

## Overview

In this part, we will learn:

- What is an observable and how subscribe to one.
- How to transform one observable into another one.
- What is a Subject and how is it different from an observable.

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/vnEitL000PE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Observables

At its most simplistic, an observable is a publisher and
enables the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

To subscribe to an RXJS observable, you call subscribe like:

```js
observable.subscribe(function(value){ ... });
```

When the observable publishes a value, the subscribe functions will
be called with the value. The following creates an
observable that emits 3 values. The `subscriber` function
will be called back each time:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  const observable = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
  });

  function subscriber(value) {
    console.log('got value ' + value);
    // Logs 1, 2, 3
  }

  observable.subscribe(subscriber);
</script>
```

@codepen

One of the advantages of the Observer pattern is that it
provides loose coupling. An observable can have many
subscribers. The following adds two subscribers to an
observable:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  const observable = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
  });

  function subscriberA(value) {
    console.log('A got value ' + value); // Logs 1, 2, 3
  }

  function subscriberB(value) {
    console.log('B got value ' + value); // Logs 1, 2, 3
  }

  observable.subscribe(subscriberA);
  observable.subscribe(subscriberB);
</script>
```

@codepen

### Lifecycles

RxJS observables have a lifecycle. They can publish values over
time and complete. They can also publish errors. You can listen
to all three events with the following:

```js
observable.subscribe({
  next: function (value) { ... },
  error: function (error) { ... },
  complete: function () { ... },
});
```

The following creates an observable that immediately
publishes a `1`, then after a second it publishes a `2`
and completes:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  const observable = Observable.create(function (observer) {
    observer.next(1);
    setTimeout(() => {
      observer.next(2);
      observer.complete();
    }, 1000);
  });

  console.log('just before subscribe');
  observable.subscribe({
    next: (x) => console.log('got value ' + x),
    complete: () => console.log('done'),
  });
  console.log('just after subscribe');

  // The following is logged:
  //   just before subscribe
  //   got value 1
  //   just after subscribe
  //   got value 2
  //   done
</script>
```

@codepen

When an observable _completes_, all of its subscribers are
unsubscribed. This helps avoid memory leaks.

> **NOTE:** When the observable is subscribed,
> the `1` value is published synchronously. Then
> `'just after subscribe'` is logged.

### Unsubscribing

The `observable.subscribe()` method returns
a [subscription](https://rxjs.dev/api/index/class/Subscription) which can be used to cancel
the subscription like:

```js
var subscription = observable.subscribe( ... );
subscription.unsubscribe();
```

Unsubscribing prevents receiving future notifications and avoids memory leaks.

The following unsubscribes after the first published value. Notice that
the `subscriber` function is only called once.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  const observable = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.complete();
  });

  var subscription = observable.subscribe(
    function subscriber(value) {
      console.log("got", value);
      subscription.unsubscribe();
    }
  );
</script>
```

@codepen

### Transforming observables to other observables

Observable libraries like RxJS have many operators that transform
published values on one observable to published observables
on another observable. In fact, using these operators is
a majority of what you will do with RxJS.

But for now, lets see how to transform  
... the numbers published on the `numberMaker` observable ...  
into  
... a running sum published by `numberSummer`.

Read the inline comments below to see how this works.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  // numberMaker emits 1,2,3 waits a second then emits 4.
  const numberMaker = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
      observer.next(4);
      observer.complete();
    }, 1000);
  });

  const numberSummer = Observable.create(function (observer) {
    // When numberSummer is subscribed to, it subscribes to
    // numberMaker.
    var sum = 0;
    var subscription = numberMaker.subscribe({
      // When numberMaker published values, we
      // add to the sum and publish the new sum.
      next: (number) => {
        sum += number;
        observer.next(sum);
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });

    // This function gets called when numberSummer
    // is unsubscribed.
    return () => {
      subscription.unsubscribe();
    };
  })

  console.log('just before subscribe');
  numberSummer.subscribe({
    next: (x) => console.log('got value ' + x),
    error: (err) => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
  });
  console.log('just after subscribe');
</script>
```

@codepen

## Observables vs Subjects

Each time an observable is subscribed to, it creates a new
and distinct execution context. This can be unexpected or
even undesirable. Lets see what a distinct execution means.

In the following example, the observable emits a random number
after a second then completes. Notice that each subscriber gets a different
random value.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  const observable = Observable.create(function (observer) {
    setTimeout(function () {
      observer.next(Math.random());
      observer.complete();
    }, 1000);
  });

  var subscriptionA = observable.subscribe(
    (value) => console.log("A got", value)
  );

  var subscriptionB = observable.subscribe(
    (value) => console.log("B got", value)
  );
</script>
```

@codepen

Each subscription gets a different random value because
every subscription creates a new observable execution. The following
example shows this more directly.
The example logs _'observable execution'_ each time `observable.subscribe`
is called:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Observable } = rxjs;

  const observable = Observable.create(function (observer) {
    console.log("observable execution");
    observer.next(1);
    setTimeout(function () {
      observer.next(2);
      observer.complete();
    });
  });

  console.log('subscriptionA - start');
  var subscriptionA = observable.subscribe({
    next: (x) => console.log('subscriptionA got value ' + x),
  });
  console.log('subscriptionA - end');

  console.log('subscriptionB - start');
  var subscriptionB = observable.subscribe({
    next: (x) => console.log('subscriptionB got value ' + x),
  });
  console.log('subscriptionB - end');
</script>
```

@codepen

Observables are _unicast_ (each subscription owns an independent execution of the observable). This can often have undesirable results. For example,
you often want multiple subscribers receiving the same value.

`Subjects` are just like Observables except they publish values
to many observables at once without creating new execution contexts.

In the following example, you'll notice that each subscription gets
the same random value:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Subject } = rxjs;

  const subject = new Subject<number>();

  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`),
  });
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });

  subject.next(Math.random());
  subject.complete();
</script>
```

@codepen

As subjects have a `.next()`, `.error()` and `.complete()` method, they
can also be useful object to connect with a framework's template engine as
we will do in the next part.
