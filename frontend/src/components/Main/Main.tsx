import { Box, Container, Stack } from '@mui/material';

export default function Main() {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                maxWidth: '100%',
                pl: { lg: '280px' },
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
                    <Container maxWidth="xl">
                        <Stack sx={{ mb: 3 }}>
                            This is the main content area
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}
