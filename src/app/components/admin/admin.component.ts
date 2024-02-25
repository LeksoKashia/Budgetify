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
  activeCard: Account | null = null;

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.cards$ = this.paymentsService.getAccounts();
    const storedCard = localStorage.getItem('activeCard');
    if (storedCard) {
      this.activeCard = JSON.parse(storedCard);
      this.activateCard(this.activeCard);
    }
  }

  toggleCard(card: Account): void {
    this.activateCard(card);
    localStorage.setItem('activeCard', JSON.stringify(card));
  }

  private activateCard(card: Account): void {
    this.cards$.subscribe(cards => {
      cards.forEach(c => {
        if (c !== card) {
          c.isActive = false;
        }
      });
      card.isActive = !card.isActive;
    });
  }
}