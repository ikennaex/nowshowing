import React from "react";
import SearchBar from "../../Components/SearchBar";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import Loader from "../../Components/Loader";
import AdminNav from "../../Components/Admin/AdminNav";
import AdminBlog from "../../Components/Admin/AdminBlog";

const AdminBlogPage = () => {
    const [search, setSearch] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response  = await axios.get(`${baseUrl}blog`);
        const movieData = response.data;
        console.log(movieData)
        setAllPosts(movieData);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(query) ||
        post.body?.toLowerCase().includes(query)
    );
  }, [search, allPosts]);

  if (loading) return (<div className='mt-24'>
    <Loader />
  </div>) ;

  return (
    <div>
      <div className="px-4 py-8 bg-black text-white min-h-screen">
        <SearchBar search={search} setSearch={setSearch} />
        {/* Top Buttons */}
        <AdminNav/>

        <AdminBlog posts={filteredPosts} />
      </div>
    </div>
  )
}

export default AdminBlogPage