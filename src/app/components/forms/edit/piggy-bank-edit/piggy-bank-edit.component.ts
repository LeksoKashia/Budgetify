import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PiggyBank } from 'src/app/models/piggy-bank.model';
import { PiggyBankService } from 'src/app/services/piggy-bank.service';
@Component({
  selector: 'app-piggy-bank-edit',
  templateUrl: './piggy-bank-edit.component.html',
  styleUrls: ['./piggy-bank-edit.component.scss', '../../add/account-add/account-add.component.scss']
})
export class PiggyBankEditComponent implements OnInit {
  @Input() piggyInfo : PiggyBank;
  @Output() closeForm = new EventEmitter<void>();

  piggyForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private piggyService: PiggyBankService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  close(){
    this.closeForm.emit();
  }

  initializeForm(): void {
    this.piggyForm = this.formBuilder.group({
      goal: [this.piggyInfo.goal, Validators.required],
      goalAmount: [this.piggyInfo.goalAmount, Validators.required]
    });
  }

  onSubmit(): void {
    this.closeForm.emit();
    if (this.piggyForm.valid) {
      const updatedPiggy: PiggyBank = {
        id: this.piggyInfo.id,
        account: this.piggyInfo.account, 
        goal: this.piggyForm.value.goal,
        goalAmount: this.piggyForm.value.goalAmount,
        savedAmount: this.piggyInfo.savedAmount
      };

      this.piggyService.updatePiggyBank(updatedPiggy)
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
