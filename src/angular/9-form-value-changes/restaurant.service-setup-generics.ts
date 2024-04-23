import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from './restaurant';

export interface ResponseData {
  data: Restaurant[];
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

  constructor(private httpClient: HttpClient) {}

  getRestaurants(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(
      environment.apiUrl + '/restaurants'
    );
  }

  getStates(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/states');
  }

  getCities(state: string): Observable<any> {
    const params = new HttpParams().set('state', state);
    return this.httpClient.get<any>(environment.apiUrl + '/cities', { params });
  }
}
