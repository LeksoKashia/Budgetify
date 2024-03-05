import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UserActionsComponent } from './components/user-actions/user-actions.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './redux/reducers/auth.reducer';
import { userReducer } from './redux/reducers/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountAddComponent } from './components/forms/add/account-add/account-add.component';
import { TransactionAddComponent } from './components/forms/add/transaction-add/transaction-add.component';
import { PiggyBankAddComponent } from './components/forms/add/piggy-bank-add/piggy-bank-add.component';
import { AccountInfoComponent } from './components/forms/info/account-info/account-info.component';
import { AccountEditComponent } from './components/forms/edit/account-edit/account-edit.component';
import { TransactionEditComponent } from './components/forms/edit/transaction-edit/transaction-edit.component';
import { TransactionInfoComponent } from './components/forms/info/transaction-info/transaction-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { PiggyBankInfoComponent } from './components/forms/info/piggy-bank-info/piggy-bank-info.component';
import { PiggyBankEditComponent } from './components/forms/edit/piggy-bank-edit/piggy-bank-edit.component';
import { AddMoneyToPiggyComponent } from './components/forms/add/add-money-to-piggy/add-money-to-piggy.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { ObligatoryComponent } from './components/obligatory/obligatory.component';
import { SubscriptionAddComponent } from './components/forms/add/subscription-add/subscription-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AccountsComponent,
    UserActionsComponent,
    RegistrationComponent,
    AccountAddComponent,
    TransactionAddComponent,
    PiggyBankAddComponent,
    AccountInfoComponent,
    AccountEditComponent,
    TransactionEditComponent,
    TransactionInfoComponent,
    AdminComponent,
    PiggyBankInfoComponent,
    PiggyBankEditComponent,
    AddMoneyToPiggyComponent,
    SubscriptionsComponent,
    ObligatoryComponent,
    SubscriptionAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ 
      auth: authReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
