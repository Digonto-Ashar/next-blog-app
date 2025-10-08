'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Post } from '../types';
import Link from 'next/link';
import Image from 'next/image';
interface LatestPostNotifierProps {
  posts: Post[];
}

// Define a unique key for our sessionStorage item
const NOTIFICATION_SHOWN_KEY = 'hasShownHomepageNotification';

const LatestPostNotifier = ({ posts }: LatestPostNotifierProps) => {
  useEffect(() => {
    //  Check if the notification has already been shown in this session
    const hasBeenShown = sessionStorage.getItem(NOTIFICATION_SHOWN_KEY);
    if (hasBeenShown || !posts || posts.length === 0) {
      return;
    }

    // If we've reached this point, it's the first time. Show the notification.
    posts.forEach((post, index) => {
      setTimeout(() => {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <Link href={`/posts/${post.id}`} className="w-full" onClick={() => toast.dismiss(t.id)}>
                <div className="flex items-center p-4">
                  <div className="flex-shrink-0 relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={`https://payload-cms-blog-website-qrdy.vercel.app${post.author.avatar.url}`}
                      alt={post.author.firstName}
                      fill
                      sizes="40px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.firstName} posted in {post.categories.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 truncate">{post.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ),
          { duration: 5000 }
        );
      }, index * 600);
    });

    // Set the flag in sessionStorage so this doesn't run again.
    sessionStorage.setItem(NOTIFICATION_SHOWN_KEY, 'true');
    
  }, [posts]); // The effect still runs when the 'posts' prop is available.

  return null;
};

export default LatestPostNotifier;