import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { ResponseData } from '../../restaurant/restaurant.service';

interface Data<T> {
  value: T[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {
  orders: Data<Order> = {
    value: [],
    isPending: true
  }

  constructor(
    private orderService: OrderService
    ) {
    }

  ngOnInit() {
    this.getOrders();

  }

  getOrders() {
    this.orderService.getOrders().subscribe((res: ResponseData<Order>) => {
      this.orders.value = res.data;
    });
  }

  get newOrders() {
    const orders =  this.orders.value.filter((order) => {
      return order.status === "new";
    });
    return orders;
  }

   get preparingOrders() {
    const orders =  this.orders.value.filter((order) => {
      return order.status === "preparing";
    });
    return orders;
   }

   get deliveryOrders() {
    const orders =  this.orders.value.filter((order) => {
      return order.status === "delivery";
    });
    return orders;
   }

   get deliveredOrders() {
    const orders =  this.orders.value.filter((order) => {
      return order.status === "delivered";
    });
    return orders;
   }

}
