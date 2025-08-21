import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl';
import Loader from '../../../Components/Loader';

const EditBlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        author: '',
        content: '',
        img: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Fetch post details
    useEffect(() => {
        const fetchPost = async () => {
        try {
            const response = await axios.get(`${baseUrl}blog/${id}`);
            setPost(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch post');
            setLoading(false);
        }
        };
        fetchPost();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setPost({
        ...post,
        [e.target.name]: e.target.value,
        });
    };


    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      setError('');
      try {
        await axios.put(`${baseUrl}blog/${id}`, post);
        navigate('/admin/blog'); // Navigate only after success
      } catch (err) {
        setError('Failed to update post');
        alert('Failed to update post');
      } finally {
        setSubmitting(false); // Always hide loader after
      }
    };


    if (loading || submitting) return <Loader />;

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          rows={5}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="file"
          name="img"
          placeholder="Image URL"
          src={post.img}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Update Post
        </button>
      </form>
    </div>
  )
}

export default EditBlogPost