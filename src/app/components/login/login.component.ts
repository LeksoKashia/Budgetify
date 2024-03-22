import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AuthState } from '../../redux/reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordHidden = true;

  constructor(private store: Store<AuthState>, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.userService.getUser(this.loginForm.value.email).subscribe(
      (response: User) => {
        if(response.password == this.loginForm.value.password){
          this.authService.login();
          this.router.navigate(['/home']);
          this.userService.setUser(response); 
        }else{
          alert("inccorrect credentials");
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }
}
