import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from './restaurant';

export interface ResponseData {
  data: Restaurant[];
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient) {}

  getRestaurants(): Observable<ResponseData> {
    return this.httpClient.get<ResponseData>(
      environment.apiUrl + '/restaurants'
    );
  }
}
