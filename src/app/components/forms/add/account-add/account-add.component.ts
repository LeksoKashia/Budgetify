import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { Account } from 'src/app/models/Account.model';
import { PaymentsService } from 'src/app/services/payments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent {
  currencies: string[] = ['USD ($)', 'EUR (Є)', 'GEL (₾)'];
  @Output() closeForm = new EventEmitter<void>();

  accountForm : FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    currency: ['USD ($)', Validators.required],
    description: ['', Validators.required],
    balance: ['', Validators.required] // Assuming balance is required and initialized to 0
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private paymentService: PaymentsService) { }

  close(){
    this.closeForm.emit();
  }
  
  onSubmit() {
    this.closeForm.emit();
    if (this.accountForm.valid) {
      console.log('Account data:', this.accountForm.value);
      const user: User = this.userService.getUserInfoFromLocalStorage();
      if (user && user.id) {
        const account: Account = {
          user: user, 
          title: this.accountForm.value.title,
          currency: this.accountForm.value.currency,
          description: this.accountForm.value.description,
          balance: this.accountForm.value.balance
        };

        this.paymentService.addAccount(account).subscribe(
          (newAccount: Account) => {
            console.log('Account added successfully:', newAccount);
            const currentAccounts = this.paymentService.getAccounts().getValue(); 
            this.paymentService.updateAccounts([...currentAccounts, newAccount]);
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
