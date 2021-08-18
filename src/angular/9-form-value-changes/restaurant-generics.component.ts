import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from "rxjs/operators";
import { Subject } from 'rxjs';

import { RestaurantService, ResponseData } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data {
  value: Restaurant[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  form: FormGroup;

  restaurants: Data = {
    value: [],
    isPending: false
  }

  states = {
    isPending: false,
    value: [{name: "Illinois", short: "IL"}, {name: "Wisconsin", short: "WI"}]
  };

  cities = {
    isPending: false,
    value: [{name: "Springfield"},{name: "Madison"}]
  }

  private unSubscribe = new Subject<void>();

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();

    this.restaurantService.getRestaurants().subscribe((res: ResponseData<Restaurant>) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }

  ngOnDestroy() {
    this.unSubscribe.next()
    this.unSubscribe.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: false},
      city: {value: '', disabled: false},
    });

    this.onChanges();
  }
  onChanges(): void {
    this.form.get('state').valueChanges.pipe(takeUntil(this.unSubscribe)).subscribe(val => {
      console.log('state', val);
    });


    this.form.get('city').valueChanges.pipe(takeUntil(this.unSubscribe)).subscribe(val => {
      console.log('city', val);
    });
  }
}