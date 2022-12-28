import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ImageUrlPipe } from '../image-url.pipe';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from './restaurant.service';

class MockRestaurantService {
  getRestaurants() {
    return of({
      data: [
        {
          name: 'Poutine Palace',
          slug: 'poutine-palace',
          images: {
            thumbnail:
              'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
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
            thumbnail:
              'node_modules/place-my-order-assets/images/2-thumbnail.jpg',
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
      ],
    });
  }
}

describe('RestaurantComponent', () => {
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [RestaurantComponent, ImageUrlPipe],
      providers: [
        { provide: RestaurantService, useClass: MockRestaurantService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantComponent);
  });

  it('should create', () => {
    const component: RestaurantComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Restaurants');
  });

  it('should not show any restaurants markup if no restaurants', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.restaurant')).toBe(null);
  });

  it('should have two .restaurant divs', fakeAsync((): void => {
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const restaurantDivs = compiled.getElementsByClassName('restaurant');
    const hoursDivs = compiled.getElementsByClassName('hours-price');
    expect(restaurantDivs.length).toEqual(2);
    expect(hoursDivs.length).toEqual(2);
  }));

  it('should display restaurant information', fakeAsync((): void => {
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.restaurant h3')?.textContent).toContain(
      'Poutine Palace'
    );
  }));

  it('should set restaurants value to restaurants response data and set isPending to false', fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const expectedRestaurants = {
      value: [
        {
          name: 'Poutine Palace',
          slug: 'poutine-palace',
          images: {
            thumbnail:
              'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
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
            thumbnail:
              'node_modules/place-my-order-assets/images/2-thumbnail.jpg',
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
      ],
      isPending: false,
    };
    expect(fixture.componentInstance.restaurants).toEqual(expectedRestaurants);
  }));

  it('should show a loading div while isPending is true', () => {
    fixture.detectChanges();
    fixture.componentInstance.restaurants.isPending = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBeTruthy();
  });

  it('should not show a loading div if isPending is false', () => {
    fixture.detectChanges();
    fixture.componentInstance.restaurants.isPending = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBe(null);
  });

  it('should have a form property with city and state keys', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.form.controls['state']).toBeTruthy();
    expect(fixture.componentInstance.form.controls['city']).toBeTruthy();
  });

  it('should show a state dropdown', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const stateSelect = compiled.querySelector(
      'select[formcontrolname="state"]'
    );
    expect(stateSelect).toBeTruthy();
  });

  it('should show a city dropdown', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const citySelect = compiled.querySelector('select[formcontrolname="city"]');
    expect(citySelect).toBeTruthy();
  });
});
