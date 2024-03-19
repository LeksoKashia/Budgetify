import { Component, Input } from '@angular/core';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent {
  @Input() accountInfo : Account;
}
