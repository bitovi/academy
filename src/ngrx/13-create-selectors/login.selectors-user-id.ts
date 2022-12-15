// src/app/store/login/login.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';

export const selectLoginState = createFeatureSelector<fromLogin.State>(
  fromLogin.loginFeatureKey
);

export const selectUserId = createSelector(
  selectLoginState,
  state => state.userId
);