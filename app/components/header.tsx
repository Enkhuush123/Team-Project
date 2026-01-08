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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="h-14 flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => router.push("/")}
            className="group flex items-center gap-2"
          >
            <span className="text-lg md:text-xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent group-hover:brightness-110 transition">
                Software
              </span>{" "}
              <span className="text-white/90">Community</span>
            </span>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "relative h-9 px-4 rounded-full text-sm font-medium transition-all",
                    "border backdrop-blur-md",
                    active
                      ? "bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-violet-600/30 border-indigo-400/40 text-white shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                      : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20",
                  ].join(" ")}
                >
                  {item.label}

                  {/* active glow underline */}
                  {active && (
                    <span className="absolute -bottom-[6px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* AUTH */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button className="h-9 px-5 font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_30px_rgba(79,70,229,0.45)] hover:brightness-110 active:scale-[0.97] transition">
                  Login
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="secondary"
                  className="h-9 px-4 bg-white/10 text-white border border-white/15 hover:bg-white/15 hover:border-white/25 transition"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-white/50 text-sm">
                  Account
                </span>
                <div className="rounded-full border border-white/15 bg-white/5 p-1 hover:border-white/25 transition">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </div>
<<<<<<< HEAD
          <div className="md:hidden pb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {nav.map((item) => (
=======
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
>>>>>>> ecad6c8 (manlai2)
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
<<<<<<< HEAD
                    "h-9 px-3 rounded-full text-sm whitespace-nowrap transition border",
                    isActive(item.href)
                      ? "bg-white/12 border-white/25 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:text-white",
=======
                    "h-9 px-4 rounded-full text-sm whitespace-nowrap transition border",
                    active
                      ? "bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-violet-600/30 border-indigo-400/40 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10",
>>>>>>> ecad6c8 (manlai2)
                  ].join(" ")}
                >
                  {item.label}
                </button>
<<<<<<< HEAD
              ))}
            </div>
=======
              );
            })}
>>>>>>> ecad6c8 (manlai2)
          </div>
        </div>
      </div>
    </header>
  );
}
