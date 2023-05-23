interface User {
  id: string;
  email: string;
  name?: string;
  username: string;
  isVerified: boolean;
  image?: string;
  category?: string;
  company?: string;
  posts: Post[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
export interface Comment {
  id: string;
  content?: string;
  author?: User;
  authorId?: string;
  post?: Post;
  postId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  id?: string;
  option?: string;
  votes?: number;
  poll?: Poll;
  pollId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Poll {
  id?: string;
  question?: string;
  options?: Option[];
  allowMultiple?: boolean;
  participants?: number;
  createdAt?: string;
  updatedAt?: string;
  Post?: Post[];
}
export interface Post {
  id?: string;
  title?: string;
  content: string;
  user?: User;
  userId?: string;
  comments?: Comment[];
  tag: string;
  poll?: Poll;
  likes?: number;
  views?: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  pollId?: string;
  coutnt?: {
    comments: number;
  };
}
