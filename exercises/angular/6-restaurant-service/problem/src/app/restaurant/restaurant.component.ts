import { Component, OnInit } from '@angular/core';

const fakeRestaurants = [
  {
    name: 'Poutine Palace',
    slug: 'poutine-palace',
    images: {
      thumbnail: 'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
      owner: 'node_modules/place-my-order-assets/images/3-owner.jpg',
      banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
    },
    menu: {
      lunch: [
        {
          name: 'Crab Pancakes with Sorrel Syrup',
          price: 35.99,
        },
        {
          name: 'Steamed Mussels',
          price: 21.99,
        },
        {
          name: 'Spinach Fennel Watercress Ravioli',
          price: 35.99,
        },
      ],
      dinner: [
        {
          name: 'Gunthorp Chicken',
          price: 21.99,
        },
        {
          name: 'Herring in Lavender Dill Reduction',
          price: 45.99,
        },
        {
          name: 'Chicken with Tomato Carrot Chutney Sauce',
          price: 45.99,
        },
      ],
    },
    address: {
      street: '230 W Kinzie Street',
      city: 'Green Bay',
      state: 'WI',
      zip: '53205',
    },
    _id: '3ZOZyTY1LH26LnVw',
  },
  {
    name: 'Cheese Curd City',
    slug: 'cheese-curd-city',
    images: {
      thumbnail: 'node_modules/place-my-order-assets/images/2-thumbnail.jpg',
      owner: 'node_modules/place-my-order-assets/images/3-owner.jpg',
      banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
    },
    menu: {
      lunch: [
        {
          name: 'Ricotta Gnocchi',
          price: 15.99,
        },
        {
          name: 'Gunthorp Chicken',
          price: 21.99,
        },
        {
          name: 'Garlic Fries',
          price: 15.99,
        },
      ],
      dinner: [
        {
          name: 'Herring in Lavender Dill Reduction',
          price: 45.99,
        },
        {
          name: 'Truffle Noodles',
          price: 14.99,
        },
        {
          name: 'Charred Octopus',
          price: 25.99,
        },
      ],
    },
    address: {
      street: '2451 W Washburne Ave',
      city: 'Green Bay',
      state: 'WI',
      zip: '53295',
    },
    _id: 'Ar0qBJHxM3ecOhcr',
  },
];

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  restaurants: any[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.restaurants = fakeRestaurants;
    }, 500);
  }
}
