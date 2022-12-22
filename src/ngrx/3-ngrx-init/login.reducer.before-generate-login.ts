// src/app/store/login/login.reducer.ts

import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';

export interface State {
  username: string | null;
  userId: string | null;
  token: string | null;
}

export const initialState: State = {
  username: null,
  userId: null,
  token: null,
};

export const reducer = createReducer(
  initialState,

  // on(LoginActions.loadLogins, state => state),
  // on(LoginActions.loadLoginsSuccess, (state, action) => state),
  on(LoginActions.loginSuccess, (state, { type, ...payload }) => ({
    ...payload,
  })),
  on(LoginActions.logoutSuccess, (state, action) => initialState)
);
