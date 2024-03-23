import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUser = createAction('[User] Set User', props<{ user: User }>());
export const getUserInfo = createAction('[User] Get User Info');
export const clearUser = createAction('[User] Clear User');
