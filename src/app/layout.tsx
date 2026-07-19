import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muscle Garaage | Premium Luxury Gym & Fitness Club in Ahmedabad",
  description: "Experience Ahmedabad's finest luxury gym in Motera. Elite strength training, world-class CrossFit arena, recovery ice baths, steam rooms, swimming pool, and certified trainers for customized transformations.",
  keywords: "luxury gym ahmedabad, premium fitness club motera, best gym in ahmedabad, personal trainers ahmedabad, crossfit arena, bodybuilding, muscle garage ahmedabad",
  openGraph: {
    title: "Muscle Garaage | Premium Luxury Gym Ahmedabad",
    description: "Experience Ahmedabad's finest luxury gym in Motera. Elite strength training, world-class CrossFit arena, recovery ice baths, steam rooms, swimming pool, and certified trainers.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${inter.variable} font-body bg-black text-white antialiased selection:bg-accent selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}

