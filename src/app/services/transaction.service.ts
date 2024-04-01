import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs';
import { TransactionCategory } from '../models/transaction-category.model';
import { ImageModel } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiServerUrl = Constants.apiUrl;  

  constructor(private http: HttpClient) {}

  getCategories(transactionId: number): Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategory[]>(`${this.apiServerUrl}/transaction/categories/${transactionId}`);
  }

  getImages(transactionId: number): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`${this.apiServerUrl}/transaction/images/${transactionId}`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiServerUrl}/transaction/add`,transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiServerUrl}/transaction/update`,transaction);
  }

  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/transaction/delete/${transactionId}`);
  }
}
