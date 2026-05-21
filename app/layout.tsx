import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kampus Konnect AI — Find your perfect student team",
    template: "%s · Kampus Konnect AI",
  },
  description:
    "AI-powered student collaboration platform. Discover teammates, mentors, study partners, and project collaborators matched by skills, goals, and availability.",
  keywords: [
    "student collaboration",
    "hackathon team",
    "AI matching",
    "study partner",
    "mentor",
    "Gemini AI",
  ],
  authors: [{ name: "Kampus Konnect AI" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  openGraph: {
    title: "Kampus Konnect AI — Find your perfect student team",
    description:
      "AI-powered student collaboration. Find teammates, mentors, and project partners with intelligent matching.",
    type: "website",
    url: "/",
    siteName: "Kampus Konnect AI",
    images: [{ url: "/KK_Logo.png", width: 512, height: 512, alt: "Kampus Konnect AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kampus Konnect AI",
    description: "Find your perfect student team with AI.",
    images: ["/KK_Logo.png"],
  },
  icons: {
    icon: "/KK_Favicon.png",
    shortcut: "/KK_Favicon.png",
    apple: "/KK_Favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans relative overflow-x-hidden`}
      >
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(15, 15, 35, 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
