import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage = '';
  isLoading = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // If already logged in, redirect to home
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';

    if (!email || !password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login(email, password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}