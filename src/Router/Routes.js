import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../Layout/DashboardLayout'
import Main from '../Layout/Main'
import AllProducts from '../Pages/AllProducts/AllProducts'
import Blog from '../Pages/Blog/Blog'
import AddProduct from '../Pages/Dashboard/AddProduct'
import AllUsers from '../Pages/Dashboard/AllUsers'
import ManageAllProducts from '../Pages/Dashboard/ManageAllProducts'
import MyBookings from '../Pages/Dashboard/MyBookings'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Payment from '../Pages/Payment/Payment'
import Signup from '../Pages/Signup/Signup'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment-twelve-server-nine.vercel.app/category/${params.id}`)
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/manage-allProducts',
                element: <AdminRoute><ManageAllProducts></ManageAllProducts></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://assignment-twelve-server-nine.vercel.app/bookings/${params.id}`)
            },
        ]
    }
])

export default router;