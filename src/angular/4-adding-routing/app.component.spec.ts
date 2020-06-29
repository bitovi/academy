import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    expect(compiled.querySelector('h1').textContent).toContain('Place My Order App: Coming Soon!');
  });

  it('should render the HomeComponent with router navigates to "/" path', (done) => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
      done();
    });
  });

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', (done) => {
    const compiled = fixture.debugElement.nativeElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
      done();
    });
  });

});