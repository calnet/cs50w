import { Stack } from '@mui/material';
import Old_NavItem, { Old_NavItemProps } from '../NavItem/old_NavItem';

export type Old_NavSectionProps = {
    key: string | number;
    title?: string;
    items: Old_NavItemProps[];
};

// ==============================|| NAV SECTION LAYOUT ||============================== //

function Old_NavSection(props: Old_NavSectionProps) {
    return (
        <Stack component={'ul'} spacing={0.5} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {props.title}

            {/* using props, map through nav items array */}
            {props.items.map((item) => {
                return <Old_NavItem key={item.key} title={item.title} href={item.href} icon={item.icon} activeIcon={item.activeIcon} />;
            })}
        </Stack>
    );
}

export default Old_NavSection;
