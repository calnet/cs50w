// material-ui

import { Divider, List, Typography, useTheme } from '@mui/material';

import { MenuItem } from '../../../../menu-items';
import NavItem from '../NavItem';

type NavGroupProps = {
    item: MenuItem;
};

// project imports

// ==============================|| SIDEBAR MENU LIST ||============================== //

const NavGroup = ({ item }: NavGroupProps) => {
    const theme = useTheme();

    // menu list collapse & Items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.caption }} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.caption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

export default NavGroup;
