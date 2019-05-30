import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant } from './restaurant';
import { environment } from '../../environments/environment';

export interface ResponseData {
  data: Restaurant[];
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get<ResponseData>(environment.apiUrl + '/restaurants');
  }

  getStates() {
    return this.httpClient.get<any>(environment.apiUrl + '/states');
  }

  getCities(state:string) {
    const params = new HttpParams().set('state', state);
    return this.httpClient.get<any>(environment.apiUrl + '/cities', {params});
  }
}