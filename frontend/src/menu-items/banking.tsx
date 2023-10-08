// assets
import { ChecklistRtl, FormatListBulleted, Wallet } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { ChecklistRtl, FormatListBulleted, Wallet };

// ==============================|| BANKING MENU ITEMS ||============================== //

const bankingMenu: MenuItemType = {
    id: 'banking',
    title: 'Banking',
    type: 'group',
    children: [
        {
            id: 'account_list',
            title: 'Account List',
            type: 'item',
            url: '/banking',
            icon: icons.Wallet,
            breadcrumbs: false,
        },
        {
            id: 'statements',
            title: 'Statements',
            type: 'item',
            url: '/banking/statements',
            icon: icons.FormatListBulleted,
            breadcrumbs: true,
        },
        {
            id: 'reconciliation',
            title: 'Reconciliation',
            type: 'item',
            url: '/banking/reconciliation',
            icon: icons.ChecklistRtl,
            breadcrumbs: true,
        },
    ],
};

export default bankingMenu;
