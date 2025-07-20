// assets
import { Dashboard } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboardMenu: MenuItemType = {
    id: 'dashboard',
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
    ],
    hidden: true, // Set to true to hide the dashboard menu item by default
};

export default dashboardMenu;
