// src/app/dashboard/dashboard.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
