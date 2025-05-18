import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google'; // Using Inter as a common sans-serif font
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"; // Ensure Toaster is imported

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'Element Explorer',
  description: 'Interactive Periodic Table of Elements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable // Apply the font variable here
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
