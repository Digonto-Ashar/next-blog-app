import { apiService } from '../../services/apiService'; // Changed to absolute path
import PostCard from '../../components/shared/PostCard'; // Changed to absolute path
import { Post } from '../../types'; // Changed to absolute path

// This interface defines the shape of the props our page will receive
interface CategoryPostsPageProps {
  params: {
    categoryId: string;
  };
}

export default async function CategoryPostsPage({ params }: CategoryPostsPageProps) {
  const { categoryId } = params;
  
  // --- CHANGE IS HERE ---
  // Fetch ONLY the posts belonging to this category directly from the API.
  const filteredPosts = await apiService.getPostsByCategoryId(categoryId);
  // --- END OF CHANGE ---
  
  // Fetch category details to display the name in the title
  // This part remains the same.
  const categories = await apiService.getCategories();
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