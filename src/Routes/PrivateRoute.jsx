import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loding from "../components/Shared/Loding";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <Loding></Loding>
    }
    if (user) {
        return children
    }
    return (
        <Navigate to='/signin' state={location.pathname} replace>

        </Navigate>
    );
};

export default PrivateRoute;