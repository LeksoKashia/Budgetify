import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user : User;
  constructor(private authService: AuthService, private userService: UserService){}
  
  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
  }

  logout(){
    this.authService.logout();
  }
}
