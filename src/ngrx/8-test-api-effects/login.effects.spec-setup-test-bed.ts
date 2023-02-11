// src/app/store/login/login.effects.spec.ts

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { LoginEffects } from './login.effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as LoginActions from './login.actions';

describe('LoginEffects', () => {
  let actions$: Observable<Action>;
  let effects: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoginEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(LoginEffects);
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
  });
});
