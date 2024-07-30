import { Kanit as KanitFont } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const kanit = KanitFont({
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata = {
  title: "Crownset Marketing Agency",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html className={kanit.className}>
      <body className={kanit.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
