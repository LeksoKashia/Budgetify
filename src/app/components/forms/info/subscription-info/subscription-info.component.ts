import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'src/app/models/Subscription.model';
import { SubscriptionService } from 'src/app/services/subscriptionService/subscription.service';

@Component({
  selector: 'app-subscription-info',
  templateUrl: './subscription-info.component.html',
  styleUrls: ['./subscription-info.component.scss', '../account-info/account-info.component.scss']
})
export class SubscriptionInfoComponent {
  @Input() subscription: Subscription;
  @Output() closeOverlay = new EventEmitter<void>();
  showEditSubscription: boolean;

  constructor(private subscriptionService: SubscriptionService){}

  closeForm(){
    this.closeOverlay.emit();
  }

  deleteSubscription(id: number){
    this.subscriptionService.deleteAccount(id).subscribe(
      () => {
        this.closeOverlay.emit();
      }
    )
  }

  toggleEdit(){
    this.showEditSubscription = !this.showEditSubscription;
  }
}
