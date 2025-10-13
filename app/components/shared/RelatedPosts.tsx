import { Post } from '../../types';
import PostCard from './PostCard';

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Related Posts
      </h2>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((relatedPost) => (
            <PostCard key={relatedPost.id} post={relatedPost} />
          ))
        ) : (
          <p className="text-gray-500">No related posts found.</p>
        )}
      </div>
    </section>
  );
};

export default RelatedPosts;
