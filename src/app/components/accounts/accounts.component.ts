import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  showOverlay: boolean = false;
  showEditLayout: boolean = false;
  formDisplayText: string;
  selectedAccount: any;
  activeCardId: any | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccounts();
    this.getActiveCard();
  }
  
  reFetchAccounts() {
    this.getAccounts();
  }

  getAccounts() {
      this.accountService.getAccounts().subscribe(
        (accounts: Account[]) => {
          this.accounts = accounts;
        },
        (error) => {
          console.error('Error fetching accounts:', error);
        }
      );
    
  }

  getActiveCard() {
    const storedCard = localStorage.getItem('activeCard');
    if (storedCard) {
      this.activeCardId = JSON.parse(storedCard).id;
    }
  }

  toggleOverlay(account?: any) {
    if (account) {
      this.selectedAccount = account;
    }
    this.showOverlay = !this.showOverlay;
    this.showEditLayout = false;
    this.getAccounts();
  }

  delete(accountId: number): void {
    this.accountService.deleteAccount(accountId).subscribe(
      () => {
        if(this.activeCardId){
          if(this.activeCardId == accountId){
            localStorage.removeItem('activeCard'); 
          }
        }
        console.log(accountId);
        
        console.log(`Account with ID ${accountId} deleted successfully`);
        this.toggleOverlay();
      },
      error => {
        console.error('Error deleting account:', error);
      }
    );
  }

  showEdit() {
    this.showEditLayout = !this.showEditLayout;
  }
}
