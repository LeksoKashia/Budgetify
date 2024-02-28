import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { AccountsComponent } from '../accounts/accounts.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild('accountsComponent', { static: false }) accountsComponent: AccountsComponent;

  ngOnInit(): void {}
  reInitialise() {
    if (this.accountsComponent) {
      this.accountsComponent.reFetchAccounts();
    }
  }
}
