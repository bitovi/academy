import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ItemTotalPipe } from '../item-total.pipe';
import { RestaurantService } from '../restaurant/restaurant.service';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { OrderComponent, OrderForm } from './order.component';
import { CreateOrderDto, OrderService } from './order.service';

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

class MockOrderService {
  createOrder(order: CreateOrderDto) {
    return of({
      address: null,
      items: [
        { name: 'Onion fries', price: 15.99 },
        { name: 'Roasted Salmon', price: 23.99 },
      ],
      name: 'Jennifer Hungry',
      phone: null,
      restaurant: 'uPkA2jiZi24tCvXh',
      status: 'preparing',
      _id: '0awcHyo3iD6CpvhX',
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
  let orderService: OrderService;

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
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
        ItemTotalPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    orderService = TestBed.inject(OrderService);
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

  it('should call the orderService createOrder on form submit with form values', () => {
    const createOrderSpy = spyOn(orderService, 'createOrder').and.callThrough();
    const expectedOrderValue: ReturnType<FormGroup<OrderForm>['getRawValue']> =
      {
        restaurant: '12345',
        name: 'Jennifer Hungry',
        address: '123 Main St',
        phone: '555-555-5555',
        items: [
          { name: 'Onion fries', price: 15.99 },
          { name: 'Roasted Salmon', price: 23.99 },
        ],
      };
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.orderForm?.setValue(expectedOrderValue);
    fixture.detectChanges();
    (
      compiled.querySelector('button[type="submit"]') as HTMLButtonElement
    ).click();
    expect(createOrderSpy).toHaveBeenCalledWith(expectedOrderValue);
  });

  it('should show completed order when order is complete', () => {
    const expectedOrderValue: ReturnType<FormGroup<OrderForm>['getRawValue']> =
      {
        restaurant: '12345',
        name: 'Jennifer Hungry',
        address: '123 Main St',
        phone: '555-555-5555',
        items: [
          { name: 'Onion fries', price: 15.99 },
          { name: 'Roasted Salmon', price: 23.99 },
        ],
      };
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.orderForm?.setValue(expectedOrderValue);
    fixture.detectChanges();
    (
      compiled.querySelector('button[type="submit"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    const displayedOrder = compiled.querySelector('h3');
    expect(displayedOrder?.textContent).toEqual(
      'Thanks for your order Jennifer Hungry!'
    );
  });

  it('should clear the form values when create new order is clicked', () => {
    const expectedOrderValue: ReturnType<FormGroup<OrderForm>['getRawValue']> =
      {
        restaurant: '12345',
        name: 'Jennifer Hungry',
        address: '123 Main St',
        phone: '555-555-5555',
        items: [
          { name: 'Onion fries', price: 15.99 },
          { name: 'Roasted Salmon', price: 23.99 },
        ],
      };
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.orderForm?.setValue(expectedOrderValue);
    fixture.detectChanges();
    (
      compiled.querySelector('button[type="submit"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    (
      compiled.querySelector('button:nth-child(1)') as HTMLButtonElement
    ).click();
    const emptyform = {
      restaurant: '3ZOZyTY1LH26LnVw',
      name: '',
      address: '',
      phone: '',
      items: [],
    };
    expect(fixture.componentInstance.orderForm?.value).toEqual(emptyform);
  });
});
