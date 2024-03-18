import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) {}

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiServerUrl}/transaction/add`,transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiServerUrl}/transaction/update`,transaction);
  }

  deleteAccount(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/transaction/delete/${transactionId}`);
  }

}
