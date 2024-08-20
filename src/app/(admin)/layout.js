import { Kanit as KanitFont } from "next/font/google";
import "@/app/globals.css";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ClientProvider from "@/redux/ClientProvider";
export const metadata = {
    title: "Crownset Marketing Agency",
    description: "Crownset Marketing Agency",
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
                    <div className="pt-16 pl-0 md:pl-20 transition-all duration-300 ease-in-out h-screen bg-[#f8f7fa]">
                        {children}
                    </div>
                </ClientProvider>
            </body>
        </html>

    )
}