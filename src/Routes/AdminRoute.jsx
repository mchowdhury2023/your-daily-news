import { Navigate, useLocation } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const AdminRoute = ({ children }) => {
    const [user, loading] = useContext(AuthContext); 
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>;
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
