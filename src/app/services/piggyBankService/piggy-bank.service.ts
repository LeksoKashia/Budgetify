import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { PiggyBank } from 'src/app/models/PiggyBank.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PiggyBankService {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private userService: UserService) {}

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
