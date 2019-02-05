import { Injectable } from '@angular/core';

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
  items: Array<Item>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

}