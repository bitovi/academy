import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HistoryComponent } from './history.component';
import { OrderService } from '../order.service';
import { Socket } from 'ngx-socket-io';
import { ListComponent } from '../list/list.component';

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

class MockSocketService {
    on() {
        return of({
            "restaurant":"1bluO7wmYTTIPpeD",
            "name":"test",
            "address":null,
            "phone":null,
            "items":[{"name":"Crab Pancakes with Sorrel Syrup","price":35.99}],
            "status":"new",
            "_id":"YQ1xrhKfkUgZxdNF"
        });
    }
}

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent, ListComponent ],
      providers: [{
        provide: OrderService,
        useClass: MockOrderService
      }, {
        provide: Socket, 
        useClass: MockSocketService
      }],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
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