import type { Metadata } from "next";

import "./globals.css";
import Providers from "./_components/ThemeProvider";

import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Team Builder",
  description: "Football Games based on TransferMarkt Data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background-deep flex justify-start flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
