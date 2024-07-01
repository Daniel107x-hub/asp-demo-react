import React, {useEffect, useState} from 'react'
import styles from './Login.module.css'
import Card from '../../components/Card/Card'
import { useLoginMutation } from '../../services/User/UserService'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setAuthenticated } from '../../app/features/Auth/authSlice'
import { AppDispatch, useAppDispatch } from '../../app/store'
import { RootState } from '../../app/store'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, loginResult] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if(loginResult.isUninitialized) return;
    if(loginResult.isError) {
      toast.error('Unable to login with the provided credentials :(');
      return;
    }
    if(loginResult.isSuccess){
      toast.success('Login successful');
      dispatch(setAuthenticated(true));
      navigate('/todo');
    }
  }, [loginResult])

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login({email, password});
  }

  if(isAuthenticated) return <Navigate to={'/todo'}/>
  
  const canLogin = email && password;
  return (
    <section className={styles.login}>
      <Card className={styles.formContainer}>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} autoComplete='on password'/>
          <button type="submit" onClick={handleLogin} disabled={!canLogin}>Submit</button>
        </form>
        <Link to="/register">Not a user?</Link>
      </Card>
    </section>
  )
}

export default Login;

//TODO: In case the user doesn't have permission to view a page, backend will return unauthorized. Return error page on client for not authorized and a link to login again or go back