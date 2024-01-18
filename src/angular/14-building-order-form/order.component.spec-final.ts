import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { OrderComponent } from './order.component';

class MockRestaurantService {
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

const MockActivatedRoute = {
  snapshot: {
    paramMap: {
      get() {
        return 'poutine-palace';
      },
    },
  },
};

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderComponent, MenuItemsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: RestaurantService,
          useClass: MockRestaurantService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRoute,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a restaurant based on route slug', () => {
    const mockRestaurant = {
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
    };
    expect(fixture.componentInstance.restaurant).toEqual(mockRestaurant);
  });

  it('should have an orderForm formGroup', () => {
    expect(
      fixture.componentInstance.orderForm?.controls['restaurant']
    ).toBeTruthy();
    expect(
      fixture.componentInstance.orderForm?.controls['address']
    ).toBeTruthy();
    expect(fixture.componentInstance.orderForm?.controls['phone']).toBeTruthy();
    expect(fixture.componentInstance.orderForm?.controls['items']).toBeTruthy();
  });

  it('should have a validator on items formControl', () => {
    const itemFormControl =
      fixture.componentInstance.orderForm?.controls['items'];
    expect(itemFormControl?.valid).toEqual(false);
  });

  it('should update items FormControl when setUpdatesItems is called', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const childInput = compiled
      .getElementsByTagName('pmo-menu-items')[0]
      .getElementsByTagName('input')[0];
    const formItems = fixture.componentInstance.orderForm?.get('items');
    childInput.click();
    fixture.detectChanges();
    expect(formItems?.value).toEqual([
      { name: 'Crab Pancakes with Sorrel Syrup', price: 35.99 },
    ]);
  });

  it('should update the order total when the items FormControl value changes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const childInput1 = compiled
      .getElementsByTagName('pmo-menu-items')[0]
      .getElementsByTagName('input')[0];
    const childInput2 = compiled
      .getElementsByTagName('pmo-menu-items')[0]
      .getElementsByTagName('input')[1];
    childInput1.click();
    childInput2.click();
    fixture.detectChanges();
    const orderText = compiled.querySelector('.submit h4');
    expect(orderText?.textContent).toEqual('Total: $57.98');
  });
});