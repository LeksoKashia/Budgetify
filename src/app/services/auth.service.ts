import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../redux/selectors/auth.selectors'; 
import { AuthState } from '../redux/reducers/auth.reducer';
import * as AuthActions from '../redux/actions/auth.actions';
import { clearUser } from '../redux/actions/user.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<AuthState>, private router: Router) {}

  login() {
    // this.store.dispatch(AuthActions.login());
    this.saveAuthStateToLocalStorage(true);
    
  }

  logout() {
    // this.store.dispatch(clearUser());
    // this.store.dispatch(AuthActions.logout());
    this.clearUserFromLocalStorage();
    this.saveAuthStateToLocalStorage(false);
    this.router.navigate(['/login']);
  }

  // isLoggedIn(): Observable<boolean> {
  //   return this.store.select(isLoggedIn);
  // }

  private saveAuthStateToLocalStorage(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  private clearUserFromLocalStorage(): void {
    localStorage.removeItem('user');
  }

}
