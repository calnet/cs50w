import { MenuItems } from '../types/menu';
import bankingMenu from './banking';
import coaMenu from './coa';
import customersMenu from './customers';
import dashboardMenu from './dashboard';
import dialogsMenu from './dialogs';
import suppliersMenu from './suppliers';
import utilitiesMenu from './utilities';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboardMenu, utilitiesMenu, dialogsMenu, bankingMenu, coaMenu, customersMenu, suppliersMenu],
};

export default menuItems;
