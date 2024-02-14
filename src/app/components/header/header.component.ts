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
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  showLogout: boolean = false;
  showConfirmationModal: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUserInfoFromLocalStorage();
  }

  show() {
    this.showLogout = !this.showLogout;
  }

  showConfirmation() {
    this.showConfirmationModal = !this.showConfirmationModal;
  }

  close() {
    this.showLogout = false;
    this.showConfirmationModal = false;
  }

  logout() {
    this.authService.logout();
  }

  delete(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log(`User with ID ${userId} deleted successfully`);
        this.logout();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
