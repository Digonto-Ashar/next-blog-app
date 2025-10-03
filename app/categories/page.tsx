import Link from 'next/link';
import { apiService } from '../services/apiService';
import { Category } from '../types';

export default async function CategoriesPage() {
  const categories = await apiService.getCategories();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category: Category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
            <p className="text-gray-600 mt-2">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
