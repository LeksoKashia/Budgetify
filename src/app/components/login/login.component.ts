import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordHidden: boolean = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted!', this.loginForm.value);
    this.userService.getUser(this.loginForm.value.email).subscribe(
      (response: User) => {
        console.log(response.password);
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
