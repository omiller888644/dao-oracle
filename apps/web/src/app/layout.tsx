import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dao Oracle",
    template: "%s | Dao Oracle"
  },
  description:
    "Ancient Eastern wisdom for modern life decisions through the 64 hexagrams.",
  metadataBase: new URL("https://dao-oracle.vercel.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
