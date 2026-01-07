"use client";
import { useState } from "react";
import { Image } from "../components/image";
import { Text } from "../components/text";
import { Link } from "../components/link";

export default function Post() {
  type TabType = "Text" | "Image" | "Link";
  const [tab, setTab] = useState<TabType>("Text");

  const tabStyle = (name: TabType) =>
    `px-4 py-2 text-sm font-medium cursor-pointer
     ${
       tab === name
         ? "border-b-2 border-blue-500 text-blue-500"
         : "text-gray-500 hover:text-black"
     }`;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Post</h1>

        <div className="flex gap-6 border-b mb-6 justify-center">
          <button className={tabStyle("Text")} onClick={() => setTab("Text")}>
            Text
          </button>

          <button className={tabStyle("Image")} onClick={() => setTab("Image")}>
            Images & Video
          </button>

          <button className={tabStyle("Link")} onClick={() => setTab("Link")}>
            Link
          </button>
        </div>

        {tab === "Text" && <Text />}
        {tab === "Image" && <Image />}
        {tab === "Link" && <Link />}
      </div>
    </div>
  );
}
