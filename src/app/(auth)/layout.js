import { Kanit as KanitFont } from "next/font/google";
import "@/app/globals.css";
import ClientProvider from "@/redux/ClientProvider";
import {Suspense} from "react";

export const metadata = {
  title: "Crownset Marketing Agency: Top Service Provider & Partner ",
  description:
    "Boost your online presence with Crownset Marketing Agency. We offer custom digital services like web development, SEO, PPC, and more to maximize your ROI.",
  keywords:
    "digital marketing, SEO, web development, Crownset Marketing, PPC, social media marketing",
  author: "Crownset Marketing Agency",
  openGraph: {
    title: "Crownset Marketing Agency | Crownset marketing Agency in noida",
    description:
      "Top Service Provider & Partner for all your digital marketing needs.",
    url: "https://thecrownset.com",
    type: "website",
  },
};

const kanit = KanitFont({
  subsets: ["latin"],
  weight: ["300"],
});

export default function AuthLayout({ children }) {
  return (
    <html className={kanit.className}>
      <body className={kanit.className}>
        {/* <Suspense> */}
        <ClientProvider>
          {children}
        </ClientProvider>
        {/* </Suspense> */}
        
      </body>
    </html>
  )
}