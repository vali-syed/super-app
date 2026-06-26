import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";

export const metadata = {
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
