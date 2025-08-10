// assets
import { Receipt, AccountBalance, Business, Assessment } from '@mui/icons-material';
import { MenuItem } from '../types/menu';

// constant
const icons = { Receipt, AccountBalance, Business, Assessment };

// ==============================|| TRANSACTIONS MENU ITEMS ||============================== //

const transactionsMenu: MenuItem = {
    id: 'transactions',
    title: 'Transactions',
    hidden: false,
    type: 'group',
    children: [
        {
            id: 'transaction_list',
            title: 'All Transactions',
            type: 'item',
            url: '/transactions',
            icon: icons.Receipt,
            breadcrumbs: true,
        },
        {
            id: 'new_invoice',
            title: 'Sales Invoice',
            type: 'item',
            url: '/transactions/new/invoice',
            icon: icons.Receipt,
            breadcrumbs: true,
        },
        {
            id: 'new_payment',
            title: 'Customer Payment',
            type: 'item',
            url: '/transactions/new/payment',
            icon: icons.AccountBalance,
            breadcrumbs: true,
        },
        {
            id: 'new_purchase',
            title: 'Purchase Invoice',
            type: 'item',
            url: '/transactions/new/purchase',
            icon: icons.Business,
            breadcrumbs: true,
        },
        {
            id: 'recurring_transactions',
            title: 'Recurring Transactions',
            type: 'item',
            url: '/transactions/recurring',
            icon: icons.Assessment,
            breadcrumbs: true,
        },
    ],
};

export default transactionsMenu;
