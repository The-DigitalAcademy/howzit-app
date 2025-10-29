import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.error('Error fetching users', err),
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
