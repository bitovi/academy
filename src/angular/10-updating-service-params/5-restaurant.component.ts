import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RestaurantService, Config, City, State } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  form: FormGroup;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  public states: Data<State> = {
    value: [],
    isPending: true
  }

  public cities: Data<City> = {
    value: [],
    isPending: true
  }

  private subscription: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();

    this.restaurantService.getStates().subscribe((res: Config<State>) => {
      this.states.value = res.data;
      this.states.isPending = false;
      this.form.get('state').enable();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: true},
      city: {value: '', disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    let state:string;
    this.form.get('state').valueChanges.subscribe(val => {
      if (val) {
        //only enable city if state has value
        this.form.get('city').enable({
          onlySelf: true,
          emitEvent: false
        });
        //if state has a value and has changed, clear previous city value
        if (state != val) {
          this.form.get('city').patchValue('');
          this.restaurants.value = [];
        }
        //fetch cities based on state val
        this.getCities(val);
        state = val;
      }
      else {
        //disable city if no value
        this.form.get('city').disable({
          onlySelf: true,
          emitEvent: false
        });
        state = '';
        //clear restaurant list
        this.restaurants.value = [];
      }
    });

    this.form.get('city').valueChanges.subscribe(val => {
      if (val) {
        //make new call to get restaurants with state and city
        this.getRestaurants(state, val);
      }
    });
  }

  getCities(state:string) {
    this.cities.isPending = true;
    this.restaurantService.getCities(state).subscribe((res: Config<City>) => {
      this.cities.value = res.data;
      this.cities.isPending = false;
      this.form.get('city').enable({
        onlySelf: true,
        emitEvent: false
      });
    });
  }

  getRestaurants(state: string, city: string) { //HIGHLIGHT THIS LINE
    this.restaurants.isPending = true;
    this.restaurantService.getRestaurants(state, city).subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}
