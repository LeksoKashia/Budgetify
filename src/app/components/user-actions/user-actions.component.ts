import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransactionType } from 'src/app/enum/transaction-type.enum';
import { Account } from 'src/app/models/account.model';
import { PiggyBank } from 'src/app/models/piggy-bank.model';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  piggyBanks: PiggyBank[];
  showOverlay = false;
  formDisplayText: string;
  showAccountAdd = false;
  showTransactionAdd = false;
  showPiggyBankAdd = false;
  showPiggy = false;
  selectedPiggy: any;
  editPiggyLayout = false;
  addMoneyToPiggy = false;
  activeCard: Account;
  readonly transactionType = TransactionType;

  @Output() reInitialiseAccount = new EventEmitter<void>();
  @Output() searchEmit = new EventEmitter<string>();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    const storedCard = localStorage.getItem('activeCard');
    this.activeCard = JSON.parse(storedCard);
    this.getPiggyBanks();
  }

  searchType(type: string){
    this.searchEmit.emit(type);
  }

  getPiggyBanks() {
    if (this.activeCard) {
      this.accountService.getPiggyBanks().subscribe(
        (piggyBanks: PiggyBank[]) => {
          this.piggyBanks = piggyBanks;
        }
      )
    }
  }

  toggleOverlay(formName?: string) {
    this.getPiggyBanks();

    this.showOverlay = !this.showOverlay;
    this.formDisplayText = formName;

    this.showAccountAdd = formName === "Account";
    this.showTransactionAdd = formName === "Transaction";
    this.showPiggyBankAdd = formName === "Piggy Bank";
  }

  togglePiggy(piggy?: any, component?: string): number {
    if (component === 'info') {
      this.editPiggyLayout = false;
      this.addMoneyToPiggy = false;
      return 0;
    } else if (component === 'edit') {
      this.editPiggyLayout = true;
      this.addMoneyToPiggy = false;
      this.selectedPiggy = piggy;
      return 0;
    } else {
      if (piggy) {
        this.selectedPiggy = piggy;
      }
      this.showPiggy = !this.showPiggy;
      if (!piggy && !component) {
          this.getPiggyBanks();
      }
      return 0;
    }
  }

  addToPiggy() {
    this.editPiggyLayout = false;
    this.addMoneyToPiggy = !this.addMoneyToPiggy;
  }

  getRangeBackground(savedAmount: number, goalAmount: number) {
    const filledPercentage = (savedAmount / goalAmount) * 100;
    return `linear-gradient(to right, rgb(255, 118, 174) ${filledPercentage}%, white ${filledPercentage}%)`;
  }

  reInitialise() {
    this.reInitialiseAccount.emit();
  }
}
