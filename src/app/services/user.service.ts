import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Constants } from 'src/app/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserState } from '../redux/reducers/user.reducer';
import * as UserActions from '../redux/actions/user.actions';
import { selectUser } from '../redux/selectors/user.selectors';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = Constants.apiUrl;

  constructor(private http: HttpClient,  private store: Store<UserState>) {}

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
    this.store.dispatch(UserActions.setUser({ user }));
  }
  
  getUserInfo(): Observable<User> {
    return this.store.pipe(select(selectUser));
  }

}
