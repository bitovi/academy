import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Item {
  name: string;
  price: number;
}

export interface CreateOrderDto {
  restaurant: string;
  name: string;
  address: string;
  phone: string;
  items: Item[];
}

export interface Order {
  _id: string;
  restaurant: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  items: Item[];
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<{ data: Order[] }> {
    return this.httpClient.get<{ data: Order[] }>(
      environment.apiUrl + '/orders'
    );
  }

  createOrder(order: CreateOrderDto): Observable<Order> {
    const orderData = {
      ...order,
      status: 'new',
    };
    return this.httpClient.post<Order>(
      environment.apiUrl + '/orders',
      orderData
    );
  }

  updateOrder(order: Order, action: string): Observable<Order> {
    const orderData = {
      ...order,
      status: action,
    };
    return this.httpClient.put<Order>(
      environment.apiUrl + '/orders/' + orderData._id,
      orderData
    );
  }

  deleteOrder(id: string): Observable<Order> {
    return this.httpClient.delete<Order>(environment.apiUrl + '/orders/' + id);
  }
}
