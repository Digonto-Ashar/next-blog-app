'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // We only want to apply padding on pages that are NOT the homepage
  const isHomePage = pathname === '/';

  return (
    <div className={!isHomePage ? "pt-16" : ""}>
      {children}
    </div>
  );
};

export default PageWrapper;
