import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { verifyAuthentication } from "../../services/User/UserService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setAuthenticated } from "../../app/features/Auth/authSlice";

const PrivateRoute = () => {
    const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated);
    if(!isAuthenticated) return <Navigate to='/login' />
    return <Outlet/>
}

export default PrivateRoute;