import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage = '';
  isLoading = false;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // If already logged in, redirect to home
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onRegister() {
    const username = this.registerForm.value.username || '';
    const email = this.registerForm.value.email || '';
    const password = this.registerForm.value.password || '';

    if (!username || !email || !password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<User[]>(`http://localhost:3000/users?email=${email}`).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.errorMessage = 'Email already exists';
          this.isLoading = false;
        } else {
          const newUser: User = {
            id: Date.now().toString(),
            name: username,
            username,
            email,
            password,
            bio: '',
            profileImage: 'https://via.placeholder.com/150',
            following: [],
            followers: [],
          };

          this.http.post('http://localhost:3000/users', newUser).subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/login']);
            },
            error: (error) => {
              this.isLoading = false;
              this.errorMessage = 'Registration failed. Please try again.';
              console.error('Registration error:', error);
            }
          });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Check email error:', error);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}