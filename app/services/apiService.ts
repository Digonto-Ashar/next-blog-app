import { Post, Category, Comment } from '../types';

const API_BASE_URL = 'https://payload-cms-blog-website-qrdy.vercel.app/api';

// --- FETCHER FOR ISR ---

async function fetcher<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null; 
    }
    
    const data = await response.json();
    return data.docs || data;
  } catch (error) {
    console.error('Network or fetch error:', error);
    return null; 
  }
}


// --- FETCHER FOR SSR ---

async function ssrFetcher<T>(endpoint:string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store', 
    });
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data.docs || data;
  } catch (error) {
    console.error('Network or fetch error:', error);
    return null;
  }
}


// API service functions 
export const apiService = {

  // ISR Fetchers
  getPosts: (): Promise<Post[] | null> => fetcher<Post[]>('/posts?limit=100'),
  getPostById: (id: string): Promise<Post | null> => fetcher<Post>(`/posts/${id}`),
  getCategories: (): Promise<Category[] | null> => fetcher<Category[]>('/categories'),
  getComments: (postId: string): Promise<Comment[] | null> => fetcher<Comment[]>(`/comments?where[post][equals]=${postId}`),
  getPostsByCategoryId: (categoryId: string): Promise<Post[] | null> => {
    const query = `/posts?where[categories][equals]=${categoryId}`;
    return fetcher<Post[]>(query);
  },
  
  // SSR-specific fetcher
getPostsForSsr: (): Promise<Post[] | null> => ssrFetcher<Post[]>('/posts?limit=100'),  
};
