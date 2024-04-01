import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { selectUser } from 'src/app/redux/selectors/user.selectors';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  showLogout = false;
  showConfirmationModal = false;

  constructor(private authService: AuthService, private userService: UserService,  private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUser));
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
    localStorage.removeItem('activeCard');
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
