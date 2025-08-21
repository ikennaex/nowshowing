import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    author: "",
    content: "",
    img: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBlogDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogDetails({ ...blogDetails, img: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Append files to form data
  const formData = new FormData();

  formData.append("title", blogDetails.title);
  formData.append("author", blogDetails.author);
  formData.append("content", blogDetails.content);
  formData.append("img", blogDetails.img);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseUrl}blog`, formData);
      alert("Post created successfully!");
      navigate("/admin/blogposts");
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex flex-col items-center text-white min-h-screen p-6 ">
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
          type="file"
          accept="image/*"
          name="img"
          onChange={handleImageChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded-lg"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          {loading ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
