import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  users: User[] = [];
  posts: Post[] = [];
  cuurentUserId = localStorage.getItem('currentUserId') || '';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostsService
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
