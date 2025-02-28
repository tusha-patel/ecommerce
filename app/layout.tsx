import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./component/nav/NavBar";
import Footer from "./component/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"]
});


export const metadata: Metadata = {
  title: "E-shop",
  description: "E-commerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700 `}>
        <CartProvider>
          <Toaster toastOptions={{
            style: { background: 'rgb(51 65 85', color: "#fff" }
          }} />
          <div className="flex flex-col min-h-screen " >
            <NavBar />
            <main className="flex-grow" >
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
