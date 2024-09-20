import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { Lilita_One } from "next/font/google";
import Navbar from "./_component/Navbar";
import QueryProvider from "@/components/ui/tstack-query";

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
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
