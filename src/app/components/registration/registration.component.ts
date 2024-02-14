import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{

  registrationForm : FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.registrationForm.valid && !this.passwordsDoNotMatch()) {
      const user = {
        name: this.registrationForm.value.name,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password
      };
      this.userService.addUser(user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

  passwordsDoNotMatch(): boolean {
    const password = this.registrationForm.value.password;
    const confirmPassword = this.registrationForm.value.confirmPassword;
    return password !== confirmPassword;
  }
}
