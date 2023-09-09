// assets
import { Dashboard } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const utilitiesMenu: MenuItemType = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Utilities',
            type: 'item',
            url: '/utilities',
            icon: icons.Dashboard,
            breadcrumbs: false,
        },
        {
            id: 'basicTable',
            title: 'Basic Table',
            type: 'item',
            url: '/utilities/basic-table',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'dataTable',
            title: 'Data Table',
            type: 'item',
            url: '/utilities/data-table',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'denseTable',
            title: 'Dense Table',
            type: 'item',
            url: '/utilities/dense-table',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'enhancedTable',
            title: 'Enhanced Table',
            type: 'item',
            url: '/utilities/enhanced-table',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'stickyHeadTable',
            title: 'Sticky Head Table',
            type: 'item',
            url: '/utilities/sticky-head-table',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        // ],
    ],
};

export default utilitiesMenu;
