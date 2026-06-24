import { Geist, Geist_Mono, Single_Day } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

{/*Intializing single day fotn for super app heading*/}
export const singleDay = Single_Day({
  variable:"--font-single-day",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata = {
  title: "The Super App",
  description: "A super app is a web application that combines multiple services and functionalities into a single platform, providing users with a seamless and integrated experience.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
