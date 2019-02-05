import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
  }

  getUrl(image:string): string {
    // THIS IS A DIFFERENT WAY TO HANDLE THE IMAGE PATH
    return image.replace('node_modules/place-my-order-assets', './assets')
  }

}