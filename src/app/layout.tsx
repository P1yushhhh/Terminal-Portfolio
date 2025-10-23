import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext"; 

export const metadata: Metadata = {
  title: "Terminal Portfolio | Your Name", // Replace "Your Name"
  description: "Interactive terminal-style portfolio showcasing ML/AI, Cloud, and Product Management expertise",
  keywords: ["portfolio", "terminal", "developer", "machine learning", "cloud engineer", "product manager"],
  authors: [{ name: "Your Name" }], // Replace "Your Name"
  openGraph: {
    title: "Terminal Portfolio | Your Name",
    description: "Interactive terminal portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
