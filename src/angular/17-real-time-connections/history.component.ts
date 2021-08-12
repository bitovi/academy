import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { ResponseData } from '../../restaurant/restaurant.service';
import { Socket } from 'ngx-socket-io';

interface Data<T> {
  value: T[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit, OnDestroy {
  public orders: Data<Order> = {
    value: [],
    isPending: true
  }

  constructor(
    private orderService: OrderService,
    private socket: Socket
    ) {
    }

  ngOnInit() {
    this.getOrders();

    this.socket.on('orders created', (order: Order) => {
      this.orders.value.push(order);
    });

    this.socket.on('orders updated', (order: Order) => {
      let orderIndex =  this.orders.value.findIndex(item => item._id === order._id);
      this.orders.value.splice(orderIndex, 1);
      this.orders.value.push(order);
    });

    this.socket.on('orders removed', (order: Order) => {
      let orderIndex =  this.orders.value.findIndex(item => item._id === order._id);
      this.orders.value.splice(orderIndex, 1);
    });
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
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