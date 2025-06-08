import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

const CreateBlogPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
        img: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post(`${baseUrl}blog`, formData);
        alert('Post created successfully!');
        navigate('/admin/blogposts');
        } catch (err) {
        setError('Failed to create post');
        console.error(err);
        }
    };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Create Blog Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={formData.img}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreateBlogPost