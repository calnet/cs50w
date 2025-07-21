import { useContext } from 'react';

// material-ui
import { 
    Drawer, 
    Stack, 
    useMediaQuery, 
    useTheme,
    Box,
} from '@mui/material';

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
        <SimpleBar 
            style={{ height: '100%' }}
            autoHide={false}
        >
            <Stack sx={{ height: '100%' }}>
                <LogoSection />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <MenuList />
                </Box>
                
                {/* Footer section */}
                <Box 
                    sx={{ 
                        p: 2, 
                        borderTop: 1, 
                        borderColor: 'rgba(255,255,255,0.1)',
                        textAlign: 'center'
                    }}
                >
                    <Box
                        sx={{
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.6)',
                            mb: 1
                        }}
                    >
                        CS50 Capstone Project
                    </Box>
                    <Box
                        sx={{
                            fontSize: '0.7rem',
                            color: 'rgba(255,255,255,0.4)',
                        }}
                    >
                        v1.0.0
                    </Box>
                </Box>
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
                    background: theme.palette.nav?.background,
                    borderRightColor: theme.palette.nav?.borderColor,
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    boxSizing: 'border-box',
                    color: theme.palette.nav?.item?.color,
                    width: drawerWidth,
                },
            }}
        >
            {drawer}
        </Drawer>
    );
}

export default Sidebar;