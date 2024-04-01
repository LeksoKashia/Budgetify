import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionCategory } from 'src/app/models/transaction-category.model';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionCategoriesService {
  private apiServerUrl = Constants.apiUrl;  
  constructor(private http: HttpClient) {}

  addTransactionCategories(transactionCategory: TransactionCategory): Observable<TransactionCategory> {
    return this.http.post<TransactionCategory>(`${this.apiServerUrl}/transactionCategories/add`,transactionCategory);
  }

  getTransactionCategories(): Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategory[]>(`${this.apiServerUrl}/transactionCategories/allCategories`);
  }

  updateTransactionCategories(transactionCategory: TransactionCategory): Observable<TransactionCategory> {
    return this.http.put<TransactionCategory>(`${this.apiServerUrl}/transactionCategories/update`,transactionCategory);
  }

  deleteTransactionCategory(transactionCategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/transactionCategories/delete/${transactionCategoryId}`);
  }
}
