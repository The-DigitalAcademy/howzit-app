import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = []; 
  currentUser: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Get the current logged-in user
    this.currentUser = this.auth.getCurrentUser();
  }
}