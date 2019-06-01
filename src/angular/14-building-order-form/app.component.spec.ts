import { TestBed, async, fakeAsync, tick, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageUrlPipe } from './image-url.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantService } from './restaurant/restaurant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './restaurant/detail/detail.component';
import { OrderComponent } from './order/order.component';

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

  getStates() {
    return of({
      data: [
        {"short":"MO","name":"Missouri"},
        {"short":"CA  ","name":"California"},
        {"short":"MI","name":"Michigan"}]
    });
  }

  getCities(state:string) {
    return of({
      data: [{"name":"Sacramento","state":"CA"},{"name":"Oakland","state":"CA"}]
    });
  }

  getRestaurant(slug:string) {
    return of({
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
    })
  }
}

describe('AppComponent', () => {
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule, HttpClientModule, ReactiveFormsModule
      ],
      declarations: [
        AppComponent, HomeComponent, RestaurantComponent, ImageUrlPipe, DetailComponent, OrderComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideComponent(RestaurantComponent, {
      set: {
        providers: [
          { provide: RestaurantService, useClass: MockRestaurantService }
        ],
        template: '<p> I am a fake restaurant component</p>'
      }
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'place-my-order'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('place-my-order');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('place-my-order.com');
  });

  it('should render the HomeComponent with router navigates to "/" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
    });
  });

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
    });
  });

  it('should render the DetailComponent with router navigates to "/restaurants/slug" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants/crab-shack']).then(() => {
      expect(location.path()).toBe('/restaurants/crab-shack');
      expect(compiled.querySelector('pmo-detail')).not.toBe(null);
    });
  });

  it('should render the OrderComponent with router navigates to "/restaurants/slug/order" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants/crab-shack/order']).then(() => {
      expect(location.path()).toBe('/restaurants/crab-shack/order');
      expect(compiled.querySelector('pmo-order')).not.toBe(null);
    });
  });

  it('should have the home navigation link href set to ""', () => {
    fixture.detectChanges();
    let homeLink = fixture.debugElement.query(By.css('li a'));
    let href = homeLink.nativeElement.getAttribute('href');
    expect(href).toEqual('/');
  });

  it('should have the restaurants navigation link href set to ""', () => {
    fixture.detectChanges();
    let restaurantsLink = fixture.debugElement.query(By.css('li:nth-child(2) a'));
    let href = restaurantsLink.nativeElement.getAttribute('href');
    expect(href).toEqual('/restaurants');
  });

  it('should make the home navigation link class active when the router navigates to "/" path', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['']).then(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let homeLinkLi = fixture.debugElement.query(By.css('li'));
      expect(homeLinkLi.nativeElement.classList).toContain('active');
      expect(compiled.querySelectorAll('.active').length).toBe(1);
      fixture.destroy();
      flush();
    });
  }));

  it('should make the restaurants navigation link class active when the router navigates to "/restaurants" path', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let restaurantsLinkLi = fixture.debugElement.query(By.css('li:nth-child(2)'));
      expect(restaurantsLinkLi.nativeElement.classList).toContain('active');
      expect(compiled.querySelectorAll('.active').length).toBe(1);
      fixture.destroy();
      flush();
    });
  }));

});