import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  login() {
    this.saveAuthStateToLocalStorage(true);
  }

  logout() {
    this.clearUserFromLocalStorage();
    this.saveAuthStateToLocalStorage(false);
    this.router.navigate(['/login']);
  }

  private saveAuthStateToLocalStorage(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  private clearUserFromLocalStorage(): void {
    localStorage.removeItem('user');
  }

}
