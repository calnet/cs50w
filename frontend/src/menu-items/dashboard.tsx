// assets
import { Dashboard } from '@mui/icons-material';
import { MenuItem } from '../types/menu';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboardMenu: MenuItem = {
    id: 'dashboard',
    hidden: false, // Set to true to hide the dashboard menu item by default
    type: 'group',
    children: [
        {
            id: 'sage-dashboard',
            title: 'Sage Dashboard',
            tooltip: 'Main accounting dashboard with Sage-style interface',
            type: 'item',
            url: '/sage-dashboard',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.Dashboard,
            breadcrumbs: true,
            hidden: true, // Hide the default dashboard item
        },
        {
            id: 'dashboard-v1',
            title: 'Dashboard - Version 1',
            tooltip: 'Version 1 of the dashboard',
            type: 'item',
            url: '/dashboard-v1',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'capstone-dashboard',
            title: 'Capstone Dashboard',
            type: 'item',
            url: '/capstone-dashboard',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'claude-dashboard',
            title: 'Claude Dashboard',
            type: 'item',
            url: '/claude-dashboard',
            icon: icons.Dashboard,
            breadcrumbs: true,
        }
    ],
};

export default dashboardMenu;
