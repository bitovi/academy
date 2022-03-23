import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant';
import { ResponseData, RestaurantService } from './restaurant.service';

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less'],
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants = res.data;
    });
  }
}
