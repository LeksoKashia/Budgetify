import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'src/app/models/subscription.model';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiServerUrl = Constants.apiUrl;  
  constructor(private http: HttpClient) {}

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiServerUrl}/subscription/add`,subscription);
  }

  updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiServerUrl}/subscription/update`,subscription);
  }

  deleteAccount(subscriptionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/subscription/delete/${subscriptionId}`);
  }
}
