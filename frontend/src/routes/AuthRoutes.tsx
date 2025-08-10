import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';

// auth routing
const Login = Loadable(lazy(() => import('../views/auth/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthRoutes: RouteObject = {
    path: '/login',
    element: <Login />,
};

export default AuthRoutes;
