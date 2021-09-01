import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RestaurantService } from '../restaurant/restaurant.service';
import { MenuItemsComponent } from './menu-items/menu-items.component';

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent, MenuItemsComponent ],
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
