import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postsUrl);
  }
  getPostsByUserId(userId: string | number): Observable<any[]> {
    // This utilizes the JSON Server query feature: /posts?userId=X
    return this.http.get<any[]>(`${this.postsUrl}?userId=${userId}`);
  }
    

  addPost(newPost: any): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, newPost)
  }

  getAllPosts(): any[] {
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : [];
  }
}
