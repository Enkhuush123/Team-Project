"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function BlogCard() {
  const router = useRouter();

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(99,102,241,0.10)]">
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-white/80" />
        </div>
        <div>
          <div className="text-white font-semibold text-lg">
            Blogs & Community
          </div>
          <div className="text-white/55 text-sm">Share your thoughts</div>
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-xl bg-linear-to-br from-white/6 to-white/3 border border-white/10 p-4">
          <div className="text-white/70 text-sm">
            Post бичээд community-тэй санал бодлоо хуваалц.
          </div>
          <div className="mt-3 text-white/45 text-xs">
            Create post and share thoughts
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => router.push("/addPost")}
            className="flex-1 h-10 text-white font-semibold bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_10px_28px_rgba(79,70,229,0.35)] hover:brightness-110"
          >
            <FaPlus className="mr-2" />
            Create a Post
          </Button>

          <Button
            variant="secondary"
            className="h-10 bg-white/10 text-white border border-white/15 hover:bg-white/15"
            onClick={() => router.push("/blogs")}
          >
            Open <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
