
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CoinIcon from "../_icons/CoinIcon";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePoints } from "../providers/PointProvider";
import {
  BookmarkCheck,
  ChevronDown,
  Menu,
  X,
  Plus,
  Home,
  TestTube,
  BookOpen,
  Newspaper,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { points } = usePoints();

  const isAdmin = pathname.startsWith("/admin");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = [
    { label: "Home", href: "/", icon: Home },
    { label: "User Test", href: "/test", icon: TestTube },
    { label: "Blog", href: "/blogs", icon: BookOpen },
    { label: "News", href: "/itnews", icon: Newspaper },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-8xl 3xl:max-w-none px-4 sm:px-6 lg:px-8 3xl:px-28">

        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24 3xl:h-44">

          <button
            onClick={() => router.push("/")}
            className="flex items-baseline gap-3 select-none"
          >
            <span
              className="
                bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400
                bg-clip-text text-transparent font-black tracking-tight
                text-xl sm:text-2xl lg:text-4xl
                2xl:text-5xl
                3xl:text-8xl
              "
            >
              Software
            </span>
            <span
              className="
                hidden lg:inline text-white/90 font-bold
                text-2xl 2xl:text-3xl 3xl:text-7xl
              "
            >
              Community
            </span>
          </button>


          <nav className="hidden lg:flex items-center gap-8 2xl:gap-14 3xl:gap-32">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "relative font-bold transition",
                    "text-lg 2xl:text-xl 3xl:text-4xl",
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500" />
                  )}
                </button>
              );
            })}
          </nav>


          <div className="flex items-center gap-2 sm:gap-3 3xl:gap-8">

            <button className="p-2 3xl:p-4 rounded-xl hover:bg-white/10 transition">
              <IoMdNotificationsOutline className="w-6 h-6 3xl:w-12 3xl:h-12 text-white" />
            </button>

            {/* Create Post */}
            <button
              onClick={() => router.push("/addPost")}
              className="
                hidden sm:flex items-center gap-3 font-bold text-white
                h-11 lg:h-14 3xl:h-32
                px-4 lg:px-6 3xl:px-16
                rounded-2xl
                bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600
                hover:brightness-110 transition
                text-base lg:text-lg 3xl:text-4xl
                shadow-[0_10px_30px_rgba(79,70,229,0.45)]
              "
            >
              <Plus className="w-5 h-5 3xl:w-9 3xl:h-9" />
              Create Post
            </button>

            {/* Help */}
            <button
              onClick={() => router.push("/helpcenter")}
              className="
                hidden md:flex items-center gap-3
                h-11 lg:h-14 3xl:h-32
                px-4 lg:px-6 3xl:px-16
                rounded-2xl
                bg-white/5 border border-white/10
                text-white/80 font-semibold
                text-base lg:text-lg 3xl:text-4xl
                hover:bg-white/10 transition
              "
            >
              <FaRegCircleQuestion className="3xl:text-4xl" />
              Help
            </button>

            {/* Auth */}
            <SignedOut>
              <SignInButton>
                <Button
                  className="
                    h-11 lg:h-14 3xl:h-32
                    px-5 lg:px-7 3xl:px-20
                    rounded-2xl
                    text-base lg:text-lg 3xl:text-4xl
                    bg-white/10 text-white border border-white/15
                    hover:bg-white/20
                  "
                >
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <button
                onClick={() => router.push("/pointPage")}
                className="
                  flex items-center gap-3
                  h-11 lg:h-14 3xl:h-32
                  px-4 lg:px-6 3xl:px-16
                  rounded-2xl
                  bg-linear-to-r from-yellow-400/15 to-orange-400/15
                  border border-yellow-400/40
                  hover:bg-yellow-400/25 transition
                "
              >
                <span className="3xl:scale-[1.7]">
                  <CoinIcon />
                </span>
                <span className="font-black text-yellow-300 tabular-nums text-base lg:text-lg 3xl:text-4xl">
                  {points ?? 0}
                </span>
              </button>

              <div className="hidden sm:flex h-11 lg:h-14 3xl:h-32 px-3 3xl:px-10 rounded-2xl border border-white/10 bg-white/5 items-center">
                <div className="3xl:scale-[1.4]">
                  <UserButton />
                </div>
              </div>
            </SignedIn>


            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
