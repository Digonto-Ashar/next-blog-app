'use client';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Next.js and React imports
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types';

interface FeaturedSliderProps {
  posts: Post[];
}

const FeaturedSlider = ({ posts }: FeaturedSliderProps) => {
  return (
    <section className="relative w-full h-[800px] -mt-24">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {posts.map((post) => {
          if (!post.featuredImage?.url) return null;

          const imageUrl = `https://payload-cms-blog-website-qrdy.vercel.app${post.featuredImage.url}`;
          
          const excerpt = post.content.root.children[0]?.children[0]?.text.slice(0, 250) + '...';

          return (
            <SwiperSlide key={post.id} className="relative bg-black">
              <img
                src={imageUrl}
                alt={post.title ?? 'Featured Post Image'}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
                loading="lazy"
              />
              
              {/* Overlay Layer */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* Content Layer */}
              <div className="relative z-20 h-full flex flex-col justify-end text-left text-white p-8 md:p-16">
                <span className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm mb-3 w-fit">
                  {post.categories?.name ?? 'General'}
                </span>

                {/* 3. Title text is smaller */}
                <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mb-4 leading-tight">
                  <Link href={`/posts/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* 4. Multi-line description added */}
                <p className="max-w-xl text-lg opacity-90 hidden md:block line-clamp-3">
                  {excerpt}
                </p>

                {post.author && post.author.avatar && (
                  <div className="flex items-center mt-6 space-x-4">
                    <Image
                      src={`https://payload-cms-blog-website-qrdy.vercel.app${post.author.avatar.url}`}
                      alt={post.author.firstName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-white/50"
                    />
                    <div>
                      <p className="font-semibold">{post.author.firstName} {post.author.lastName}</p>
                      <p className="text-sm opacity-80">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default FeaturedSlider;
