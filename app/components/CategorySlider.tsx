'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '../types';

interface CategorySliderProps {
  categories: Category[];
}

const CategorySlider = ({ categories }: CategorySliderProps) => {
  // usePathname reads the current URL path to determine the active category
  const pathname = usePathname();

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {Array.isArray(categories) && categories.map((category) => {
          const isActive = pathname === `/categories/${category.id}`;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              // Dynamically apply styles based on the active state
              className={`
                flex-shrink-0 rounded-xl px-8 py-6 text-lg font-bold 
                shadow-lg border-2 transition-all duration-300 ease-in-out
                transform hover:-translate-y-1
                ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-600'
                }
              `}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySlider;
