// assets
import { ChecklistRtl, People, Receipt, Wallet } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { ChecklistRtl, People, Receipt, Wallet };

// ==============================|| SUPPLIERS MENU ITEMS ||============================== //

const suppliersMenu: MenuItemType = {
    id: 'suppliers',
    title: 'Suppliers',
    type: 'group',
    children: [
        {
            id: 'supplier_list',
            title: 'Supplier List',
            type: 'item',
            url: '/suppliers/supplier_list',
            icon: icons.People,
            breadcrumbs: true,
        },
        {
            id: 'invoices',
            title: 'Invoices',
            type: 'item',
            url: '/suppliers/invoices',
            icon: icons.Receipt,
            breadcrumbs: true,
        },
        {
            id: 'purchase_orders',
            title: 'Purchase Orders',
            type: 'item',
            url: '/suppliers/purchase_orders',
            icon: icons.Wallet,
            breadcrumbs: true,
        },
    ],
};

export default suppliersMenu;
