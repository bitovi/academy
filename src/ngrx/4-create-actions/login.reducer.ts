// src/app/store/login/login.reducer.ts

import { createReducer } from '@ngrx/store';

export const loginFeatureKey = 'login';

export interface State {

}

export interface LoginPartialState {
  [loginFeatureKey]: State;
}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState
);