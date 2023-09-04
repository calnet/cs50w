import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import banking from './banking';
import coa from './coa';
import customers from './customers';
import dashboard from './dashboard';
import suppliers from './suppliers';

export type MenuItems = {
    items: MenuItem[];
};

export type MenuItem = {
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
