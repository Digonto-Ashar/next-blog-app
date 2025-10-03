import { Metadata } from 'next';
import { apiService } from '../services/apiService';
import NotificationItem from '../components/shared/NotificationItem';
import { Post } from '../types';

export const metadata: Metadata = {
  title: 'Notifications | My Next.js Blog',
  description: 'Stay up to date with the latest posts.',
};

export default async function NotificationPage() {
  const allPosts = await apiService.getPosts();

  // Sort posts by published date in descending order (newest first)
  const sortedPosts = allPosts.sort(
    (a: Post, b: Post) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>
      <div>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <NotificationItem key={post.id} post={post} />
          ))
        ) : (
          <p className="p-4 text-gray-500">No new notifications.</p>
        )}
      </div>
    </div>
  );
}
