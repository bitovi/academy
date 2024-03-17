import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant';
import { ResponseData, RestaurantService } from './restaurant.service';

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((res: ResponseData) => {
      this.restaurants = res.data;
    });
  }
}
