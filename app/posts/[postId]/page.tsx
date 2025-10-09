import Image from 'next/image';
import { apiService } from '../../services/apiService';
import { Post } from '../../types';

interface PostDetailsPageProps {
  params: {
    postId: string;
  };
}

// Helper function to render the structured content from Payload CMS
const renderContent = (content: Post['content']) => {
  if (!content?.root?.children) return null;

  return content.root.children.map((node, index) => {
    if (node.type === 'paragraph' && node.children) {
      return (
        <p key={index} className="mb-6 leading-relaxed">
          {node.children.map((textNode, textIndex) => (
            <span key={textIndex}>{textNode.text}</span>
          ))}
        </p>
      );
    }
    return null;
  });
};

export default async function PostDetailsPage({ params }: PostDetailsPageProps) {
  const { postId } = params;
  const post = await apiService.getPostById(postId);

  if (!post) {
    return <div>Post not found.</div>;
  }

  const imageUrl = post.featuredImage?.url
    ? `https://payload-cms-blog-website-qrdy.vercel.app${post.featuredImage.url}`
    : null;

  const authorAvatarUrl = post.author?.avatar?.url
    ? `https://payload-cms-blog-website-qrdy.vercel.app${post.author.avatar.url}`
    : null;  

  return (
    <article className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      
      <div className="flex items-center space-x-4 mb-8">
        {/* Conditionally render the avatar */}
        {authorAvatarUrl && (
          <Image
            src={authorAvatarUrl}
            alt={post.author.firstName ?? 'Author Avatar'}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        )}
        <div className="text-sm">
          <p className="font-semibold text-gray-800">
            {post.author.firstName} {post.author.lastName}
          </p>
          <p className="text-gray-500">
            Published on {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {imageUrl && (
        <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-800">
        {renderContent(post.content)}
      </div>
    </article>
  );
}
