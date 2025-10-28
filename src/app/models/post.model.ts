export interface Post {
    id: string;
    userId: number; // Assuming userId in db.json is a number for these posts
    caption: string;
    imageUrl: string;
    likes: number;
    timestamp: string;
    comments: number[]; // Array of comment IDs
}