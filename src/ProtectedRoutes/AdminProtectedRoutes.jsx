import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";
import Loader from "../Components/Loader";

const AdminProtectedRoutes = () => {
    const { admin, loading } = useContext(AdminContext);

    if (loading) {
        // show a loader while checking auth
        return <div><Loader /></div>;
    }

    // Redirect to login if user is not authenticated
    return admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoutes;