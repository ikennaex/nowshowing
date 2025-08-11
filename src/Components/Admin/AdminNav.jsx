import React from 'react'
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 justify-center px-4 py-8">
  {[
    { label: "Manage Movies", path: "/admin" },
    { label: "Create Cinema Movie", path: "/admin/createcinemamovie" },
    { label: "Create Streaming Movie", path: "/admin/createstreamingmovie" },
    { label: "Create Youtube Movie", path: "/admin/createyoutubemovie" },
    { label: "Create Blog Post", path: "/admin/createblogpost" },
    { label: "Blog Posts", path: "/admin/blogposts" },
    { label: "Create an Ad", path: "/admin/createad" },
    { label: "View Running Ads", path: "/admin/viewrunningads" },
  ].map((btn, i) => (
    <Link to={btn.path} key={i}>
      <button className="w-full px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
        {btn.label}
      </button>
    </Link>
  ))}
</div>

  )
}

export default AdminNav