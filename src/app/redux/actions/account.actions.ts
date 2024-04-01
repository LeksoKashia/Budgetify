import { createAction, props } from '@ngrx/store';
import { Account } from 'src/app/models/account.model';

export const setActiveAccount = createAction('[Account] Set Active Account', props<{ account: Account }>());
export const clearActiveAccount = createAction('[Account] Clear Active Account');
