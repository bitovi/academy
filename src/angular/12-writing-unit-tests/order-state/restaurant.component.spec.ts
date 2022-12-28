import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from './restaurant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUrlPipe } from '../image-url.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  let fakeRestaurants = [{
    name: 'Burger Shack',
    slug: 'burger-shack',
    images: {},
    menu: [{
      name: 'fries',
      price: 3.99
    }],
    address: {},
    _id: '12233asdas11'
  }];

  class restaurantServiceStub {
    getRestaurants() {
      return fakeRestaurants
    }
    getStates() {
      return of({
        data: [
          {name: 'Missouri', short: 'MO'}
        ]
      })
    }
    getCities() {
      return of({
        data: [
          {name: 'Kansas City', state: 'MO', }
        ]
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantComponent, ImageUrlPipe ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: RestaurantService, useClass: restaurantServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
