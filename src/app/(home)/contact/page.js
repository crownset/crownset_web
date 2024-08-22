import React from 'react';
import Contact from '@/components/pages/Contact';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Crownset Marketing Agency to discuss your business needs and how we can help. Our team is here to provide expert advice and support for your marketing and IT solutions.',
  openGraph: {
    title: 'Contact Us-Crownset Marketing Agency',
    description: 'Get in touch with Crownset Marketing Agency to discuss your business needs and how we can help. Our team is here to provide expert advice and support for your marketing and IT solutions.',
    url: 'https://www.crownsetmarketing.com/contact',
    type: 'website',
  },
 
};

const Page = () => {
  return (
    <>
      
      <Contact />
    </>
  );
};

export default Page;
