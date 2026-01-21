"use client";

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
import { usePoints } from "../providers/PointProvider";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { points } = usePoints();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin")
  console.log("PATNAME:", isAdmin)
  


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
    <header className={`${isAdmin === true ? "hidden" : "sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl "}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="h-14 md:h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center justify-start min-w-0">
            <button
              onClick={() => router.push("/")}
              className="select-none flex items-center gap-2"
              type="button"
            >
              <span className="font-extrabold tracking-tight">
                <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)] text-xl md:text-2xl">
                  Software
                </span>{" "}
                <span className="text-white/90 text-lg md:text-xl">
                  Community
                </span>
              </span>
            </button>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-7">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "relative px-1 py-2 text-[15px] font-semibold transition",
                    active ? "text-white" : "text-white/60 hover:text-white",
                  ].join(" ")}
                  type="button"
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.75 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <button
              onClick={() => router.push("/helpcenter")}
              className="hidden sm:flex h-9 md:h-10 px-3 md:px-4 rounded-xl
                         bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-white/15
                         text-white/80 transition items-center gap-2 text-sm"
              type="button"
            >
              <FaRegCircleQuestion className="text-white/70" />
              <span>Help</span>
            </button>

            <SignedOut>
              <SignInButton>
                <Button className="h-9 md:h-10 px-4 md:px-5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_26px_rgba(79,70,229,0.30)] hover:brightness-110">
                  Login
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="secondary"
                  className="h-9 md:h-10 px-4 md:px-5 rounded-xl text-sm bg-white/10 text-white border border-white/15 hover:bg-white/15"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => router.push("/pointPage")}
                  className="
                    group h-9 md:h-10 px-3 md:px-4 rounded-xl
                    flex items-center gap-2
                    border border-yellow-400/30
                    bg-linear-to-r from-yellow-400/10 via-amber-400/10 to-orange-400/10
                    hover:border-yellow-300/60
                    hover:bg-yellow-400/15
                    transition
                    shadow-[0_0_0_rgba(0,0,0,0)]
                    hover:shadow-[0_0_22px_rgba(250,204,21,0.25)]
                  "
                  type="button"
                  title="Points"
                >
                  <span className="scale-95 group-hover:scale-105 transition">
                    <CoinIcon />
                  </span>

                  <span className="text-yellow-200 font-extrabold text-sm md:text-base tabular-nums">
                    {points ?? 0}
                  </span>
                </button>

                <div className="h-9 md:h-10 px-2 rounded-xl border border-white/10 bg-white/5 flex items-center">
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
                    "h-9 px-3 rounded-full text-sm whitespace-nowrap transition border backdrop-blur-md",
                    active
                      ? "bg-white/12 border-white/25 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                  type="button"
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
