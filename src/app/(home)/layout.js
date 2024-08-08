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
  title: "Crownset Marketing Agency",
  description: "We offer a full range of digital services, including website development, mobile application development, software development, paid search marketing, SEO, email marketing, conversion rate optimization, social media marketing, Google Shopping, influencer marketing, Cost ho with Amazon purchasing, translation services Our team of experts provide customized solutions to optimize your online presence, drive growth and maximize ROI.",
};

export default function RootLayout({ children }) {

  return (
    <html className={kanit.className}>
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
