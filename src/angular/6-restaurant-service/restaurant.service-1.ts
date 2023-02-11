import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/restaurants');
  }
}
