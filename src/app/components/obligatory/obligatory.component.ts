import { Component } from '@angular/core';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss', '../subscriptions/subscriptions.component.scss']
})
export class ObligatoryComponent {
  showOverlay: boolean = false;

  toggleOverlay(s?: string) {

    this.showOverlay = !this.showOverlay;
  }
}
