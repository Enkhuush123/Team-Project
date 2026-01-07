import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import Header from "./components/header";

import { CreateUser } from "./components/createUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Software Community",
  description: "Test your WebSite & developer communtiy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <CreateUser />
          <Header />

          <div className="flex w-full min-h-[calc(100vh-56px)] ">
            <main className="flex-1 min-w-0 ">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
