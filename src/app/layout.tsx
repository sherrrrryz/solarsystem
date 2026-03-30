import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solar System",
  description: "Interactive 3D Solar System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
