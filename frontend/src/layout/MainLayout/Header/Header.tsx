import { Box } from '@mui/material';
import Navbar from './Navbar/Navbar';

// ==============================|| HEADER LAYOUT ||============================== //

function Header() {
    return (
        <Box
            component={'header'}
            sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                position: 'sticky',
                top: 0,
                left: { md: 280 },
                width: { md: `calc(100% - 280px)` },
                zIndex: 1100,
            }}
        >
            <Navbar />
        </Box>
    );
}

export default Header;
