"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Send,
  Bookmark,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";

type BlogUser = {
  name?: string | null;
  email?: string | null;
  imageUrl: string | null;
};

type Blog = {
  id: string;
  imageUrl?: string | null;
  title: string;
  description: string;
  link?: string | null;
  user: BlogUser;
  score: number;
  myVote: 1 | -1 | 0;
  createdAt: string;
};

type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  user: BlogUser;
};

function CommentSection({ blogId }: { blogId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/comment?blogId=${blogId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Failed to fetch comments");
      setComments(data.comments ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments");
    } finally {
      setLoading(false);
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
    setError(null);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message ?? "Failed to post comment");
        return;
      }
      setComments((prev) => [data.comment, ...prev]);
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={onToggle}
        className="text-white/70 hover:text-white transition text-sm"
      >
        {open ? "Hide Comments" : "Show Comments"}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <div className="flex gap-2">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment"
              className="flex-1 h-10 rounded-xl bg-black/30 border border-white/10 px-3 text-white outline-0"
            />
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="h-10 px-4 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition disabled:opacity-60"
            >
              {sending ? "..." : "Post"}
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-white/60 text-sm">Loading...</div>
          ) : comments.length === 0 ? (
            <div className="text-white/60 text-sm">No comments yet</div>
          ) : (
            <div className="flex flex-col gap-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex gap-3 items-start rounded-xl bg-white/5 border border-white/10 p-3 w-full"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black/40">
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
                    <div className="font-semibold text-sm">
                      {c.user.email ?? c.user.name ?? "User"}
                    </div>
                    <div className="flex justify-between gap-3">
                      <div className="text-white/80 text-sm">{c.content}</div>
                      <div className="text-xs text-white/40 shrink-0">
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

export default function SavedPosts() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);

  useEffect(() => {
    const getSavedPosts = async () => {
      const res = await fetch("/api/savedPosts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      const data = await res.json();
      // assuming API returns array
      setBlogs(Array.isArray(data) ? data : []);
    };

    getSavedPosts();
  }, []);

  const handleVote = async (blogId: string, dir: 1 | -1) => {
    const current = blogs.find((b) => b.id === blogId);
    if (!current) return;

    const nextValue: 1 | -1 | 0 = current.myVote === dir ? 0 : dir;

    // optimistic
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id !== blogId) return b;
        const newScore = b.score - b.myVote + nextValue;
        return { ...b, score: newScore, myVote: nextValue };
      })
    );

    try {
      const res = await fetch("/api/blogVote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, value: nextValue }),
      });
      const data = await res.json();
      if (!res.ok) return;

      setBlogs((prev) =>
        prev.map((b) =>
          b.id === blogId ? { ...b, score: data.score, myVote: data.myVote } : b
        )
      );
    } catch {
      // ignore; optimistic already applied
    }
  };

  // On this page, posts are already saved.
  // Unsave should remove it from the list.
  const unsavePost = async (blogId: string) => {
    try {
      const res = await fetch("/api/savedPosts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });
      if (!res.ok) return;

      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      if (openCommentsFor === blogId) setOpenCommentsFor(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-105 w-105 rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <p className="mt-6 ml-6 text-lg font-bold">Your Saved Posts</p>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 space-y-6">
        {blogs.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-10 text-center text-white/60">
            No posts yet
          </div>
        )}

        {blogs.map((item) => {
          const score = item.score;
          const mine = item.myVote;

          return (
            <div
              key={item.id}
              className="w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                         shadow-[0_20px_60px_rgba(99,102,241,0.12)] hover:border-white/20 transition"
            >
              <div className="flex items-center gap-5 p-2">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black/40 ">
                  {item.user.imageUrl ? (
                    <Image
                      src={item.user.imageUrl}
                      alt={item.user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/10" />
                  )}
                </div>
                <div className="text-sm text-white/80">
                  {item.user.email ?? item.user.name ?? "User"}
                </div>
              </div>

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
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
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
                          prev === item.id ? null : item.id
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
                    className="flex items-center gap-2 transition cursor-pointer text-white hover:text-white"
                    type="button"
                    onClick={() => unsavePost(item.id)}
                  >
                    <Bookmark className="h-4 w-4" />
                    <span className="text-sm">Unsave</span>
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
