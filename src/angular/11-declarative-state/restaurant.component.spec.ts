import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, timer } from 'rxjs';
import {delay, mapTo} from "rxjs/operators";

import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from './restaurant.service';
import { ImageUrlPipe } from '../image-url.pipe';
import { FormsModule } from "@angular/forms";
import { Mock } from 'protractor/built/driverProviders';

const restaurantAPIResponse = {
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
    }]
};

class MockRestaurantService {
  getRestaurants(state, city) {
    return of(restaurantAPIResponse);
  }
  getStates() {
    return of({
      data: [
        {"short":"MO","name":"Missouri"},
        {"short":"CA","name":"California"},
        {"short":"MI","name":"Michigan"}]
    });
  }

  getCities(state:string) {
    return of({
      data: [{"name":"Sacramento","state":"CA"},{"name":"Oakland","state":"CA"}]
    });
  }
}

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;
  let injectedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [{
        provide: RestaurantService,
        useClass: MockRestaurantService
      }],
      declarations: [ RestaurantComponent, ImageUrlPipe ]
    })
        .compileComponents();
    injectedService = TestBed.get(RestaurantService);
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
    fixture.componentInstance.selectedState.next('CA');
    fixture.componentInstance.selectedCity.next('Sacramento');
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
    fixture.componentInstance.selectedState.next('CA');
    fixture.componentInstance.selectedCity.next('Sacramento');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.restaurant h3').textContent).toContain('Poutine Palace');
  }));

  it('should set restaurants value to restaurants response data and set isPending to false', <any>fakeAsync((): void => {
    let restaurantOutput = null;
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();

    fixture.componentInstance.restaurants.subscribe((output) => {
      restaurantOutput = output;
    });

    fixture.componentInstance.selectedState.next('CA');
    fixture.componentInstance.selectedCity.next('Sacramento');
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
    expect(restaurantOutput).toEqual(expectedRestaurants);
  }));

  it('should show a loading div while restaurant request is waiting', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    const origGetRestaurants = injectedService.getRestaurants;
    fixture.detectChanges();
    injectedService.getRestaurants = () => of(restaurantAPIResponse).pipe(delay(500));
    fixture.componentInstance.selectedState.next('CA');
    fixture.componentInstance.selectedCity.next('Sacramento');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBeTruthy();
    injectedService.getRestaurants = origGetRestaurants;
  });

  it('should not show a loading div while restaurant request is complete', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    const origGetRestaurants = injectedService.getRestaurants;
    injectedService.getRestaurants = () => of(restaurantAPIResponse);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBe(null);
    injectedService.getRestaurants = origGetRestaurants;
  });

  it('should have a city and state selected subjects', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedState).toBeTruthy();
    expect(fixture.componentInstance.selectedCity).toBeTruthy();
  });

  it('should show a state dropdown', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let stateSelect = compiled.querySelector('select.state');
    expect(stateSelect).toBeTruthy();
  });

  it('should show a city dropdown', () => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let citySelect = compiled.querySelector('select.city');
    expect(citySelect).toBeTruthy();
  });

  it('should set states value to states response data and set isPending to false', <any>fakeAsync((): void => {
    let stateOutput = null;
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();

    fixture.componentInstance.states.subscribe((output) => {
      stateOutput = output;
    });

    fixture.detectChanges();
    let expectedStates = {
      value: [
        {"short":"MO","name":"Missouri"},
        {"short":"CA","name":"California"},
        {"short":"MI","name":"Michigan"}
      ],
      isPending: false
    }
    expect(stateOutput).toEqual(expectedStates);
  }));

  it('should set state dropdown options to be values of states member', <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let stateOption = compiled.querySelector('select.state option:nth-child(2)');
    expect(stateOption.textContent).toEqual('Missouri');
    expect(stateOption.value).toEqual('MO');
  }));

  it('should set cities value to cities response data and set isPending to false', <any>fakeAsync((): void => {
    let citiesOutput = null;
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();

    fixture.componentInstance.cities.subscribe((output) => {
      citiesOutput = output;
    });

    fixture.componentInstance.selectedState.next('CA');
    fixture.detectChanges();
    let expectedCities = {
      value: [
        {"name":"Sacramento","state":"CA"},
        {"name":"Oakland","state":"CA"}
      ],
      isPending: false
    }
    expect(citiesOutput).toEqual(expectedCities);
  }));

  it('should set city dropdown options to be values of cities member when state value is selected', <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();
    fixture.componentInstance.selectedState.next('CA');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let cityOption = compiled.querySelector('select.city option:nth-child(2)');
    expect(cityOption.textContent).toEqual('Sacramento');
    expect(cityOption.value).toEqual('Sacramento');
  }));

  it('state dropdown should be disabled until states are populated', <any>fakeAsync((): void => {
    let stateOutput = null;
    let stateDisabledOutput = null;
    const fixture = TestBed.createComponent(RestaurantComponent);
    const originalGetStates = injectedService.getStates;

    // returns populated data 100ms after subscription
    injectedService.getStates = () => {
      return timer(100).pipe(
          mapTo({
            data: [
              {"short": "MO", "name": "Missouri"},
              {"short": "CA", "name": "California"},
              {"short": "MI", "name": "Michigan"}]
          }),
      );
    };

    fixture.detectChanges();
    fixture.componentInstance.states.subscribe((output) => {
      stateOutput = output;
    });
    fixture.componentInstance.stateSelectDisabled.subscribe((output) => {
      stateDisabledOutput = output;
    });

    expect(stateDisabledOutput).toBe(true);

    tick(100);
    fixture.detectChanges();

    expect(stateDisabledOutput).toBe(false);

    injectedService.getStates = originalGetStates;
  }));

  it('city dropdown should be disabled until cities are populated', <any>fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    let cityDisabledOutput = null;

    fixture.detectChanges(); //detecting changes for createForm func to be called
    fixture.componentInstance.citySelectDisabled.subscribe((output) => {
      cityDisabledOutput = output;
    });

    expect(cityDisabledOutput).toBe(true);
    fixture.componentInstance.selectedState.next('CA');
    fixture.detectChanges();

    expect(cityDisabledOutput).toBe(false);
  }));

  it('should reset list of cities when new state is selected', <any>fakeAsync((): void => {
    let restaurantOutput = null;
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges(); //detecting changes for createForm func to be called

    fixture.componentInstance.restaurants.subscribe((output) => {
      restaurantOutput = output;
    });

    fixture.componentInstance.selectedState.next('CA');
    fixture.componentInstance.selectedCity.next('Sacramento');
    fixture.detectChanges();
    expect(restaurantOutput.value.length).toEqual(2);
    fixture.componentInstance.selectedState.next('MO');
    fixture.detectChanges();
    expect(restaurantOutput.value.length).toEqual(0);
  }));
});
