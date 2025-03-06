import type { Metadata } from "next";

import "./globals.css";
import Providers from "./_components/ThemeProvider";

import { GeistSans } from "geist/font/sans";

import { Bebas_Neue, Titillium_Web, DM_Sans } from "next/font/google";

// Configure Bebas Neue for headings
const dmSans = DM_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-titillium",
});
export const metadata: Metadata = {
  title: "Team Builder",
  description: "Football Games based on TransferMarkt Data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="min-h-screen bg-background-deep flex justify-start flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
