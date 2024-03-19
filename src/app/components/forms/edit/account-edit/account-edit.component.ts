import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss', '../../add/account-add/account-add.component.scss']
})
export class AccountEditComponent implements OnInit {
  @Input() accountInfo!: Account;
  @Output() closeForm = new EventEmitter<void>();


  currencies: string[] = ['USD ($)', 'EUR (Є)', 'GEL (₾)'];
  accountForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  close(){
    this.closeForm.emit();
  }

  initializeForm(): void {
    this.accountForm = this.formBuilder.group({
      title: [this.accountInfo.title, Validators.required],
      currency: [this.accountInfo.currency, Validators.required],
      description: [this.accountInfo.description, Validators.required],
      balance: [this.accountInfo.balance, Validators.required]
    });
  }

  onSubmit(): void {
    this.closeForm.emit();
    if (this.accountForm.valid) {
      const updatedAccount: Account = {
        id: this.accountInfo.id,
        title: this.accountForm.value.title,
        currency: this.accountForm.value.currency,
        description: this.accountForm.value.description,
        balance: this.accountForm.value.balance,
        user: this.accountInfo.user
      };

      this.accountService.updateAccount(updatedAccount)
        .subscribe(
          (response) => {
            console.log('Account updated successfully:', response);
          },
          (error) => {
            console.error('Failed to update account:', error);
          }
        );
    }
  }

}