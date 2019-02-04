import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { ResponseData } from '../../restaurant/restaurant.service';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-order-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orders: Data<Order> = {
    value: [],
    isPending: true
  }
  socket: SocketIOClient.Socket;

  constructor(
    private orderService: OrderService
    ) { 
      this.socket = io(environment.apiUrl);
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
