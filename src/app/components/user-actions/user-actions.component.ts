import { Component } from '@angular/core';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent {
  showOverlay: boolean = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}
