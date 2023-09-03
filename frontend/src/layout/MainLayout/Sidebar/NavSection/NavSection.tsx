import { Stack } from '@mui/material';
import NavItem from '../NavItem/NavItem';

import type { NavItemProps } from '../NavItem/NavItem';

export type NavSectionProps = {
    key: string | number;
    title?: string;
    items: NavItemProps[];
};

// ==============================|| NAV SECTION LAYOUT ||============================== //

function NavSection(props: NavSectionProps) {
    return (
        <Stack component={'ul'} spacing={0.5} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {props.title}

            {/* using props, map through nav items array */}
            {props.items.map((item) => {
                return <NavItem key={item.key} title={item.title} href={item.href} icon={item.icon} activeIcon={item.activeIcon} />;
            })}
        </Stack>
    );
}

export default NavSection;
