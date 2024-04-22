import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageUrlPipe } from './image-url.pipe';
import { OrderComponent } from './order/order.component';
import { DetailComponent } from './restaurant/detail/detail.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantService } from './restaurant/restaurant.service';

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

  getStates() {
    return of({
      data: [
        { short: 'MO', name: 'Missouri' },
        { short: 'CA  ', name: 'California' },
        { short: 'MI', name: 'Michigan' },
      ],
    });
  }

  getCities(state: string) {
    return of({
      data: [
        { name: 'Sacramento', state: 'CA' },
        { name: 'Oakland', state: 'CA' },
      ],
    });
  }

  getRestaurant(slug: string) {
    return of({
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
    });
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        HomeComponent,
        RestaurantComponent,
        ImageUrlPipe,
        DetailComponent,
        OrderComponent,
      ],
      providers: [
        { provide: RestaurantService, useClass: MockRestaurantService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(RestaurantComponent, {
        set: { template: '<p>I am a fake restaurant component</p>' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'place-my-order'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('place-my-order');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'place-my-order.com'
    );
  });

  it('should render the HomeComponent with router navigates to "/" path', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
    });
  }));

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
    });
  }));

  it('should render the DetailComponent with router navigates to "/restaurants/slug" path', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants/crab-shack']).then(() => {
      expect(location.path()).toBe('/restaurants/crab-shack');
      expect(compiled.querySelector('pmo-detail')).not.toBe(null);
    });
  }));

  it('should render the OrderComponent with router navigates to "/restaurants/slug/order" path', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants/crab-shack/order']).then(() => {
      expect(location.path()).toBe('/restaurants/crab-shack/order');
      expect(compiled.querySelector('pmo-order')).not.toBe(null);
    });
  }));

  it('should have the home navigation link href set to "/"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('li a');
    const href = homeLink?.getAttribute('href');
    expect(href).toEqual('/');
  });

  it('should have the restaurants navigation link href set to "/restaurants"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const restaurantsLink = compiled.querySelector('li:nth-child(2) a');
    const href = restaurantsLink?.getAttribute('href');
    expect(href).toEqual('/restaurants');
  });

  it('should make the home navigation link class active when the router navigates to "/" path', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['']);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const homeLinkLi = compiled.querySelector('li');
    expect(homeLinkLi?.classList).toContain('active');
    expect(compiled.querySelectorAll('.active').length).toBe(1);
    flush();
  }));

  it('should make the restaurants navigation link class active when the router navigates to "/restaurants" path', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants']);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/restaurants');
    const restaurantsLinkLi = compiled.querySelector('li:nth-child(2)');
    expect(restaurantsLinkLi?.classList).toContain('active');
    expect(compiled.querySelectorAll('.active').length).toBe(1);
    flush();
  }));
});
