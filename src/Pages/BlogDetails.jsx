import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import Loader from "../Components/Loader";
import { compareAsc, format } from "date-fns";
import { ArrowLeft } from "lucide-react";

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
    <div className="lg:py-9 py-9 px-2 text-white bg-black min-h-screen">
      <div className="px-4 md:px-10 w-full md:w-2/3 lg:w-1/2 mx-auto space-y-4">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full rounded-xl object-cover max-h-[400px] md:max-h-[500px]"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {blog.title}
        </h1>

        <div className="text-sm text-gray-400">
          <span>By {blog.author}</span> |{" "}
          <span>
            {blog.date} {format(new Date(blog.createdAt), "do MMMM, yyyy")}
          </span>
        </div>

        <p className="text-gray-300 whitespace-pre-line leading-relaxed ">
          {blog.content}
        </p>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-customBlue border border-customBlue rounded-md font-semibold transition duration-200 hover:bg-customBlue hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
