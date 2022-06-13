import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../order.service';

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
  constructor() {}

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    // unsubscribe here
  }

  getOrders(): void {
    // get orders here
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
