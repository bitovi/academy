// src/app/dashboard/dashboard.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromLogin from '../store/login/login.reducer';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<fromLogin.LoginPartialState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout()', () => {
    it('should dispatch logout action', () => {
      // TODO: Spy on dispatching action

      component.logout();

      // TODO: Verify that LoginActions.logout action was dispatched
    });
  });

  describe('username$', () => {
    it('should get username from login state', () => {
      // TODO: Verify username comes from login state
    });
  });

  describe('userId$', () => {
    it('should get userId from login state', () => {
      // TODO: Verify userId comes from login state
    });
  });
});
