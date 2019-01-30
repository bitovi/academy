@page angular-setup Data Binding
@parent angular 3

@description Data Binding

@body

## Data Binding

Let's empower our user to be able to select restaurants based on their city. There will be a dropdown to allow a user to pick their state, and a second dropdown populated by cities in those state.

![Place My Order App city state picker](../static/img/restaurant-list.png "Place My Order App city state picker")

We can start by adding two new methods to our ``RestaurantService``.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from './restaurant';

export interface Config {
  data: Restaurant[];
}

@@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get<Config>('/api/restaurants');
  }

  getStates() {
    return this.httpClient.get<Config>('/api/states');
  }

  getCities() {
    return this.httpClient.get<Config>('/api/cities');
  }
}
```

We want our list of states available initially for the user to interact with, so we'll add the call to our ``RestaurantService getStates`` method in our
