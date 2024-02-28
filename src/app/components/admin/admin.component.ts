
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/Account.model';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cards$: Observable<Account[]>;

  constructor(private paymentsService: PaymentsService) { }

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
      cards.forEach(c => {
        if (c === card) {
          c.isActive = !c.isActive;
          if (!c.isActive) {
            localStorage.removeItem('activeCard');
          } else {
            localStorage.setItem('activeCard', JSON.stringify(card));
          }
        } else {
          c.isActive = false; 
        }
      });
    });
  }
}