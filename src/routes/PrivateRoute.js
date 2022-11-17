import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SpinnerCircular } from "spinners-react";
import { authContext } from '../component/authentication/AuthContext';

export default function PrivateRoute({ children }) {
    const { user, isLoading } = useContext(authContext);

    const location = useLocation();


    if (isLoading) {
        return <div className="h-[70vh] text-center"> <SpinnerCircular color="blue" style={{ display: "inline" }} /></div>;
    }

    return user?.uid ? (
        children
    ) : (
        <Navigate state={{ from: location }} to="/login" replace />
    );
}
