import { useContext, useState } from 'react';
import { SidebarContext } from '../../../../contexts/SidebarContext';

import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    SvgIcon,
    Tooltip,
    Typography
} from '@mui/material';

import {
    AccountCircle,
    Logout,
    Menu as MenuIcon,
    NotificationsNone,
    Person,
    Search,
    Settings
} from '@mui/icons-material';

// ==============================|| NAVBAR LAYOUT ||============================== //

function Navbar() {
    const { drawerOpen, setDrawerOpen } = useContext(SidebarContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationCount] = useState(3); // Mock notification count

    const handleSidebarToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);

    return (
        <Stack
            alignItems={'center'}
            direction={'row'}
            justifyContent={'space-between'}
            minHeight={64}
            px={2}
            spacing={2}
            sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Stack alignItems={'center'} direction={'row'} spacing={2}>
                <Tooltip title="Toggle Sidebar">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleSidebarToggle}
                        sx={{
                            mr: 2,
                            display: { md: 'none' },
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                bgcolor: 'action.hover',
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Search">
                    <IconButton
                        aria-label="Search"
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                bgcolor: 'action.hover',
                            },
                        }}
                    >
                        <Search />
                    </IconButton>
                </Tooltip>
            </Stack>

            <Stack alignItems={'center'} direction={'row'} spacing={1}>
                <Tooltip title="Language">
                    <IconButton
                        aria-label="Language"
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Box
                            width={28}
                            sx={{
                                '& img': {
                                    width: '100%',
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            <img src="/assets/flags/flag-uk.svg" alt="UK Flag" />
                        </Box>
                    </IconButton>
                </Tooltip>

                <Tooltip title={`${notificationCount} new notifications`}>
                    <IconButton
                        aria-label="Notifications"
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Badge
                            badgeContent={notificationCount}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    animation: notificationCount > 0 ? 'pulse 2s infinite' : 'none',
                                    '@keyframes pulse': {
                                        '0%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.2)' },
                                        '100%': { transform: 'scale(1)' },
                                    },
                                },
                            }}
                        >
                            <NotificationsNone />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Contacts">
                    <IconButton
                        aria-label="Contacts"
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <path
                                    fill="#fff"
                                    fillOpacity={0.01}
                                    d="M9.7446 12.1521c2.2512 0 4.0761-1.8249 4.0761-4.076C13.8207 5.8249 11.9958 4 9.7447 4 7.4934 4 5.6685 5.825 5.6685 8.076c0 2.2512 1.8249 4.0761 4.076 4.0761Zm0 2.7174c-2.564 0-4.8428 1.399-6.2869 3.5673-.3163.475-.4745.7125-.4563 1.0159.0142.2362.169.5254.3578.6682.2424.1833.5758.1833 1.2427.1833h10.2855c.6668 0 1.0002 0 1.2426-.1833.1888-.1428.3436-.432.3578-.6682.0182-.3034-.1399-.5409-.4563-1.0159-1.4441-2.1683-3.7229-3.5673-6.2869-3.5673Z"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.4438 15.6275c1.3188.6625 2.4494 1.7256 3.2747 3.055.1634.2633.2451.3949.2734.5772.0574.3704-.1959.8258-.5409.9724-.1698.0721-.3608.0721-.7427.0721m-4.0761-8.5758c1.3422-.667 2.2645-2.052 2.2645-3.6524s-.9223-2.9853-2.2645-3.6523M13.8207 8.076c0 2.2511-1.8249 4.076-4.076 4.076-2.2512 0-4.0761-1.8249-4.0761-4.076C5.6686 5.8249 7.4935 4 9.7446 4c2.2512 0 4.0761 1.825 4.0761 4.076ZM3.4577 18.4367c1.4441-2.1683 3.723-3.5673 6.287-3.5673 2.5639 0 4.8427 1.399 6.2868 3.5673.3164.475.4745.7125.4563 1.0159-.0142.2362-.169.5254-.3578.6682-.2424.1833-.5758.1833-1.2426.1833H4.6019c-.6669 0-1.0003 0-1.2427-.1833-.1887-.1428-.3436-.432-.3578-.6682-.0182-.3034.14-.5409.4564-1.0159Z"
                                ></path>
                            </svg>
                        </SvgIcon>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Profile">
                    <Button
                        onClick={handleProfileMenuOpen}
                        sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            borderRadius: '50%',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: (theme) => theme.shadows[4],
                            },
                        }}
                    >
                        <Avatar
                            src="/assets/avatars/avatar-anika-visser.png"
                            sx={{
                                height: 36,
                                width: 36,
                                border: '2px solid',
                                borderColor: 'primary.main',
                            }}
                        />
                    </Button>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleProfileMenuClose}
                    onClick={handleProfileMenuClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                        elevation: 8,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            minWidth: 200,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Anika Visser
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            anika.visser@example.com
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfileMenuClose}>
                        <Person sx={{ mr: 2 }} />
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                        <AccountCircle sx={{ mr: 2 }} />
                        My Account
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                        <Settings sx={{ mr: 2 }} />
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleProfileMenuClose}>
                        <Logout sx={{ mr: 2 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    );
}

export default Navbar;