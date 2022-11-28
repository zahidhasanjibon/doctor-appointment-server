import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SpinnerCircular } from "spinners-react";
import { authContext } from '../component/authentication/AuthContext';
import UseAdmin from '../component/hook/useAdmin';

export default function AdminRoute({ children }) {
    const { user, isLoading } = useContext(authContext);
            const[isAdmin,isAdminLoading] = UseAdmin(user.email)

    const location = useLocation();

    if (isLoading || isAdminLoading) {
        return <div className="h-[70vh] text-center"> <SpinnerCircular color="blue" style={{ display: "inline" }} /></div>;
    }
 

    return user?.uid  && isAdmin? (
        children
    ) : (
        <Navigate state={{ from: location }} to="/login" replace />
    );
}
