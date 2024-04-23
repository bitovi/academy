import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Restaurant } from './restaurant';
import { ResponseData, RestaurantService } from './restaurant.service';

export interface Data {
  value: Restaurant[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
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

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.restaurants.isPending = true;
    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }

  createForm(): FormGroup<{
    state: FormControl<string>;
    city: FormControl<string>;
  }> {

  }
}
