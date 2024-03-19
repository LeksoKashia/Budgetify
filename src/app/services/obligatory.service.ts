import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obligatory } from 'src/app/models/obligatory.model';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ObligatoryService {
  private apiServerUrl = Constants.apiUrl;

  constructor(private http: HttpClient) {}

  addObligatory(obligatory: Obligatory): Observable<Obligatory> {
    return this.http.post<Obligatory>(`${this.apiServerUrl}/obligatory/add`,obligatory);
  }

  updateObligatory(obligatory: Obligatory): Observable<Obligatory> {
    return this.http.put<Obligatory>(`${this.apiServerUrl}/obligatory/update`,obligatory);
  }

  deleteAccount(obligatoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/obligatory/delete/${obligatoryId}`);
  }

}
