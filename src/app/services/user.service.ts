import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User; 

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${email}`);
  }


  setUser(user: any) {
    this.user = user;
  }

  getUserInfo() {
    return this.user;
  }
  

}
