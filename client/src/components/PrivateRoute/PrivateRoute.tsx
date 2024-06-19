import { Outlet, Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Layout from "../Layout/Layout";

const PrivateRoute = () => {
    const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated);
    if(!isAuthenticated) return <Navigate to='/login' />
    return (
        <Layout>
            <Outlet/>
        </Layout>
    )
}

export default PrivateRoute;