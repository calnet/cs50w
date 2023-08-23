import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';

import SimpleBar from 'simplebar-react';
import NavSection from './NavSection/NavSection';

import type { NavSectionProps } from './NavSection/NavSection';

import 'simplebar-react/dist/simplebar.min.css';

type SidebarProps = {
    navSections: NavSectionProps[];
};

function Sidebar(props: SidebarProps) {
    const drawerWidth = 280;

    return (
        <Drawer
            anchor="left"
            open={true}
            variant="permanent"
            sx={{
                [`& .MuiDrawer-paper`]: {
                    backgroundColor: 'var(--nav-bg)',
                    borderRightColor: 'var(--nav-border-color)',
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
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
                // [`& .simplebar-scrollbar`]: {
                //     // background: 'var(--nav-scrollbar-color)',
                //     background: 'pink',
                //     '--nav-scrollbar-color': '#9DA4AE',
                // },
            }}
        >
            <SimpleBar hidden={false} forceVisible={'y'}>
                <Stack sx={{ height: '100%' }}>
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
                                    Devias
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={'neutral.400'}
                                >
                                    Production
                                </Typography>
                            </Box>
                            <IconButton arai-name="KeyboardArrowDown">
                                <KeyboardArrowDownOutlined
                                    sx={{ fontSize: 16 }}
                                />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack
                        component={'nav'}
                        spacing={2}
                        sx={{ flexGrow: 1, px: 2 }}
                    >
                        {props.navSections.map((section) => {
                            return (
                                <NavSection
                                    title={section.title}
                                    items={section.items}
                                />
                            );
                        })}
                    </Stack>
                    <Box sx={{ p: 3 }}>...</Box>
                </Stack>
            </SimpleBar>
        </Drawer>
    );
}

export default Sidebar;
