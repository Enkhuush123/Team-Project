import { useState } from "react";
export const Text = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handlePost = () => {
    const postData = {
      type: "text",
      title,
      body,
    };
    console.log(postData, "this is post");
  };
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <input
        className="w-full h-12 px-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full min-h-[180px] px-4 py-3 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Body text (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          className="px-5 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition cursor-pointer"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};
