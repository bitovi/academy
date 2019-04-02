import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  restaurant: Restaurant;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.restaurantService.getRestaurant(slug)
     .subscribe((data:Restaurant) => {
       this.restaurant = data;
       this.isLoading = false;
      });
  }

  getUrl(image:string): string {
    // THIS IS A DIFFERENT WAY TO HANDLE THE IMAGE PATH
    return image.replace('node_modules/place-my-order-assets', './assets')
  }

}
