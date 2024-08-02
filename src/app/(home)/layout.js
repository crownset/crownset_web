import { Kanit as KanitFont } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProvider from "@/redux/ClientProvider";
// import store from "../../store"
// import { Provider } from "react-redux";


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
        <ClientProvider>
          <Navbar />
          {children}
          <Footer />
        </ClientProvider>

      </body>
    </html>
  );
}
