import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let httpMock: HttpTestingController;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    orderService = TestBed.inject(OrderService);
  });

  it('should make a get request to get orders', () => {
    const mockOrders = {
      data: [
        {
          _id: 'adsfsdf',
          name: 'Jennifer',
          address: '123 main',
          phone: '555-555-5555',
          status: 'new',
          items: [
            {
              name: 'nummy fries',
              price: 2.56,
            },
          ],
        },
      ],
    };

    orderService.getOrders().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const url = 'http://localhost:7070/orders';
    const req = httpMock.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush(mockOrders);

    httpMock.verify();
  });

  it('should make a get request to create an order', () => {
    const mockOrder = {
      _id: 'adsfsdf',
      restaurant: '12345',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'new',
      items: [
        {
          name: 'nummy fries',
          price: 2.56,
        },
      ],
    };

    const orderForm = {
      restaurant: '12345',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      items: [
        {
          name: 'nummy fries',
          price: 2.56,
        },
      ],
    };

    orderService.createOrder(orderForm).subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });

    const url = 'http://localhost:7070/orders';
    httpMock
      .expectOne(
        (request: HttpRequest<any>) =>
          request.method == 'POST' &&
          request.url == url &&
          JSON.stringify(request.body) ==
            JSON.stringify({ ...orderForm, status: 'new' })
      )
      .flush(mockOrder);

    httpMock.verify();
  });

  it('should make a put request to update an order', () => {
    const mockOrder = {
      _id: 'adsfsdf',
      restaurant: '12345',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'old',
      items: [
        {
          name: 'nummy fries',
          price: 2.56,
        },
      ],
    };

    const updatedOrder = {
      _id: 'adsfsdf',
      restaurant: '12345',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'delivered',
      items: [
        {
          name: 'nummy fries',
          price: 2.56,
        },
      ],
    };

    orderService.updateOrder(mockOrder, 'delivered').subscribe((order) => {
      expect(order).toEqual(updatedOrder);
    });

    const url = 'http://localhost:7070/orders/adsfsdf';
    httpMock
      .expectOne(
        (request: HttpRequest<any>) =>
          request.method == 'PUT' &&
          request.url == url &&
          JSON.stringify(request.body) == JSON.stringify(updatedOrder)
      )
      .flush(updatedOrder);

    httpMock.verify();
  });

  it('should make a delete request to delete an order', () => {
    const mockOrder = {
      _id: 'adsfsdf',
      restaurant: '12345',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'old',
      items: [
        {
          name: 'nummy fries',
          price: 2.56,
        },
      ],
    };

    orderService.deleteOrder('adsfsdf').subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });

    const url = 'http://localhost:7070/orders/adsfsdf';
    const req = httpMock.expectOne(url);

    expect(req.request.method).toEqual('DELETE');
    req.flush(mockOrder);

    httpMock.verify();
  });
});
