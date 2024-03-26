import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, of } from 'rxjs';
import { ImageUrlPipe } from '../image-url.pipe';
import { Restaurant } from './restaurant';
import { Data, RestaurantComponent } from './restaurant.component';
import { City, RestaurantService, State } from './restaurant.service';

const restaurantAPIResponse = {
  data: [
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
  ],
};

class MockRestaurantService {
  getRestaurants(state: string, city: string) {
    return of(restaurantAPIResponse);
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
}

describe('RestaurantComponent', () => {
  let fixture: ComponentFixture<RestaurantComponent>;
  let service: RestaurantService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [RestaurantComponent, ImageUrlPipe],
      providers: [
        { provide: RestaurantService, useClass: MockRestaurantService },
      ],
    }).compileComponents();

    service = TestBed.inject(RestaurantService);
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
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.componentInstance.form.get('city')?.patchValue('Sacramento');
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
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.componentInstance.form.get('city')?.patchValue('Sacramento');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.restaurant h3')?.textContent).toContain(
      'Poutine Palace'
    );
  }));

  it('should set restaurants value to restaurants response data and set isPending to false when state and city form values are selected', fakeAsync((): void => {
    const fixture = TestBed.createComponent(RestaurantComponent);
    fixture.detectChanges();
    tick();

    let restaurantOutput!: Data<Restaurant>;

    fixture.componentInstance.restaurants$.subscribe(
      (restaurants) => (restaurantOutput = restaurants)
    );
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.componentInstance.form.get('city')?.patchValue('Sacramento');
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
    expect(restaurantOutput).toEqual(expectedRestaurants);
  }));

  it('should show a loading div while isPending is true', () => {
    fixture.detectChanges();
    const originalGetRestaurants = service.getRestaurants;
    service.getRestaurants = () => of(restaurantAPIResponse).pipe(delay(100));
    fixture.componentInstance.form.get('state')!.patchValue('CA');
    fixture.componentInstance.form.get('city')!.patchValue('Sacramento');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv).toBeTruthy();
    service.getRestaurants = originalGetRestaurants;
  });

  it('should not show a loading div if isPending is false', () => {
    fixture.detectChanges();
    fixture.componentInstance.form.get('state')!.patchValue('CA');
    fixture.componentInstance.form.get('city')!.patchValue('Sacramento');
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

  it('should set states value to states response data and set isPending to false', fakeAsync((): void => {
    fixture.detectChanges();
    tick();

    let stateOutput!: Data<State>;

    fixture.componentInstance.states$.subscribe(
      (states) => (stateOutput = states)
    );
    fixture.detectChanges();
    const expectedStates = {
      value: [
        { short: 'MO', name: 'Missouri' },
        { short: 'CA  ', name: 'California' },
        { short: 'MI', name: 'Michigan' },
      ],
      isPending: false,
    };
    expect(stateOutput).toEqual(expectedStates);
  }));

  it('should set state dropdown options to be values of states member', fakeAsync((): void => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const stateOption = compiled.querySelector(
      'select[formcontrolname="state"] option:nth-child(2)'
    ) as HTMLInputElement;
    expect(stateOption.textContent?.trim()).toEqual('Missouri');
    expect(stateOption.value).toEqual('MO');
  }));

  it('should set cities value to cities response data and set isPending to false', fakeAsync((): void => {
    fixture.detectChanges();
    tick();

    let cityOutput!: Data<City>;

    fixture.componentInstance.cities$.subscribe(
      (cities) => (cityOutput = cities)
    );
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.detectChanges();
    const expectedCities = {
      value: [
        { name: 'Sacramento', state: 'CA' },
        { name: 'Oakland', state: 'CA' },
      ],
      isPending: false,
    };
    expect(cityOutput).toEqual(expectedCities);
  }));

  it('should set city dropdown options to be values of cities member when state value is selected', fakeAsync((): void => {
    fixture.detectChanges();
    tick();
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cityOption = compiled.querySelector(
      'select[formcontrolname="city"] option:nth-child(2)'
    ) as HTMLInputElement;
    expect(cityOption.textContent?.trim()).toEqual('Sacramento');
    expect(cityOption.value).toEqual('Sacramento');
  }));

  it('state dropdown should be disabled until states are populated', () => {
    const stateFormControl = fixture.componentInstance.form.get('state')!;
    expect(stateFormControl.enabled).toBe(false);

    fixture.detectChanges();

    expect(stateFormControl.enabled).toBe(true);
  });

  it('city dropdown should be disabled until cities are populated', fakeAsync((): void => {
    fixture.detectChanges(); // detecting changes for createForm func to be called
    const cityFormControl1 = fixture.componentInstance.form.get('city');
    expect(cityFormControl1?.enabled).toBe(false);
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.detectChanges();
    const cityFormControl2 = fixture.componentInstance.form.get('city');
    expect(cityFormControl2?.enabled).toBe(true);
  }));

  it('should reset list of restaurants when new state is selected', fakeAsync((): void => {
    fixture.detectChanges(); // detecting changes for createForm func to be called

    let restaurantOutput!: Data<Restaurant>;
    fixture.componentInstance.restaurants$.subscribe((restaurants) => {
      restaurantOutput = restaurants;
    });
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.componentInstance.form.get('city')?.patchValue('Sacramento');
    fixture.detectChanges();
    expect(restaurantOutput.value.length).toEqual(2);
    fixture.componentInstance.form.get('state')?.patchValue('MO');
    fixture.detectChanges();
    expect(restaurantOutput.value.length).toEqual(0);
  }));

  it('should call getRestaurants method with two string params', fakeAsync((): void => {
    const getRestaurantsSpy = spyOn(service, 'getRestaurants').and.returnValue(
      of(restaurantAPIResponse)
    );
    fixture.detectChanges();
    fixture.componentInstance.form.get('state')?.patchValue('CA');
    fixture.componentInstance.form.get('city')?.patchValue('Sacramento');
    fixture.detectChanges();
    tick();
    expect(getRestaurantsSpy).toHaveBeenCalledWith('CA', 'Sacramento');
  }));
});
