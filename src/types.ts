export interface Post {
  id: number | string;
  userId: number;
  title: string;
  body: string;
  createdAt?: string;
  category?: string;
  authorName?: string;
  sourceUrl?: string;
}

export interface Comment {
  id: number;
  postId: number | string;
  name: string;
  email: string;
  body: string;
}
