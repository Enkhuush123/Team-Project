"use client";

import { formatDistanceToNow } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageCircle,
  Send,
} from "lucide-react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CommentSection } from "../page";

type Blog = {
  id: string;
  imageUrl?: string | null;
  title: string;
  description: string;
  link?: string | null;
  createdAt: string;
  user: {
    name?: string | null;
    email?: string | null;
    imageUrl: string | null;
  };
  score: number;
  myVote: 1 | -1 | 0;
};

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);

  const [openCommentsFor, setOpenCommentsFor] = useState(false);
  const [existsInCurrent, setExistsInCurrent] = useState(false);

  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const pathName = usePathname();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/blog/${id}`);

      const data = await res.json();
      console.log(data);
      setBlog(data);
    };

    getPost();
  }, []);

  useEffect(() => {
    console.log(blog);
  }, [blog]);

  const savePost = async (blogId: string) => {
    try {
      const res = await fetch("/api/savedPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });
    } catch (err) {
      console.log(err);
    }
    setExistsInCurrent(true);
  };
  const unsavePost = async (blogId: string) => {
    try {
      const res = await fetch("/api/savedPosts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });
      if (!res.ok) return;

      if (openCommentsFor === true) setOpenCommentsFor(false);
      setExistsInCurrent(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getSaved = async () => {
      const res = await fetch("/api/savedPosts");
      const data = await res.json();
      console.log(data);

      setSavedPosts((prev) => [...prev, ...data.map((item: any) => item.id)]);
    };
    getSaved();
  }, []);

  const handleVote = async (blogId: string, dir: 1 | -1) => {
    if (!blog) return;

    const nextValue: 1 | -1 | 0 = blog.myVote === dir ? 0 : dir;
    const prevScore = blog.score;
    const prevMyVote = blog.myVote;

    const optimisticScore = prevScore - prevMyVote + nextValue;
    setBlog({ ...blog, score: optimisticScore, myVote: nextValue });
    const res = await fetch("/api/blogVote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, value: nextValue }),
    });
    const data = await res.json();
    setBlog({ ...blog, score: data.score, myVote: data.myVote });
  };
  console.log(blog, "blogs");

  // const savePost = async (blogId: string) => {
  //   try {
  //     const res = await fetch("/api/savedPosts", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ blogId }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const score = blog?.score;
  const mine = blog?.myVote;
  const existsInDb = savedPosts.includes(blog?.id ?? "");

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`localhost:3000${pathName}`); // insert the domain link before pathname here
    } catch (err) {
      console.log(err, "failed to copy");
    }
  };

  return (
    <div
      key={blog?.id}
      className="w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                         shadow-[0_20px_60px_rgba(99,102,241,0.12)] hover:border-white/20 transition"
    >
      <div
        className="flex items-center gap-3
              font-bold p-2"
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black/40 ">
          {blog?.user.imageUrl ? (
            <Image
              src={blog?.user?.imageUrl}
              alt={blog?.user?.name || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-white/10" />
          )}
        </div>
        <div>{blog?.user.email}</div>
      </div>
      <div className="px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="min-w-0">
          <h2 className="text-white font-extrabold text-lg sm:text-xl leading-snug truncate">
            {blog?.title}
          </h2>
          <p className="text-white/50 text-xs sm:text-sm truncate">
            Software Community • post
          </p>
        </div>
      </div>

      {blog?.imageUrl ? (
        <div className="relative w-full aspect-video bg-black">
          <Image
            src={blog?.imageUrl}
            alt={blog?.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-56 bg-white/5 border-b border-white/10" />
      )}

      <div className="px-5 sm:px-6 py-5">
        <p className="text-white/75 text-[13px] sm:text-[14px] leading-relaxed whitespace-pre-wrap">
          {blog?.description}
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
                onClick={() => handleVote(blog?.id || "", 1)}
                className={`transition ${
                  mine === 1 ? "text-white" : "text-white/55 hover:text-white"
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
                onClick={() => handleVote(blog?.id || "", -1)}
                className={`transition ${
                  mine === -1 ? "text-white" : "text-white/55 hover:text-white"
                }`}
                aria-label="Downvote"
              >
                <ArrowBigDown className="h-5 w-5" />
              </button>
            </div>
            <button
              className="flex items-center gap-2 text-white/60 hover:text-white transition"
              type="button"
              onClick={() => setOpenCommentsFor(!openCommentsFor)}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Comment</span>
            </button>

            <button
              className="flex items-center gap-2 text-white/60 hover:text-white transition"
              type="button"
              onClick={handleShare}
            >
              <Send className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
          {!existsInCurrent && !existsInDb ? (
            <button
              className={`flex items-center gap-2 cursor-pointer  text-white/60 hover:text-white transition`}
              type="button"
              onClick={() => savePost(blog?.id || "")}
            >
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Save</span>
            </button>
          ) : (
            <button
              type="button"
              className="group flex items-center gap-2 text-white transition cursor-pointer"
              onClick={() => unsavePost(blog?.id || "")}
            >
              <Bookmark className="h-4 w-4 group-hover:text-red-400" />

              <span className="text-sm group-hover:text-red-400">
                <span className="group-hover:hidden">Saved</span>
                <span className="hidden group-hover:inline">Unsave</span>
              </span>
            </button>
          )}
        </div>
        {openCommentsFor && <CommentSection blogId={blog?.id || ""} />}

        {blog?.link && (
          <div className="mt-4">
            <a
              href={blog.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition
                                 rounded-xl bg-white/5 border border-white/10 px-3 py-2"
            >
              {blog.link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
