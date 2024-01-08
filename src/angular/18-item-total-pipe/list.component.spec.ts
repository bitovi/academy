import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemTotalPipe } from '../../item-total.pipe';
import { Order, OrderService } from '../order.service';

import { ListComponent } from './list.component';

class MockOrderService {
  updateOrder(order: Order, status: string) {
    return of({});
  }

  deleteOrder(orderId: string) {
    return of({});
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let injectedOrderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, ItemTotalPipe],
      providers: [
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
        ItemTotalPipe,
      ],
    }).compileComponents();
    injectedOrderService = TestBed.inject(OrderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the order total', () => {
    fixture.componentInstance.orders = [
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
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.total')?.textContent).toEqual('$39.98');
  });

  it('should call orderService updateOrder with order and action when "mark as" is clicked', () => {
    const updateOrderSpy = spyOn(
      injectedOrderService,
      'updateOrder'
    ).and.callThrough();
    const order1 = {
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
    };
    fixture.componentInstance.orders = [order1];
    fixture.componentInstance.action = 'preparing';
    fixture.componentInstance.actionTitle = 'Preparing';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const markAsLink = compiled.querySelector(
      '.actions .action button'
    ) as HTMLButtonElement;
    markAsLink?.click();
    expect(updateOrderSpy).toHaveBeenCalledWith(order1, 'preparing');
  });

  it('should call orderService deleteOrder with id when delete item is clicked', () => {
    const deleteOrderSpy = spyOn(
      injectedOrderService,
      'deleteOrder'
    ).and.callThrough();
    const order1 = {
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
    };
    fixture.componentInstance.orders = [order1];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteLink = compiled.querySelector(
      '.actions .action button'
    ) as HTMLButtonElement;
    deleteLink.click();
    expect(deleteOrderSpy).toHaveBeenCalledWith('0awcHyo3iD6CpvhX');
  });
});
