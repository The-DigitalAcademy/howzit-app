import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  currentUserId = this.currentUser.id;
  private url = "http://localhost:3000/posts"
  constructor(private http: HttpClient) { }

  
  
}
