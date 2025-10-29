import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  // 💡 NEW METHOD: Get a single user by their ID
  getUserById(id: string | number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  // get all followers of a user
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}