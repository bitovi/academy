import { Component, OnInit } from '@angular/core';
import { RestaurantService, ResponseData } from './restaurant.service';
import { Restaurant } from './restaurant';

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants = res.data;
    });
  }
}
