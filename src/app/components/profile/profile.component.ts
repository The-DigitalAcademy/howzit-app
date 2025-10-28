import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service'; // Import the new service
import { Post } from 'src/app/models/post.model'; // Import the Post model
import { User } from 'src/app/models/user.model'; // Import the User model

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Renamed from 'currentUser' to 'user' to match your template usage.
  user: User | null = null; 
  
  // Added 'userPosts' property, initialized as an empty array.
  userPosts: Post[] = []; 

  constructor(
    private auth: AuthService, 
    private router: Router,
    private postService: PostService // Inject the PostService
  ) {}

  ngOnInit(): void {
    // 1. Check if user is logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // 2. Get the current logged-in user
    const loggedInUser = this.auth.getCurrentUser();
    this.user = loggedInUser;

    // 3. Fetch the user's posts
    if (this.user) {
      this.fetchUserPosts(this.user.id);
    }
  }

  fetchUserPosts(userId: string): void {
    // Use the PostService to fetch posts filtered by the user's ID
    this.postService.getUserPosts(userId).subscribe({
      next: (posts) => {
        // Posts are fetched successfully, assign them to userPosts
        this.userPosts = posts;
        console.log('Fetched user posts:', this.userPosts);
      },
      error: (error) => {
        // Handle any errors during the fetch
        console.error('Error fetching user posts:', error);
      }
    });
  }
}
