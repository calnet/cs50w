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
            id: 'customers_list',
            title: 'Customer List',
            type: 'item',
            url: '/customers',
            icon: icons.People,
            breadcrumbs: true,
        },
        {
            id: 'customer_new',
            title: 'New Customer',
            type: 'item',
            url: '/customers/customer_new',
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
