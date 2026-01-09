import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import Header from "./components/header";

import { CreateUser } from "./components/createUser";
import { ChatbotPage } from "./components/chatbot";
import { PointsProvider } from "./providers/PointProvider";

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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#6366f1",
              colorBackground: "#0b0b0f",
              colorText: "#ffffff",
              colorTextSecondary: "rgba(255,255,255,0.70)",
              colorInputBackground: "rgba(255,255,255,0.06)",
              colorInputText: "#ffffff",
              borderRadius: "16px",
              fontFamily: "ui-sans-serif, system-ui",
            },
            elements: {
              card: [
                "bg-[#0b0b0f]/70 border border-white/10 backdrop-blur-xl",
                "shadow-[0_22px_70px_rgba(99,102,241,0.22)]",
                "rounded-2xl",
              ].join(" "),
              headerTitle: "text-white",
              headerSubtitle: "text-white/60",

              formFieldLabel: "text-white/70",
              formFieldInput:
                "bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0",
              otpCodeFieldInput:
                "bg-white/5 border border-white/15 text-white focus:border-white/30 focus:ring-0",

              formButtonPrimary:
                "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 shadow-[0_10px_28px_rgba(79,70,229,0.45)]",
              formButtonReset:
                "bg-white/10 text-white border border-white/15 hover:bg-white/15",

              socialButtonsBlockButton:
                "bg-white/8 border border-white/15 text-white hover:bg-white/12",
              dividerLine: "bg-white/10",
              dividerText: "text-white/50",
              footerActionText: "text-white/60",
              footerActionLink: "text-indigo-300 hover:text-indigo-200",

              userButtonPopoverCard: [
                "bg-[#0b0b0f]/85 border border-white/12 backdrop-blur-xl",
                "shadow-[0_22px_70px_rgba(99,102,241,0.22)]",
                "rounded-2xl",
              ].join(" "),
              userButtonPopoverActionButton:
                "text-white/85 hover:text-white hover:bg-white/10",
              userButtonPopoverActionButtonText: "text-white/85",
              userButtonPopoverFooter: "border-t border-white/10",
            },
          }}
        >
          <PointsProvider>
            <CreateUser />
            <Header />

            <div className="flex w-full min-h-[calc(100vh-56px)] ">
              <main className="flex-1 min-w-0 ">{children}</main>
            </div>
          </PointsProvider>
        </ClerkProvider>
        <ChatbotPage />
      </body>
    </html>
  );
}
