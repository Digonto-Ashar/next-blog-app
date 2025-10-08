import { apiService } from '../../services/apiService'; 
import PostCard from '../../components/shared/PostCard'; 
import { Post } from '../../types'; 

// This interface defines the shape of the props our page will receive
interface CategoryPostsPageProps {
  params: {
    categoryId: string;
  };
}

export default async function CategoryPostsPage({ params }: CategoryPostsPageProps) {
  const { categoryId } = params;

  const postsPromise = apiService.getPostsByCategoryId(categoryId);
  const categoriesPromise = apiService.getCategories();
  const [filteredPostsData, categoriesData] = await Promise.all([
    postsPromise,
    categoriesPromise,
  ]);

  // Provide fallback empty arrays in case an API call fails
  const filteredPosts = filteredPostsData || [];
  const categories = categoriesData || [];


  const category = categories.find(c => c.id === categoryId);
  const categoryName = category ? category.name : 'Category';

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Posts in: {categoryName}
      </h1>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600">No posts found in this category.</p>
      )}
    </div>
  );
}