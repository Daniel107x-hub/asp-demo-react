import React, {useState} from 'react'
import styles from './Login.module.css'
import Card from '../../components/Card/Card'
import { login } from '../../services/User/UserService'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated } from '../../app/features/Auth/authSlice'
import { RootState } from '../../app/store'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password)
    .then(response => {
      console.log(response.status);
      if(response.status === 200) {
        dispatch(setAuthenticated(true));
        return navigate('/todo');
      }
    })
    .catch(error => {});
  }
  if(isAuthenticated) return <Navigate to={'/todo'}/>
  
  return (
    <Card className={styles.formContainer}>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      <Link to="/">Not a user?</Link>
    </Card>
  )
}

export default Login;