// material-ui
import { Typography } from '@mui/material';

// project imports
import menuItems from '../../../../menu-items';
import NavGroup from '../NavGroup';

// ==============================|| SIDEBAR MENU LIST LAYOUT ||============================== //

const MenuList = () => {
    const navItems = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
