import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { PiggyBank } from 'src/app/models/piggy-bank.model';
import { AccountService } from 'src/app/services/account.service';
import { PiggyBankService } from 'src/app/services/piggy-bank.service';

@Component({
  selector: 'app-add-money-to-piggy',
  templateUrl: './add-money-to-piggy.component.html',
  styleUrls: ['./add-money-to-piggy.component.scss', '../../add/account-add/account-add.component.scss']
})
export class AddMoneyToPiggyComponent implements OnInit {
  @Input() piggyInfo: PiggyBank;
  @Output() closeForm = new EventEmitter<void>();
  @Output() reInitialise = new EventEmitter<void>();

  piggyForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private piggyService: PiggyBankService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  close(): void {
    this.closeForm.emit();
  }

  initializeForm(): void {
    this.piggyForm = this.formBuilder.group({
      goal: [{ value: this.piggyInfo.goal, disabled: true }],
      goalAmount: [{ value: this.piggyInfo.goalAmount, disabled: true}],
      saveAmount: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.closeForm.emit();

    if (!this.piggyForm.valid) {
      return;
    }

    this.updatePiggyBank();
  }

  updatePiggyBank(): void {
    this.piggyService.updatePiggyBank({
      id: this.piggyInfo.id,
      account: this.piggyInfo.account,
      goal: this.piggyInfo.goal,
      goalAmount: this.piggyInfo.goalAmount,
      savedAmount: this.piggyInfo.savedAmount + this.piggyForm.value.saveAmount
    }).subscribe(
      () => {
        this.updateAccountBalance();
      },
      (error) => {
        console.error('Failed to update piggy bank:', error);
      }
    );
  }

  updateAccountBalance(): void {
    const activeCard = JSON.parse(localStorage.getItem('activeCard') || '{}') as Account;
    const updatedAccount = {
      id: activeCard.id,
      title: activeCard.title,
      currency: activeCard.currency,
      description: activeCard.description,
      balance: activeCard.balance - this.piggyForm.value.saveAmount,
      user: activeCard.user
    };

    localStorage.setItem('activeCard', JSON.stringify(updatedAccount));

    this.accountService.updateAccount(updatedAccount).subscribe(
      () => {
        this.reInitialise.emit();
      },
      (error) => {
        console.error('Failed to update account:', error);
      }
    );
  }
}
