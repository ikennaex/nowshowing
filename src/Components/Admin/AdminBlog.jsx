import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminBlog = ({ posts = [], handleDelete }) => {
  const navigate = useNavigate();

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      handleDelete(id);
    }
  };

  return (
    <div className="px-4 py-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {posts.length > 0 ? "Latest Posts" : "No posts found"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-zinc-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="w-full aspect-[3/2] overflow-hidden rounded-md mb-3">
              <img
                src={post.img || "/placeholder.jpg"} // fallback image
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-customBlue mb-1">
              {post.title}
            </h2>

            {/* Author and Content */}
            <p className="text-sm text-gray-400 mb-1">By {post.author}</p>
            <p className="text-sm text-gray-300 mb-3">
              {post.content.length > 120
                ? post.content.slice(0, 120) + "..."
                : post.content}
            </p>
            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/editpost/${post._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
