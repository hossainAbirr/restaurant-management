
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import Signin from '../Pages/SignIn/Signin';
import NotFound from '../Pages/NotFound/NotFound';
import AddFood from '../Pages/Food/AddFood';
import PrivateRoute from './PrivateRoute';
import AllFood from '../Pages/Food/AllFood';
import MyFood from '../Pages/MyFood/MyFood';
import MyOrders from '../Pages/MyOrders/MyOrders';
import FoodDetails from '../Pages/Food/FoodDetails';


const myRouterForRestaurant = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addfood',
                element: <PrivateRoute>
                    <AddFood></AddFood>
                </PrivateRoute>
            },
            {
                path: '/foods',
                element:<AllFood></AllFood>,
                loader: () => fetch('http://localhost:2500/foods')
               
            },
            {
                path: '/myfood',
                element:<MyFood></MyFood>,
                // loader: () => fetch('http://localhost:2500/allfood')
               
            },
            {
                path: '/cart',
                element:<MyOrders></MyOrders>
                // loader: () => fetch('http://localhost:2500/allfood')
               
            },
            {
                path: '/foods/:id',
                element: <FoodDetails></FoodDetails>,
                loader: ({params}) => fetch(`http://localhost:2500/foods/${params.id}`)
               
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/signin',
                element: <Signin></Signin>
            },

        ]
    },
]);

export default myRouterForRestaurant