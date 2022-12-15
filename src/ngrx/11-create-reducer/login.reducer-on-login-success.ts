// src/app/store/login/login.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';

export interface State {
  userId: string | null;
  username: string | null;
  token: string | null;
}

export interface LoginPartialState {
  [loginFeatureKey]: State;
}

export const initialState: State = {
  userId: null,
  username: null,
  token: null,
};

export const reducer = createReducer(
  initialState,
  on(
    LoginActions.loginSuccess,
    (state, { userId, username, token }): State => ({
      ...state,
      userId,
      username,
      token,
    })
  )
);