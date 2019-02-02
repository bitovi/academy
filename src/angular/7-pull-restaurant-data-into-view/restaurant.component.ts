import { Component, OnInit } from '@angular/core';
import { RestaurantService, Config } from './restaurant.service';
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
  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  };
  config: Config;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {

    this.restaurantService.getRestaurants().subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}
