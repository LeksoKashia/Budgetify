import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss', '../home/home.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[];
  filteredSubscriptions: Subscription[];
  showOverlay = false;
  searchTerm = '';
  showAddSubscription: boolean;
  showInfoSubscription: boolean;
  selectedSubscription: Subscription;
  selectedDate = '';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.fetchSubscriptions();
  }

  toggleOverlay(action?: string, subscription?: Subscription) {
    if(action == 'add'){
      this.showAddSubscription = true;
      this.showInfoSubscription = false;
    }else{
      this.showInfoSubscription = true;
      this.showAddSubscription = false;
    }
    
    if(subscription){
      this.selectedSubscription = subscription;
    }
    
    this.showOverlay = !this.showOverlay;
  }

  fetchSubscriptions() {
    this.accountService.getSubscriptions().subscribe(
      (subscriptions: Subscription[]) => {
        this.subscriptions = subscriptions;
        this.filterSubscriptions(); 
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
      }
    );
  }

  filterSubscriptions() {
    if (this.searchTerm.trim() === '' && this.selectedDate === '') {
      this.filteredSubscriptions = this.subscriptions;
    } else {
      const selectedDateObj = this.selectedDate ? new Date(this.selectedDate) : null;
      this.filteredSubscriptions = this.subscriptions.filter(obligatory =>
        obligatory.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (!selectedDateObj || (selectedDateObj >= new Date(obligatory.startDate) && selectedDateObj <= new Date(obligatory.endDate)))
      );
    }
  }

  getFirstWord(str: string): string {
    if (!str) return '';
    return str.split(',')[0]; 
  }
}
