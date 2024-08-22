import React from "react";
import Services from "@/components/pages/Services";

export const metadata = {
  title: "Our Services",
  description:
    "Explore the range of innovative and results-driven services offered by Crownset Marketing Agency. From SEO to social media marketing, we deliver tailored solutions to help your business grow.",
  openGraph: {
    title: "Our Services - Crownset Marketing Agency",
    description:
      "Explore the range of innovative and results-driven services offered by Crownset Marketing Agency. From SEO to social media marketing, we deliver tailored solutions to help your business grow.",
    url: "https://www.crownsetmarketing.com/services",
    type: "website",
  },
};

const Page = () => {
  return (
    <>
      <Services />
    </>
  );
};

export default Page;
