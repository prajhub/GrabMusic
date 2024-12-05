import type { Metadata } from "next";
import "./globals.css";
import { Rowdies, Inter } from "next/font/google";
import QueryProvider from "@/components/ui/tstack-query";
import { ConditionalNavbar } from "./_component/Navbar";

const rowDies = Rowdies({
  weight: "300",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Grab Music",
  description: "Steal that shit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        <QueryProvider>
          <ConditionalNavbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
