import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../../app/features/Auth/authSlice'
import { useLogoutMutation } from '../../services/User/UserService'
import { splitApi } from '../../services/SplitApi'
import { setUsername } from '../../app/features/User/userSlice'

type Props = {}

const Todo = (props: Props) => {
  const dispatch = useDispatch();
  const [ logout, {isLoading, isSuccess} ] = useLogoutMutation();

  useEffect(() => {
    if(isSuccess) {
      dispatch(setAuthenticated(false));
      dispatch(setUsername(''));
      dispatch(splitApi.util.resetApiState());
    }
  }, [isLoading])

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <div>Todo Protected Page</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Todo