// assets
import { People, Receipt, Wallet } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { People, Receipt, Wallet };

// ==============================|| CUSTOMERS MENU ITEMS ||============================== //

const customersMenu: MenuItemType = {
    id: 'customers',
    title: 'Customers',
    type: 'group',
    children: [
        {
            id: 'customer_list',
            title: 'Customer List',
            type: 'item',
            url: '/customers/customer_list',
            icon: icons.People,
            breadcrumbs: true,
        },
        {
            id: 'invoices',
            title: 'Invoices',
            type: 'item',
            url: '/customers/invoices',
            icon: icons.Receipt,
            breadcrumbs: true,
        },
        {
            id: 'sales_orders',
            title: 'Sales Orders',
            type: 'item',
            url: '/customers/sales_orders',
            icon: icons.Wallet,
            breadcrumbs: true,
        },
    ],
};

export default customersMenu;
