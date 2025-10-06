import { Post, Category, Comment } from '../types';

const API_BASE_URL = 'https://payload-cms-blog-website-qrdy.vercel.app/api';

// Helper function to handle fetch responses
async function fetcher<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  
  const data = await response.json();
  // The API returns data within a 'docs' property for collections
  return data.docs || data;
}

// API service functions
export const apiService = {
  getPosts: (): Promise<Post[]> => fetcher<Post[]>('/posts'),
  getPostById: (id: string): Promise<Post> => fetcher<Post>(`/posts/${id}`),
  getCategories: (): Promise<Category[]> => fetcher<Category[]>('/categories'),
  getComments: (postId: string): Promise<Comment[]> => fetcher<Comment[]>(`/comments?where[post][equals]=${postId}`),
    getPostsByCategoryId: (categoryId: string): Promise<Post[]> => {
    const query = `/posts?where[categories][equals]=${categoryId}`;
    return fetcher<Post[]>(query);
  },
};
