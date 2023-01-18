// src/app/store/login/login.effects.spec.ts

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoginEffects } from './login.effects';

describe('LoginEffects', () => {
  let actions$: Observable<any>;
  let effects: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LoginEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
