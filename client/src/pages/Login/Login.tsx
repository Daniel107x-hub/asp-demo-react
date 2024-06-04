import React, {useState} from 'react'
import styles from './Login.module.css'
import Card from '../../components/Card/Card'
import { login } from '../../services/Login/LoginService'

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
      <main>
      <Card className={styles.formContainer}>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </Card>
    </main>
  )
}

export default Login;