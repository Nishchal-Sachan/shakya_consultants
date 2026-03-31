import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { BookingModalProvider } from "@/context/BookingModalContext";
import BookingModalRoot from "@/components/common/BookingModalRoot";
import ScrollReveal from "@/components/common/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shakya Consultants",
  description: "Professional SaaS Agency Website",
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className={`antialiased ${inter.className}`}>
        <BookingModalProvider>
          <ScrollReveal />
          <BookingModalRoot>{children}</BookingModalRoot>
        </BookingModalProvider>
      </body>
    </html>
  );
}
