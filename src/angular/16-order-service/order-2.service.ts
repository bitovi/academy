import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Item {
  name: string;
  price: number;
}

export interface Order {
  _id: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get(environment.apiUrl + '/orders');
  }

  createOrder(order: Order) {
    let orderData = Object.assign({}, order);
    orderData.status = 'new';
    return this.httpClient.post(environment.apiUrl + '/orders', orderData)
  }

  updateOrder(order: Order, action: string) {
    let orderData = Object.assign({}, order);
    orderData.status = action;
    return this.httpClient.put(environment.apiUrl + '/orders/' + orderData._id, orderData);
  }

  deleteOrder(id: string) {
    return this.httpClient.delete(environment.apiUrl + '/orders/' + id);
  }
}
