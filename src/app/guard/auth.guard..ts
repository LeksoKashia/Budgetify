import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map} from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthState } from 'src/app/redux/reducers/auth.reducer';
import { isLoggedIn } from '../redux/selectors/auth.selectors'; 
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
