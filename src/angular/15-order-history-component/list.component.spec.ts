import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; 

import { ListComponent } from './list.component';
import { OrderService } from '../order.service';

class MockOrderService {
  updateOrder(order, status) {
    return of({})
  }

  deleteOrder(orderId) {
    return of({})
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let injectedOrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [{
        provide: OrderService,
        useClass: MockOrderService
      }]
    })
    .compileComponents();
    injectedOrderService = TestBed.get(OrderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the order total', () => {
    const fixture = TestBed.createComponent(ListComponent);
    fixture.componentInstance.orders = [
      {
      "address": null,
      "items": [{"name": "Onion fries", "price": 15.99}, {"name": "Roasted Salmon", "price": 23.99}],
      "name": "Client 1",
      "phone": null,
      "status": "new",
      "_id": "0awcHyo3iD6CpvhX",
      }
    ]
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.total').textContent).toEqual('$39.98')
  });

  it('should call orderService updateOrder with order and action when "mark as" is clicked', () => {
    const fixture = TestBed.createComponent(ListComponent);
    let updateOrderSpy = spyOn(injectedOrderService, 'updateOrder').and.callThrough();
    let order1 =  {
      "address": null,
      "items": [{"name": "Onion fries", "price": 15.99}, {"name": "Roasted Salmon", "price": 23.99}],
      "name": "Client 1",
      "phone": null,
      "status": "new",
      "_id": "0awcHyo3iD6CpvhX",
      }
    fixture.componentInstance.orders = [
      order1
    ];
    fixture.componentInstance.action = 'preparing';
    fixture.componentInstance.actionTitle = 'Preparing';
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let markAsLink = compiled.querySelector('.actions .action a');
    markAsLink.click();
    expect(updateOrderSpy).toHaveBeenCalledWith(order1, 'preparing');
  });

  it('should call orderService deleteOrder with id when delete item is clicked', () => {
    const fixture = TestBed.createComponent(ListComponent);
    let deleteOrderSpy = spyOn(injectedOrderService, 'deleteOrder').and.callThrough();
    let order1 =  {
      "address": null,
      "items": [{"name": "Onion fries", "price": 15.99}, {"name": "Roasted Salmon", "price": 23.99}],
      "name": "Client 1",
      "phone": null,
      "status": "new",
      "_id": "0awcHyo3iD6CpvhX",
      }
    fixture.componentInstance.orders = [
      order1
    ]
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let deleteLink = compiled.querySelector('.actions .action a');
    deleteLink.click();
    expect(deleteOrderSpy).toHaveBeenCalledWith('0awcHyo3iD6CpvhX');
  });
});
