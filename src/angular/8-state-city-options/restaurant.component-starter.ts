import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RestaurantService, ResponseData } from './restaurant.service';
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
export class RestaurantComponent implements OnInit {
  form: FormGroup;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  public states = {
    isPending: false,
    value: [{name: "Illinois", short: "IL"}, {name: "Wisconsin", short: "WI"}]
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
    this.restaurants.isPending = true;

    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }

}
