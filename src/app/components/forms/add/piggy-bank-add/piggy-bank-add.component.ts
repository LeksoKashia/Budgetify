import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { PiggyBank } from 'src/app/models/piggy-bank.model';
import { AccountService } from 'src/app/services/account.service';
import { PiggyBankService } from 'src/app/services/piggy-bank.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-piggy-bank-add',
  templateUrl: './piggy-bank-add.component.html',
  styleUrls: ['./piggy-bank-add.component.scss']
})
export class PiggyBankAddComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>();

  piggyForm: FormGroup = this.formBuilder.group({
    goal: ['', Validators.required],
    goalAmount: ['', Validators.required],
    savedAmount: [0, Validators.required],
    selectedAccount: ['', Validators.required]
  });

  accounts: Account[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private piggyBankService: PiggyBankService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
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

  close() {
    this.closeForm.emit();
  }

  onSubmit() {
    this.closeForm.emit();
    if (this.piggyForm.valid) {
      const selectedAccount = this.accounts.find(account => account.id == this.piggyForm.value.selectedAccount);

      if (selectedAccount) {
        const piggyBank: PiggyBank = {
          account: selectedAccount,
          goal: this.piggyForm.value.goal,
          goalAmount: this.piggyForm.value.goalAmount,
          savedAmount: this.piggyForm.value.savedAmount
        };

        this.piggyBankService.addPiggyBank(piggyBank).subscribe(
          (newPiggyBank: PiggyBank) => {
            console.log('Piggy bank added successfully:', newPiggyBank);
          },
          (error) => {
            console.error('Error adding piggy bank:', error);
          }
        );
      } else {
        console.error('Selected account not found.');
      }
    } else {
      console.log('Please fill in all fields.');
    }
  }
}
