// src/app/login/login.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [FormBuilder],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
        // TODO: Spy on dispatching action

        component.submit();

        // TODO: Verify that LoginActions.login action was dispatched
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
        // TODO: Spy on dispatching action

        component.submit();

        // TODO: Verify that no action was dispatched
      });
    });
  });
});
