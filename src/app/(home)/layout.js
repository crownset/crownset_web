import { Kanit as KanitFont } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProvider from "@/redux/ClientProvider";

const kanit = KanitFont({
   
  subsets: ["latin"],
  weight: ["300"],
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kanit.className}>
      <body className={kanit.className}>
        <ClientProvider>
          <Navbar />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
