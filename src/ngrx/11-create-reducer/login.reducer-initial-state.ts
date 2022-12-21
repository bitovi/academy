// src/app/store/login/login.reducer.ts

import { createReducer } from '@ngrx/store';

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
  initialState
);
