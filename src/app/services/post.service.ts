import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all posts belonging to a specific user ID.
   * @param userId The ID of the user whose posts to retrieve.
   * @returns An Observable of an array of Posts.
   */
  getUserPosts(userId: string | number): Observable<Post[]> {
    // Uses JSON Server's filtering capability: http://localhost:3000/posts?userId=X
    return this.http.get<Post[]>(`${this.apiUrl}?userId=${userId}`);
  }
}