import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { ImageUrlPipe } from 'src/app/image-url.pipe';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RestaurantService } from '../restaurant.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let fakeRestaurants = [
    {"name":"Brunch Place",
    "slug":"brunch-place",
    "images":{
      "thumbnail":"node_modules/place-my-order-assets/images/4-thumbnail.jpg",
      "owner":"node_modules/place-my-order-assets/images/2-owner.jpg",
      "banner":"node_modules/place-my-order-assets/images/2-banner.jpg"},
      "menu":{
        "lunch":[
          {"name":"Ricotta Gnocchi","price":15.99},
          {"name":"Garlic Fries","price":15.99},
          {"name":"Charred Octopus","price":25.99}
        ],
        "dinner":[
          {"name":"Steamed Mussels","price":21.99},
          {"name":"Roasted Salmon","price":23.99},
          {"name":"Crab Pancakes with Sorrel Syrup","price":35.99}
        ]
      },
      "address":{
        "street":"2451 W Washburne Ave",
        "city":"Ann Arbor","state":"MI","zip":"53295"},
        "_id":"xugqxQIX5rPJTLBv"
      }
    ];

  class restaurantServiceStub {
    getRestaurant() {
      return of(fakeRestaurants[0])
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent, ImageUrlPipe ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: RestaurantService, useClass: restaurantServiceStub },
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
