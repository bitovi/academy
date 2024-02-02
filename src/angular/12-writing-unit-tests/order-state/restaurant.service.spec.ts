import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('RestaurantService', () => {
  let httpTestingController: HttpTestingController;
  let restaurantService: RestaurantService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantService],
    })
  );

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    restaurantService = TestBed.get(RestaurantService);
  });

  it('should be created', () => {
    expect(restaurantService).toBeTruthy();
  });

  it('should make a GET request to states', () => {
    const mockStates = {
      data: [{ name: 'Missouri', short: 'MO' }],
    };

    restaurantService.getStates().subscribe((states) => {
      expect(states).toEqual(mockStates);
    });

    let url = '/api/states';
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush(mockStates);

    httpTestingController.verify();
  });

  it('should make a GET request to cities', () => {
    const mockCities = {
      data: [{ name: 'Kansas City', state: 'MO' }],
    };

    restaurantService.getCities('MO').subscribe((cities) => {
      expect(cities).toEqual(mockCities);
    });

    let url = '/api/cities?state=MO';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCities);

    httpTestingController.verify();
  });

  it('should make a GET request to restaurant', () => {
    const mockRestaurant = {
      name: 'Brunch Place',
      slug: 'brunch-place',
      images: {
        thumbnail: 'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
        owner: 'node_modules/place-my-order-assets/images/2-owner.jpg',
        banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
      },
      menu: {
        lunch: [
          { name: 'Ricotta Gnocchi', price: 15.99 },
          { name: 'Garlic Fries', price: 15.99 },
          { name: 'Charred Octopus', price: 25.99 },
        ],
        dinner: [
          { name: 'Steamed Mussels', price: 21.99 },
          { name: 'Roasted Salmon', price: 23.99 },
          { name: 'Crab Pancakes with Sorrel Syrup', price: 35.99 },
        ],
      },
      address: {
        street: '2451 W Washburne Ave',
        city: 'Ann Arbor',
        state: 'MI',
        zip: '53295',
      },
      _id: 'xugqxQIX5rPJTLBv',
    };

    restaurantService.getRestaurant('potato-palace').subscribe((restaurant) => {
      expect(restaurant).toEqual(mockRestaurant);
    });

    let url = '/api/restaurants/potato-palace?';
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush(mockRestaurant);

    httpTestingController.verify();
  });
});
