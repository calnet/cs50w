// assets
import { Dashboard } from '@mui/icons-material';
import { MenuItem } from '.';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: MenuItem = {
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
};

export default dashboard;
