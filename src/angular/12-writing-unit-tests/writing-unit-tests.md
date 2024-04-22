@page learn-angular/writing-unit-tests Writing Unit Tests
@parent learn-angular 12

@description Write a unit test for a service in Angular.

@body

## Overview

In this part, we will:

- Write a new `getRestaurant` method on our `RestaurantsService`
- Write a unit test for the `getRestaurant` method

## Problem

In the next section we’re going to be creating a restaurant detail view. We’ll need to have a `getRestaurant` method on our service that returns one restaurant from the list. Once the method is set up, write a unit test ensuring it makes the correct request and returns an object type of `Restaurant`.

## What you need to know

- How to write a unit test. Here’s a codeblock to get you started:

  ```typescript
  it('should make a GET request to get a restaurant based on its slug', () => {
    
  });
  ```

- How to use `HttpTestingController` to test `HttpClient` calls.

## HttpTestingController

<a href="https://angular.io/guide/http-test-requests">Angular’s HTTP testing library</a> was designed with a pattern in mind:

1. Make a request;
2. Expect one or more requests have (or not have) been made;
3. Perform assertions;
4. Resolve requests (flush);
5. Verify there are no unexpected requests.

Items `2` through `5` are covered by the Angular `HttpTestingController`, which enables mocking and flushing of requests.

The `HttpClientTestingModule` needs to be imported in the TestBed, and `HttpTestingController` can be injected using the TestBed for usage within test blocks.

For this exercise, both `HttpClientTestingModule` and `HttpTestingController` are already configured in `restaurant.service.spec.ts` file.

You can access `HttpTestingController` with the `httpTestingController` variable.

### Expecting a request to be made

`expectOne` method is handy when you want to test if a single request was made. `expectOne` will return a <a href="https://angular.io/api/common/http/testing/TestRequest">TestRequest</a> object in case a matching request was made. If no request or more than one request was made, it will fail with an error.

```typescript
const req = httpTestingController.expectOne('/api/states');
```

### Verifying the request

A `TestRequest`’s `request` property provides access to a wide variety of properties that may be used in a test. For example, if we want to ensure an HTTP GET request is made:

```typescript
expect(req.request.method).toEqual('GET');
```

### Flushing request data

Without a specific command, outgoing requests will keep waiting for a response forever. You can resolve requests by using the `TestRequest`’s `flush` method

```typescript
req.flush(mockStates);
```

### Avoiding the unexpected

When testing service methods in isolation, it’s better to ensure we don't have unexpected effects. `HttpTestingController`’s `verify` method ensures there are no unmatched requests that were not handled.

```typescript
httpTestingController.verify();
```

### Putting it all together

```typescript
it('should make a GET request to get the states data', () => {
  const mockStates = {
    data: [{ name: 'California', short: 'CA' }]
  };

  service
    .getStates()
    .subscribe((states: State[]) => {
      expect(states).toEqual(mockStates);
    });

  const req = httpTestingController.expectOne('/api/states');

  expect(req.request.method).toEqual('GET');
  req.flush(mockStates);

  httpTestingController.verify();
});
```

## Setup

✏️ Update **src/app/restaurant/restaurant.service.ts** file with the new getRestaurants method:

@diff ../10-updating-service-params/restaurant.service-httpparams.ts ./restaurant.service.ts only

## Solution

> Hint: you may use existing tests on the service as a guide.

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.service.spec.ts**

@diff ../10-updating-service-params/restaurant.service-httpparams.spec.ts ./restaurant.service.spec-withrestaurant.ts only

</details>
