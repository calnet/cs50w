import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { Path } from 'react-router-dom';

import bankingMenu from './banking';
import coaMenu from './coa';
import customersMenu from './customers';
import dashboardMenu from './dashboard';
import suppliersMenu from './suppliers';

export interface MenuItems {
    items: MenuItemType[];
}

export type MenuItemType = {
    id: string;
    title?: string;
    caption?: string;
    type: 'group' | 'item' | 'collapse';
    children?: MenuItem[];
    url?: string;
    icon?: OverridableComponent<SvgIconTypeMap>;
    breadcrumbs?: boolean;
    external?: boolean;
    target?: string;
    disabled?: boolean;
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboard, banking, coa, customers, suppliers],
};

export default menuItems;
