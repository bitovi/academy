@page angular/writing-unit-tests Writing Unit Tests
@parent angular 17

@description Writing Unit Tests

@body

## Overview

In this part, we will:

- Learn to run tests
- Test components
- Understand NO_ERROR_SCHEMA
- Test components with services
  - Learn to mock services
- Test child components
- Test services
- Test pipes

## Running Tests

When using the angular cli, any new component, service, pipe, etc, will have a .spec file generated alongside it with a default "this thing exists and can be initialized" type test. 

Tests are run from the command `npm test`.

## Testing Components

Let's look at the base app component the angular cli created, `src/app/app.component.ts`. We made some changes to the markup of this component but never updated our tests. The test is currently failing, because it's expecting the h1 tag to contain "PlaceMyOrder". At this point in our development, the h1 in the home page currently contains "place-my-order.com", so let's update the test to expect that by changing the `src/app/app.component.spec.ts` file.

## Testing Components with Child Components

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Testing Components with Services



## Updating base passing tests

<details>
<summary>Click to view tests</summary>


__src/app/app.component.spec.ts__

@sourceref ./app.component.spec.ts

__src/app/image-url.pipe.spec.ts__

@sourceref ./image-url.pipe.spec.ts

__src/app/restaurant.component.spec.ts__

@sourceref ./restaurant.component.spec.ts

__src/app/restaurant.service.spec.ts__

@sourceref ./restaurant.service.spec.ts

__src/app/restaurant/detail/detail.component.spec.ts__

@sourceref ./detail.component.spec.ts

__src/app/order/order.component.spec.ts__

@sourceref ./order.component.spec.ts

__src/app/order/order.service.spec.ts__

@sourceref ./order.service.spec.ts

__src/app/order/history/history.component.spec.ts__

@sourceref ./history.component.spec.ts

__src/app/order/list/list.component.spec.ts__

@sourceref ./list.component.spec.ts

</details>



