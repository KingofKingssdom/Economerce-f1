import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {
    const user = sessionStorage.getItem("user");

    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default UserProtectedRoute