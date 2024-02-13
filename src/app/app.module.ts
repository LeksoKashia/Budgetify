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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AccountsComponent,
    UserActionsComponent,
    RegistrationComponent
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
