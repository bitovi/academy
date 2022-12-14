// src/app/store/login/login.effects.spec.ts

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { LoginEffects } from './login.effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as LoginActions from './login.actions';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock',
})
class MockComponent {}

const mockLoginService = {
  login: (credentials: { username: string; password: string }) => {
    credentials;
    return of({ userId: 'some-user-id', token: 'some-token' });
  },
  logout: () => of(null),
} as LoginService;

describe('LoginEffects', () => {
  let actions$: Observable<Action>;
  let effects: LoginEffects;

  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: MockComponent },
          { path: 'dashboard', component: MockComponent },
        ]),
      ],
      providers: [
        LoginEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    });

    effects = TestBed.inject(LoginEffects);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  describe('login$', () => {
    beforeEach(() => {
      actions$ = of(
        LoginActions.login({
          username: 'some-username',
          password: 'some-password',
        })
      );
    });

    it('should get dispatch LoginActions.loginSuccess on api success', done => {
      const spy = spyOn(loginService, 'login').and.callThrough();

      effects.login$.subscribe(action => {
        expect(spy).toHaveBeenCalledOnceWith({
          username: 'some-username',
          password: 'some-password',
        });

        expect(action).toEqual(
          LoginActions.loginSuccess({
            username: 'some-username',
            userId: 'some-user-id',
            token: 'some-token',
          })
        );

        done();
      });
    });

    it('should get dispatch LoginActions.loginFailure on api error', done => {
      const spy = spyOn(loginService, 'login').and.returnValue(
        throwError(() => new Error('some error message'))
      );

      effects.login$.subscribe(action => {
        expect(spy).toHaveBeenCalledOnceWith({
          username: 'some-username',
          password: 'some-password',
        });

        expect(action).toEqual(
          LoginActions.loginFailure({
            errorMsg: 'some error message',
          })
        );

        done();
      });
    });
  });

  describe('loginSuccess$', () => {
    beforeEach(() => {
      actions$ = of(
        LoginActions.loginSuccess({
          userId: 'some-user-id',
          username: 'some-username',
          token: 'some-token',
        })
      );
    });

    it('should navigate to dashboard', done => {
      const spy = spyOn(router, 'navigate').and.callThrough();

      effects.loginSuccess$.subscribe(() => {
        expect(spy).toHaveBeenCalledOnceWith(['dashboard']);
        done();
      });
    });
  });

  describe('logout$', () => {
    beforeEach(() => {
      actions$ = of(LoginActions.logout());
    });

    it('should get dispatch LoginActions.logoutSuccess on api success', done => {
      effects.logout$.subscribe(action => {
        expect(action).toEqual(LoginActions.logoutSuccess());
        done();
      });
    });

    it('should get dispatch LoginActions.logoutFailure on api error', done => {
      const spy = spyOn(loginService, 'logout').and.returnValue(
        throwError(() => new Error('some error message'))
      );

      effects.logout$.subscribe(action => {
        expect(spy).toHaveBeenCalledOnceWith();

        expect(action).toEqual(
          LoginActions.logoutFailure({
            errorMsg: 'some error message',
          })
        );

        done();
      });
    });
  });

  describe('logoutSuccess$', () => {
    beforeEach(() => {
      actions$ = of(LoginActions.logoutSuccess());
    });

    it('should navigate to login', done => {
      const spy = spyOn(router, 'navigate').and.callThrough();

      effects.logoutSuccess$.subscribe(() => {
        expect(spy).toHaveBeenCalledOnceWith(['']);
        done();
      });
    });
  });
});
