import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import Loader from '../Components/Loader';


const BlogPage = () => {

  const [fetchedBlogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}blog`);
        setBlogPosts(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) return <Loader />;
  


  return (
    <div className="bg-black text-white px-9 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {fetchedBlogPosts.length > 0 ? 'Latest Posts' : error || 'No posts found'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {fetchedBlogPosts.map((post) => (
          <Link to={`/blog/${post._id}`}>
            <div key={post.id} className="bg-zinc-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition">
              <img className='h-48 w-full object-cover' src= {post.img} alt="" />
                <h2 className="text-xl font-semibold text-customBlue my-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-1">By {post.author}</p>
                <p className="text-gray-300 text-sm truncate">{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
