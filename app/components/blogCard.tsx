"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

export default function BlogCard() {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col gap-5 shadow-sm p-5 h-70 ">
        <div className="border-b p-2">
          <h2 className="font-bold text-2xl">Blogs & Communtiy</h2>
        </div>
        <div className="flex flex-col gap-3 border-b p-2">
          <p>Share your thoughts</p>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/addPost")} className="p-2">
              <FaPlus />
              Create a Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
