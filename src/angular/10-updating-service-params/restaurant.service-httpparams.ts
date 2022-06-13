import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from './restaurant';

export interface ResponseData<DataType> {
  data: DataType[];
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
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient) {}

  getRestaurants(
    state: string,
    city: string
  ): Observable<ResponseData<Restaurant>> {
    const params = new HttpParams()
      .set('filter[address.state]', state)
      .set('filter[address.city]', city);
    return this.httpClient.get<ResponseData<Restaurant>>(
      environment.apiUrl + '/restaurants',
      { params }
    );
  }

  getStates(): Observable<ResponseData<State>> {
    return this.httpClient.get<ResponseData<State>>(
      environment.apiUrl + '/states'
    );
  }

  getCities(state: string): Observable<ResponseData<City>> {
    const params = new HttpParams().set('state', state);
    return this.httpClient.get<ResponseData<City>>(
      environment.apiUrl + '/cities',
      { params }
    );
  }
}
