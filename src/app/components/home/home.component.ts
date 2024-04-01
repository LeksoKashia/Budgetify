import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsComponent } from '../accounts/accounts.component';
import { AccountService } from 'src/app/services/account.service';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionType } from 'src/app/enum/transaction-type.enum';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionCategoriesService } from 'src/app/services/transaction-categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('accountsComponent', { static: false }) accountsComponent: AccountsComponent;
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  transactionCategories: any[] = [];
  searchTerm = '';
  selectedDate = '';
  readonly transactionType = TransactionType;
  categoriesMap = {};
  categoriesArray : any[];
  showOverlay: boolean = false;
  currentTransaction : Transaction;
  

  ngOnInit(): void {
    this.fetchTransactions();
    this.getAllCategories();
  }

  constructor(private accountService: AccountService, private transactionCategoriesService: TransactionCategoriesService) {}

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
    if (eventType === TransactionType.Expenses) {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === TransactionType.Expenses);
    } else if (eventType === TransactionType.Income) {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === TransactionType.Income);
    } else {
      this.filteredTransactions = this.transactions;
    }
  }

  getAllCategories(): any {
    this.transactionCategoriesService.getTransactionCategories().subscribe(
      (response) => {
        this.transactionCategories = response;
        this.transactionCategories.forEach(item => {
          const transactionID = item.transaction.id;
          if (!this.categoriesMap[transactionID]) {
            this.categoriesMap[transactionID] = [];
          }
          this.categoriesMap[transactionID].push(item.name);
        });
        this.categoriesArray = Object.values(this.categoriesMap);
  
        console.log(this.categoriesArray);
      }
    );
  }

  toggleInfo(transaction?: Transaction){
    this.showOverlay = !this.showOverlay;
    if (transaction) {
      this.currentTransaction = transaction;
    }
  }
  
  
}