import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SpinnerCircular } from "spinners-react";
import { authContext } from '../component/authentication/AuthContext';



export default function PublicRoute({ children }) {
    const { user, isLoading } = useContext(authContext);
    if (isLoading) {
        return <div className="h-[70vh] text-center"> <SpinnerCircular color="blue" style={{ display: "inline" }} /></div>;
    }

    return user?.uid ? <Navigate to="/" /> : children;
}