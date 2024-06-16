import React from 'react'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../../app/features/Auth/authSlice'
import { logout } from '../../services/User/UserService'

type Props = {}

const Todo = (props: Props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout()
    .then(response => {
      dispatch(setAuthenticated(false));
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Card>
      <div>Todo Protected Page</div>
      <button onClick={handleLogout}>Logout</button>
    </Card>
  )
}

export default Todo