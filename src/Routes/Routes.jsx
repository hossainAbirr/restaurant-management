
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import Signin from '../Pages/SignIn/Signin';
import NotFound from '../Pages/NotFound/NotFound';
import AddFood from '../Pages/Food/AddFood';
import PrivateRoute from './PrivateRoute';


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