"use client";
import { useState } from "react";

export default function Report() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Гарчиг болон тайлбар заавал бөглөнө үү!");
      return;
    }

    const reportData = {
      title,
      description,
      email,
      createdAt: new Date(),
    };

    console.log("Report", reportData);

    setSuccess(true);
    setTitle("");
    setDescription("");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-black text-white pt-20">
      <div className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center">Асуудал мэдэгдэх</h1>

        <input
          className="w-full px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Асуудлын гарчиг"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full min-h-[120px] px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Дэлгэрэнгүй тайлбар"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Имэйл (заавал биш)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-lg font-medium"
        >
          Мэдэгдэл илгээх
        </button>

        {success && (
          <p className="text-green-400 text-center text-sm">
            ✅ Амжилттай илгээгдлээ
          </p>
        )}
      </div>
    </div>
  );
}
