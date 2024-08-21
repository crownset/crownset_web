import React from 'react';
import FreeAudit from '@/components/pages/Freeaudit';

export const metadata = {
  title: 'Free Audit - Crownset Marketing Agency',
  description: 'Request a free audit from Crownset Marketing Agency to identify opportunities for improving your marketing strategies and IT solutions. Our experts will provide actionable insights to help your business grow.',
  openGraph: {
    title: 'Free Audit - Crownset Marketing Agency',
    description: 'Request a free audit from Crownset Marketing Agency to identify opportunities for improving your marketing strategies and IT solutions. Our experts will provide actionable insights to help your business grow.',
    url: 'https://www.crownsetmarketing.com/freeaudit',
    
  },
  twitter: {
    card: 'summary_large_image',
    site: '@crownset',
    title: 'Free Audit - Crownset Marketing Agency',
    description: 'Request a free audit from Crownset Marketing Agency to identify opportunities for improving your marketing strategies and IT solutions. Our experts will provide actionable insights to help your business grow.',
  } 
};

const Page = () => {
  return (
    <>
      
      <FreeAudit />
    </>
  );
};

export default Page;
