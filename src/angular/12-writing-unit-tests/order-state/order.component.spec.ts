import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { OrderComponent } from './order.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { OrderService } from './order.service';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  class restaurantServiceStub {
    getRestaurant() {
      return of({
        name: 'crab palace',
        menu: {
          lunch: [
            {
              name: 'tacos',
              price: 3.99
            }
          ],
          dinner: [
            {
              name: 'burrito',
              price: 7.99
            }
          ]
        }
      })
    }
  }

  class orderServiceStub {
    createOrder() {
      return of({
        name: 'hungry hungry hippo',
        items: [
          {
            name: 'tacos',
            price: 3.99
          }
        ]
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports: [ ReactiveFormsModule, ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get() {
                  return of({slug: 'crab-palace'})
                }
              }
            }
          }
        },
        { provide: RestaurantService, useClass: restaurantServiceStub },
        { provide: OrderService, useClass: orderServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
