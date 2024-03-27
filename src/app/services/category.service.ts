import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = Constants.apiUrl;

  constructor(private http: HttpClient) {}

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/category/add`,category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/category/update`,category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/category/delete/${categoryId}`);
  }
}
