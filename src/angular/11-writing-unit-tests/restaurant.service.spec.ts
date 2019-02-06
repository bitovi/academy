import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('RestaurantService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ {provide: HttpClient, useClass: HttpClientTestingModule} ]
  }));

  it('should be created', () => {
    const service: RestaurantService = TestBed.get(RestaurantService);
    expect(service).toBeTruthy();
  });
});
