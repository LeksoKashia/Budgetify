import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loggedIn: true })),
  on(AuthActions.logout, state => ({ ...state, loggedIn: false }))
);
