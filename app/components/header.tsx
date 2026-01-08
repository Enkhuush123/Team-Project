"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const nav = [
    { label: "Home", href: "/" },
    { label: "User Test", href: "/test" },
    { label: "Blog", href: "/blogs" },
    { label: "IT News", href: "/news" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 select-none"
          >
            <span className="text-lg md:text-xl font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]">
                Software
              </span>{" "}
              <span className="text-white/90">Community</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={[
                  "h-9 px-3 rounded-full text-sm transition border",
                  "backdrop-blur-md",
                  isActive(item.href)
                    ? "bg-white/12 border-white/25 text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:text-white hover:border-white/15",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button className="h-9 text-white font-semibold bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_26px_rgba(79,70,229,0.35)] hover:brightness-110">
                  Login
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="secondary"
                  className="h-9 bg-white/10 text-white border border-white/15 hover:bg-white/15"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-white/60 text-sm">
                  Account
                </span>
                <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </div>
          <div className="md:hidden pb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {nav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "h-9 px-3 rounded-full text-sm whitespace-nowrap transition border",
                    isActive(item.href)
                      ? "bg-white/12 border-white/25 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
