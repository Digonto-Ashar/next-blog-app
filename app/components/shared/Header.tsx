'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const headerClasses = isHomePage
    ? 'absolute top-0 left-0 w-full z-30 text-white'
    : 'bg-white shadow-md text-gray-800';

  const linkClasses = isHomePage
    ? 'text-white/80 hover:text-white'
    : 'text-gray-600 hover:text-blue-600';

  return (
    <header className={headerClasses} role="banner">
      <nav 
        className="container mx-auto px-6 py-6 flex justify-between items-center"
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link href="/" className="text-3xl font-bold tracking-tight">
          MyBlog
        </Link>
        <ul className="flex items-center space-x-8 text-lg">
          <li><Link href="/" className={linkClasses}>Home</Link></li>
          <li><Link href="/categories" className={linkClasses}>Categories</Link></li>
          <li><Link href="/notification" className={linkClasses}>Notification</Link></li>
          <li><Link href="/about" className={linkClasses}>About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
