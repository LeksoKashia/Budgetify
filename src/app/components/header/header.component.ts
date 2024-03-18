import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/authService/auth.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  showLogout: boolean = false;
  showConfirmationModal: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserInfoFromLocalStorage();
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
