// Note: This example code is not part of our application repo or solution
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export const scoreboardReducer = createReducer(
  initialState,// Initial feature state
  on(CounterActions.set, (state, action) => ({ ...state, count: action.count })),// Set counter
  on(CounterActions.increment, state => ({ ...state, count: state.count + 1 })),// Increment counter
  on(CounterActions.reset, () => ({ ...initialState })),// Reset counter
  // ...
);
