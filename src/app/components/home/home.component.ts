import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/userService/user.service';
import { AccountsComponent } from '../accounts/accounts.component';
import { AccountService } from 'src/app/services/accountService/account.service';
import { Transaction } from 'src/app/models/Transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('accountsComponent', { static: false }) accountsComponent: AccountsComponent;
  transactions: Transaction[] = [];
  filteredTransactions : Transaction[] = []
  searchTerm: string = '';
  selectedDate: string = ''; 

  ngOnInit(): void {
    this.fetchTransactions();
  }

  constructor(private accountService: AccountService) {}

  reInitialise() {
    if (this.accountsComponent) {
      this.accountsComponent.reFetchAccounts();
    }
  }

  fetchTransactions() {
    this.accountService.getTransactions().subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.filteredTransactions = transactions;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  filterTransactions() {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    const selectedDateObj = this.selectedDate ? new Date(this.selectedDate) : null;
    
    if (this.searchTerm.trim() === '' && !this.selectedDate) {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter(transaction => {
        const titleMatches = transaction.title.toLowerCase().includes(searchTermLowerCase);
        const dateMatches = selectedDateObj ? 
          new Date(transaction.paymentDate).toISOString().split('T')[0] === this.selectedDate :
          true;
        return titleMatches && dateMatches;
      });
    }
  }

  filter(eventType: string) {
    if (eventType === 'Expenses') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === 'Expenses');
    } else if (eventType === 'Income') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === 'Income');
    } else {
      this.filteredTransactions = this.transactions;
    }
  }
  
  getFirstWord(str: string): string {
    if (!str) return '';
    return str.split(',')[0]; 
  }
}
