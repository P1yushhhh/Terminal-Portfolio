import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Piyush Chawla | Software Engineer - Backend, MLOps, Cloud",
  description:
    "Piyush Chawla - 4th year Electronics and Computer Science student at Thapar Institute. Freelance ML Engineer specializing in MLOps, AWS, GCP, Kubernetes. Ex-AIESEC National Product Manager. Building scalable backend systems.",
  keywords: [
    "Piyush Chawla",
    "Software Engineer",
    "MLOps Engineer",
    "Backend Developer",
    "AWS",
    "Kubernetes",
    "Machine Learning",
    "Thapar Institute",
    "Python Developer",
    "Cloud Engineer",
    "DevOps",
    "GCP",
    "Docker",
    "Jenkins",
    "Freelance",
  ],
  authors: [
    {
      name: "Piyush Chawla",
      url: "https://www.linkedin.com/in/piyush-chawla-510675282",
    },
  ],
  creator: "Piyush Chawla",
  metadataBase: new URL("https://terminal-portfolio-uwey.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Piyush Chawla | Software Engineer - Backend, MLOps, Cloud",
    description:
      "Freelance ML Engineer | AWS & GCP | Ex-AIESEC Product Lead | Building scalable systems",
    type: "website",
    url: "https://terminal-portfolio-uwey.vercel.app/", 
    siteName: "Piyush Chawla Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Piyush Chawla - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Chawla | Software Engineer",
    description: "Backend, MLOps, Cloud | Building scalable systems",
    images: ["/og-image.png"], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // ✅ Allow zoom for accessibility (WCAG compliance)
  userScalable: true, // ✅ Enable zoom for visually impaired users
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e27" }, 
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Piyush Chawla",
    url: "https://terminal-portfolio-uwey.vercel.app/", 
    image: "/og-image.png",
    sameAs: [
      "https://www.linkedin.com/in/piyush-chawla-510675282",
      "https://github.com/p1yushhhh",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Thapar Institute of Engineering and Technology",
    },
    knowsAbout: [
      "Machine Learning",
      "MLOps",
      "AWS",
      "Google Cloud Platform",
      "Kubernetes",
      "Docker",
      "Python",
      "Backend Development",
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
