import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/Account.model';
import { PiggyBank } from 'src/app/models/PiggyBank.model';
import { PaymentsService } from 'src/app/services/payments.service';
import { PiggyBankService } from 'src/app/services/piggyBankService/piggy-bank.service';

@Component({
  selector: 'app-add-money-to-piggy',
  templateUrl: './add-money-to-piggy.component.html',
  styleUrls: ['./add-money-to-piggy.component.scss', '../../add/account-add/account-add.component.scss']
})
export class AddMoneyToPiggyComponent {
  @Input() piggyInfo : PiggyBank;
  @Output() closeForm = new EventEmitter<void>();
  @Output() reInitialise = new EventEmitter<void>();

  piggyForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private piggyService: PiggyBankService,
    private paymentService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  close(){
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
  
    const updatedPiggy: PiggyBank = {
      id: this.piggyInfo.id,
      account: this.piggyInfo.account,     
      goal: this.piggyInfo.goal,
      goalAmount: this.piggyInfo.goalAmount,
      savedAmount: this.piggyInfo.savedAmount + this.piggyForm.value.saveAmount
    };
  
    this.piggyService.updatePiggyBank(updatedPiggy).subscribe(
      (response) => {
        console.log('Account updated successfully:', response);
        const storedCard = localStorage.getItem('activeCard');
        const activeCard: Account = JSON.parse(storedCard);
        const updatedAccount: Account = {
          id: activeCard.id,
          title: activeCard.title,
          currency: activeCard.currency,
          description: activeCard.description,
          balance: activeCard.balance - this.piggyForm.value.saveAmount,
          user: activeCard.user
        };
  
        localStorage.setItem('activeCard', JSON.stringify(updatedAccount));
  
        this.paymentService.updateAccount(updatedAccount).subscribe(
          (response) => {
            this.reInitialise.emit();
            console.log('Account updated successfully:', response);
          },
          (error) => {
            console.error('Failed to update account:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to update account:', error);
      }
    );
  }
  
}
