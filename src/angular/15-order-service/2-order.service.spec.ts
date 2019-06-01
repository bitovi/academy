import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

describe('OrderService', () => {
  let httpMock : HttpTestingController;
  let orderService: OrderService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      OrderService
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    orderService = TestBed.get(OrderService);
  })

  it('should make a get request to get orders', () => {
    const mockOrder = {
      data: [
        {_id: 'adsfsdf',
        name: 'Jennifer',
        address: '123 main',
        phone: '555-555-5555',
        status: 'new',
        items: [
          {
            name: 'nummy fries',
            price: 2.56
          }
        ]}
      ]
    };

    orderService.getOrders().subscribe((orders) => {
      expect(orders).toEqual(mockOrder);
    });

    let url = 'http://localhost:7070/orders';
    const req = httpMock.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush(mockOrder);

    httpMock.verify();
  });

  it('should make a get request to create an order', () => {
    const mockOrder = {
      data: [
        {_id: 'adsfsdf',
        name: 'Jennifer',
        address: '123 main',
        phone: '555-555-5555',
        status: 'old',
        items: [
          {
            name: 'nummy fries',
            price: 2.56
          }
        ]}
      ]
    };

    const createdOrder = {
      _id: 'adsfsdf',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'new',
      items: [
        {
          name: 'nummy fries',
          price: 2.56
        }
      ]}

    orderService.createOrder(mockOrder.data[0]).subscribe((orders) => {
      expect(orders).toEqual(mockOrder);
    });

    let url = 'http://localhost:7070/orders';
    httpMock.expectOne((request: HttpRequest<any>) => {
      console.log(request.body);
      return request.method == 'POST'
        && request.url == url
        && JSON.stringify(request.body) == JSON.stringify(createdOrder);
    }).flush(mockOrder);

    httpMock.verify();
  });

  it('should make a put request to update an order', () => {
    const mockOrder = {
      data: [
        {_id: 'adsfsdf',
        name: 'Jennifer',
        address: '123 main',
        phone: '555-555-5555',
        status: 'old',
        items: [
          {
            name: 'nummy fries',
            price: 2.56
          }
        ]}
      ]
    };

    const createdOrder = {
      _id: 'adsfsdf',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'delivered',
      items: [
        {
          name: 'nummy fries',
          price: 2.56
        }
      ]};

    orderService.updateOrder(mockOrder.data[0], 'delivered').subscribe((orders) => {
      expect(orders).toEqual(mockOrder);
    });

    let url = 'http://localhost:7070/orders/adsfsdf';
    httpMock.expectOne((request: HttpRequest<any>) => {
      console.log(request.body);
      return request.method == 'PUT'
        && request.url == url
        && JSON.stringify(request.body) == JSON.stringify(createdOrder);
    }).flush(mockOrder);

    httpMock.verify();
  });

  it('should make a delete request to delete an order', () => {
    const mockOrder = {
      data: [
        {_id: 'adsfsdf',
        name: 'Jennifer',
        address: '123 main',
        phone: '555-555-5555',
        status: 'old',
        items: [
          {
            name: 'nummy fries',
            price: 2.56
          }
        ]}
      ]
    };

    orderService.deleteOrder('adsfsdf').subscribe((orders) => {
      expect(orders).toEqual(mockOrder);
    });

    let url = 'http://localhost:7070/orders/adsfsdf';
    const req = httpMock.expectOne(url);

    expect(req.request.method).toEqual('DELETE');
    req.flush(mockOrder);

    httpMock.verify();
  });
});