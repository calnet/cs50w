import { MenuItems } from '../types/menu';
import bankingMenu from './banking';
import coaMenu from './coa';
import customersMenu from './customers';
import dashboardMenu from './dashboard';
import dialogsMenu from './dialogs';
import suppliersMenu from './suppliers';
import transactionsMenu from './transactions';
import utilitiesMenu from './utilities';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboardMenu, transactionsMenu, bankingMenu, coaMenu, customersMenu, suppliersMenu, utilitiesMenu, dialogsMenu],
};

export default menuItems;
