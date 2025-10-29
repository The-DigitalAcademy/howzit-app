import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsService: PostsService, private authService: AuthService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => {(this.posts = posts)},
      error: (error) => {(console.error)}
    })
  }
  get isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }
}
