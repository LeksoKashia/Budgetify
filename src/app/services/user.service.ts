import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiServerUrl}/user/add`,
      user
    );
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  setUser(user: User) {
    // this.store.dispatch(UserActions.setUser({ user }));
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getUserInfo() {
  //   this.store.dispatch(UserActions.getUserInfo());
  // }

  getUserInfoFromLocalStorage(): Observable<User> {
    const userInfo = localStorage.getItem('user');
    return of(userInfo ? JSON.parse(userInfo) : null);
  }

}
