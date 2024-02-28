import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { Account } from 'src/app/models/Account.model';
import { PaymentsService } from 'src/app/services/payments.service';
import { UserService } from 'src/app/services/user.service';
import { PiggyBank } from 'src/app/models/PiggyBank.model';
import { PiggyBankService } from 'src/app/services/piggyBankService/piggy-bank.service';
@Component({
  selector: 'app-piggy-bank-add',
  templateUrl: './piggy-bank-add.component.html',
  styleUrls: ['./piggy-bank-add.component.scss']
})
export class PiggyBankAddComponent {
  @Output() closeForm = new EventEmitter<void>();

  piggyForm : FormGroup = this.formBuilder.group({
    goal: ['', Validators.required],
    goalAmount: ['', Validators.required],
    savedAmount: [0, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private piggyBankService: PiggyBankService, private paymentService: PaymentsService) { }

  close(){
    this.closeForm.emit();
  }
  
  onSubmit() {
    this.closeForm.emit();
    if (this.piggyForm.valid) {
      console.log('Account data:', this.piggyForm.value);
      const storedCard = localStorage.getItem('activeCard');
      const activeCard: Account= JSON.parse(storedCard);
      console.log("asdsa", activeCard);
      
      if (activeCard && activeCard.id) {
        const piggyBank: PiggyBank = {
          account: activeCard, 
          goal: this.piggyForm.value.goal,
          goalAmount: this.piggyForm.value.goalAmount,
          savedAmount: this.piggyForm.value.savedAmount
        };
        console.log(piggyBank);
        
        this.piggyBankService.addPiggyBank(piggyBank).subscribe(
          (newPiggyBank: PiggyBank) => {
            console.log('Account added successfully:', newPiggyBank);
          },
          (error) => {
            console.error('Error adding account:', error);
          }
        );
      } else {
        console.error('User information not found.');
      }
    } else {
      console.log('Please fill in all fields.');
    }
  }
}
