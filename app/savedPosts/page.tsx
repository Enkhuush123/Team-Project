"use client";

import { useEffect, useState } from "react";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const getSavedPosts = async () => {
      const res = await fetch("api/savedPosts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      console.log(data);
    };

    getSavedPosts();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};
export default SavedPosts;
