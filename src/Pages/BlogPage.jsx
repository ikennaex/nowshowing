import React from 'react';
import blogPosts from '../data/blog';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  return (
    <div className="bg-black text-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Latest Blog Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post) => (
          <Link to={`/blog/${post.id}`}>
            <div key={post.id} className="bg-zinc-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                <h2 className="text-xl font-semibold text-customBlue mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-1">By {post.author}</p>
                <p className="text-xs text-gray-500 mb-2">{post.date} • {post.time}</p>
                <p className="text-gray-300 text-sm">{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
