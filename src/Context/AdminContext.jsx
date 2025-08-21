import axios from "axios";
import { useEffect, useState, createContext, useMemo } from "react";
import { baseUrl } from "../baseUrl";
import Loader from "../Components/Loader";

export const AdminContext = createContext({});

export function AdminContextProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin profile from server
  const refreshAdmin = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}adminlogin/profile`, { withCredentials: true });
          setAdmin(response.data);
          console.log("Admin profile fetched:", response.data);
      
      // Optional: Ensure the fetched user is actually an admin
    //   if (response.data.role === "admin") {
    //     setAdmin(response.data);
    //   } else {
    //     setAdmin(null); // Clear if not admin
    //     console.warn("Access denied: Not an admin");
    //   }
    } catch (err) {
      console.error("Failed to fetch admin:", err.response?.data || err.message);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAdmin();
  }, []);

  const contextValue = useMemo(() => ({ admin, setAdmin }), [admin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return <AdminContext.Provider value={contextValue}>
    {children}
  </AdminContext.Provider>;
}
