import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Check if featuredImage and its url exist. If not, use a placeholder.
  const imageUrl = post.featuredImage?.url
    ? `https://payload-cms-blog-website-qrdy.vercel.app${post.featuredImage.url}`
    : 'https://placehold.co/600x400?text=No+Image';

  return (
    <Link href={`/posts/${post.id}`} className="block group">
      <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={post.title ?? 'Blog post image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            By {post.author.firstName} {post.author.lastName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
