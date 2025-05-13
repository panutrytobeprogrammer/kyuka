import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryoko",
  description: "Ryoko travel application",
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
    <html lang="en" className="bg-[#1B2027]">
      <body
        className={`${poppins.className} antialiased bg-image flex max-w-md mx-auto flex-col min-h-screen max-h-screen`}
      >
        <Providers>{children}</Providers>
        <p className="fixed bottom-1 p-2 w-full text-center text-[12px] text-gray-800">
          powered by witeseb.website
        </p>
      </body>
    </html>
  );
}
