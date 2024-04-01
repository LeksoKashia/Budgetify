import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent {
  startDate: string;
  endDate: string;
  months: { name: string, income: number, expenses: number, economy: number, economyInDollars: number }[] = [];

  totalIncome: number = 0;
  totalExpenses: number = 0;
  totalEconomy: number = 0;
  totalPercentage: number = 0;

  averageIncome: number = 0;
  averageExpenses: number = 0;
  averageEconomy: number = 0;
  averagePercentage: number = 0;

  constructor(private accountService: AccountService) {}

  logDates() {
    const transactionsByMonth: { [key: string]: Transaction[] } = {};

    this.accountService.getTransactions().subscribe(transactions => {
      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.paymentDate);
        const month = transactionDate.toLocaleString('default', { month: 'long' });
        if (!transactionsByMonth[month]) {
          transactionsByMonth[month] = [];
        }
        transactionsByMonth[month].push(transaction);
      });

      this.months = [];

      Object.keys(transactionsByMonth).forEach(month => {
        const transactions = transactionsByMonth[month];
        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
          if (transaction.type === 'Income') {
            income += transaction.amount;
          } else if (transaction.type === 'Expenses') {
            expenses += transaction.amount;
          }
        });

        const economy = income - expenses;
        const economyInDollars = economy * 0.01;

        this.months.push({
          name: month,
          income: income,
          expenses: expenses,
          economy: economy,
          economyInDollars: economyInDollars
        });
      });

      this.calculateTotalAndAverage();
    });
  }

  calculateTotalAndAverage() {
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalEconomy = 0;

    for (const month of this.months) {
      totalIncome += month.income;
      totalExpenses += month.expenses;
      totalEconomy += month.economy;
    }

    const numberOfMonths = this.months.length;
    this.totalIncome = totalIncome;
    this.totalExpenses = totalExpenses;
    this.totalEconomy = totalEconomy;
    this.totalPercentage = (totalEconomy / totalIncome) * 100;

    if (numberOfMonths > 0) {
      this.averageIncome = totalIncome / numberOfMonths;
      this.averageExpenses = totalExpenses / numberOfMonths;
      this.averageEconomy = totalEconomy / numberOfMonths;
      this.averagePercentage = (this.averageEconomy / this.averageIncome) * 100;
    }
  }
}
