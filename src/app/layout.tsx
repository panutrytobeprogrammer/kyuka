import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#1B2027]">
      <body
        className={`${poppins.className} antialiased bg-[url('/background.png')] bg-cover bg-center bg-no-repeat flex max-w-md mx-auto flex-col min-h-screen bg-fixed`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
