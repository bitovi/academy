// src/app/store/login/login.reducer.spec.ts

import { reducer, initialState } from './login.reducer';

describe('Login Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
