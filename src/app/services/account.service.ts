import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { PiggyBank } from '../models/piggyBank.model';
import { Obligatory } from 'src/app/models/obligatory.model';
import { Constants } from 'src/app/constants/constants';
import { Transaction } from 'src/app/models/transaction.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = Constants.apiUrl;
  private accountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {}

  getAccounts(): BehaviorSubject<Account[]> {
    const user = this.userService.getUserInfoFromLocalStorage();
    this.http.get<Account[]>(`${this.apiServerUrl}/user/accounts/${user.id}`)
      .subscribe(
        (accounts: Account[]) => {
          this.updateAccounts(accounts);
        },
        (error) => {
          console.error('Error fetching accounts:', error);
        }
      );
    return this.accountsSubject;
  }
  
  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(
      `${this.apiServerUrl}/account/add`,
      account
    ).pipe(
      tap((newAccount: Account) => {
        this.updateAccounts([...this.accountsSubject.getValue(), newAccount]);
      })
    );
  }
  
  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(
      `${this.apiServerUrl}/account/update`,
      account
    ).pipe(
      tap(() => {
        const updatedAccounts = this.accountsSubject.getValue().map((acc: Account) => {
          if (acc.id === account.id) {
            return account;
          }
          return acc;
        });
        this.updateAccounts(updatedAccounts);
      })
    );
  }
  
  deleteAccount(accountId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/account/delete/${accountId}`)
      .pipe(
        tap(() => {
          const updatedAccounts = this.accountsSubject.getValue().filter((acc: Account) => acc.id !== accountId);
          this.updateAccounts(updatedAccounts);
        })
      );
  }

  getTransactions(): Observable<Transaction[]> {
    const activeCard : Account = JSON.parse(localStorage.getItem('activeCard'))
    return this.http.get<Transaction[]>(`${this.apiServerUrl}/account/accounts/transactions/${activeCard.id}`)
  }

  getPiggyBanks(): Observable<PiggyBank[]> {
    const activeCard : Account = JSON.parse(localStorage.getItem('activeCard'))
    return this.http.get<PiggyBank[]>(`${this.apiServerUrl}/account/accounts/${activeCard.id}`)
  }

  getSubscriptions(): Observable<Subscription[]> {
    const activeCard : Account = JSON.parse(localStorage.getItem('activeCard'))
    return this.http.get<Subscription[]>(`${this.apiServerUrl}/account/accounts/subscriptions/${activeCard.id}`)
  }

  getObligatories(): Observable<Obligatory[]> {
    const activeCard: Account = JSON.parse(localStorage.getItem('activeCard'));
    return this.http.get<Obligatory[]>(`${this.apiServerUrl}/account/accounts/obligatories/${activeCard.id}`);
  }
  
  updateAccounts(accounts: Account[]): void {
    this.accountsSubject.next(accounts);
  }

  subscribeToAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }
}
