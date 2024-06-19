import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import Todo from './pages/Todo/Todo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/login'}/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/register',
        element: <Register/>
    },
    {
        path:'/',
        element: <PrivateRoute/>,
        children:[
            {
                path:'todo',
                element:<Todo/>
            }
        ]
    }
])

const App = () => {
  return (
    <>
        <RouterProvider router={router}/>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )
}

export default App