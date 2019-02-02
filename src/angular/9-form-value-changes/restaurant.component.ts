import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  form: FormGroup;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  public states = {
    isPending: false,
    value: [{name: "Illinois"}, {name: "Wisconsin"}]
  };

  public cities = {
    isPending: false,
    value: [{name: "Springfield"},{name: "Madison"}]
  }

  private subscription: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: false},
      city: {value: '', disabled: false},
    });

    this.onChanges();
  }
  onChanges(): void {
    const stateChanges = this.form.get('state').valueChanges.subscribe(val => {
      console.log('state', val);
    });
    this.subscription = stateChanges;


    const cityChanges = this.form.get('city').valueChanges.subscribe(val => {
      console.log('city', val);
    });
    this.subscription.add(cityChanges);
  }
}
