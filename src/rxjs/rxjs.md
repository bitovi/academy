@page RxJS RxJS
@parent bit-u 5
@outline 2

@description Learn RxJS.


## Basics

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;

const observable = Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');
</script>
```
@codepen

Now lets count those numbers:


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;

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
	var sum = 0;
	var subscription = numberMaker.subscribe({
		next: number => {
			sum += number;
			observer.next(sum);
		},
		error: err => observer.error(err),
		complete: () => observer.complete(),
	});
	return () => {
		subscription.unsubscribe();
	};
})

console.log('just before subscribe');
numberSummer.subscribe({
	next: x => console.log('got value ' + x),
	error: err => console.error('something wrong occurred: ' + err),
	complete: () => console.log('done'),
});
console.log('just after subscribe');
</script>
```
@codepen


## Intro

### Sub Heading

## Second
