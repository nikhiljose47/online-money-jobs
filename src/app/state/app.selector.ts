// src/app/state/app.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');
export const selectIsGuestMode = createSelector(
  selectAppState,
  (state) => state.isGuestMode
);
