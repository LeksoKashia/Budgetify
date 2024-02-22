import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account.model';
import { User } from 'src/app/models/User.model';
import { PaymentsService } from 'src/app/services/payments.service';
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

  constructor(private paymentsService: PaymentsService, private userService: UserService) {}

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    const user: User = this.userService.getUserInfoFromLocalStorage();
    if (user && user.id) {
      this.paymentsService.getAccounts().subscribe(
        (accounts: Account[]) => {
          this.accounts = accounts.filter(account => account.user.id === user.id);
        },
        (error) => {
          console.error('Error fetching accounts:', error);
        }
      );
    } else {
      console.error('User information not found.');
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
    this.paymentsService.deleteAccount(accountId).subscribe(
      () => {
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
