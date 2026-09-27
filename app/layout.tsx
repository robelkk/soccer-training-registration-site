import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RainRise Soccer Academy | Seattle",
  description: "Train with purpose and play with confidence through positive soccer training for children ages 5–15 in the Seattle area.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
