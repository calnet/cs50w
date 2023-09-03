import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// ==============================|| LOGO SECTION LAYOUT ||============================== //

function LogoSection() {
    return (
        <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{ p: 3 }}>
            <Box
                component={RouterLink}
                to={'/'}
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
                <svg fill="none" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
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
            <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{ flexGrow: 1 }}>
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
    );
}

export default LogoSection;
