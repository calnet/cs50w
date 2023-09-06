import { useContext } from 'react';

// material-ui
import { Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';

// context import
import { SidebarContext } from '../../../contexts/SidebarContext';

// style imports
import 'simplebar-react/dist/simplebar.min.css';
import './Sidebar.css';

// project imports
import SimpleBar from 'simplebar-react';
import LogoSection from '../LogoSection';
import MenuList from './MenuList';

// ==============================|| SIDEBAR LAYOUT ||============================== //

function Sidebar() {
    const theme = useTheme();
    const { drawerOpen, setDrawerOpen } = useContext(SidebarContext);

    const handleSidebarToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerWidth = 280;
    const drawerAnchor = 'left';

    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <SimpleBar style={{ height: '100%' }}>
            <Stack
                sx={{
                    height: '100%',
                }}
            >
                <LogoSection />

                <MenuList />

                {/* <Stack component={'nav'} spacing={2} sx={{ flexGrow: 1, px: 2 }}>
                    // using context, map through navSections array //
                    {old_NavSections.map((section) => {
                        return <Old_NavSection key={section.key} title={section.title} items={section.items} />;
                    })}
                </Stack> */}

                {/* <Box sx={{ p: 3 }}>...</Box> */}
            </Stack>
        </SimpleBar>
    );

    return (
        <Drawer
            id={'sidebar'}
            anchor={drawerAnchor}
            open={drawerOpen}
            onClose={handleSidebarToggle}
            variant={isMediumScreen ? 'permanent' : 'temporary'}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                ['& .MuiDrawer-paper']: {
                    backgroundColor: 'var(--nav-bg)',
                    borderRightColor: 'var(--nav-border-color)',
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    boxSizing: 'border-box',
                    color: 'var(--nav-item-color)',
                    width: drawerWidth,
                    /* define colour variables */
                    '--nav-bg': '#1C2536',
                    '--nav-color': '#fff',
                    '--nav-border-color': 'transparent',
                    '--nav-logo-border': '#2F3746',
                    '--nav-section-title-color': '#9DA4AE',
                    '--nav-item-bg': 'transparent',
                    '--nav-item-color': '#9DA4AE',
                    '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                    '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                    '--nav-item-active-color': '#fff',
                    '--nav-item-disabled-color': '#6C737F',
                    '--nav-item-icon-color': '#9DA4AE',
                    '--nav-item-icon-active-color': '#6366F1',
                    '--nav-item-icon-disabled-color': '#6C737F',
                    '--nav-item-chevron-color': '#4D5761',
                    '--nav-scrollbar-color': '#9DA4AE',
                },
            }}
        >
            {drawer}
        </Drawer>
    );
}

export default Sidebar;
