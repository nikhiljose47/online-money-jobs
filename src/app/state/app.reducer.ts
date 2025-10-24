// src/app/state/app.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';
import { toggleMode } from './app.action';

export const appReducer = createReducer(
  initialState,
  on(toggleMode, (state) => ({
    ...state,
    isGuestMode: !state.isGuestMode,
  }))
);
