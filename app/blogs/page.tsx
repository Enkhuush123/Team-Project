"use client";

import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  subDays,
} from "date-fns";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Send,
  Bookmark,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";
import { NextResponse } from "next/server";
import { set } from "zod";
import { Comme } from "next/font/google";

type Blog = {
  id: string;
  imageUrl?: string | null;
  title: string;
  description: string;
  link?: string | null;
};

type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name?: string | null;
    email?: string | null;
    imageUrl: string | null;
  };
};
function CommentSection({ blogId }: { blogId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comment?blogId=${blogId}`);
      const data = await res.json();
      setComments(data.comments ?? []);

      setLoading(false);
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to fetch comments" },
        { status: 500 },
      );
    }
  };
  const onToggle = async () => {
    const next = !open;
    setOpen(next);
    if (next) await load();
  };
  const submit = async () => {
    if (!content.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "failed");
        return;
      }
      setComments((prev) => [data.comment, ...prev]);
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="text-white/70 hover:text-white transition text-sm"
      >
        {open ? "Hide Comments" : "Show Comments"}
      </button>
      {open && (
        <div>
          <div>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment"
              className="flex h-10 rounded-xl bg-black/30 border border-white/10 px-3  text-white outline-0"
            />
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="h-10 px-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition"
            >
              {sending ? "..." : "Post"}
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : comments.length === 0 ? (
            <div>No comments yet</div>
          ) : (
            <div className="flex flex-col gap-5">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex gap-3 items-center  rounded-xl bg-white/5 border border-white/10 p-3 w-full"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black/40 ">
                    {c.user.imageUrl ? (
                      <Image
                        src={c.user.imageUrl}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="w-full">
                    <div className="font-bold">
                      {c.user.name || c.user.email || "Anonymous"}
                    </div>
                    <div className="flex  justify-between ">
                      <div>{c.content}</div>
                      <div>
                        {formatDistanceToNow(new Date(c.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [myVote, setMyVote] = useState<Record<string, 1 | -1 | 0>>({});
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      const arr: Blog[] = Array.isArray(data) ? data : [];
      setBlogs(arr);

      const initVotes: Record<string, number> = {};
      const initMy: Record<string, 1 | -1 | 0> = {};
      arr.forEach((b) => {
        initVotes[b.id] = initVotes[b.id] ?? 0;
        initMy[b.id] = initMy[b.id] ?? 0;
      });
      setVotes(initVotes);
      setMyVote(initMy);
    };
    getBlogs();
  }, []);

  const handleVote = (id: string, dir: 1 | -1) => {
    setVotes((prev) => {
      const current = prev[id] ?? 0;
      const mine = myVote[id] ?? 0;

      if (mine === dir) return { ...prev, [id]: current - dir };

      if (mine === -dir) return { ...prev, [id]: current + dir * 2 };

      return { ...prev, [id]: current + dir };
    });

    setMyVote((prev) => {
      const mine = prev[id] ?? 0;
      if (mine === dir) return { ...prev, [id]: 0 };
      return { ...prev, [id]: dir };
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-105 w-105 rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 space-y-6">
        {blogs.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-10 text-center text-white/60">
            No posts yet
          </div>
        )}

        {blogs.map((item) => {
          const score = votes[item.id] ?? 0;
          const mine = myVote[item.id] ?? 0;

          return (
            <div
              key={item.id}
              className="w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                         shadow-[0_20px_60px_rgba(99,102,241,0.12)] hover:border-white/20 transition"
            >
              <div className="px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="min-w-0">
                  <h2 className="text-white font-extrabold text-lg sm:text-xl leading-snug truncate">
                    {item.title}
                  </h2>
                  <p className="text-white/50 text-xs sm:text-sm truncate">
                    Software Community • post
                  </p>
                </div>

                <span className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                  NEW
                </span>
              </div>

              {item.imageUrl ? (
                <div className="relative w-full aspect-video bg-black">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-56 bg-white/5 border-b border-white/10" />
              )}

              <div className="px-5 sm:px-6 py-5">
                <p className="text-white/75 text-[13px] sm:text-[14px] leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                      role="group"
                      aria-label="Vote"
                    >
                      <button
                        type="button"
                        onClick={() => handleVote(item.id, 1)}
                        className={`transition ${
                          mine === 1
                            ? "text-white"
                            : "text-white/55 hover:text-white"
                        }`}
                        aria-label="Upvote"
                      >
                        <ArrowBigUp className="h-5 w-5" />
                      </button>

                      <span className="min-w-7 text-center text-sm font-semibold text-white/80 tabular-nums">
                        {score}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleVote(item.id, -1)}
                        className={`transition ${
                          mine === -1
                            ? "text-white"
                            : "text-white/55 hover:text-white"
                        }`}
                        aria-label="Downvote"
                      >
                        <ArrowBigDown className="h-5 w-5" />
                      </button>
                    </div>

                    <button
                      className="flex items-center gap-2 text-white/60 hover:text-white transition"
                      type="button"
                      onClick={() =>
                        setOpenCommentsFor((prev) =>
                          prev === item.id ? null : item.id,
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">Comment</span>
                    </button>

                    <button
                      className="flex items-center gap-2 text-white/60 hover:text-white transition"
                      type="button"
                    >
                      <Send className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>

                  <button
                    className="flex items-center gap-2 text-white/60 hover:text-white transition"
                    type="button"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                </div>

                {openCommentsFor === item.id && (
                  <CommentSection blogId={item.id} />
                )}

                {item.link && (
                  <div className="mt-4">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition
                                 rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                    >
                      {item.link}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
