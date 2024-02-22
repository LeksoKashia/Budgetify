import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit{
  showOverlay: boolean = false;
  formDisplayText : string;

  constructor(private router: Router,  private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.showEverything = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('movie');
    //   this.showCategory = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('category');
    // });
  }

  showAccountAdd: boolean = false;
  showTransactionAdd: boolean = false;
  showPiggyBankAdd: boolean = false;
  toggleOverlay(formName?: string) {
    this.showOverlay = !this.showOverlay;
    this.formDisplayText = formName;
    switch (formName) {
      case "Account":
        this.showAccountAdd = true;
        this.showTransactionAdd = false;
        this.showPiggyBankAdd = false;
        break;
      case "Transaction":
        this.showTransactionAdd = true;
        this.showAccountAdd = false;
        this.showPiggyBankAdd = false;
      break;
      case "Piggy Bank":
        this.showPiggyBankAdd = true;
        this.showTransactionAdd = false;
        this.showAccountAdd = false;
      break;
    
      default:
        break;
    }

  }
}
