import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PiggyBank } from 'src/app/models/piggy-bank.model';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PiggyBankService {
  private apiServerUrl = Constants.apiUrl;

  constructor(private http: HttpClient) {}

  addPiggyBank(piggyBank: PiggyBank): Observable<PiggyBank> {
    return this.http.post<PiggyBank>(`${this.apiServerUrl}/piggy/add`,piggyBank);
  }

  updatePiggyBank(piggyBank: PiggyBank): Observable<PiggyBank> {
    return this.http.put<PiggyBank>(`${this.apiServerUrl}/piggy/update`,piggyBank);
  }

  deleteAccount(piggyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/piggy/delete/${piggyId}`);
  }

}
