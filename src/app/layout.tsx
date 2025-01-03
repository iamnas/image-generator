import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Provider from "./SessionProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Image Generator",
  description: "Generate New Images from promt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative max-w-7x1 mx-auto` }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        // defaultTheme="system"
        // enableSystem
        // disableTransitionOnChange
        >
          <Provider> 
            <Header />
            {children}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
