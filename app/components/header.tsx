/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */

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

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playNotificationSound } from "../utils/sound";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  link: string | null;
  read: boolean;
  createdAt: string;
  review?: {
    id: string;
    description: string;
    screenshotUrl: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    geminiConfidence: number;
    website?: { id: string; title: string; link: string };
    reviewer?: {
      name: string | null;
      email: string | null;
      imageUrl: string | null;
    };
  } | null;
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { points } = usePoints();

  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationItem[]>([]);
  if (isAdmin) return null;

  const unreadCount = notification.filter((n) => !n.read).length;
  const prevUnreadCount = useRef(0);

  useEffect(() => {
    if (
      unreadCount > prevUnreadCount.current &&
      prevUnreadCount.current !== 0
    ) {
      playNotificationSound();
    }
    prevUnreadCount.current = unreadCount;
  }, [unreadCount]);

  const loadNotification = async () => {
    try {
      const res = await fetch("/api/notification", { cache: "no-store" });
      const data = await res.json();

      const list = Array.isArray(data.notifications)
        ? data.notifications
        : Array.isArray(data.notification)
          ? data.notification
          : [];

      setNotification(list);
    } catch {
      setNotification([]);
    }
  };

  const markRead = async (id: string) => {
    setNotification((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

    try {
      await fetch(`/api/notification/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {}
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setSettingsOpen(false);
    setNotifOpen(false);
    void loadNotification();
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotifOpen(false);
        setSettingsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  const goToNotification = (n: NotificationItem) => {
    if (!n.read) void markRead(n.id);
    setNotifOpen(false);

    if (n.review?.id) {
      router.push(`/reviews/${n.review.id}`);
      return;
    }

    if (n.link) {
      router.push(n.link);
      return;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-8xl 3xl:max-w-none px-4 sm:px-6 lg:px-8 3xl:px-24">
        <div className="h-14 sm:h-16 lg:h-20 3xl:h-40 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <button
              onClick={() => router.push("/")}
              className="select-none flex items-center gap-2 min-w-0"
              type="button"
              aria-label="Go Home"
            >
              <span className="font-extrabold tracking-tight min-w-0 flex items-baseline gap-2">
                <span
                  className="
                    bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]
                    text-lg sm:text-xl lg:text-3xl
                    2xl:text-4xl
                    3xl:text-7xl
                    whitespace-nowrap
                  "
                >
                  Software
                </span>

                <span
                  className="
                    hidden lg:inline
                    text-white/90
                    text-xl lg:text-2xl
                    2xl:text-3xl
                    3xl:text-6xl
                    whitespace-nowrap
                  "
                >
                  Community
                </span>
              </span>
            </button>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-10 2xl:gap-12 3xl:gap-28">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={[
                    "relative px-1 py-2 font-semibold transition",
                    "text-[15px] xl:text-base 2xl:text-lg 3xl:text-3xl",
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

          <div className="flex items-center gap-2 sm:gap-3 3xl:gap-6">
            <button
              onClick={() => router.push("/addPost")}
              className="
                hidden sm:flex items-center gap-2 font-semibold text-white transition
                h-9 lg:h-10 2xl:h-11 3xl:h-28
                px-3 lg:px-4 2xl:px-5 3xl:px-14
                rounded-xl
                bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600
                hover:brightness-110
                text-sm 2xl:text-base 3xl:text-3xl
                shadow-[0_4px_15px_rgba(79,70,229,0.4)]
              "
              type="button"
            >
              <Plus className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-8 3xl:h-8" />
              <span className="hidden md:inline">Create Post</span>
              <span className="md:hidden">Post</span>
            </button>

            <SignedOut>
              <SignInButton>
                <Button
                  variant="secondary"
                  className="
                    h-9 lg:h-10 2xl:h-11 3xl:h-28
                    px-3 sm:px-4 lg:px-5 2xl:px-6 3xl:px-16
                    rounded-xl
                    text-sm 2xl:text-base 3xl:text-3xl
                    bg-white/10 text-white border border-white/15
                    hover:bg-white/15 cursor-pointer
                  "
                >
                  Login
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant="secondary"
                  className="
                    hidden sm:flex
                    h-9 lg:h-10 2xl:h-11 3xl:h-28
                    px-3 sm:px-4 lg:px-5 2xl:px-6 3xl:px-16
                    rounded-xl
                    text-sm 2xl:text-base 3xl:text-3xl
                    bg-white/10 text-white border border-white/15
                    hover:bg-white/15 cursor-pointer
                  "
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2 sm:gap-3 3xl:gap-6">
                <button
                  onClick={() => router.push("/pointPage")}
                  className="
                    group flex items-center justify-center gap-2 sm:gap-2.5 3xl:gap-5
                    bg-zinc-800/80 hover:bg-zinc-700/80
                    rounded-full
                    h-9 lg:h-10 2xl:h-11 3xl:h-24
                    pl-2 pr-3 sm:pl-2.5 sm:pr-4 lg:pl-3 lg:pr-5 3xl:pl-6 3xl:pr-10
                    transition-all duration-200
                  "
                  type="button"
                >
                  <span className="flex items-center justify-center scale-90 sm:scale-100 3xl:scale-150">
                    <CoinIcon animated={false} />
                  </span>
                  <span className="text-white font-bold tabular-nums text-sm sm:text-base lg:text-lg 2xl:text-xl 3xl:text-4xl leading-none">
                    {(points ?? 0).toLocaleString()}
                  </span>
                </button>

                <div className="relative">
                  <button
                    onClick={async () => {
                      await loadNotification();
                      setNotifOpen((v) => !v);
                    }}
                    className="
                      relative flex items-center justify-center
                      w-9 h-9 lg:w-10 lg:h-10 2xl:w-11 2xl:h-11 3xl:w-24 3xl:h-24
                      bg-zinc-800/80 hover:bg-zinc-700/80
                      rounded-full
                      transition-all duration-200
                    "
                    type="button"
                    aria-label="Notifications"
                  >
                    <IoMdNotificationsOutline className="w-5 h-5 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 3xl:w-10 3xl:h-10 text-white/80" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 text-[10px] 3xl:min-w-6 3xl:h-6 3xl:text-sm bg-red-500 text-white font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {notifOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setNotifOpen(false)}
                      />

                      <div className="absolute top-12 right-0 z-50 w-85 sm:w-100 3xl:w-130 rounded-2xl border border-white/10 bg-linear-to-b from-zinc-800/95 to-zinc-900/98 backdrop-blur-xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="relative px-5 py-4 border-b border-white/10">
                          <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/5 to-transparent" />
                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <IoMdNotificationsOutline className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <span className="text-white font-bold text-base 3xl:text-lg">
                                  Мэдэгдэл
                                </span>
                                {unreadCount > 0 && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-semibold rounded-full">
                                    {unreadCount}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNotifOpen(false)}
                              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                            >
                              <X className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                        </div>

                        <div className="overflow-y-auto max-h-100">
                          {notification.length === 0 ? (
                            <div className="py-14 px-6 text-center">
                              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-linear-to-br from-white/5 to-white/2 flex items-center justify-center">
                                <IoMdNotificationsOutline className="w-7 h-7 text-white/20" />
                              </div>
                              <p className="text-white/50 text-sm font-medium">
                                Мэдэгдэл байхгүй
                              </p>
                              <p className="text-white/30 text-xs mt-1">
                                Шинэ мэдэгдэл ирэхэд энд харагдана
                              </p>
                            </div>
                          ) : (
                            <div className="p-2">
                              {notification.map((n) => (
                                <button
                                  key={n.id}
                                  type="button"
                                  onClick={() => goToNotification(n)}
                                  className={`
                                    w-full text-left p-3 rounded-xl transition-all duration-200 mb-1 last:mb-0
                                    ${
                                      !n.read
                                        ? "bg-linear-to-r from-blue-500/10 via-purple-500/5 to-transparent hover:from-blue-500/15 border-l-2 border-blue-500"
                                        : "hover:bg-white/5 opacity-70 hover:opacity-100"
                                    }
                                  `}
                                >
                                  <div className="flex gap-3 items-start">
                                    <div
                                      className={`
                                      w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                                      ${
                                        !n.read
                                          ? "bg-linear-to-br from-blue-500/20 to-purple-500/20"
                                          : "bg-white/5"
                                      }
                                    `}
                                    >
                                      <IoMdNotificationsOutline
                                        className={`w-4 h-4 ${!n.read ? "text-blue-400" : "text-white/30"}`}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4
                                          className={`text-sm line-clamp-1 flex-1 ${!n.read ? "text-white font-semibold" : "text-white/70"}`}
                                        >
                                          {n.title}
                                        </h4>
                                        {!n.read && (
                                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                                        )}
                                      </div>

                                      <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">
                                        {n.body}
                                      </p>

                                      <p className="text-white/25 text-[10px] mt-2 font-medium">
                                        {new Date(n.createdAt).toLocaleString(
                                          "mn-MN",
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="h-9 lg:h-10 2xl:h-11 3xl:h-28 px-2 2xl:px-3 3xl:px-10 rounded-xl border border-white/10 bg-white/5 flex items-center">
                  <div className="3xl:scale-[1.35] origin-center">
                    <UserButton />
                  </div>
                </div>

                <div className="relative hidden sm:block">
                  <button
                    className="cursor-pointer p-1 3xl:p-2"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    type="button"
                    aria-label="Open settings"
                  >
                    <ChevronDown
                      className={[
                        "transition",
                        settingsOpen
                          ? "rotate-180 text-white"
                          : "rotate-0 text-gray-400",
                        "w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-10 3xl:h-10",
                      ].join(" ")}
                    />
                  </button>

                  <AnimatePresence>
                    {settingsOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-12 right-0 border border-white/10 bg-black/95 backdrop-blur-xl text-white p-2 3xl:p-3 rounded-2xl w-56 3xl:w-80 shadow-2xl origin-top-right"
                      >
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 }}
                          className="cursor-pointer flex items-center gap-3 w-full hover:bg-white/10 transition-all px-3 py-3 3xl:px-5 3xl:py-4 rounded-xl group"
                          onClick={() => {
                            router.push("/savedPosts");
                            setSettingsOpen(false);
                          }}
                          type="button"
                        >
                          <div className="w-9 h-9 3xl:w-12 3xl:h-12 rounded-lg bg-linear-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all">
                            <BookmarkCheck className="w-4 h-4 3xl:w-6 3xl:h-6 text-violet-400" />
                          </div>
                          <div className="text-left">
                            <div className="text-white font-medium text-sm 3xl:text-lg">
                              Saved Posts
                            </div>
                            <div className="text-white/50 text-xs 3xl:text-sm">
                              Your bookmarks
                            </div>
                          </div>
                        </motion.button>

                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="cursor-pointer flex items-center gap-3 w-full hover:bg-white/10 transition-all px-3 py-3 3xl:px-5 3xl:py-4 rounded-xl group"
                          onClick={() => {
                            router.push("/helpcenter");
                            setSettingsOpen(false);
                          }}
                          type="button"
                        >
                          <div className="w-9 h-9 3xl:w-12 3xl:h-12 rounded-lg bg-linear-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all">
                            <FaRegCircleQuestion className="w-4 h-4 3xl:w-6 3xl:h-6 text-emerald-400" />
                          </div>
                          <div className="text-left">
                            <div className="text-white font-medium text-sm 3xl:text-lg">
                              Help Center
                            </div>
                            <div className="text-white/50 text-xs 3xl:text-sm">
                              Get support
                            </div>
                          </div>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </SignedIn>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Open menu"
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

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
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

            <div className="h-px bg-white/10 my-3" />

            <button
              onClick={() => router.push("/addPost")}
              className="
                sm:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl
                bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600
                text-white font-semibold
              "
              type="button"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>

            <button
              onClick={() => router.push("/helpcenter")}
              className="
                md:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10 text-white/80
              "
              type="button"
            >
              <FaRegCircleQuestion className="w-5 h-5" />
              <span>Help Center</span>
            </button>

            <SignedIn>
              <button
                onClick={() => router.push("/savedPosts")}
                className="
                  sm:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10 text-white/80
                "
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
