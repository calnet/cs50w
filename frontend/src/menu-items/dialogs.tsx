// assets
import { Dashboard } from '@mui/icons-material';
import { MenuItemType } from '.';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dialogsMenu: MenuItemType = {
    id: 'dialogs',
    title: 'Dialogs',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dialogs',
            type: 'item',
            url: '/utilities/dialogs',
            icon: icons.Dashboard,
            breadcrumbs: false,
        },
        {
            id: 'formDialog',
            title: 'Form Dialog',
            type: 'item',
            url: '/utilities/dialogs/form-dialog',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
        {
            id: 'draggableDialog',
            title: 'Draggable Dialog',
            type: 'item',
            url: '/utilities/dialogs/draggable-dialog',
            icon: icons.Dashboard,
            breadcrumbs: true,
        },
    ],
};

export default dialogsMenu;
