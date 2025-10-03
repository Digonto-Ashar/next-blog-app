import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../types';

interface NotificationItemProps {
  post: Post;
}

const NotificationItem = ({ post }: NotificationItemProps) => {
  const avatarUrl = post.author?.avatar?.url
    ? `https://payload-cms-blog-website-qrdy.vercel.app${post.author.avatar.url}`
    : 'https://placehold.co/100x100?text=A';

  const formattedDate = new Date(post.publishedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return (
    <Link href={`/posts/${post.id}`} className="block w-full">
      <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
        
    
        <div className="flex-shrink-0 relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={avatarUrl}
            alt={post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Author'}
            fill
            sizes="48px"
            style={{ objectFit: 'cover' }}
          />
        </div>
       

        <div className="flex-grow">
          <p className="text-gray-800">
            <span className="font-bold">{post.author ? `${post.author.firstName} ${post.author.lastName}` : 'An author'}</span>
            <span className="text-gray-600"> posted an article in </span>
            <span className="font-bold">{post.categories ? post.categories.name : 'a category'}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default NotificationItem;
