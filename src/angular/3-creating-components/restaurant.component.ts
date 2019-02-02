import { Component, OnInit } from '@angular/core';

interface Item {
    name: string;
    price: number;
}
interface Menu {
    lunch: Array<Item>;
    dinner: Array<Item>;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface Images {
    thumbnail: string;
    owner: string;
    banner: string;
}

export interface Restaurant {
    name: string;
    slug: string;
    images: Images;
    menu: Menu;
    address: Address;
    _id: string;
}

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
  }

  constructor() { }

  ngOnInit() {
  }

}
