import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  currentUser: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.getUsers();
    this.getPosts();
  }

  // Loads current user from local storage
  loadCurrentUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // get all users
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.error('Error fetching users', err),
    });
  }

  // get all posts and filter by following
  getPosts(): void {
  this.postService.getPosts().subscribe({
    next: (posts) => {
      this.posts = posts;

      if (this.currentUser && this.currentUser.following) {
        // Convert string IDs to numbers for comparison
        const followingIds = this.currentUser.following.map((id) => Number(id));

        this.filteredPosts = posts.filter((post) =>
          followingIds.includes(Number(post.userId))
        );
      } else {
        this.filteredPosts = [];
      }
    },
    error: (err) => console.error('Error fetching posts', err),
  });
}


  // Find user by ID
  getUserById(id: number): User | undefined {
    return this.users.find((user) => Number(user.id) === Number(id));
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
