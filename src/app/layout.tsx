import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Fix",
  description: "Issue Fix is a hostel issues management application.",
  icons: {
    icon: "/kr.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-screen-xl w-full mx-auto p-4 flex flex-col justify-between min-h-screen">
          <NextTopLoader color="#2563eb" showSpinner={false} />
          <div>
            <Toaster />
            <Navbar currentUser={currentUser} />
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
