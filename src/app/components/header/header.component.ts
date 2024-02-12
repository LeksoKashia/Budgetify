import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { selectUser } from '../../redux/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user$: Observable<User>;

  constructor(private authService: AuthService, private userService: UserService, private store: Store){}
  
  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUser));
  }

  logout(){
    this.authService.logout();
  }
}
