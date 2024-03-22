import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { Subscription } from 'src/app/models/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription-add',
  templateUrl: './subscription-add.component.html',
  styleUrls: ['./subscription-add.component.scss', '../../add/account-add/account-add.component.scss']
})
export class SubscriptionAddComponent {
  @Output() closeForm = new EventEmitter<void>();

  subscriptionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {
    this.subscriptionForm = this.formBuilder.group({
      title: ['', Validators.required],
      categories: ['', Validators.required],
      amount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  close() {
    this.closeForm.emit();
  }

  onSubmit() {
    this.closeForm.emit();
    if (this.subscriptionForm.invalid) {
      console.log('Please fill in all fields.');
      return;
    }

    const activeCard: Account= JSON.parse(localStorage.getItem('activeCard'));
    if (activeCard && activeCard.id) {
      const subscriptionData: Subscription = {
        title: this.subscriptionForm.value.title,
        categories: this.subscriptionForm.value.categories,
        amount: this.subscriptionForm.value.amount,
        startDate: this.subscriptionForm.value.startDate,
        endDate: this.subscriptionForm.value.endDate,
        description: this.subscriptionForm.value.description,
        account: activeCard
      };

      this.subscriptionService.addSubscription(subscriptionData).subscribe(
        (newSubscription: Subscription) => {
          console.log('Subscription added successfully:', newSubscription);
        },
        (error) => {
          console.error('Error adding subscription:', error);
        }
      );
    } else {
      console.error('User information not found.');
    }
  }
}