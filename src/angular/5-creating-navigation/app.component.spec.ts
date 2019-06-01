import { TestBed, async, fakeAsync, tick, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageUrlPipe } from './image-url.pipe';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule
      ],
      declarations: [
        AppComponent, HomeComponent, RestaurantComponent, ImageUrlPipe
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'place-my-order'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('place-my-order');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('place-my-order.com');
  });

  it('should render the HomeComponent with router navigates to "/" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
    });
  });

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', () => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
    });
  });

  it('should have the home navigation link href set to ""', () => {
    fixture.detectChanges();
    let homeLink = fixture.debugElement.query(By.css('li a'));
    let href = homeLink.nativeElement.getAttribute('href');
    expect(href).toEqual('/');
  });

  it('should have the restaurants navigation link href set to ""', () => {
    fixture.detectChanges();
    let restaurantsLink = fixture.debugElement.query(By.css('li:nth-child(2) a'));
    let href = restaurantsLink.nativeElement.getAttribute('href');
    expect(href).toEqual('/restaurants');
  });

  it('should make the home navigation link class active when the router navigates to "/" path', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['']).then(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let homeLinkLi = fixture.debugElement.query(By.css('li'));
      expect(homeLinkLi.nativeElement.classList).toContain('active');
      expect(compiled.querySelectorAll('.active').length).toBe(1);
      fixture.destroy();
      flush();
    });
  }));

  it('should make the restaurants navigation link class active when the router navigates to "/restaurants" path', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let restaurantsLinkLi = fixture.debugElement.query(By.css('li:nth-child(2)'));
      expect(restaurantsLinkLi.nativeElement.classList).toContain('active');
      expect(compiled.querySelectorAll('.active').length).toBe(1);
      fixture.destroy();
      flush();
    });
  }));

});