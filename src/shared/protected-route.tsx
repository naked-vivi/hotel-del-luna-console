import useUser from "@/features/authentication/use-user";
import PageLoader from "./page-loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    //1.Load the authenticate user
    const { isPending, isAuthenticated } = useUser();

    //2.if there is no authenticated user, redirect to login page
    useEffect(() => {
        if (!isAuthenticated && !isPending)
            navigate('/login')
    }, [navigate, isAuthenticated, isPending])

    //3.while loading, show the full-page moon loader
    if (isPending) return <PageLoader />

    //4.if there is a user, render the app
    if (isAuthenticated) return children
}

export default ProtectedRoute