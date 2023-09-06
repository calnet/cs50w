import { forwardRef } from 'react';

// routing imports
import { NavLink } from 'react-router-dom';

// material-ui
import { FiberManualRecord } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useTheme } from '@mui/material/styles';

// type imports
import PropTypes from 'prop-types';
import { MenuItemType } from '../../../../menu-items';

// project imports

// prop types
type NavItemProps = {
    item: MenuItemType;
    level: number;
};

// ==============================|| NAV ITEM LAYOUT ||============================== //

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme();

    const Icon: OverridableComponent<SvgIconTypeMap> | JSX.Element | undefined = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecord
            sx={{ width: 6, height: 6 }} /* if isActive make width & height 8 // i.e. larger value */
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );
    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
            <NavLink ref={ref} {...props} to={item.url} target={itemTarget} />
        )),
    };

    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                // borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`,
            }}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="body1" color="inherit">
                        {/* change to h5 if isActive */}
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.caption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
};

export default NavItem;
