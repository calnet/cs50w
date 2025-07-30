// assets
import { Dashboard } from '@mui/icons-material';
import { MenuItemType } from '../types/menu';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboardMenu: MenuItemType = {
    id: 'dashboard',
    hidden: false, // Set to true to hide the dashboard menu item by default
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.Dashboard,
            breadcrumbs: false,
        },
        {
            id: 'capstone-dashboard',
            title: 'Capstone Dashboard',
            type: 'item',
            url: '/capstone-dashboard',
            icon: icons.Dashboard,
            breadcrumbs: false,
        },
        {
            id: 'claude-dashboard',
            title: 'Claude Dashboard',
            type: 'item',
            url: '/claude-dashboard',
            icon: icons.Dashboard,
            breadcrumbs: false,
        }
    ],
};

export default dashboardMenu;
