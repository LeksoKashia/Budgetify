import { createReducer, on } from '@ngrx/store';
import * as AccountActions from '../actions/account.actions';
import { Account } from 'src/app/models/account.model';

export interface AccountState {
  activeAccount: Account | null;
}

const initialState: AccountState = {
  activeAccount: null
};

export const accountReducer = createReducer(
  initialState,
  on(AccountActions.setActiveAccount, (state, { account }) => ({ ...state, activeAccount: account })),
  on(AccountActions.clearActiveAccount, (state) => ({ ...state, activeAccount: null })),
);
