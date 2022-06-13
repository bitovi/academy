import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ResponseData } from 'src/app/restaurant/restaurant.service';
import { Order, OrderService } from '../order.service';

interface Data<T> {
  value: T[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  orders: Data<Order> = { value: [], isPending: true };
  private onDestroy$ = new Subject<void>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getOrders(): void {
    this.orderService
      .getOrders()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: ResponseData<Order>) => {
        this.orders.value = res.data;
      });
  }

  get newOrders(): Order[] {
    const orders = this.orders.value.filter((order) => {
      return order.status === 'new';
    });
    return orders;
  }

  get preparingOrders(): Order[] {
    const orders = this.orders.value.filter((order) => {
      return order.status === 'preparing';
    });
    return orders;
  }

  get deliveryOrders(): Order[] {
    const orders = this.orders.value.filter((order) => {
      return order.status === 'delivery';
    });
    return orders;
  }

  get deliveredOrders(): Order[] {
    const orders = this.orders.value.filter((order) => {
      return order.status === 'delivered';
    });
    return orders;
  }
}
