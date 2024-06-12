import React, {useState} from 'react'
import styles from './Login.module.css'
import Card from '../../components/Card/Card'
import { login } from '../../services/User/UserService'
import { Link } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }
    
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