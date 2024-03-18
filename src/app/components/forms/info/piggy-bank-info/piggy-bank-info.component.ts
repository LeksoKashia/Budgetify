import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models/Account.model';
import { PiggyBank } from 'src/app/models/PiggyBank.model';
import { AccountService } from 'src/app/services/accountService/account.service';
import { PiggyBankService } from 'src/app/services/piggyBankService/piggy-bank.service';

@Component({
  selector: 'app-piggy-bank-info',
  templateUrl: './piggy-bank-info.component.html',
  styleUrls: ['./piggy-bank-info.component.scss', '../account-info/account-info.component.scss', '../../../user-actions/user-actions.component.scss']
})
export class PiggyBankInfoComponent implements OnInit{

  activeCard : Account;
  @Input() piggyBankInfo : PiggyBank;
  @Output() closeForm = new EventEmitter<void>();
  @Output() reInitialise = new EventEmitter<void>();


  ngOnInit(): void {
    this.activeCard= JSON.parse(localStorage.getItem('activeCard'));
  }

  constructor(private piggyService: PiggyBankService, private accountService: AccountService) {}

  getRangeBackground(savedAmount: number, goalAmount: number) {
    const filledPercentage = (savedAmount / goalAmount) * 100;
    return `linear-gradient(to right, rgb(255, 118, 174) ${filledPercentage}%, rgba(254, 206, 226, 1) ${filledPercentage}%)`;
  }

  crashPiggy(){
    this.closeForm.emit();
    this.reInitialise.emit();
    
    this.piggyService.deleteAccount(this.piggyBankInfo.id).subscribe(
      () => {
          const storedCard = localStorage.getItem('activeCard');
          const activeCard: Account= JSON.parse(storedCard);
          const updatedAccount: Account = {
            id: activeCard.id,
            title: activeCard.title,
            currency: activeCard.currency,
            description: activeCard.description,
            balance: activeCard.balance + this.piggyBankInfo.savedAmount,
            user: activeCard.user
          };
          localStorage.setItem('activeCard', JSON.stringify(updatedAccount));
          this.accountService.updateAccount(updatedAccount)
          .subscribe(
            (response) => {
              this.reInitialise.emit();
              console.log('Account updated successfully:', response);
            },
            (error) => {
              console.error('Failed to update account:', error);
            }
          );
      }
    )
  }
}
