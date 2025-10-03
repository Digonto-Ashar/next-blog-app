import { apiService } from './services/apiService';
import PostCard from './components/shared/PostCard';
import { Post, Category } from './types';
import CategorySlider from './components/CategorySlider';
import LatestPostNotifier from './components/LatestPostNotifier';
import FeaturedSlider from './components/FeaturedSlider';

// Helper functions (renderPostSection, renderCategoriesSection)
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

  const renderCategoriesSection = (categories: Category[]) => (
      <section className="mb-12 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
          <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex space-x-4 mt-4 overflow-x-auto pb-4">
                  {categories.map(category => (
                      <div key={category.id} className="flex-shrink-0 bg-white p-4 rounded-lg shadow">
                          {category.name}
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );

export default async function HomePage() {
  const allPosts = (await apiService.getPosts()) || [];
  const categories = (await apiService.getCategories()) || [];

    const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featuredPosts = allPosts.slice(6,9);
  const latestPostsForGrid = allPosts.slice(3,9);
  const latestPostsForNotifier = allPosts.slice(0, 1);

  return (
    <div>
      <LatestPostNotifier posts={latestPostsForNotifier} />
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