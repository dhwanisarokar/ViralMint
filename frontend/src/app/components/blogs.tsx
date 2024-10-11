"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8082/api";

const Blogs = () => {
  const [blogs, setblogs] = useState<
    {
      content: string;
      createdAt: string;
      createdBy: string;
      location: string;
      title: string;
      _id: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get(`${API_URL}/blogs`);
      const data = response.data;
      console.log(data);

      setblogs(data);
    }
    fetchBlogs();
  }, []);
  return (
    <div>
      {blogs.length ? (
        blogs.map((blog) => (
          <div key={blog._id} className="border-2 border-slate-400 p-2">
            <h1 className="text-3xl">{blog.title}</h1>
            <p>{blog.content}</p>
            <small>{blog.createdBy}</small>
          </div>
        ))
      ) : (
        <p>No Blogs Found</p>
      )}
    </div>
  );
};

export default Blogs

