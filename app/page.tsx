import { apiService } from './services/apiService';
import PostCard from './components/shared/PostCard';
import { Post, Category } from './types';
import CategorySlider from './components/CategorySlider';
import LatestPostNotifier from './components/LatestPostNotifier';
import FeaturedSlider from './components/FeaturedSlider';

// Helper functions (renderPostSection)
const renderPostSection = (title: string, posts: Post[]) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts found for this section.</p>
      )}
    </section>
  );

export default async function HomePage() {
  const [postsData, categoriesData] = await Promise.all([
    apiService.getPosts(),
    apiService.getCategories(),
  ]);

  // Provide fallback empty arrays in case an API call returns null
  const allPosts = postsData || [];
  const categories = categoriesData || [];
  
  
  // Create a new, safely sorted array
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Slice correctly from the sorted array
  const featuredPosts = sortedPosts.slice(6, 9);
  const latestPostsForGrid = sortedPosts.slice(5, 11);
  const latestPostForNotifier = sortedPosts.slice(0, 1);
  return (
    <div>
      <LatestPostNotifier posts={latestPostForNotifier} />
      <FeaturedSlider posts={featuredPosts}/>

      <section className="container mx-auto px-6 py-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
        <CategorySlider categories={categories} />
      </section>
        
      <div className="container mx-auto px-6">
        {renderPostSection('Latest Posts', latestPostsForGrid)}
      </div>
    </div>
  );
}