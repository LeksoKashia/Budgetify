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
  showAccountAdd: boolean = false;
  showTransactionAdd: boolean = false;
  showPiggyBankAdd: boolean = false;


  constructor(private router: Router,  private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.showEverything = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('movie');
    //   this.showCategory = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('category');
    // });
  }

 toggleOverlay(formName?: string) {
  this.showOverlay = !this.showOverlay;
  this.formDisplayText = formName;

  this.showAccountAdd = formName === "Account";
  this.showTransactionAdd = formName === "Transaction";
  this.showPiggyBankAdd = formName === "Piggy Bank";
 }

}
