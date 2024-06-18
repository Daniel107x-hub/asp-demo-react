import { Outlet, Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";

const PrivateRoute = () => {
    const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated);
    if(!isAuthenticated) return <Navigate to='/login' />
    return <Outlet/>
}

export default PrivateRoute;