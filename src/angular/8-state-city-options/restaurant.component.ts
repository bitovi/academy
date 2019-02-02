import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: false},
      city: {value: '', disabled: false},
    });
  }

}
