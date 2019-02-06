import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { HistoryComponent } from './history.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from '../order.service';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  let fakeOrders = {data: [
    {
      "status": "delivered",
      "items": [
        {
          "name": "Truffle Noodles",
          "price": 14.99
        },
        {
          "name": "Garlic Fries",
          "price": 15.99
        },
        {
          "name": "Gunthorp Chicken",
          "price": 21.99
        }
      ],
      "name": "Justin Meyer",
      "address": "3108 Winchester Ct.",
      "slug": "poutine-palace",
      "_id": "6spxPX078VcOcohU"
    }
  ]};

  class orderServiceStub {
    getOrders() {
      return of(fakeOrders)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: OrderService, useClass: orderServiceStub } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
