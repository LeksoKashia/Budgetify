
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/Account.model';
import { AccountService } from 'src/app/services/accountService/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cards$: Observable<Account[]>;

  constructor(private paymentsService: AccountService) { }

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
          } else {
            localStorage.setItem('activeCard', JSON.stringify(card));
          }
        } else {
          individualCard.isActive = false; 
        }
      });
    });
  }
}