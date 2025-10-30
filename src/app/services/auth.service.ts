import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, switchMap, catchError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(
    name: string,
    email: string,
    password: string
  ): Observable<{ success: boolean; message: string }> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          return of({ success: false, message: 'Email already exists' });
        }

        const newUser: Partial<User> = {
          name,
          email,
          password,
          username: email.split('@')[0], 
          bio: '',
          profileImage: '',
          following: [],
          followers: [],
        };

        return this.http
          .post<User>(this.baseUrl, newUser)
          .pipe(
            map(() => ({ success: true, message: 'Registration successful' }))
          );
      }),
      catchError(() =>
        of({ success: false, message: 'An error occurred during registration' })
      )
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any { 
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch (e) {
        console.error('Error parsing currentUser from localStorage', e);
        return null;
      }
    }
    return null;
  }
  
  getCurrentUserId(): string | number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

}