import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ItemTotalPipe } from '../../item-total.pipe';
import { ListComponent } from '../list/list.component';
import { Order, OrderService } from '../order.service';

import { HistoryComponent } from './history.component';

class MockOrderService {
  getOrders(): Observable<{ data: Order[] }> {
    return of({
      data: [
        {
          address: '',
          items: [
            { name: 'Onion fries', price: 15.99 },
            { name: 'Roasted Salmon', price: 23.99 },
          ],
          name: 'Client 1',
          phone: '',
          restaurant: 'uPkA2jiZi24tCvXh',
          status: 'new',
          _id: '0awcHyo3iD6CpvhX',
        },
        {
          address: '',
          items: [
            { name: 'Steak Tacos', price: 15.99 },
            { name: 'Guacamole', price: 3.99 },
          ],
          name: 'Client 2',
          phone: '',
          restaurant: 'uPkA2jiZi24tCvXh',
          status: 'preparing',
          _id: '0awcHyo3iD6CpvhX',
        },
        {
          address: '',
          items: [
            { name: 'Mac & Cheese', price: 15.99 },
            { name: 'Grilled chicken', price: 23.99 },
          ],
          name: 'Client 3',
          phone: '',
          restaurant: 'uPkA2jiZi24tCvXh',
          status: 'delivery',
          _id: '0awcHyo8iD7XjahX',
        },
        {
          address: '',
          items: [
            { name: 'Eggrolls', price: 5.99 },
            { name: 'Fried Rice', price: 18.99 },
          ],
          name: 'Client 4',
          phone: '',
          restaurant: 'uPkA2jiZi24tCvXh',
          status: 'delivered',
          _id: '1awcJyo3iD6CpvhZ',
        },
      ],
    });
  }
}
describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryComponent, ListComponent, ItemTotalPipe],
      providers: [
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
        ItemTotalPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set response from getOrders service to orders member', () => {
    const expectedOrders: Order[] = [
      {
        address: '',
        items: [
          { name: 'Onion fries', price: 15.99 },
          { name: 'Roasted Salmon', price: 23.99 },
        ],
        name: 'Client 1',
        phone: '',
        restaurant: 'uPkA2jiZi24tCvXh',
        status: 'new',
        _id: '0awcHyo3iD6CpvhX',
      },
      {
        address: '',
        items: [
          { name: 'Steak Tacos', price: 15.99 },
          { name: 'Guacamole', price: 3.99 },
        ],
        name: 'Client 2',
        phone: '',
        restaurant: 'uPkA2jiZi24tCvXh',
        status: 'preparing',
        _id: '0awcHyo3iD6CpvhX',
      },
      {
        address: '',
        items: [
          { name: 'Mac & Cheese', price: 15.99 },
          { name: 'Grilled chicken', price: 23.99 },
        ],
        name: 'Client 3',
        phone: '',
        restaurant: 'uPkA2jiZi24tCvXh',
        status: 'delivery',
        _id: '0awcHyo8iD7XjahX',
      },
      {
        address: '',
        items: [
          { name: 'Eggrolls', price: 5.99 },
          { name: 'Fried Rice', price: 18.99 },
        ],
        name: 'Client 4',
        phone: '',
        restaurant: 'uPkA2jiZi24tCvXh',
        status: 'delivered',
        _id: '1awcJyo3iD6CpvhZ',
      },
    ];
    const orders = fixture.componentInstance.orders;
    expect(orders.value).toEqual(expectedOrders);
  });

  it('should display orders in UI', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const orderDivs = compiled.querySelectorAll(
      '.order:not(.header):not(.empty)'
    );
    expect(orderDivs.length).toEqual(4);
  });

  it('should display orders with appropriate classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const newOrder = compiled.getElementsByClassName('new');
    const preparingOrder = compiled.getElementsByClassName('preparing');
    const deliveryOrder = compiled.getElementsByClassName('delivery');
    const deliveredOrder = compiled.getElementsByClassName('delivered');
    expect(newOrder.length).toEqual(1);
    expect(preparingOrder.length).toEqual(1);
    expect(deliveryOrder.length).toEqual(1);
    expect(deliveredOrder.length).toEqual(1);
  });
});
