import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('OrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ {provide: HttpClient, useClass: HttpClientTestingModule} ]
  }));

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
