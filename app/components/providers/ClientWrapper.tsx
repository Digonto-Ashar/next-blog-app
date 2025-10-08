'use client';

import React from 'react';
import ToastProvider from './ToastProvider';
import Header from '../../components/shared/Header';
import PageWrapper from '../../components/shared/PageWrapper';

// This component bundles all client-side layout elements
const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider />
      <Header />
      <main>
        <PageWrapper>
          {children}
        </PageWrapper>
      </main>
    </>
  );
};

export default ClientWrapper;
