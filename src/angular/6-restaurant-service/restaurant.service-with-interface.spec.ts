import { TestBed } from '@angular/core/testing';

import { RestaurantService, ResponseData } from './restaurant.service';
import { Restaurant } from './restaurant';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RestaurantService', () => {
  let httpMock : HttpTestingController;
  let restaurantService: RestaurantService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      RestaurantService
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    restaurantService = TestBed.get(RestaurantService);
  })

  it('should be created', () => {
    expect(restaurantService).toBeTruthy();
  });
 
  it('should make a get request to restaurants', () => {
    const mockRestaurants = {
      data: [{
      "name":"Brunch Place",
      "slug":"brunch-place",
      "images":{
        "thumbnail":"node_modules/place-my-order-assets/images/4-thumbnail.jpg",
        "owner":"node_modules/place-my-order-assets/images/2-owner.jpg",
        "banner":"node_modules/place-my-order-assets/images/2-banner.jpg"},
        "menu":{
          "lunch":[
            {"name":"Ricotta Gnocchi","price":15.99},
            {"name":"Garlic Fries","price":15.99},
            {"name":"Charred Octopus","price":25.99}
          ],
          "dinner":[
            {"name":"Steamed Mussels","price":21.99},
            {"name":"Roasted Salmon","price":23.99},
            {"name":"Crab Pancakes with Sorrel Syrup","price":35.99}
          ]
        },
        "address":{
          "street":"2451 W Washburne Ave",
          "city":"Ann Arbor","state":"MI","zip":"53295"},
          "_id":"xugqxQIX5rPJTLBv"
        },
        {
          "name":"Taco Joint",
          "slug":"taco-joint",
          "images":{
            "thumbnail":"node_modules/place-my-order-assets/images/4-thumbnail.jpg",
            "owner":"node_modules/place-my-order-assets/images/2-owner.jpg",
            "banner":"node_modules/place-my-order-assets/images/2-banner.jpg"},
            "menu":{
              "lunch":[
                {"name":"Beef Tacos","price":15.99},
                {"name":"Chicken Tacos","price":15.99},
                {"name":"Guacamole","price":25.99}
              ],
              "dinner":[
                {"name":"Shrimp Tacos","price":21.99},
                {"name":"Chicken Enchilada","price":23.99},
                {"name":"Elotes","price":35.99}
              ]
            },
            "address":{
              "street":"13 N 21st St",
              "city":"Chicago","state":"IL","zip":"53295"},
              "_id":"xugqxQIX5dfgdgTLBv"
            }]
    };

    restaurantService.getRestaurants().subscribe((restaurants:ResponseData) => {
      expect(restaurants).toEqual(mockRestaurants);
    });

    let url = '/api/restaurants';
    const req = httpMock.expectOne(url);


    expect(req.request.method).toEqual('GET');
    req.flush(mockRestaurants);

    httpMock.verify();
  })

  it('can set proper properties on restaurant type', () => {
    let restaurant: Restaurant = {
      name:"Taco Joint",
      slug:"taco-joint",
      images:{
        thumbnail:"node_modules/place-my-order-assets/images/4-thumbnail.jpg",
        owner:"node_modules/place-my-order-assets/images/2-owner.jpg",
        banner:"node_modules/place-my-order-assets/images/2-banner.jpg"
      },
      menu:{
        lunch:[
          {name:"Beef Tacos","price":15.99},
          {name:"Chicken Tacos","price":15.99},
          {name:"Guacamole","price":25.99}
        ],
        dinner:[
          {name:"Shrimp Tacos","price":21.99},
          {name:"Chicken Enchilada","price":23.99},
          {name:"Elotes","price":35.99}
        ]
      },
      address:{
        street:"13 N 21st St",
        city:"Chicago","state":"IL","zip":"53295"
      },
      _id:"xugqxQIX5dfgdgTLBv"
    }
    //will error if interface isn't implemented correctly
    expect(true).toBe(true);
  });

});