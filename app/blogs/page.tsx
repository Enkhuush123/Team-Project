"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Blog = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch("/api/blog", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setBlogs(data);
    };

    getBlogs();
  }, []);

  return (
    <div>
      {blogs?.map((item) => (
        <div key={item.id} className="text-white h-50 w-60 border-white border">
          {item.imageUrl && (
            <div className="relative border border-white w-20 h-20">
              <Image src={item.imageUrl} alt="image" fill />
            </div>
          )}
          <p>{item.title}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
