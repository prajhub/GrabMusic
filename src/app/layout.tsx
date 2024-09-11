import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Lilita_One } from "next/font/google";
import Navbar from "./_component/Navbar";

const lilitiaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
});

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
      <body className={` ${lilitiaOne.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
