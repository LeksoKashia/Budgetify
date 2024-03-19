import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';
import { PiggyBank } from 'src/app/models/piggyBank.model';
import { AccountService } from 'src/app/services/account.service';
import { PiggyBankService } from 'src/app/services/piggy-bank.service';


@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  piggyBanks: PiggyBank[];
  showOverlay: boolean = false;
  formDisplayText: string;
  showAccountAdd: boolean = false;
  showTransactionAdd: boolean = false;
  showPiggyBankAdd: boolean = false;
  showPiggy: boolean = false;
  selectedPiggy: any;
  editPiggyLayout: boolean = false;
  addMoneyToPiggy: boolean = false;
  activeCard: Account;
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

  addToPiggy(piggyBank?: PiggyBank) {
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
