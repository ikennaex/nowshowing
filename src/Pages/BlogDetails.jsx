import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogPosts from '../data/blog';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const found = blogPosts.find((post) => String(post.id) === String(id));
    if (found) {
      setBlog(found);
    } else {
      setError('Blog post not found.');
    }
  }, [id]);

  if (error) {
    return <div className="text-white text-center p-6">{error}</div>;
  }

  if (!blog) return null;

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-customBlue">{blog.title}</h1>
        <div className="text-sm text-gray-400">
          <span>By {blog.author}</span> | <span>{blog.date} at {blog.time}</span>
        </div>
        <p className="text-gray-300 whitespace-pre-line">{blog.content}</p>

        <Link
          to="/blog"
          className="inline-block mt-6 px-4 py-2 bg-customPurple text-black font-semibold rounded hover:bg-customBlue transition"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
