import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [AppComponent, HomeComponent, RestaurantComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'place-my-order'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('place-my-order');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'place-my-order.com'
    );
  });

  it('should render the HomeComponent with router navigates to "/" path', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
    });
  }));

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
    });
  }));

  it('should have the home navigation link href set to "/"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('li a');
    const href = homeLink?.getAttribute('href');
    expect(href).toEqual('/');
  });

  it('should have the restaurants navigation link href set to "/restaurants"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const restaurantsLink = compiled.querySelector('li:nth-child(2) a');
    const href = restaurantsLink?.getAttribute('href');
    expect(href).toEqual('/restaurants');
  });

  it('should make the home navigation link class active when the router navigates to "/" path', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['']);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const homeLinkLi = compiled.querySelector('li');
    expect(homeLinkLi?.classList).toContain('active');
    expect(compiled.querySelectorAll('.active').length).toBe(1);
    flush();
  }));

  it('should make the restaurants navigation link class active when the router navigates to "/restaurants" path', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants']);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/restaurants');
    const restaurantsLinkLi = compiled.querySelector('li:nth-child(2)');
    expect(restaurantsLinkLi?.classList).toContain('active');
    expect(compiled.querySelectorAll('.active').length).toBe(1);
    flush();
  }));
});
