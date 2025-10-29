import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/post.service'; 

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  caption: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private postsService: PostsService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.caption || !this.selectedFile) return;

    const newPost = {
      id: Date.now(),
      caption: this.caption,
      image: this.imagePreview, 
      createdAt: new Date().toISOString(),
    };

    this.postsService.addPost(newPost).subscribe(() => {
      alert('Post shared successfully!');
      this.router.navigate(['/profile']); 
    });
  }

  
  
}
