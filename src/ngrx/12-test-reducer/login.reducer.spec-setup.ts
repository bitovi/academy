// src/app/store/login/login.reducer.spec.ts

import { reducer, initialState, State } from './login.reducer';
import * as LoginActions from './login.actions';

describe('Login Reducer', () => {
  describe('loginSuccess action', () => {
    it('should update the state in an immutable way', () => {
      // Expectation of new state
      const expectedState: State = {
        ...initialState,
        userId: 'some-user-id',
        username: 'some-username',
        token: 'some-token',
      };

      const action = LoginActions.loginSuccess({
        userId: 'some-user-id',
        username: 'some-username',
        token: 'some-token',
      });

      const state = reducer({ ...initialState }, action);
    });
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
