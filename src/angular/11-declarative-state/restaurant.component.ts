import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest, merge } from 'rxjs';
import { startWith, map, flatMap, shareReplay } from 'rxjs/operators';

import { RestaurantService, ResponseData, State, City } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

const toData = map(function<T>(response: ResponseData<T>) : Data<T> {
  return {
    value: response.data,
    isPending: false
  }
});

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: Observable<Data<Restaurant>>;
  public states: Observable<Data<State>>;
  public cities: Observable<Data<City>>;

  public selectedState = new BehaviorSubject('');
  public selectedCity = new BehaviorSubject('');
  public displayedCity: Observable<string>;
  public stateSelectDisabled: Observable<boolean>;
  public citySelectDisabled: Observable<boolean>;

  constructor(
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.states = this.restaurantService.getStates().pipe(
      toData,
      startWith({ isPending: true, value: [] }),
      shareReplay(1),
    );
    this.stateSelectDisabled = this.states.pipe(
        map(states => states.value.length === 0)
    );

    this.cities = this.selectedState.pipe(
        flatMap((state) => {
          if (state) {
            return this.restaurantService.getCities(state).pipe(
              toData,
              startWith({ isPending: true, value: [] })
            )
          } else {
            return of({ isPending: false, value: [] });
          }
        }),
        shareReplay(1),
    );
    this.citySelectDisabled = this.cities.pipe(
      map(cities => cities.value.length === 0)
    );
    this.displayedCity = merge(
      this.selectedState.pipe(map(() => '')),
      this.selectedCity
    );

    this.restaurants = combineLatest(this.displayedCity, this.selectedState).pipe(
      flatMap(([city, state]) => {
        if (city && state) {
          return this.restaurantService.getRestaurants(state, city).pipe(
            toData,
            startWith({ isPending: true, value: [] })
          )
        } else {
          return of({ isPending: false, value: [] });
        }
      }),
      shareReplay(1),
    );
  }
}
