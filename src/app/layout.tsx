import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { Lilita_One, Rowdies } from "next/font/google";
import QueryProvider from "@/components/ui/tstack-query";
import { ConditionalNavbar } from "./_component/Navbar";

const lilitiaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
});

const rowDies = Rowdies({
  weight: "300",
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
      <body className={` ${rowDies.className} antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalNavbar />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
