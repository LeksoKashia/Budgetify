import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'src/app/models/Subscription.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private userService: UserService) {}

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiServerUrl}/subscription/add`,subscription);
  }

  updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiServerUrl}/subscription/update`,subscription);
  }

  deleteAccount(piggyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/subscription/delete/${piggyId}`);
  }

}
