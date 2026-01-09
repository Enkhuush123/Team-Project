"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CoinIcon from "../_icons/CoinIcon";
import { FaRegCircleQuestion } from "react-icons/fa6";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

type User = { points: number };

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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
    <header
      className="
        sticky top-0 z-50 w-full 
        border-b border-white/10
        bg-black/70 backdrop-blur-xl
      "
    >
      <div className="mx-auto w-full max-w-8xl px-3 md:px-10 py-6">
        <div className="h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center justify-start">
            <button
              onClick={() => router.push("/")}
              className="select-none flex items-center"
            >
              <span className="font-extrabold tracking-tight text-xl md:text-3xl">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]">
                  Software
                </span>{" "}
                <span className="text-white/90">Community</span>
              </span>
            </button>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-8">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "relative px-1 py-2 text-[20px] font-semibold transition",
                    active ? "text-white" : "text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}

                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <button
              onClick={() => router.push("/helpcenter")}
              className="
                hidden sm:flex
                h-10 px-4 rounded-xl
                bg-white/5 border border-white/10
                hover:bg-white/10 hover:border-white/15
                text-white/80 transition
                items-center gap-2 text-sm
              "
              type="button"
            >
              <FaRegCircleQuestion />
              <span className="text-[20px]">Help</span>
            </button>

            <SignedOut>
              <SignInButton>
                <Button
                  className="
                    h-10 px-5 rounded-xl text-sm font-semibold
                    bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
                    shadow-[0_10px_26px_rgba(79,70,229,0.30)]
                    hover:brightness-110
                  "
                >
                  Login
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="secondary"
                  className="
                    h-10 px-5 rounded-xl text-sm
                    bg-white/10 text-white
                    border border-white/15 hover:bg-white/15
                  "
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => router.push("/userPoints")}
                  className="
                    h-10 px-4 rounded-xl
                    bg-white/5 border border-white/10
                    hover:bg-white/10 hover:border-white/15
                    transition flex items-center gap-2
                  "
                  type="button"
                >
                  <CoinIcon />
                  <span className="text-white/85 text-sm  text-[20px]font-semibold tabular-nums">
                    {user?.points ?? 0}
                  </span>
                </button>

                <div className="h-10 px-2 rounded-xl border border-white/10 bg-white/5 flex items-center">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
        <div className="md:hidden pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "h-9 px-3 rounded-full text-sm whitespace-nowrap transition border",
                    active
                      ? "bg-white/12 border-white/25 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
