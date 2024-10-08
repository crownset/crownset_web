import { Kanit as KanitFont } from "next/font/google";
import "@/app/globals.css";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ClientProvider from "@/redux/ClientProvider";

export const metadata = {
    title: "Crownset Marketing Agency: Top Service Provider & Partner ",
    description:
      "Boost your online presence with Crownset Marketing Agency. We offer custom digital services like web development, SEO, PPC, and more to maximize your ROI.",
    keywords:
      " SEO, web development, Crownset Marketing, PPC, social media marketing",
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
                <ClientProvider>
                    <AdminDashboard />
                    <div className="pt-16 pl-0 md:pl-20 transition-all duration-300 ease-in-out h-screen ">
                        {children}
                    </div>
                </ClientProvider>
            </body>
        </html>

    )
}