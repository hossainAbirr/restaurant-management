
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
import UpdateFood from '../Pages/MyFood/UpdateFood';
import FoodPurchase from '../Pages/Food/FoodPurchase';
import Blog from '../Pages/Blog/Blog';


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
                element: <AllFood></AllFood>,
                loader: () => fetch('https://restaurant-management-server-kappa.vercel.app/countfoods')

            },
            {
                path: '/myfood',
                element: <PrivateRoute>
                    <MyFood></MyFood>
                </PrivateRoute>,

            },
            {
                path: '/myorders',
                element: <PrivateRoute>
                    <MyOrders></MyOrders>
                </PrivateRoute>,
            },
            {
                path: '/foods/:id',
                element: <FoodDetails></FoodDetails>,
                loader: ({ params }) => fetch(`https://restaurant-management-server-kappa.vercel.app/foods/${params.id}`)
            },
            {
                path: '/purchase/:id',
                element: <PrivateRoute>
                    <FoodPurchase></FoodPurchase>
                </PrivateRoute>,
            },
            {
                path: '/updatefood/:id',
                element: <PrivateRoute><UpdateFood></UpdateFood></PrivateRoute>,
                loader: ({ params }) => fetch(`https://restaurant-management-server-kappa.vercel.app/updatefood/${params.id}`)

            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/signin',
                element: <Signin></Signin>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }

        ]
    },
]);

export default myRouterForRestaurant;