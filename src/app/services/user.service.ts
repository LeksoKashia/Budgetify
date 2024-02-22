import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

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
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserInfoFromLocalStorage(): User {
    const userInfo = localStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
