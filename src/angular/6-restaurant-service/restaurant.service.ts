import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from './restaurant';

export interface Config {
  data: Restaurant[];
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get<Config>('/api/restaurants');
  }
}
