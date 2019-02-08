@page angular/writing-unit-tests Writing Unit Tests
@parent angular 11

@description Write a service unit test

@body

## Overview

In this part, we will:

- Get our existing tests to pass
- Run our tests
- Write a test to get cities and states

## Get our unit tests to work again

Update the following three files:

1\. __src/app/app.component.spec.ts__

@sourceref ./app.component.spec.ts
@highlight 18-19,31-33

2. __src/app/image-url.pipe.spec.ts__

@sourceref ./image-url.pipe.spec.ts

3. __src/app/restaurant.component.spec.ts__

@sourceref ./restaurant.component.spec.ts
@highlight 26,31,47-53

## Run our tests

Run the following in your terminal:

```shell
ng test
```

## Exercise: Write restaurant service test

__src/app/restaurant.service.spec.ts__

@sourceref ./restaurant.service.spec.ts
@highlight 7,10-15,18-19,38-41,43
