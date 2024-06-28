import React, {useState} from 'react'
import styles from './Login.module.css'
import Card from '../../components/Card/Card'
import { getUser, login } from '../../services/User/UserService'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated } from '../../app/features/Auth/authSlice'
import { setUsername } from '../../app/features/User/userSlice'; 
import { RootState } from '../../app/store'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password)
    .then(async response => {
      if(response.status === 200) {
        dispatch(setAuthenticated(true));
        const userData = await getUser();
        const { userName } = userData.data;
        dispatch(setUsername(userName));
        return navigate('/todo');
      }
    })
    .catch(error => {
      toast.error('Unable to login with the provided credentials :(');
    });
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