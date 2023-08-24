import { Stack } from '@mui/material';
import NavItem from '../NavItem/NavItem';

import type { NavItemProps } from '../NavItem/NavItem';

export type NavSectionProps = {
    key?: string;
    title: string;
    items: NavItemProps[];
};

function NavSection(props: NavSectionProps) {
    return (
        <Stack
            component={'ul'}
            spacing={0.5}
            sx={{ m: 0, p: 0, listStyle: 'none' }}
        >
            {props.title}

            {props.items.map((item) => {
                return (
                    <NavItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        activeIcon={item.activeIcon}
                        active={item.active}
                    />
                );
            })}
        </Stack>
    );
}

export default NavSection;
