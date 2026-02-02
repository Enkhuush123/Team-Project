"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const IndividualPosts = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = id;

//   const [blog, setBlog] = useState({});

  useEffect(() => {
  fetch(`/api/blog/${blogId}`)
    .then(res => res.json())
    .then(data => console.log(data));
}, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default IndividualPosts;
