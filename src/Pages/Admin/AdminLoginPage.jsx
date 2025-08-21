import axios from "axios";
import React, { useContext, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { Navigate, useNavigate } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";



const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { admin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${baseUrl}adminlogin`, { email, password }, { withCredentials: true });
        setAdmin(response.data);
      console.log("Login successful:", response.data);
      alert("Login successful");
      navigate("/admin")
    } catch (err) {
      console.error("Login error:", err);
      const message = err.response?.data?.message || "Invalid credentials";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

    if (admin) {
      return <Navigate to={"/admin"} />;
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
