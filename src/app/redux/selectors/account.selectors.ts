import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from '../reducers/account.reducer';

export const selectAccountState = createFeatureSelector<AccountState>('account');

export const selectActiveAccount = createSelector(
  selectAccountState,
  (state: AccountState) => state.activeAccount
);
