import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import Provider from "@/provider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev-Finder",
  description: "this is a platform where users can pair with random devs to work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Provider>
            <Header />
           <NextTopLoader />

             {children}
             <Toaster />
          </Provider>
        </body>
    </html>
  );
}
