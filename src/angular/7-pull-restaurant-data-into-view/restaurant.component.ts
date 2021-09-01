import { Component, OnInit } from '@angular/core';
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
export class RestaurantComponent implements OnInit {
 restaurants: Data = {
    value: [],
    isPending: false
  };
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurants.isPending = true;
    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}
