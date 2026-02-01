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
import { BookmarkCheck, ChevronDown, Menu, X, Plus, Home, TestTube, BookOpen, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { points } = usePoints();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const nav = [
    { label: "Home", href: "/", icon: Home },
    { label: "User Test", href: "/test", icon: TestTube },
    { label: "Blog", href: "/blogs", icon: BookOpen },
    { label: "News", href: "/itnews", icon: Newspaper },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`${
        isAdmin === true
          ? "hidden"
          : "sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <button
              onClick={() => router.push("/")}
              className="select-none flex items-center gap-1.5"
              type="button"
            >
              <span className="font-extrabold tracking-tight">
                <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)] text-lg sm:text-xl lg:text-2xl">
                  Software
                </span>{" "}
                <span className="text-white/90 text-lg lg:text-xl hidden lg:inline">
                  Community
                </span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
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
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Create Post - Hidden on mobile, shown on tablet+ */}
            <button
              onClick={() => router.push("/addPost")}
              className="hidden sm:flex h-9 lg:h-10 px-3 lg:px-4 rounded-xl
                         bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
                         hover:brightness-110
                         text-white transition items-center gap-2 text-sm font-semibold
                         shadow-[0_4px_15px_rgba(79,70,229,0.4)]"
              type="button"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Create Post</span>
            </button>

            {/* Help - Hidden on mobile */}
            <button
              onClick={() => router.push("/helpcenter")}
              className="hidden md:flex h-9 lg:h-10 px-3 lg:px-4 rounded-xl
                         bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-white/15
                         text-white/80 transition items-center gap-2 text-sm"
              type="button"
            >
              <FaRegCircleQuestion className="text-white/70" />
              <span className="hidden lg:inline">Help</span>
            </button>

            <SignedOut>
              <SignInButton>
                <Button
                  variant="secondary"
                  className="h-9 lg:h-10 px-3 sm:px-4 lg:px-5 rounded-xl text-sm bg-white/10 text-white border border-white/15 hover:bg-white/15 cursor-pointer"
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="secondary"
                  className="hidden sm:flex h-9 lg:h-10 px-3 sm:px-4 lg:px-5 rounded-xl text-sm bg-white/10 text-white border border-white/15 hover:bg-white/15 cursor-pointer"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Points */}
                <button
                  onClick={() => router.push("/pointPage")}
                  className="
                    group h-9 lg:h-10 px-2.5 sm:px-3 lg:px-4 rounded-xl
                    flex items-center gap-1.5 sm:gap-2
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
                  <span className="scale-90 sm:scale-95 group-hover:scale-105 transition">
                    <CoinIcon />
                  </span>
                  <span className="text-yellow-200 font-extrabold text-xs sm:text-sm lg:text-base tabular-nums">
                    {points ?? 0}
                  </span>
                </button>

                {/* User Button */}
                <div className="h-9 lg:h-10 px-2 rounded-xl border border-white/10 bg-white/5 flex items-center">
                  <UserButton />
                </div>

                {/* Settings Dropdown */}
                <div className="relative hidden sm:block">
                  <button
                    className="cursor-pointer p-1"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                  >
                    <ChevronDown
                      className={`w-5 h-5 ${settingsOpen ? "text-white rotate-180 transition" : "text-gray-500 rotate-0 transition"}`}
                    />
                  </button>
                  {settingsOpen && (
                    <div className="absolute top-12 right-0 border border-gray-600 bg-black/90 backdrop-blur-xl text-white py-2 rounded-xl w-48 shadow-xl">
                      <button
                        className="cursor-pointer flex items-center gap-2 w-full hover:bg-white/10 transition text-sm px-4 py-2.5 text-gray-300"
                        onClick={() => {
                          router.push("/savedPosts");
                          setSettingsOpen(false);
                        }}
                      >
                        <BookmarkCheck className="w-4 h-4" />
                        Saved Posts
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {/* Navigation Links */}
            {nav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                  type="button"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="h-px bg-white/10 my-3" />

            {/* Mobile-only Actions */}
            <button
              onClick={() => router.push("/addPost")}
              className="sm:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
                         text-white font-semibold"
              type="button"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>

            <button
              onClick={() => router.push("/helpcenter")}
              className="md:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl
                         bg-white/5 border border-white/10 text-white/80"
              type="button"
            >
              <FaRegCircleQuestion className="w-5 h-5" />
              <span>Help Center</span>
            </button>

            <SignedIn>
              <button
                onClick={() => router.push("/savedPosts")}
                className="sm:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-white/5 border border-white/10 text-white/80"
                type="button"
              >
                <BookmarkCheck className="w-5 h-5" />
                <span>Saved Posts</span>
              </button>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
