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
  styleUrl: './restaurant.component.less',
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
      .subscribe((value) => {
        this.restaurants.value = [];
        if (value) {
          // only enable city if state has value
          this.form.controls.city.enable({
            emitEvent: false,
          });

          // if state has a value and has changed, clear previous city value
          if (state !== value) {
            this.form.controls.city.setValue('');
          }

          // fetch cities based on state value
          this.getCities(value);
        } else {
          // disable city if no value
          this.form.controls.city.disable({
            emitEvent: false,
          });
        }
        state = value;
      });

    this.form.controls.city.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        if (value) {
          this.getRestaurants();
        }
      });
  }

  getStates(): void {
    this.states.isPending = true;
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
          emitEvent: false,
        });
      });
  }

  getRestaurants(): void {
    this.restaurants.isPending = true;
    this.restaurantService
      .getRestaurants()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: ResponseData<Restaurant>) => {
        this.restaurants.value = res.data;
        this.restaurants.isPending = false;
      });
  }
}
