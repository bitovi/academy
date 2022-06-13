import { Injectable } from '@angular/core';

export interface Item {
  name: string;
  price: number;
}

export interface OrderForm {
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
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
}
