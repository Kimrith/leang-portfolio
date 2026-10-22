import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDesignerProfile } from "@/lib/cms";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getDesignerProfile();

  return {
    metadataBase: new URL("https://leang.design"),
    title: {
      default: `${profile.name} — ${profile.roleTitle}`,
      template: `%s | ${profile.name}`,
    },
    description: profile.statement,
    keywords: [
      "Product Design",
      "Design Systems",
      "Design Architecture",
      "Spatial UI",
      "Minimalist Portfolio",
      "Leang Sok",
      "UI/UX Designer",
    ],
    authors: [{ name: profile.name, url: "https://leang.design" }],
    creator: profile.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://leang.design",
      title: `${profile.name} — ${profile.roleTitle}`,
      description: profile.statement,
      siteName: `${profile.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} — ${profile.roleTitle}`,
      description: profile.statement,
      creator: "@leangsok",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getDesignerProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0e] text-[#f4f4f5] font-sans selection:bg-[#f97316] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="flex flex-col min-h-screen bg-[#0d0d0e]">
            <Header
              designerName="Folioblox"
              monogram={profile.monogram}
              statusText={profile.availability}
              resumeUrl={profile.resumePdfUrl}
            />
            <main className="flex-1">{children}</main>
            <Footer
              designerName={profile.name}
              email={profile.email}
              socials={profile.socials}
              timezone={profile.timezone}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
