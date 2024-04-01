
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountState } from 'src/app/redux/reducers/account.reducer';
import { AccountService } from 'src/app/services/account.service';
import * as AccountActions from 'src/app/redux/actions/account.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cards$: Observable<Account[]>;

  constructor(private paymentsService: AccountService, private store: Store<AccountState>) { }

  ngOnInit(): void {
    this.cards$ = this.paymentsService.getAccounts();
    const storedCard = localStorage.getItem('activeCard');
    if (storedCard) {
      const activeCard = JSON.parse(storedCard);
      this.cards$.subscribe(cards => {
        const cardToUpdate = cards.find(card => card.id === activeCard.id);
        if (cardToUpdate) {
          cardToUpdate.isActive = true;
        }
      });
    }
  }

  toggleCard(card: Account): void {
    this.cards$.subscribe(cards => {
      cards.forEach( individualCard=> {
        if (individualCard === card) {
          individualCard.isActive = !individualCard.isActive;
          if (!individualCard.isActive) {
            localStorage.removeItem('activeCard');
            // this.store.dispatch(AccountActions.clearActiveAccount());
          } else {
            localStorage.setItem('activeCard', JSON.stringify(card));
            // this.store.dispatch(AccountActions.setActiveAccount({ account: card }));
          }
        } else {
          individualCard.isActive = false; 
        }
      });
    });
  }
}