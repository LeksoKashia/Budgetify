import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'src/app/models/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.component.html',
  styleUrls: ['./subscription-edit.component.scss', '../../add/account-add/account-add.component.scss']
})
export class SubscriptionEditComponent {
  @Input() subscriptionInfo!: Subscription;
  @Output() closeForm = new EventEmitter<void>();

  subscriptionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  close(){
    this.closeForm.emit();
  }

  initializeForm(): void {
    this.subscriptionForm = this.formBuilder.group({
      title: [this.subscriptionInfo.title, Validators.required],
      categories: [this.subscriptionInfo.categories, Validators.required],
      amount: [this.subscriptionInfo.amount, Validators.required],
      description: [this.subscriptionInfo.description, Validators.required]
    });
  }

  onSubmit(): void {
    this.closeForm.emit();
    if (!this.subscriptionForm.valid) {
      return;
    }
    const updatedSubscription: Subscription = {
      id: this.subscriptionInfo.id,
      title: this.subscriptionForm.value.title,
      amount: this.subscriptionForm.value.amount,
      categories: this.subscriptionForm.value.categories,
      startDate: this.subscriptionInfo.startDate,
      description: this.subscriptionForm.value.description,
      endDate: this.subscriptionInfo.endDate,
      account: this.subscriptionInfo.account
    };
    this.subscriptionService.updateSubscription(updatedSubscription)
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
