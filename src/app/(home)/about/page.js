import React from 'react';
import About from '@/components/pages/About';

export const metadata = {
  title: 'About Us ',
  description: "At Crownset, founded in 2017, we are dedicated to empowering businesses to not just participate in the market but to lead it.With our innovative business solutions and IT services,",
  
  openGraph: 
  {
    title: 'About Us - Crownset Marketing Agency',
    description:  "At Crownset, founded in 2017, we are dedicated to empowering businesses to not just participate in the market but to lead it.With our innovative business solutions and IT services,",
    url: 'https://www.crownsetmarketing.com/about',
    type: 'website',
  },
 
};

const Page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default Page;
