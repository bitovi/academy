import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Restaurant } from './restaurant';
import {
  City,
  ResponseData,
  RestaurantService,
  State,
} from './restaurant.service';

export interface Data<T> {
  value: T[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  form: FormGroup<{
    state: FormControl<string>;
    city: FormControl<string>;
  }> = this.createForm();

  restaurants: Data<Restaurant> = {
    value: [],
    isPending: false,
  };

  states: Data<State> = {
    isPending: false,
    value: [],
  };

  cities: Data<City> = {
    isPending: false,
    value: [],
  };

  private onDestroy$ = new Subject<void>();

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStates();
    this.onChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  createForm(): FormGroup<{
    state: FormControl<string>;
    city: FormControl<string>;
  }> {
    return this.fb.nonNullable.group({
      state: { value: '', disabled: true },
      city: { value: '', disabled: true },
    });
  }

  onChanges(): void {
    let state: string = this.form.controls.state.value;

    this.form.controls.state.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) => {
        this.restaurants.value = [];
        if (val) {
          // only enable city if state has value
          this.form.controls.city.enable({
            onlySelf: true,
            emitEvent: false,
          });

          // if state has a value and has changed, clear previous city value
          if (state !== val) {
            this.form.controls.city.setValue('');
          }

          // fetch cities based on state val
          this.getCities(val);
        } else {
          // disable city if no value
          this.form.controls.city.disable({
            onlySelf: true,
            emitEvent: false,
          });
        }
        state = val;
      });

    this.form.controls.city.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) => {
        if (val) {
          this.getRestaurants(state, val);
        }
      });
  }

  getStates(): void {
    this.restaurantService
      .getStates()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: ResponseData<State>) => {
        this.states.value = res.data;
        this.states.isPending = false;
        this.form.controls.state.enable();
      });
  }

  getCities(state: string): void {
    this.cities.isPending = true;
    this.restaurantService
      .getCities(state)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: ResponseData<City>) => {
        this.cities.value = res.data;
        this.cities.isPending = false;
        this.form.controls.city.enable({
          onlySelf: true,
          emitEvent: false,
        });
      });
  }

  getRestaurants(state: string, city: string): void {
    this.restaurantService
      .getRestaurants(state, city)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: ResponseData<Restaurant>) => {
        this.restaurants.value = res.data;
        this.restaurants.isPending = false;
      });
  }
}
