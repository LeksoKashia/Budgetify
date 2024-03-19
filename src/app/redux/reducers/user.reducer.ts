import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/models/user.model';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUser, (state, { user }) => ({ ...state, user })),
  on(UserActions.clearUser, (state) => ({ ...state, user: null })),
);
