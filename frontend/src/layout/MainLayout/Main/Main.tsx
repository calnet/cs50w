import { Box, Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

function Main() {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                maxWidth: '100%',
                pl: { md: '280px' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    maxWidth: '100%',
                    flexDirection: 'column',
                }}
            >
                <Box
                    component={'main'}
                    sx={{
                        flexGrow: 1,
                        py: 8,
                    }}
                >
                    <Container maxWidth={false}>
                        <Stack sx={{ mb: 3 }}>
                            <Outlet />
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}

export default Main;
