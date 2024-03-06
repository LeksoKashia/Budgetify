import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/Subscription.model';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[];
  showOverlay: boolean = false;

  constructor(private paymentService: PaymentsService) {}

  ngOnInit() {
    this.fetchSubscriptions();
  }

  toggleOverlay(s?: string) {
    if(s){
      this.fetchSubscriptions();
    }
    this.showOverlay = !this.showOverlay;
  }

  fetchSubscriptions() {
    this.paymentService.getSubscriptions().subscribe(
      (subscriptions: any) => {
        this.subscriptions = subscriptions;
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
      }
    );
  }

  getFirstWord(str: string): string {
    if (!str) return '';
    return str.split(' ')[0]; 
  }
}
