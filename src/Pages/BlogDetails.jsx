import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import axios from 'axios';
import Loader from '../Components/Loader';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
        try {
        const response = await axios.get(`${baseUrl}blog/${id}`);
        const blogData = response.data;
        setBlog(blogData);
        } catch (err) {
        setError("Failed to fetch movie details.");
        } finally {
        setLoading(false);
        }
    };
    fetchBlog();

    }, [id]);

  if (loading) return <Loader />;
  if (error) {
  return <div className="text-white text-center p-6">{error}</div>;
  }

  if (!blog) return null;

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="max-w-4xl mx-auto space-y-4">
        <img src={blog.img} alt={blog.title} className="w-full lg:w-1/2 rounded-xl object-cover" />
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
