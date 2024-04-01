import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../redux/selectors/auth.selectors'; 
import { AuthState } from '../redux/reducers/auth.reducer';
import * as AuthActions from '../redux/actions/auth.actions';
import { clearUser } from '../redux/actions/user.actions';
import { Router } from '@angular/router';
import * as AccountActions from 'src/app/redux/actions/account.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<AuthState>, private router: Router) {}

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(clearUser());
    this.store.dispatch(AccountActions.clearActiveAccount());
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(isLoggedIn);
  }
  
}
