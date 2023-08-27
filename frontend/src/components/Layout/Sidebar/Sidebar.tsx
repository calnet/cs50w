import { useContext } from 'react';
import { SidebarContext } from '../Layout';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './Sidebar.css';

import NavSection from './NavSection/NavSection';

import {
    Box,
    Drawer,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { KeyboardArrowDownOutlined } from '@mui/icons-material';

// type SidebarProps = {
//     navSections: NavSectionProps[];
// };

function Sidebar() {
    const theme = useTheme();
    const { mobileOpen, setMobileOpen, navSections } =
        useContext(SidebarContext);

    const handleSidebarToggle = () => {
        setMobileOpen(!mobileOpen);
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
                <Stack
                    alignItems={'center'}
                    direction={'row'}
                    spacing={2}
                    sx={{ p: 3 }}
                >
                    <Box
                        component={'a'}
                        href="/"
                        sx={{
                            borderColor: 'var(--nav-logo-border)',
                            borderRadius: 1,
                            borderStyle: 'solid',
                            borderWidth: 1,
                            display: 'flex',
                            height: 40,
                            p: '4px',
                            width: 40,
                        }}
                    >
                        <svg
                            fill="none"
                            height="100%"
                            viewBox="0 0 24 24"
                            width="100%"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#6366F1"
                                opacity="0.16"
                                d="M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z"
                            ></path>
                            <path
                                fill="#6366F1"
                                d="M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z"
                            ></path>
                        </svg>
                    </Box>
                    <Stack
                        alignItems={'center'}
                        direction={'row'}
                        spacing={2}
                        sx={{ flexGrow: 1 }}
                    >
                        <Box flexGrow={1}>
                            <Typography variant="h6" color={'inherit'}>
                                Capstone
                            </Typography>
                            <Typography variant="body2" color={'neutral.400'}>
                                Accountancy
                            </Typography>
                        </Box>
                        <IconButton arai-name="KeyboardArrowDown">
                            <KeyboardArrowDownOutlined sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack
                    component={'nav'}
                    spacing={2}
                    sx={{ flexGrow: 1, px: 2 }}
                >
                    {navSections.map((section) => {
                        return (
                            <NavSection
                                key={section.key}
                                title={section.title}
                                items={section.items}
                            />
                        );
                    })}
                </Stack>
                <Box sx={{ p: 3 }}>...</Box>
            </Stack>
        </SimpleBar>
    );

    return (
        <Drawer
            anchor={drawerAnchor}
            open={mobileOpen}
            onClose={handleSidebarToggle}
            variant={isMediumScreen ? 'permanent' : 'temporary'}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                // display: isLargeScreen ? 'block' : 'none',

                ['& .MuiDrawer-paper']: {
                    backgroundColor: 'var(--nav-bg)',
                    borderRightColor: 'var(--nav-border-color)',
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    boxSizing: 'border-box',
                    color: 'var(--nav-color)',
                    width: drawerWidth,
                    '--nav-bg': '#1C2536',
                    '--nav-color': '#fff',
                    '--nav-border-color': 'transparent',
                    '--nav-logo-border': '#2F3746',
                    '--nav-section-title-color': '#9DA4AE',
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
