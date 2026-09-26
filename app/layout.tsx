import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youth Soccer Training Academy | Seattle",
  description: "Positive, age-appropriate soccer training for children ages 5–15 in the Seattle area.",
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
