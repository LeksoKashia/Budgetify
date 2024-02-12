import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { Store } from '@ngrx/store';
import { UserState } from '../redux/reducers/user.reducer';
import * as UserActions from '../redux/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private store: Store<UserState>) {}

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${email}`);
  }

  setUser(user: User) {
    this.store.dispatch(UserActions.setUser({ user }));
  }

  getUserInfo() {
    this.store.dispatch(UserActions.getUserInfo());
  }

}
