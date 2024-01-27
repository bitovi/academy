import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Restaurant } from './restaurant';
import { ResponseData, RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let httpMock: HttpTestingController;
  let service: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a get request to restaurants', () => {
    const mockRestaurants = {
      data: [
        {
          name: 'Brunch Place',
          slug: 'brunch-place',
          images: {
            thumbnail:
              'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
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
        },
        {
          name: 'Taco Joint',
          slug: 'taco-joint',
          images: {
            thumbnail:
              'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
            owner: 'node_modules/place-my-order-assets/images/2-owner.jpg',
            banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
          },
          menu: {
            lunch: [
              { name: 'Beef Tacos', price: 15.99 },
              { name: 'Chicken Tacos', price: 15.99 },
              { name: 'Guacamole', price: 25.99 },
            ],
            dinner: [
              { name: 'Shrimp Tacos', price: 21.99 },
              { name: 'Chicken Enchilada', price: 23.99 },
              { name: 'Elotes', price: 35.99 },
            ],
          },
          address: {
            street: '13 N 21st St',
            city: 'Chicago',
            state: 'IL',
            zip: '53295',
          },
          _id: 'xugqxQIX5dfgdgTLBv',
        },
      ],
    };

    service.getRestaurants().subscribe((restaurants: ResponseData) => {
      expect(restaurants).toEqual(mockRestaurants);
    });

    const url = 'http://localhost:7070/restaurants';
    const req = httpMock.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush(mockRestaurants);

    httpMock.verify();
  });

  it('can set proper properties on restaurant type', () => {
    const restaurant: Restaurant = {
      name: 'Taco Joint',
      slug: 'taco-joint',
      images: {
        thumbnail: 'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
        owner: 'node_modules/place-my-order-assets/images/2-owner.jpg',
        banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
      },
      menu: {
        lunch: [
          { name: 'Beef Tacos', price: 15.99 },
          { name: 'Chicken Tacos', price: 15.99 },
          { name: 'Guacamole', price: 25.99 },
        ],
        dinner: [
          { name: 'Shrimp Tacos', price: 21.99 },
          { name: 'Chicken Enchilada', price: 23.99 },
          { name: 'Elotes', price: 35.99 },
        ],
      },
      address: {
        street: '13 N 21st St',
        city: 'Chicago',
        state: 'IL',
        zip: '53295',
      },
      _id: 'xugqxQIX5dfgdgTLBv',
    };
    // will error if interface isn’t implemented correctly
    expect(true).toBe(true);
  });

  it('should make a get request to states', () => {
    const mockStates = {
      data: [{ name: 'Missouri', short: 'MO' }],
    };

    service.getStates().subscribe((states) => {
      expect(states).toEqual(mockStates);
    });

    const url = 'http://localhost:7070/states';
    const req = httpMock.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush(mockStates);

    httpMock.verify();
  });

  it('should make a get request to cities', () => {
    const mockCities = {
      data: [{ name: 'Kansas City', state: 'MO' }],
    };

    service.getCities('MO').subscribe((cities) => {
      expect(cities).toEqual(mockCities);
    });

    const url = 'http://localhost:7070/cities?state=MO';
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCities);

    httpMock.verify();
  });
});
