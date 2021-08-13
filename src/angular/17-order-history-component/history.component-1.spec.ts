import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; 

import { HistoryComponent } from './history.component';
import { OrderService } from '../order.service';

class MockOrderService {
  getOrders() {
    return of({
      data: [{
      "address": null,
      "items": [{"name": "Onion fries", "price": 15.99}, {"name": "Roasted Salmon", "price": 23.99}],
      "name": "Client 1",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "new",
      "_id": "0awcHyo3iD6CpvhX",
      },
      {
      "address": null,
      "items": [{"name": "Steak Tacos", "price": 15.99}, {"name": "Guacamole", "price": 3.99}],
      "name": "Client 2",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "preparing",
      "_id": "0awcHyo3iD6CpvhX",
      },
      {
      "address": null,
      "items": [{"name": "Mac & Cheese", "price": 15.99}, {"name": "Grilled chicken", "price": 23.99}],
      "name": "Client 3",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "delivery",
      "_id": "0awcHyo8iD7XjahX",
      },
      {
      "address": null,
      "items": [{"name": "Eggrolls", "price": 5.99}, {"name": "Fried Rice", "price": 18.99}],
      "name": "Client 4",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "delivered",
      "_id": "1awcJyo3iD6CpvhZ",
      }
    ]
    })
  }
}
describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      providers: [{
        provide: OrderService,
        useClass: MockOrderService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set response from getOrders service to orders member', () => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    let expectedOrders = [{
      "address": null,
      "items": [{"name": "Onion fries", "price": 15.99}, {"name": "Roasted Salmon", "price": 23.99}],
      "name": "Client 1",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "new",
      "_id": "0awcHyo3iD6CpvhX",
      },
      {
      "address": null,
      "items": [{"name": "Steak Tacos", "price": 15.99}, {"name": "Guacamole", "price": 3.99}],
      "name": "Client 2",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "preparing",
      "_id": "0awcHyo3iD6CpvhX",
      },
      {
      "address": null,
      "items": [{"name": "Mac & Cheese", "price": 15.99}, {"name": "Grilled chicken", "price": 23.99}],
      "name": "Client 3",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "delivery",
      "_id": "0awcHyo8iD7XjahX",
      },
      {
      "address": null,
      "items": [{"name": "Eggrolls", "price": 5.99}, {"name": "Fried Rice", "price": 18.99}],
      "name": "Client 4",
      "phone": null,
      "restaurant": "uPkA2jiZi24tCvXh",
      "status": "delivered",
      "_id": "1awcJyo3iD6CpvhZ",
      }
    ];
    let orders = fixture.componentInstance.orders;
    expect(orders.value).toEqual(expectedOrders);
  });

  it('should display orders in UI', () => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let orderDivs = compiled.querySelectorAll('.order:not(.header):not(.empty)');
    expect(orderDivs.length).toEqual(4);
  })

  it('should display orders with appropriate classes', () => {
    const fixture = TestBed.createComponent(HistoryComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let newOrder = compiled.getElementsByClassName('new');
    let preparingOrder = compiled.getElementsByClassName('preparing');
    let deliveryOrder = compiled.getElementsByClassName('delivery');
    let deliveredOrder = compiled.getElementsByClassName('delivered');
    expect(newOrder.length).toEqual(1);
    expect(preparingOrder.length).toEqual(1);
    expect(deliveryOrder.length).toEqual(1);
    expect(deliveredOrder.length).toEqual(1);
  });
});
