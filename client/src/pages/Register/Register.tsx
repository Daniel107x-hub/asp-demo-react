import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import Card from '../../components/Card/Card'
import { toast } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useRegisterMutation } from '../../services/User/UserService'

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        userName: '',
        password: ''
    });
    const [register, registerResult] = useRegisterMutation();

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
        register(userData);
    }

    useEffect(() => {
        const {isError, isUninitialized} = registerResult;
        if(isUninitialized) return;
        if(isError){
            toast.error('Unable to register with the provided credentials :(');
            return;
        }
        toast.success('Sucessfully registered!');
        navigate('/login');
    }, [registerResult])

    if(isAuthenticated) return <Navigate to={'/todo'}/>
    return (
        <section className={styles.register}>
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
        </section>
    )
}

export default Register