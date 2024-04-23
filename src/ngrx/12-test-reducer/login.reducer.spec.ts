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

      // Compare new state
      expect(state).toEqual(expectedState);

      // Check for immutability
      expect(state).not.toBe(expectedState);
    });
  });

  describe('logoutSuccess action', () => {
    it('should reset LoginState to initialState', () => {
      const action = LoginActions.logoutSuccess();

      const state = reducer(
        {
          ...initialState,
          userId: 'some-user-id',
          username: 'some-username',
          token: 'some-token',
        },
        action
      );

      // Compare new state
      expect(state).toEqual(initialState);

      // Check for immutability
      expect(state).not.toBe(initialState);
    });
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      // Shouldn’t update state at all
      expect(result).toBe(initialState);
    });
  });
});
