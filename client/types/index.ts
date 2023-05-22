interface User {
  id: string;
  username: string;
  name: string;
  image?: string;
}

export interface Post {
  id: string;
  user: User;
  createdAt: string;
  content: string;
  image?: string;
  numberOfComments?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
  impressions?: number;
}
