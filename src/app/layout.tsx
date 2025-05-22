import type { Metadata, Viewport } from "next";
import { K2D } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const k2d = K2D({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyūka",
  description: "Kyūka travel application",
};

export const viewport: Viewport = {
  maximumScale: 1,
  initialScale: 1,
  width: "device-width",
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50">
      <body
        className={`${k2d.className} antialiased bg-image flex max-w-md mx-auto flex-col min-h-screen max-h-screen`}
      >
        <Providers>{children}</Providers>
        <p className="fixed bottom-2 p-2 w-full text-center text-[12px] text-gray-800">
          powered by witeseb.website
        </p>
      </body>
    </html>
  );
}
