import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant } from './restaurant';

export interface ResponseData<dataType> {
  data: Array<dataType>;
}

export interface State {
  name: string;
  short: string;
}

export interface City {
  name: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get<ResponseData<Restaurant>>('/api/restaurants');
  }

  getStates() {
    return this.httpClient.get<ResponseData<State>>('/api/states');
  }

  getCities(state:string) {
    const params = new HttpParams().set('state', state);
    return this.httpClient.get<ResponseData<City>>('/api/cities', {params});
  }
}