import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const CreateAd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adDetails, setAdDetails] = useState({
    title: "",
    link: "",
    media: null,
  });

  const handleChange = (e) => {
    try {
      setAdDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } catch (err) {
      console.error("Error creating ad:", err);
    } 
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdDetails({ ...adDetails, media: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append files to form data
    const formData = new FormData();

    formData.append("title", adDetails.title);
    formData.append("link", adDetails.link);
    formData.append("media", adDetails.media);

    try {
      setLoading(true);
      await axios.post(`${baseUrl}advert`, formData);
      alert("Ad created successfully!");
      setAdDetails({ title: "", link: "", media: null });
      navigate("/admin/viewrunningads");
    } catch (err) {
      setError("Failed to create ad");
      console.error(err);
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create an Ad
        </h1>

        <p className="text-sm text-gray-400 py-4">For best clarity and no pixelation, you should upload ads that are at least <span className="font-semibold text-customBlue">320×160px</span>   (ratio: 2:1).</p>

        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Upload Ad Media
            </label>
            <input
              onChange={handleImageChange}
              name="media"
              type="file"
              accept="image/*,video/*"
              className="w-full bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-customBlue file:text-white hover:file:bg-blue-600 rounded-lg"
            />
          </div>

          <div>
            <label className="block mt-4 mb-2 text-sm font-medium text-gray-300">
              Ad Title
            </label>
            <input
              placeholder="Enter Ad title"
              type="text"
              name="title"
              value={adDetails.title}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
          </div>

          <div>
            <label className="block mt-4 mb-2 text-sm font-medium text-gray-300">
              Ad Link
            </label>
            <input
              placeholder="Enter Ad link"
              type="text"
              name="link"
              value={adDetails.link}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-customBlue hover:bg-blue-800 transition-colors py-2 my-6 px-4 rounded-xl text-white font-semibold"
          >
            {loading ? "Creating Ad..." : "Create Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAd;
