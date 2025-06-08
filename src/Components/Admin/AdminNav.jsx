import React from 'react'
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-8 mt-8 px-4">
        <Link to="/admin"><button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
        Manage Movies
        </button>
        </Link>
        <Link to="/admin/createcinemamovie">
        <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
            Create Cinema Movie
        </button>
        </Link>

        <Link to="/admin/createstreamingmovie">
        <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
            Create Streaming Movie
        </button>
        </Link>

        <Link to="/admin/createyoutubemovie">
        <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
            Create Youtube Movie
        </button>
        </Link>

        <Link to="/admin/createblogpost">
        <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
            Create Blog Post
        </button>
        </Link>


        <Link to="/admin/blogposts">
        <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
            Blog Posts
        </button>
        </Link>
    </div>
  )
}

export default AdminNav