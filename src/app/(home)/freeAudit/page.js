import React from "react";
import Services from "@/components/pages/Services";
import FreeAudit from "@/components/pages/Freeaudit";

export const metadata = {
  title: "Free Audit ",
  description:
    "Explore the range of innovative and results-driven services offered by Crownset Marketing Agency. From SEO to social media marketing, we deliver tailored solutions to help your business grow.",
  openGraph: {
    title: "Free Audit - Crownset Marketing Agency",
    description:
      "Explore the range of innovative and results-driven services offered by Crownset Marketing Agency. From SEO to social media marketing, we deliver tailored solutions to help your business grow.",
    url: "https://www.crownset.com/FreeAudit",
    type: "website",
  },
};

const Page = () => {
  return (
    <>
      <FreeAudit />
    </>
  );
};

export default Page;
