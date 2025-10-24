// src/app/state/app.state.ts
export interface AppState {
  isGuestMode: boolean;
}

export const initialState: AppState = {
  isGuestMode: true,
};
