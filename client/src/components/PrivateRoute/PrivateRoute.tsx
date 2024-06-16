import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { verifyAuthentication } from "../../services/User/UserService";

const PrivateRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        verifyAuthentication()
        .then(response => {
            if(response.status === 200) setIsAuthenticated(true);
        })
        .catch(err => {
            return <Navigate to='/login' />
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    if(isLoading) return <h1>Loading</h1>
    if(!isAuthenticated) return <Navigate to='/login' />
    return <Outlet/>
}

export default PrivateRoute;