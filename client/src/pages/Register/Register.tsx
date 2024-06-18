import React, { useState } from 'react'
import styles from './Register.module.css'
import Card from '../../components/Card/Card'
import { register } from '../../services/User/UserService'
import { toast } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        userName: '',
        password: ''
    });

    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

    const canSubmit = userData.email && userData.userName && userData.password;

    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        register(userData)
        .then(response => {
            toast.success('Sucessfully registered!');
            navigate("/login");
        })
        .catch(err => {
            const {errors} = err.response.data;
            Object.entries(errors).forEach(([key, value]) => {
                toast.error(`${value}`);
            })
        });
    }
    if(isAuthenticated) return <Navigate to={'/todo'}/>
    return (
        <Card>
            <h1 className={styles.title}>Register</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={userData.email} onChange={handleInputChanged}/>
                <label htmlFor="userName">Username: </label>
                <input type="userName" name="userName" id="userName" value={userData.userName} onChange={handleInputChanged}/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={userData.password} onChange={handleInputChanged} autoComplete='on password'/>
                <button onClick={handleRegister} disabled={!canSubmit}>Submit</button>
            </form>
            <Link to={"/login"}>Already a user?</Link>
        </Card>
    )
}

export default Register