import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users'; // JSON Server URL

  constructor(private http: HttpClient) {}

  // ✅ Register new user
  register(username: string, email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}`).pipe(
      map((users) => {
        if (users.length > 0) {
          return false; // Email already exists
        } else {
          const newUser = { username, email, password };
          this.http.post(this.baseUrl, newUser).subscribe();
          return true;
        }
      })
    );
  }

  // ✅ Login existing user
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // ✅ Get current logged-in user
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
