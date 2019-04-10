import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs'; 
import { ImageUrlPipe } from '../image-url.pipe';

import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from './restaurant.service';

class MockRestaurantService {
  getRestaurants() {
    return of({
      data: [{
        "name": "Poutine Palace",
        "slug": "poutine-palace",
        "images": {
          "thumbnail": "node_modules/place-my-order-assets/images/4-thumbnail.jpg",
          "owner": "node_modules/place-my-order-assets/images/3-owner.jpg",
          "banner": "node_modules/place-my-order-assets/images/2-banner.jpg"
        },
        "menu": {
          "lunch": [
            {
              "name": "Crab Pancakes with Sorrel Syrup",
              "price": 35.99
            },
            {
              "name": "Steamed Mussels",
              "price": 21.99
            },
            {
              "name": "Spinach Fennel Watercress Ravioli",
              "price": 35.99
            }
          ],
          "dinner": [
            {
              "name": "Gunthorp Chicken",
              "price": 21.99
            },
            {
              "name": "Herring in Lavender Dill Reduction",
              "price": 45.99
            },
            {
              "name": "Chicken with Tomato Carrot Chutney Sauce",
              "price": 45.99
            }
          ]
        },
        "address": {
          "street": "230 W Kinzie Street",
          "city": "Green Bay",
          "state": "WI",
          "zip": "53205"
        },
        "_id": "3ZOZyTY1LH26LnVw"
      },
      {
        "name": "Cheese Curd City",
        "slug": "cheese-curd-city",
        "images": {
          "thumbnail": "node_modules/place-my-order-assets/images/2-thumbnail.jpg",
          "owner": "node_modules/place-my-order-assets/images/3-owner.jpg",
          "banner": "node_modules/place-my-order-assets/images/2-banner.jpg"
        },
        "menu": {
          "lunch": [
            {
              "name": "Ricotta Gnocchi",
              "price": 15.99
            },
            {
              "name": "Gunthorp Chicken",
              "price": 21.99
            },
            {
              "name": "Garlic Fries",
              "price": 15.99
            }
          ],
          "dinner": [
            {
              "name": "Herring in Lavender Dill Reduction",
              "price": 45.99
            },
            {
              "name": "Truffle Noodles",
              "price": 14.99
            },
            {
              "name": "Charred Octopus",
              "price": 25.99
            }
          ]
        },
        "address": {
          "street": "2451 W Washburne Ave",
          "city": "Green Bay",
          "state": "WI",
          "zip": "53295"
        },
        "_id": "Ar0qBJHxM3ecOhcr"
      }]}
            )
  }
}
describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: RestaurantService,
        useClass: MockRestaurantService
      }],
      declarations: [ RestaurantComponent, ImageUrlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Restaurants');
  });

  it('should not show any restaurants markup if no restaurants', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.restaurant')).toBe(null);
  });

  it('should have two .restaurant divs',  <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let restaurantDivs = compiled.getElementsByClassName('restaurant');
    let hoursDivs = compiled.getElementsByClassName('hours-price');
    expect(restaurantDivs.length).toEqual(2);
    expect(hoursDivs.length).toEqual(2);
  }));

  it('should display restaurant information',  <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.restaurant h3').textContent).toContain('Poutine Palace');
  }));

  it('should set restaurants value to restaurants response data and set isPending to false', <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let expectedRestaurants = {
      value: [{
        "name": "Poutine Palace",
        "slug": "poutine-palace",
        "images": {
          "thumbnail": "node_modules/place-my-order-assets/images/4-thumbnail.jpg",
          "owner": "node_modules/place-my-order-assets/images/3-owner.jpg",
          "banner": "node_modules/place-my-order-assets/images/2-banner.jpg"
        },
        "menu": {
          "lunch": [
            {
              "name": "Crab Pancakes with Sorrel Syrup",
              "price": 35.99
            },
            {
              "name": "Steamed Mussels",
              "price": 21.99
            },
            {
              "name": "Spinach Fennel Watercress Ravioli",
              "price": 35.99
            }
          ],
          "dinner": [
            {
              "name": "Gunthorp Chicken",
              "price": 21.99
            },
            {
              "name": "Herring in Lavender Dill Reduction",
              "price": 45.99
            },
            {
              "name": "Chicken with Tomato Carrot Chutney Sauce",
              "price": 45.99
            }
          ]
        },
        "address": {
          "street": "230 W Kinzie Street",
          "city": "Green Bay",
          "state": "WI",
          "zip": "53205"
        },
        "_id": "3ZOZyTY1LH26LnVw"
      },
      {
        "name": "Cheese Curd City",
        "slug": "cheese-curd-city",
        "images": {
          "thumbnail": "node_modules/place-my-order-assets/images/2-thumbnail.jpg",
          "owner": "node_modules/place-my-order-assets/images/3-owner.jpg",
          "banner": "node_modules/place-my-order-assets/images/2-banner.jpg"
        },
        "menu": {
          "lunch": [
            {
              "name": "Ricotta Gnocchi",
              "price": 15.99
            },
            {
              "name": "Gunthorp Chicken",
              "price": 21.99
            },
            {
              "name": "Garlic Fries",
              "price": 15.99
            }
          ],
          "dinner": [
            {
              "name": "Herring in Lavender Dill Reduction",
              "price": 45.99
            },
            {
              "name": "Truffle Noodles",
              "price": 14.99
            },
            {
              "name": "Charred Octopus",
              "price": 25.99
            }
          ]
        },
        "address": {
          "street": "2451 W Washburne Ave",
          "city": "Green Bay",
          "state": "WI",
          "zip": "53295"
        },
        "_id": "Ar0qBJHxM3ecOhcr"
      }],
      isPending: false
    }
    expect(fixture.componentInstance.restaurants).toEqual(expectedRestaurants);
  }));

  it('should show a loading div while isPending is true', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    fixture.componentInstance.restaurants.isPending = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBeTruthy();
  });

  it('should not show a loading div if isPending is false', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.componentInstance.restaurants.isPending = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBe(null);
  });

});
