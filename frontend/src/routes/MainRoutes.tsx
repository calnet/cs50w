import { lazy } from 'react';
import Loadable from '../ui-components/Loadable';

import MainLayout from '../layout/MainLayout';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Default')));

// import Dashboard from '../views/dashboard/Default';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        // {
        //     path: '/',
        //     // element: <Dashboard />,
        // },
        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <Dashboard />,
                },
            ],
        },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-typography',
        //             element: <UtilsTypography />,
        //         },
        //     ],
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-color',
        //             element: <UtilsColor />,
        //         },
        //     ],
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-shadow',
        //             element: <UtilsShadow />,
        //         },
        //     ],
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'tabler-icons',
        //             element: <UtilsTablerIcons />,
        //         },
        //     ],
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'material-icons',
        //             element: <UtilsMaterialIcons />,
        //         },
        //     ],
        // },
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />,
        // },
    ],
};

export default MainRoutes;
