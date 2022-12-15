// src/app/login/login.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as LoginActions from '../store/login/login.actions';
import * as fromLogin from '../store/login/login.reducer';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<fromLogin.LoginPartialState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [provideMockStore({}), FormBuilder],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit()', () => {
    it('should mark form as touched', () => {
      expect(component['form'].touched).toBe(false);
      component.submit();
      expect(component['form'].touched).toBe(true);
    });

    describe('when form is valid', () => {
      const mock = {
        username: 'some-username',
        password: 'some-password',
      };

      beforeEach(() => {
        component['form'].setValue(mock);
      });

      it('should have a valid form', () => {
        // Verify that form is truly valid for upcoming tests
        expect(component['form'].valid).toBe(true);
      });

      it('should dispatch LoginActions.login', () => {
        const spy = spyOn(store, 'dispatch');

        component.submit();

        expect(spy).toHaveBeenCalledOnceWith(LoginActions.login(mock));
      });
    });

    describe('when form is NOT valid', () => {
      const mock = {
        username: 'some-username',
        password: '', // password is required
      };

      beforeEach(() => {
        component['form'].setValue(mock);
      });

      it('should NOT have a valid form', () => {
        // Verify that form is truly invalid for upcoming tests
        expect(component['form'].valid).toBe(false);
      });

      it('should NOT dispatch LoginActions.login', () => {
        const spy = spyOn(store, 'dispatch');

        component.submit();

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
