import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => {(this.posts = posts)},
      error: (error) => {(console.error)}
    })
  }
}
