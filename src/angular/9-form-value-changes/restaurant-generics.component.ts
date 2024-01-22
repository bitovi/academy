import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Restaurant } from './restaurant';
import { ResponseData, RestaurantService } from './restaurant.service';

export interface Data {
  value: Restaurant[];
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

  restaurants: Data = {
    value: [],
    isPending: false,
  };

  states = {
    isPending: false,
    value: [
      { name: 'Illinois', short: 'IL' },
      { name: 'Wisconsin', short: 'WI' },
    ],
  };

  cities = {
    isPending: false,
    value: [{ name: 'Springfield' }, { name: 'Madison' }],
  };

  private onDestroy$ = new Subject<void>();

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.restaurants.isPending = true;
    this.restaurantService
      .getRestaurants()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: ResponseData<Restaurant>) => {
        this.restaurants.value = res.data;
        this.restaurants.isPending = false;
      });

    this.form.controls.state.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) => {
        console.log('state', val);
      });

    this.form.controls.city.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) => {
        console.log('city', val);
      });
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
      state: { value: '', disabled: false },
      city: { value: '', disabled: false },
    });
  }
}
