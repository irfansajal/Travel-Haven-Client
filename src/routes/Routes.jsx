import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Main from '../layouts/Main'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import RoomDetails from '../Pages/RoomDetails/RoomDetails'
import SignUp from '../Pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import AddRoom from '../Pages/Dashboard/AddRoom'
import { getRoom } from '../api/rooms'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path:'/',
        element: <Home></Home>
      },
      {
        path:'/room/:id',
        element:<PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
        loader: ({params}) => getRoom(params.id),
      },
      
    ]
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/signUp',
    element:<SignUp></SignUp>
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      { 
        path:'/dashboard/add-room',
        element:<AddRoom></AddRoom>
      }
    ]
  }
])
