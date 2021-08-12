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
  public orders: Data<Order> = {
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
    let orders =  this.orders.value.filter((order) => {
      return order.status === "new";
    });
    return orders;
  }

   get preparingOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "preparing";
    });
    return orders;
   }

   get deliveryOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "delivery";
    });
    return orders;
   }

   get deliveredOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "delivered";
    });
    return orders;
   }

}
