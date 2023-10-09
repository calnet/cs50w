// assets
import { TableChart } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { TableChart };

// ==============================|| CHART OF ACCOUNT MENU ITEMS ||============================== //

const coaMenu: MenuItemType = {
    id: 'coa',
    title: 'Chart of Accounts',
    type: 'group',
    children: [
        // {
        //     id: 'layouts',
        //     title: 'Layouts',
        //     type: 'item',
        //     url: '/coa/layouts',
        //     icon: icons.TableChart,
        //     breadcrumbs: false,
        // },
        {
            id: 'coa_layout',
            title: 'Chart of Accounts Layout',
            type: 'item',
            url: '/coa/coa_layout',
            icon: icons.TableChart,
            breadcrumbs: false,
        },
        {
            id: 'coa_categories',
            title: 'Categories',
            type: 'item',
            url: '/coa/coa_categories',
            icon: icons.TableChart,
            breadcrumbs: false,
        },
        {
            id: 'nominal_types',
            title: 'Account Types',
            type: 'item',
            url: '/coa/nominal_types',
            icon: icons.TableChart,
            breadcrumbs: false,
        },
        {
            id: 'nominal_codes',
            title: 'Nominal Codes',
            type: 'item',
            url: '/coa/nominal_codes',
            icon: icons.TableChart,
            breadcrumbs: false,
        },
        // {
        //     id: 'control_accounts',
        //     title: 'Control Accounts',
        //     type: 'item',
        //     url: '/coa/control_accounts',
        //     icon: icons.TableChart,
        //     breadcrumbs: false,
        // },
    ],
};

export default coaMenu;
