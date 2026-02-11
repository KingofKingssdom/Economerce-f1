import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
    const user = sessionStorage.getItem("user");

    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default AdminProtectedRoute