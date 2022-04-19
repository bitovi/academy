import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '../image-url.pipe';
import { RestaurantComponent } from './restaurant.component';

describe('RestaurantComponent', () => {
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RestaurantComponent, ImageUrlPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantComponent);
  });

  it('should create', () => {
    const component: RestaurantComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Restaurants');
  });

  it('should not show any restaurants markup if no restaurants', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.restaurant')).toBe(null);
  });

  it('should have two .restaurant divs', fakeAsync((): void => {
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const restaurantDivs = compiled.getElementsByClassName('restaurant');
    const hoursDivs = compiled.getElementsByClassName('hours-price');
    expect(restaurantDivs.length).toEqual(2);
    expect(hoursDivs.length).toEqual(2);
  }));

  it('should display restaurant information', fakeAsync((): void => {
    fixture.detectChanges();
    tick(501);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.restaurant h3')?.textContent).toContain(
      'Poutine Palace'
    );
  }));
});
