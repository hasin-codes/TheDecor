import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { HeaderWrapper } from "@/components/navbar";
import { ZoomBlocker } from "@/components/ui/ZoomBlocker";
import { ClientLayout } from "./ClientLayout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "The Decor | Digital Experiences",
  description: "Advanced digital production studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <ZoomBlocker />
        <HeaderWrapper />

        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
