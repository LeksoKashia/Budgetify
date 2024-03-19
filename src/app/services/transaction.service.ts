import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiServerUrl = Constants.apiUrl;  
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
