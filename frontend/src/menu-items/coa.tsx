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
        {
            id: 'control_accounts',
            title: 'Control Accounts',
            type: 'item',
            url: '/coa/control_accounts',
            icon: icons.TableChart,
            breadcrumbs: false,
        },
    ],
};

export default coaMenu;
