import { Geist, Geist_Mono, Single_Day } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const singleDay = Single_Day({
  variable: "--font-single-day",
  subsets: ["latin"],
  weight: "400",
});
