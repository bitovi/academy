import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ImageUrlPipe } from '../../image-url.pipe';
import { RestaurantService } from '../restaurant.service';
import { DetailComponent } from './detail.component';

class MockRestaurantService {
  getRestaurant(slug: string) {
    return of({
      name: 'Poutine Palace',
      slug: 'poutine-palace',
      images: {
        thumbnail: 'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
        owner: 'node_modules/place-my-order-assets/images/3-owner.jpg',
        banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
      },
      menu: {
        lunch: [
          {
            name: 'Crab Pancakes with Sorrel Syrup',
            price: 35.99,
          },
          {
            name: 'Steamed Mussels',
            price: 21.99,
          },
          {
            name: 'Spinach Fennel Watercress Ravioli',
            price: 35.99,
          },
        ],
        dinner: [
          {
            name: 'Gunthorp Chicken',
            price: 21.99,
          },
          {
            name: 'Herring in Lavender Dill Reduction',
            price: 45.99,
          },
          {
            name: 'Chicken with Tomato Carrot Chutney Sauce',
            price: 45.99,
          },
        ],
      },
      address: {
        street: '230 W Kinzie Street',
        city: 'Green Bay',
        state: 'WI',
        zip: '53205',
      },
      _id: '3ZOZyTY1LH26LnVw',
    });
  }
}

const MockActivatedRoute = {
  snapshot: {
    paramMap: {
      get() {
        return 'poutine-palace';
      },
    },
  },
};

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent, ImageUrlPipe],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: RestaurantService,
          useClass: MockRestaurantService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an isLoading member set to true by default', () => {
    const fixture = TestBed.createComponent(DetailComponent);
    expect(fixture.componentInstance.isLoading).toEqual(true);
  });

  it('should get a restaurant based on route slug', () => {
    const mockRestaurant = {
      name: 'Poutine Palace',
      slug: 'poutine-palace',
      images: {
        thumbnail: 'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
        owner: 'node_modules/place-my-order-assets/images/3-owner.jpg',
        banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
      },
      menu: {
        lunch: [
          {
            name: 'Crab Pancakes with Sorrel Syrup',
            price: 35.99,
          },
          {
            name: 'Steamed Mussels',
            price: 21.99,
          },
          {
            name: 'Spinach Fennel Watercress Ravioli',
            price: 35.99,
          },
        ],
        dinner: [
          {
            name: 'Gunthorp Chicken',
            price: 21.99,
          },
          {
            name: 'Herring in Lavender Dill Reduction',
            price: 45.99,
          },
          {
            name: 'Chicken with Tomato Carrot Chutney Sauce',
            price: 45.99,
          },
        ],
      },
      address: {
        street: '230 W Kinzie Street',
        city: 'Green Bay',
        state: 'WI',
        zip: '53205',
      },
      _id: '3ZOZyTY1LH26LnVw',
    };
    expect(fixture.componentInstance.restaurant).toEqual(mockRestaurant);
  });
});
