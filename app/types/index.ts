export interface Media {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
  thumbnailURL?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: Media;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: {
    root: {
      children: {
        type: string;
        children: {
          type: string;
          text: string;
        }[];
      }[];
    };
  };
  author: Author;
  status: 'published' | 'draft';
  featuredImage?: Media | null;
  categories: Category;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  comment: string;
  user: {
    id: string;
    name: string;
  };
  post: string; 
  createdAt: string;
  updatedAt: string;
}
